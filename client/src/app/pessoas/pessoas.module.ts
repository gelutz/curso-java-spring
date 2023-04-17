import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from '../shared/shared.module';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoaPesquisaComponent } from './pessoa-pesquisa/pesquisa-pessoa.component';



@NgModule({
	declarations: [
		PessoaPesquisaComponent,
		PessoaCadastroComponent
	],
	imports: [
		CommonModule,
		BrowserAnimationsModule,
		InputTextModule,
		ButtonModule,
		TableModule,
		TooltipModule,
		FormsModule,
		CalendarModule,
		SelectButtonModule,
		DropdownModule,
		InputNumberModule,
		InputMaskModule,
		SharedModule
	],
	exports: [
		PessoaPesquisaComponent,
		PessoaCadastroComponent
	]
})
export class PessoasModule { }
