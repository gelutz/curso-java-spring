import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LogService } from './shared/log.service';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    LancamentosModule,
    PessoasModule,
    CoreModule,
    SharedModule,
  ],
  providers: [
    LogService,
    {provide: 'logmsg', useValue: 'LOG'}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
