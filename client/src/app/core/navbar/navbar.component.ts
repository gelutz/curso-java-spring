import { Component } from '@angular/core'
import { AuthService } from 'src/app/seguranca/auth.service'

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
	menuAberto = false

	constructor(protected authService: AuthService) { }

	toggleMenu(): boolean {
		this.menuAberto = !this.menuAberto
		return this.menuAberto
	}


}
