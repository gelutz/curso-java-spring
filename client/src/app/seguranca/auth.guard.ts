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
		private messageService: MessageService
	) {}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): GuardResponse {
		let roles = route.data["roles"] as string[]

		roles = roles.filter((role) => {
			this.authService.temPermissao(role)
		})

		if (!roles) {
			this.messageService.add({ severity: "error", detail: "Acesso negado." })
			this.router.navigate(["/"])
			return false
		}

		return true
	}
}
