import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { PaginaNaoEncontradaComponent } from "./core/pagina-nao-encontrada.component"
import { LancamentoRouterModule } from "./lancamentos/lancamentos.router"
import { PessoasRouterModule } from "./pessoas/pessoas.router"
import { SegurancaRouterModule } from "./seguranca/seguranca.router"

export const Router: Routes = [
	{ path: "**", redirectTo: "404" },
	{ path: "404", component: PaginaNaoEncontradaComponent },
]

@NgModule({
	imports: [
		RouterModule.forRoot(Router),
		LancamentoRouterModule,
		PessoasRouterModule,
		SegurancaRouterModule,
	],
	exports: [RouterModule],
})
export class AppRouterModule {}
