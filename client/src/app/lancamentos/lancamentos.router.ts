import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { AuthGuard } from "../seguranca/auth.guard"
import { LancamentoCadastroComponent } from "./lancamento-cadastro/lancamento-cadastro.component"
import { LancamentoPesquisaComponent } from "./lancamento-pesquisa/lancamento-pesquisa.component"

export const Router: Routes = [
	{
		path: "lancamentos",
		component: LancamentoPesquisaComponent,
		canActivate: [AuthGuard],
		data: { roles: ["ROLE_PESQUISAR_LANCAMENTO"] },
	},
	{
		path: "lancamentos/novo",
		pathMatch: "full",
		component: LancamentoCadastroComponent,
		canActivate: [AuthGuard],
		data: { roles: ["ROLE_CADASTRAR_LANCAMENTO"] },
	},
	{
		path: "lancamentos/:id",
		component: LancamentoCadastroComponent,
		canActivate: [AuthGuard],
		data: { roles: ["ROLE_CADASTRAR_LANCAMENTO"] },
	},
]

@NgModule({
	imports: [RouterModule.forRoot(Router)],
	exports: [RouterModule],
})
export class LancamentoRouterModule {}
