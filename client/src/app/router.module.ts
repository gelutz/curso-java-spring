import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PaginaNaoEncontradaComponent } from "./core/pagina-nao-encontrada.component";
import { LancamentoRouterModule } from "./lancamentos/router.module";
import { PessoaCadastroComponent } from "./pessoas/pessoa-cadastro/pessoa-cadastro.component";
import { PessoaPesquisaComponent } from "./pessoas/pessoa-pesquisa/pesquisa-pessoa.component";
import { PessoasRouterModule } from "./pessoas/pessoas.router";
import { SegurancaRouterModule } from "./seguranca/seguranca.router";

export const Router: Routes = [
	{ path: 'pessoas', component: PessoaPesquisaComponent },
	{ path: 'pessoas/novo', component: PessoaCadastroComponent },
	{ path: '', redirectTo: '/lancamentos', pathMatch: 'full' },
	{ path: '**', redirectTo: '404' },
	{ path: '404', component: PaginaNaoEncontradaComponent }
]

@NgModule({
	imports: [
		RouterModule.forRoot(Router),
		LancamentoRouterModule,
		PessoasRouterModule,
		SegurancaRouterModule
	],
	exports: [
		RouterModule
	]
})
export class AppRouterModule { }
