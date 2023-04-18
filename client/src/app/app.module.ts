import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRouterModule } from './router.module';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { LogService } from './shared/log.service';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		CoreModule,
		AppRouterModule,

		LancamentosModule,
		PessoasModule,
		SegurancaModule
	],
	providers: [
		LogService,
		{ provide: 'logmsg', useValue: 'LOG' },
	],
	bootstrap: [AppComponent],
})
export class AppModule {
}
