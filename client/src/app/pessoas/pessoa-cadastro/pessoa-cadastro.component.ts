import { Component, ViewChild } from "@angular/core"
import { Title } from "@angular/platform-browser"
import { ActivatedRoute, Router } from "@angular/router"
import { ConfirmationService, MessageService } from "primeng/api"
import { Table } from "primeng/table"
import { ContatoDTO } from "src/app/@types/dtos/ContatoDTO"
import { EnderecoDTO } from "../../@types/dtos/EnderecoDTO"
import { ErrorHandlerService } from "../../core/services/error-handler.service"
import { PessoaService } from "../pessoa.service"

class Pessoa {
	id?: number
	nome = ""
	ativo = true
	endereco: EnderecoDTO = {
		estado: "",
		cidade: "",
		bairro: "",
		cep: "",
		logradouro: "",
		complemento: "",
	}
	contatos: ContatoDTO[] = []
}

class Contato {
	id?: number
	nome = ""
	email = ""
	telefone = ""
}

@Component({
	selector: "app-pessoa-cadastro",
	templateUrl: "./pessoa-cadastro.component.html",
	styleUrls: ["./pessoa-cadastro.component.css"],
})
export class PessoaCadastroComponent {
	@ViewChild(Table) private tabela!: Table

	id: string | number = 0
	pessoa = new Pessoa()
	contato = new Contato()
	exbindoFormularioContato = false
	editandoContato = false

	constructor(
		private pessoaService: PessoaService,
		private errorHandler: ErrorHandlerService,
		private messageService: MessageService,
		private route: ActivatedRoute,
		private router: Router,
		private title: Title,
		private confirmationService: ConfirmationService
	) {}
	protected isEdicao = (): boolean => !(!(this.id != undefined) || !(this.id != "novo"))

	async ngOnInit(): Promise<void> {
		this.id = this.route.snapshot.params["id"]

		if (this.isEdicao()) {
			await this.carregarPessoas()
		}

		this.atualizarTitulo()
	}

	protected getIndexContatoByID = (id: number): number => {
		return this.pessoa.contatos.indexOf(this.pessoa.contatos.filter((contato) => contato.id === id)[0])
	}

	atualizarTitulo(): void {
		const title = `${this.isEdicao() ? "Edição" : "Cadastro"}/Pessoa`
		this.title.setTitle(title)
	}

	async carregarPessoas(): Promise<void> {
		try {
			const pessoa = await this.pessoaService.buscarPorID(this.id as number)
			if (pessoa == null) {
				this.router.navigate(["/pessoas"])
				return
			}

			Object.assign(this.pessoa, pessoa)
		} catch (error) {
			this.errorHandler.handle(error)
		}
	}

	async salvar(): Promise<void> {
		const pessoa = this.pessoa
		Object.assign(pessoa, this.pessoa)

		try {
			const newPessoa = await this.pessoaService.salvar(this.pessoa)
			this.messageService.add({ severity: "success", detail: `Pessoa #${newPessoa.id} criado!` })
		} catch (error) {
			this.errorHandler.handle(error)
		}

		this.router.navigate(["/pessoas"])
	}

	async atualizar(): Promise<void> {
		try {
			await this.pessoaService.atualizar(this.pessoa)
			this.messageService.add({
				severity: "success",
				detail: `Pessoa #${this.id} atualizada!`,
			})
		} catch (error) {
			this.errorHandler.handle(error)
		}

		this.router.navigate(["/pessoas/novo"])
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

	confirmarExclusao(id: number): void {
		this.confirmationService.confirm({
			message: "Deseja excluir a Pessoa?",
			accept: async () => await this.excluir(id),
		})
	}

	abrirModalContato = () => (this.exbindoFormularioContato = true)
	fecharModalContato = () => {
		this.exbindoFormularioContato = false
		this.editandoContato = false
	}

	editarContato(contato: Contato) {
		this.editandoContato = true
		this.abrirModalContato()
		this.contato = { ...contato }
	}

	salvarContato(id?: number): void {
		if (id) {
			const index = this.getIndexContatoByID(id)
			this.pessoa.contatos[index] = this.contato
		} else {
			this.pessoa.contatos?.push(this.contato)
		}

		this.fecharModalContato()
		this.contato = new Contato()
	}

	excluirContato(id: number): void {
		const index = this.getIndexContatoByID(id)
		this.pessoa.contatos.splice(index, 1)
	}
}
