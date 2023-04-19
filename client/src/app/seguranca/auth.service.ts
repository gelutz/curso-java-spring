import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { JwtHelperService } from "@auth0/angular-jwt"
import { MessageService } from "primeng/api"
import { environment } from "src/environments/environment"
import { JwtPayload } from "../@types/JwtPayload"
import { JwtResponse } from "../@types/JwtResponse"
import { ErrorHandlerService } from "../core/services/error-handler.service"

@Injectable({
	providedIn: "root",
})
export class AuthService {
	baseUrl = `${environment.baseUrl}/oauth/token`
	jwtPayload?: JwtPayload
	headers = {} as HttpHeaders

	constructor(
		private http: HttpClient,
		private jwtHelper: JwtHelperService,
		private errorHandler: ErrorHandlerService,
		private messageService: MessageService,
		private router: Router
	) {
		this.jwtPayload = this.getDecodedToken()
		this.headers = new HttpHeaders()
			.append("Authorization", `Basic ${environment.auth.jwtBasic}`)
			.append("Content-Type", "application/x-www-form-urlencoded")
	}

	temPermissao(permissao: string): boolean {
		if (!this.jwtPayload) return false
		return this.jwtPayload.authorities.includes(permissao)
	}

	login(usuario: string, senha: string): Promise<void> {
		const url = this.baseUrl

		const body = `client=angular&username=${usuario}&password=${senha}&grant_type=password`

		return new Promise((resolve) => {
			const returned = this.http.post<JwtResponse>(url, body, {
				headers: this.headers,
				withCredentials: true,
			})

			returned.subscribe({
				next: (resposta) => {
					if (!this.jwtPayload?.jwt) {
						this.jwtPayload = this.decodeToken(resposta.access_token)
						this.armazenarToken(resposta)
					}

					this.messageService.add({ severity: "success", detail: "Login bem sucedido." })
					this.router.navigate(["/lancamentos"])
					resolve()
				},
				error: (error) => {
					this.errorHandler.handle(error)
				},
			})
		})
	}

	logout(): void {
		localStorage.removeItem(environment.jwtLocalStorageKey)
		this.jwtPayload = {} as JwtPayload
	}

	renovarAccessToken(): Promise<void> {
		const body = "grant_type=refresh_token"

		return new Promise((resolve) => {
			const returned = this.http.post<JwtResponse>(this.baseUrl, body, {
				headers: this.headers,
				withCredentials: true,
			})
			returned.subscribe({
				next: (resposta) => {
					this.jwtPayload = this.decodeToken(resposta.access_token)
					this.armazenarToken(resposta)
					resolve()
				},
				error: (error) => {
					this.errorHandler.handle(error)
				},
				complete: () => console.log("completed!"),
			})
		})
	}

	isTokenExpired(): boolean {
		const token = localStorage.getItem(environment.jwtLocalStorageKey)
		return this.jwtHelper.isTokenExpired(token)
	}

	private getDecodedToken(): JwtPayload {
		const token = localStorage.getItem(environment.jwtLocalStorageKey)
		return this.decodeToken(token ?? "")
	}

	private armazenarToken(resposta: JwtResponse): void {
		// document.cookie = resposta.
		localStorage.setItem(environment.jwtLocalStorageKey, resposta.access_token)
	}

	private decodeToken(token: string): JwtPayload {
		return (this.jwtHelper.decodeToken(token) ?? {}) as JwtPayload
	}
}
