import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { JwtHelperService } from "@auth0/angular-jwt"
import * as CryptoJS from 'crypto-js'
import { environment } from "src/environments/environment"
import { JwtPayload } from "../@types/JwtPayload"
import { JwtResponse } from "../@types/JwtResponse"
import { AuthError } from "../core/errors/AuthError"
import { ErrorHandlerService } from "../core/services/error-handler.service"
import { gerarStringAleatoria } from "../core/utils/GerarStringAleatória"

@Injectable({
	providedIn: "root",
})
export class AuthService {
	baseUrl = `${environment.baseUrl}/oauth2/token`
	oauthAuthorizeUrl = `${environment.baseUrl}/oauth2/authorize`
	jwtPayload?: JwtPayload
	headers = {} as HttpHeaders

	constructor(
		private http: HttpClient,
		private jwtHelper: JwtHelperService,
		private errorHandler: ErrorHandlerService,
	) {
		this.jwtPayload = this.decodeToken(this.buscarAccessToken())
		this.headers = new HttpHeaders()
			.append("Authorization", `Basic ${environment.auth.jwtBasic}`)
			.append("Content-Type", "application/x-www-form-urlencoded")
	}

	login() {
		const state = gerarStringAleatoria(30)
		const codeVerifier = gerarStringAleatoria(128)

		localStorage.setItem("algamoney:state", state)
		localStorage.setItem("algamoney:codeVerifier", codeVerifier)

		const challangeMethod = "S256"
		const codeChallenge = CryptoJS.SHA256(codeVerifier)
			.toString(CryptoJS.enc.Base64)
			.replace(/\+/g, "-")
			.replace(/\//g, "_")
			.replace(/=+$/, "");
		const redirectUri = encodeURIComponent(environment.oauthCallbackUrl)
		const clientId = "angular"
		const scope = "read+write"
		const responseType = "code"

		const params = [
			`response_type=${responseType}`,
			`client_id=${clientId}`,
			`scope=${scope}`,
			`code_challenge=${codeChallenge}`,
			`code_challenge_method=${challangeMethod}`,
			`state=${state}`,
			`redirect_uri=${redirectUri}`

		]

		window.location.href = `${this.oauthAuthorizeUrl}?${params.join("&")}`
	}

	logout(): void {
		localStorage.removeItem(environment.localStorage.jwtKey)
		this.jwtPayload = {} as JwtPayload
	}

	renovarAccessToken(): Promise<void> {
		const params = new HttpParams()
			.append("grant_type", "refresh_token")
			.append("refresh_token", this.buscarRefreshToken())

		return new Promise((resolve) => {
			const returned = this.http.post<JwtResponse>(this.baseUrl, params, {
				headers: this.headers,
			})
			returned.subscribe({
				next: (resposta) => {
					this.jwtPayload = this.decodeToken(resposta.access_token)
					this.armazenarAccessToken(resposta)
					this.armazenarRefreshToken(resposta)
					resolve()
				},
				error: (error) => {
					if (error?.error?.error == "invalid_token") {

						error = new AuthError("Sessão expirada, favor fazer login novamente")
						this.logout()
					}
					this.errorHandler.handle(error)
				},
			})
		})
	}

	renovarAccessTokenComCode(code: string, state: string): Promise<void> {

		return new Promise((resolve, reject) => {
			const stateSalvo = localStorage.getItem(environment.localStorage.stateKey)
			const codeVerifier = localStorage.getItem(environment.localStorage.codeKey)

			if (stateSalvo !== state || codeVerifier == null) {
				return reject(false)
			}

			const params = new HttpParams()
				.append("grant_type", "authorization_code")
				.append("code", code)
				.append("redirect_uri", environment.oauthCallbackUrl)
				.append("code_verifier", codeVerifier)

			this.http.post<JwtResponse>(this.baseUrl, params, { headers: this.headers })
				.subscribe({
					next: (response) => {
						this.armazenarAccessToken(response)
						this.armazenarRefreshToken(response)
						resolve()
					},
					error: reject
				})
		})
	}

	isTokenExpired(): boolean {
		const token = localStorage.getItem(environment.localStorage.jwtKey)
		return this.jwtHelper.isTokenExpired(token)
	}

	private getDecodedToken(): JwtPayload {
		const token = localStorage.getItem(environment.localStorage.jwtKey)
		return this.decodeToken(token || "")
	}

	private armazenarAccessToken(resposta: JwtResponse): void {
		localStorage.setItem(environment.localStorage.jwtKey, resposta.access_token)
	}

	private armazenarRefreshToken(resposta: JwtResponse): void {
		localStorage.setItem(environment.localStorage.refreshKey, resposta.access_token)
	}

	private buscarAccessToken(): string {
		return localStorage.getItem(environment.localStorage.jwtKey) ?? ""
	}

	private buscarRefreshToken(): string {
		return localStorage.getItem(environment.localStorage.refreshKey) ?? ""
	}

	private decodeToken(token: string): JwtPayload {
		return (this.jwtHelper.decodeToken(token) || {}) as JwtPayload
	}

	temPermissao(permissao: string): boolean {
		if (!this.jwtPayload?.user_name) return false
		return this.jwtPayload.authorities.includes(permissao)
	}
}
