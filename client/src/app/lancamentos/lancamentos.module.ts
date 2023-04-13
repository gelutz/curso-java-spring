import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentoGridComponent } from './lancamento-grid/lancamento-grid.component';
import { LancamentoPesquisaComponent } from './lancamento-pesquisa/lancamento-pesquisa.component';


@NgModule({
	declarations: [
		LancamentoCadastroComponent,
		LancamentoGridComponent,
		LancamentoPesquisaComponent
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
		FormsModule,
		MessageModule,
		HttpClientModule
	],
	exports: [
		LancamentoCadastroComponent,
		LancamentoPesquisaComponent
	]
})
export class LancamentosModule { }
