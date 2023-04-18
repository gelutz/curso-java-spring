import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LancamentoCadastroComponent } from "./lancamento-cadastro/lancamento-cadastro.component";
import { LancamentoPesquisaComponent } from "./lancamento-pesquisa/lancamento-pesquisa.component";

export const Router: Routes = [
	{ path: 'lancamentos', component: LancamentoPesquisaComponent },
	{ path: 'lancamentos/novo', component: LancamentoCadastroComponent },
	{ path: 'lancamentos/:id', component: LancamentoCadastroComponent },
]

@NgModule({
	imports: [
		RouterModule.forRoot(Router)
	],
	exports: [
		RouterModule
	]
})
export class LancamentoRouterModule { }
