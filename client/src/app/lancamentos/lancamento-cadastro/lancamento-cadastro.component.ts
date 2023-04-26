import { Component } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Title } from "@angular/platform-browser"
import { ActivatedRoute, Router } from "@angular/router"
import { MessageService } from "primeng/api"
import { environment } from "src/environments/environment"
import { CategoriaService } from "../../categorias/categorias.service"
import { ErrorHandlerService } from "../../core/services/error-handler.service"
import { capitalize } from "../../core/utils/Capitalize"
import { formatISOToDate } from "../../core/utils/DateFormatter"
import { PessoaService } from "../../pessoas/pessoa.service"
import { LancamentoService } from "../lancamento.service"



@Component({
	selector: "app-lancamento-cadastro",
	templateUrl: "./lancamento-cadastro.component.html",
	styleUrls: ["./lancamento-cadastro.component.css"],
})
export class LancamentoCadastroComponent {
	// lancamento = new Lancamento() as LancamentoDTO
	form = {} as FormGroup

	id: string | number = 0
	tipos?: SelectOptionsDTO[]
	categorias?: SelectOptionsDTO[]
	pessoas?: SelectOptionsDTO[]

	arquivo = ""
	pathArquivo = ""
	urlUpload = `${environment.baseUrl}/lancamentos/anexo`
	fazendoUpload = false

	constructor(
		private lancamentoService: LancamentoService,
		private categoriaService: CategoriaService,
		private pessoaService: PessoaService,
		private errorHandler: ErrorHandlerService,
		private messageService: MessageService,
		private route: ActivatedRoute,
		private router: Router,
		private title: Title,
		private formBuilder: FormBuilder
	) {
		try {
			this.lancamentoService.buscarTipos().then((tipos) => {
				this.tipos = tipos.map((tipo) => ({
					label: capitalize(tipo.toLowerCase()),
					value: tipo.toUpperCase(),
				}))
			})

			this.categoriaService.buscarCategorias().then((categorias) => {
				this.categorias = categorias.map((categoria) => ({
					label: categoria.nome || "",
					value: categoria.id || 1,
				}))
			})

			this.pessoaService.pesquisarAtivos().then((pessoas) => {
				this.pessoas = pessoas.content.map((pessoa) => ({
					label: pessoa.nome || "",
					value: pessoa.id || 1,
				}))
			})
		} catch (error) {
			this.errorHandler.handle(error)
		}
	}

	private atualizarTitulo(): void {
		const title = `${this.isEdicao() ? "Edição" : "Cadastro"}/Lançamento`
		this.title.setTitle(title)
	}

	// equivale a (this.id != undefined) && (this.id != 'novo')
	// mas a expressão acima não funciona no TS
	protected isEdicao = (): boolean => {
		return !(!(this.id != undefined) || !(this.id != "novo"))
	}

	async ngOnInit(): Promise<void> {
		// TODO: throws ExpressionChangedAfterItHasBeenCheckedError, não pode ser async
		this.configurarFormulario()

		this.id = this.route.snapshot.params["id"]
		if (this.isEdicao()) {
			await this.carregarLancamentos()
		}

		this.atualizarTitulo()
	}

	configurarFormulario() {
		this.form = this.formBuilder.group({
			id: [],
			tipo: ["RECEITA", Validators.required],
			descricao: [null, [Validators.required, Validators.minLength(5)]],
			dataVencimento: [null, Validators.required],
			dataPagamento: [null, Validators.required],
			valor: [null, Validators.required],
			observacao: [],
			categoria: this.formBuilder.group({
				id: [null, Validators.required],
				nome: [],
			}),
			pessoa: this.formBuilder.group({
				id: [null, Validators.required],
				nome: [],
			}),
			arquivo: []
		})
	}

	private async carregarLancamentos(): Promise<void> {
		try {
			const lancamento = await this.lancamentoService.buscarPorID(this.id as number)
			console.log(lancamento)
			this.form.patchValue(lancamento)
			this.form.patchValue({
				dataVencimento: formatISOToDate(lancamento.dataVencimento),
				dataPagamento: formatISOToDate(lancamento.dataPagamento),
			})
		} catch (error) {
			this.errorHandler.handle(error)
		}
	}

	protected async salvar(): Promise<void> {
		try {
			const newLancamento = await this.lancamentoService.salvar(this.form.value)
			this.messageService.add({
				severity: "success",
				detail: `Lançamento #${newLancamento.id} criado!`,
			})

		} catch (error) {
			this.errorHandler.handle(error)
		}

		this.router.navigate(["/lancamentos"])

	}

	protected async atualizar(): Promise<void> {
		try {
			await this.lancamentoService.atualizar(this.form.value)
			this.messageService.add({
				severity: "success",
				detail: `Lançamento #${this.form.get("id")?.value} atualizado!`,
			})
		} catch (error) {
			this.errorHandler.handle(error)
		}

		this.router.navigate(["/lancamentos"])
	}

	get uploadHeaders() {
		return this.lancamentoService.uploadHeaders
	}

	antesDoUpload(){
		this.fazendoUpload = true
	}

	aoTerminarUpload(event: any) {
		setTimeout(() => {
			this.fazendoUpload = false
			const arquivo = event.originalEvent.body;

			this.form.patchValue({
				arquivo: arquivo.nome,
			});
		}, 3000);
	}

	uploadErrorHandler(event: any) {
		this.errorHandler.handle(event)
	}

	removerArquivo() {
		this.arquivo = ""
		this.form.patchValue({
			arquivo: ""
		})
	}

}
