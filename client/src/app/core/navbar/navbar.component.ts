import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { AuthService } from "src/app/seguranca/auth.service"

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
	menuAberto = false

	constructor(protected authService: AuthService, private router: Router) {}

	toggleMenu(): boolean {
		this.menuAberto = !this.menuAberto
		return this.menuAberto
	}

	logout() {
		this.authService.logout()
		this.router.navigate(["/login"])
	}
}
