import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { JwtPayload } from '../@types/JwtPayload';
import { JwtResponse } from '../@types/JwtResponse';
import { ErrorHandlerService } from '../core/services/error-handler.service';


@Injectable({
	providedIn: 'root'
})
export class AuthService {

	baseUrl = `${environment.baseUrl}/oauth/token`
	jwtPayload?: JwtPayload

	constructor(
		private http: HttpClient,
		private jwtHelper: JwtHelperService,
		private errorHandler: ErrorHandlerService,
		private messageService: MessageService,
		private router: Router
	) {
		this.jwtPayload = this.getDecodedToken()
	}

	login(usuario: string, senha: string): Promise<void> {
		const url = this.baseUrl
		const headers = (new HttpHeaders())
			.append('Authorization', `Basic ${environment.auth.jwtBasic}`)
			.append('Content-Type', 'application/x-www-form-urlencoded')

		const body = `client=angular&username=${usuario}&password=${senha}&grant_type=password`

		return new Promise((resolve, reject) => {
			const returned = this.http.post<JwtResponse>(url, body, { headers })

			returned.subscribe({
				next: (resposta) => {
					console.log(resposta)
					if (!this.jwtPayload) {
						this.jwtPayload = this.decodeToken(resposta.access_token)
						this.armazenarToken(resposta);
					}

					this.messageService.add({ severity: 'success', detail: 'Login bem sucedido.' })
					this.router.navigate(['/lancamentos'])
					resolve()
				},
				error: (error) => {
					this.errorHandler.handle(error)
				}
			})
		})
	}

	private getDecodedToken(): JwtPayload {
		const token = localStorage.getItem(environment.jwtLocalStorageKey)
		return this.decodeToken(token ?? '')
	}

	private armazenarToken(resposta: JwtResponse): void {
		localStorage.setItem(environment.jwtLocalStorageKey, resposta.access_token);
	}

	private decodeToken(token: string): JwtPayload {
		return (this.jwtHelper.decodeToken(token) ?? {}) as JwtPayload
	}
}
