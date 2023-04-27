import { Location } from "@angular/common"
import { Injectable } from "@angular/core"
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from "@angular/router"
import { MessageService } from "primeng/api"
import { Observable } from "rxjs"
import { AuthService } from "./auth.service"

type GuardResponse = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree

@Injectable({
	providedIn: "root",
})
export class AuthGuard implements CanActivate {
	constructor(
		private authService: AuthService,
		private router: Router,
		private messageService: MessageService,
		private _location: Location
	) {}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): GuardResponse {
		let roles = route.data["roles"] as string[]

		if (this.authService.isTokenExpired()) {
			console.log("Navegação com access token inválido. Obtendo novo token...")

			return this.authService.renovarAccessToken().then(() => {
				if (this.authService.isTokenExpired()) {
					this.authService.login()
					return false
				}

				return true
			})
		} else {
			roles = roles.filter((role) => {
				return this.authService.temPermissao(role)
			})

			if (roles.length == 0) {
				this.messageService.add({ severity: "error", detail: "Acesso negado." })
				this.authService.login()
				return false
			}
			return true
		}
	}
}
