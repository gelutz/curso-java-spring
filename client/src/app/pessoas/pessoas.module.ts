import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { RouterModule } from "@angular/router"
import { ButtonModule } from "primeng/button"
import { CalendarModule } from "primeng/calendar"
import { DialogModule } from "primeng/dialog"
import { DropdownModule } from "primeng/dropdown"
import { InputMaskModule } from "primeng/inputmask"
import { InputNumberModule } from "primeng/inputnumber"
import { InputTextModule } from "primeng/inputtext"
import { PanelModule } from "primeng/panel"
import { SelectButtonModule } from "primeng/selectbutton"
import { TableModule } from "primeng/table"
import { TooltipModule } from "primeng/tooltip"

import { SharedModule } from "../shared/shared.module"
import { PessoaCadastroComponent } from "./pessoa-cadastro/pessoa-cadastro.component"
import { PessoaPesquisaComponent } from "./pessoa-pesquisa/pesquisa-pessoa.component";
import { ContatoMestreDetalheComponent } from './contato-mestre-detalhe/contato-mestre-detalhe.component'

@NgModule({
	declarations: [PessoaPesquisaComponent, PessoaCadastroComponent, ContatoMestreDetalheComponent],
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
		SharedModule,
		RouterModule,
		PanelModule,
		DialogModule,
	],
	exports: [],
})
export class PessoasModule {}
