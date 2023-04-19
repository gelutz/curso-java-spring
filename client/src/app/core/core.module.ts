import { NgModule } from "@angular/core"

import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { ConfirmationService, MessageService } from "primeng/api"
import { ConfirmDialogModule } from "primeng/confirmdialog"
import { ToastModule } from "primeng/toast"
import { CategoriaService } from "../categorias/categorias.service"
import { LancamentoService } from "../lancamentos/lancamento.service"
import { PessoaService } from "../pessoas/pessoa.service"
import { AuthService } from "../seguranca/auth.service"
import { NavbarComponent } from "./navbar/navbar.component"
import { OpenCloseButtonComponent } from "./openclosebutton/openclosebutton.component"
import { PaginaNaoEncontradaComponent } from "./pagina-nao-encontrada.component"
import { ErrorHandlerService } from "./services/error-handler.service"

const declarations = [NavbarComponent, OpenCloseButtonComponent, PaginaNaoEncontradaComponent]

@NgModule({
	declarations: declarations,
	imports: [CommonModule, ToastModule, ConfirmDialogModule, RouterModule],
	providers: [
		PessoaService,
		CategoriaService,
		LancamentoService,
		MessageService,
		ConfirmationService,
		ErrorHandlerService,
		AuthService,
	],
	exports: [...declarations, ToastModule, ConfirmDialogModule],
})
export class CoreModule {}
