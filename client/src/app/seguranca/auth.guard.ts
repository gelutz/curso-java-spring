import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router"
import { Observable } from "rxjs"

type GuardResponse = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree

@Injectable({
	providedIn: "root",
})
export class AuthGuard implements CanActivate {
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): GuardResponse {
		return false
	}
}
