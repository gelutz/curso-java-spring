import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	usuario = ""
	senha = ""

	constructor(protected authService: AuthService) { }

	login(): void {
		this.authService.login(this.usuario, this.senha)
	}
}
