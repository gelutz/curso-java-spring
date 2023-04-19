import { HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, from, mergeMap } from "rxjs"
import { JwtResponse } from "src/app/@types/JwtResponse"
import { environment } from "src/environments/environment"
import { AuthService } from "../auth.service"

type InterceptReturn = Observable<HttpEvent<JwtResponse>>

@Injectable()
export class RefreshTokenInterceptor {
	constructor(private auth: AuthService) {}

	intercept(req: HttpRequest<JwtResponse>, next: HttpHandler): InterceptReturn {
		if (!req.url.includes("/oauth/token") && this.auth.isTokenExpired()) {
			return from(this.auth.renovarAccessToken()).pipe(
				mergeMap(() => {
					req = req.clone({
						setHeaders: {
							Authorization: `Bearer ${localStorage.getItem(environment.jwtLocalStorageKey)}`,
						},
					})

					return next.handle(req)
				})
			)
		}

		return next.handle(req)
	}
}
