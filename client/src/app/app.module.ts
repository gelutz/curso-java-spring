import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { Router } from './router';
import { LogService } from './shared/log.service';



@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		LancamentosModule,
		PessoasModule,
		CoreModule,
		RouterModule.forRoot(Router)
	],
	providers: [
		LogService,
		{ provide: 'logmsg', useValue: 'LOG' },
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
