import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { AuthService } from "../auth.service"

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"],
})
export class LoginComponent {
	usuario = ""
	senha = ""
	document: Document
	constructor(protected authService: AuthService, private router: Router) {
		this.document = document
	}

	async login(): Promise<void> {
		this.authService.login(this.usuario, this.senha).then(() => {
			this.router.navigate(["/lancamentos"])
		})
	}
}
