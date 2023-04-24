import { Component, ViewChild } from "@angular/core"
import { Title } from "@angular/platform-browser"
import { ConfirmationService, LazyLoadEvent, MessageService } from "primeng/api"
import { Table } from "primeng/table"
import { PessoaDTO } from "../../@types/dtos/PessoaDTO"
import { Pageable } from "../../@types/filtros/Pageable"
import { ErrorHandlerService } from "../../core/services/error-handler.service"
import { AuthService } from "../../seguranca/auth.service"
import { PessoaService } from "../pessoa.service"

@Component({
	selector: "app-pessoa-pesquisa",
	templateUrl: "./pessoa-pesquisa.component.html",
	styleUrls: ["./pessoa-pesquisa.component.css"],
})
export class PessoaPesquisaComponent {
	@ViewChild(Table) private tabela!: Table

	ITENS_POR_PAGINA = 5

	nome = ""
	response: Pageable<PessoaDTO[]> = {} as Pageable<PessoaDTO[]>
	pessoa!: PessoaDTO[]

	constructor(
		private pessoaService: PessoaService,
		private messageService: MessageService,
		private confirmationService: ConfirmationService,
		private errorHandler: ErrorHandlerService,
		private title: Title,
		protected authService: AuthService
	) {}

	ngOnInit(): void {
		this.title.setTitle("Pesquisa/Pessoa")
	}

	async pesquisar(pagina = 0): Promise<void> {
		this.response = await this.pessoaService.pesquisar({
			itensPorPagina: this.ITENS_POR_PAGINA,
			pagina,
			nome: this.nome,
		})
	}

	aoMudarDePagina(event: LazyLoadEvent): void {
		const pagina = (event.first ?? 0) / (event.rows ?? 1)
		this.pesquisar(pagina)
	}

	async mudarAtivo(id: number, currentState: boolean): Promise<void> {
		try {
			await this.pessoaService.mudarAtivo(id, currentState)
		} catch (e) {
			this.errorHandler.handle(e)
			return
		}

		this.tabela.reset()

		this.messageService.add({
			severity: "success",
			detail: `Pessoa ${currentState ? "desativada" : "ativada"} com sucesso!`,
		})
	}

	async excluir(id: number): Promise<void> {
		try {
			await this.pessoaService.excluir(id)
		} catch (e) {
			this.errorHandler.handle(e)
			return
		}

		this.tabela.reset()

		this.messageService.add({ severity: "success", detail: "Pessoa excluída com sucesso!" })
	}

	confirmarExclusao(id: number): void {
		this.confirmationService.confirm({
			message: "Deseja excluir a Pessoa?",
			accept: async () => await this.excluir(id),
		})
	}
}
