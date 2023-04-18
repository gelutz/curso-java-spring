import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";

export const Router: Routes = [
	{ path: 'login', component: LoginComponent },
	// { path: 'login/auth' },
	// { path: 'logout', component: LogoutComponent },
]

@NgModule({
	imports: [
		RouterModule.forRoot(Router)
	],
	exports: [
		RouterModule
	]
})
export class SegurancaRouterModule { }
