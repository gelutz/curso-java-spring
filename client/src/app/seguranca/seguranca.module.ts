import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { RippleModule } from 'primeng/ripple'
import { environment } from 'src/environments/environment'
import { RefreshTokenInterceptor } from './interceptors/RefreshToken.interceptor'
import { LoginComponent } from './login/login.component'

export function tokenGetter(): string {
	return localStorage.getItem(environment.jwtLocalStorageKey) ?? ''
}

@NgModule({
	declarations: [
		LoginComponent,
	],
	imports: [
		CommonModule,
		InputTextModule,
		ButtonModule,
		RippleModule,
		FormsModule,
		JwtModule.forRoot({
			config: {
				tokenGetter,
				allowedDomains: ['localhost:8080'],
				disallowedRoutes: ['http://localhost:8080/oauth/token']
			},
		})
	],
	providers: [
		JwtHelperService,
		{ provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true }],
	// AuthGuard
})
export class SegurancaModule { }
