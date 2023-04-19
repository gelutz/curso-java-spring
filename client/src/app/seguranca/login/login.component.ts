import { Component } from "@angular/core"
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
	constructor(protected authService: AuthService) {
		this.document = document
	}

	login(): void {
		this.authService.login(this.usuario, this.senha)
	}
}
