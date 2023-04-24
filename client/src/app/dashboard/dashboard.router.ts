import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { AuthGuard } from "../seguranca/auth.guard"
import { DashboardComponent } from "./component/dashboard.component"

export const Router: Routes = [
	{
		path: "dashboard",
		component: DashboardComponent,
		canActivate: [AuthGuard],
		data: { roles: ["ROLE_PESQUISAR_LANCAMENTO"] },
	},
]

@NgModule({
	imports: [RouterModule.forRoot(Router)],
	exports: [RouterModule],
})
export class DashboardRouterModule {}
