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
	{ path: "lancamentos/novo", component: LancamentoCadastroComponent, canActivate: [AuthGuard] },
	{ path: "lancamentos/:id", component: LancamentoCadastroComponent, canActivate: [AuthGuard] },
]

@NgModule({
	imports: [RouterModule.forRoot(Router)],
	exports: [RouterModule],
})
export class LancamentoRouterModule {}
