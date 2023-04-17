import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';
import { MensagemErroComponent } from './mensagem-erro/mensagem-erro.component';

const declarations = [
	MensagemErroComponent,
]

@NgModule({
	declarations,
	imports: [
		CommonModule,
		ButtonModule,
		TooltipModule,
		MessageModule
	],
	exports: declarations

})
export class SharedModule { }
