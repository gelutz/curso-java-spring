import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { AuthService } from "../../seguranca/auth.service"

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
	menuAberto = false

	constructor(protected authService: AuthService, private router: Router) {
		// fromEvent(document, "click")
		// 	.pipe(map((ev) => ev.target as HTMLButtonElement))
		// 	.subscribe({
		// 		next: (el) => {
		// 			let temp = false
		// 			if (el.id != "botao-menu" && !temp) {
		// 				temp = true
		// 				this.menuAberto = false
		// 			}
		// 			if ((el.parentNode as HTMLElement).id != "botao-menu" && !temp) {
		// 				temp = true
		// 				this.menuAberto = false
		// 			}
		// 			if ((el.parentNode?.parentNode as HTMLElement).id != "botao-menu" && !temp) {
		// 				temp = true
		// 				this.menuAberto = false
		// 			}
		// 		},
		// 	})
	}

	toggleMenu(): boolean {
		this.menuAberto = !this.menuAberto
		return this.menuAberto
	}

	logout() {
		this.authService.logout()
		this.authService.login()
	}
}
