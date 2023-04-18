import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PessoaCadastroComponent } from "./pessoa-cadastro/pessoa-cadastro.component";
import { PessoaPesquisaComponent } from "./pessoa-pesquisa/pesquisa-pessoa.component";

export const Router: Routes = [
	{ path: 'pessoas', component: PessoaPesquisaComponent },
	{ path: 'pessoas/novo', component: PessoaCadastroComponent },
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
