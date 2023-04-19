import { CommonModule } from "@angular/common"
import { HttpClientModule } from "@angular/common/http"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { RouterModule } from "@angular/router"
import { MessageService } from "primeng/api"
import { ButtonModule } from "primeng/button"
import { CalendarModule } from "primeng/calendar"
import { DropdownModule } from "primeng/dropdown"
import { InputNumberModule } from "primeng/inputnumber"
import { InputTextModule } from "primeng/inputtext"
import { MessageModule } from "primeng/message"
import { SelectButtonModule } from "primeng/selectbutton"
import { TableModule } from "primeng/table"
import { ToastModule } from "primeng/toast"
import { TooltipModule } from "primeng/tooltip"
import { SharedModule } from "../shared/shared.module"
import { LancamentoCadastroComponent } from "./lancamento-cadastro/lancamento-cadastro.component"
import { LancamentoPesquisaComponent } from "./lancamento-pesquisa/lancamento-pesquisa.component"

@NgModule({
	declarations: [LancamentoCadastroComponent, LancamentoPesquisaComponent],
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
		MessageModule,
		HttpClientModule,
		ToastModule,
		SharedModule,
		RouterModule,
	],
	exports: [],
	providers: [MessageService],
})
export class LancamentosModule {}
