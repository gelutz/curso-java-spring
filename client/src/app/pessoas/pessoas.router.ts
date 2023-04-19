import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { AuthGuard } from "../seguranca/auth.guard"
import { PessoaCadastroComponent } from "./pessoa-cadastro/pessoa-cadastro.component"
import { PessoaPesquisaComponent } from "./pessoa-pesquisa/pesquisa-pessoa.component"

export const Router: Routes = [
	{ path: 'pessoas', component: PessoaPesquisaComponent, canActivate: [AuthGuard] },
	{ path: 'pessoas/novo', component: PessoaCadastroComponent, canActivate: [AuthGuard] },
	{ path: 'pessoas/:id', component: PessoaCadastroComponent, canActivate: [AuthGuard] }
]

@NgModule({
	imports: [
		RouterModule.forRoot(Router)
	],
	exports: [
		RouterModule
	]
})
export class PessoasRouterModule { }
