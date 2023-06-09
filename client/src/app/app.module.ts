import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { AppRouterModule } from "./app.router"

import { AppComponent } from "./app.component"
import { CoreModule } from "./core/core.module"
import { DashboardModule } from "./dashboard/dashboard.module"
import { LancamentosModule } from "./lancamentos/lancamentos.module"
import { PessoasModule } from "./pessoas/pessoas.module"
import { SegurancaModule } from "./seguranca/seguranca.module"

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		CoreModule,
		AppRouterModule,

		LancamentosModule,
		PessoasModule,
		SegurancaModule,
		DashboardModule,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
