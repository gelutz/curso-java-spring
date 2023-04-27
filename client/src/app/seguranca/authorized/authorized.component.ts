import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-authorized',
	templateUrl: './authorized.component.html',
	styleUrls: ['./authorized.component.css']
})
export class AuthorizedComponent implements OnInit {

	constructor(
		private activatedRoute: ActivatedRoute,
		private authService: AuthService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.activatedRoute.queryParams.subscribe(({
			next: (params) => {
				if (params['code']) {
					this.authService.renovarAccessTokenComCode(params['code'], params['state'])
						.then(() => {
							this.router.navigate(['/'])
						})
				} else {
					this.router.navigate(['/'])
				}
			}
		}))
	}

}
