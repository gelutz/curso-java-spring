import { Routes } from "@angular/router";
import { LancamentoCadastroComponent } from "./lancamentos/lancamento-cadastro/lancamento-cadastro.component";
import { LancamentoPesquisaComponent } from "./lancamentos/lancamento-pesquisa/lancamento-pesquisa.component";
import { PessoaCadastroComponent } from "./pessoas/pessoa-cadastro/pessoa-cadastro.component";
import { PessoaPesquisaComponent } from "./pessoas/pessoa-pesquisa/pesquisa-pessoa.component";

export const Router: Routes = [
	{ path: 'lancamentos', component: LancamentoPesquisaComponent },
	{ path: 'lancamentos/novo', component: LancamentoCadastroComponent },
	{ path: 'lancamentos/:id', component: LancamentoCadastroComponent },

	{ path: 'pessoas', component: PessoaPesquisaComponent },
	{ path: 'pessoas/novo', component: PessoaCadastroComponent },
]
