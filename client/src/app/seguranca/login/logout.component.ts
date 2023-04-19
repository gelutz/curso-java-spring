import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../auth.service'

@Component({
	selector: 'app-login',
	template: '',
})
export class LogoutComponent {
	constructor(
		protected authService: AuthService,
		private router: Router
	) {
		this.authService.logout()
		router.navigate(['/login'])
	}
}
