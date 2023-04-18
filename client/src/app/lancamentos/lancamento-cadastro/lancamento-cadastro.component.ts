import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriaService } from 'src/app/categorias/categorias.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { capitalize } from 'src/app/core/utils/Capitalize';
import { formatISOToDate } from 'src/app/core/utils/DateFormatter';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { LancamentoDTO } from '../../@types/LancamentoDTO';
import { TipoLancamentoDTO } from '../../@types/TipoLancamentoDTO';
import { LancamentoService } from '../lancamento.service';


type SelectOptions = {
	label: string
	value: number | string | { id: number }
}

class Lancamento {
}

@Component({
	selector: 'app-lancamento-cadastro',
	templateUrl: './lancamento-cadastro.component.html',
	styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent {


	id: string | number = 0
	lancamento = new Lancamento() as LancamentoDTO;
	tipos?: string[]
	categorias?: SelectOptions[]
	pessoas?: SelectOptions[]

	tipoSelecionado?: string
	categoriaSelecionada?: { id: number }
	pessoaSelecionada?: { id: number }

	constructor(
		private lancamentoService: LancamentoService,
		private categoriaService: CategoriaService,
		private pessoaService: PessoaService,
		private errorHandler: ErrorHandlerService,
		private messageService: MessageService,
		private route: ActivatedRoute,
		private router: Router
	) {
		try {
			this.lancamentoService.buscarTipos().then(tipos => {
				this.tipos = tipos.map(tipo => {
					return capitalize(tipo.toLowerCase())
				})
			})

			this.categoriaService.buscarCategorias().then(categorias => {
				this.categorias = this.transformaSelectOptions(categorias, 'nome')
			})

			this.pessoaService.pesquisarAtivos({}).then(pessoas => {
				this.pessoas = this.transformaSelectOptions(pessoas.content, 'nome')
			})
		} catch (error) {
			this.errorHandler.handle(error)
		}

	}

	async ngOnInit(): Promise<void> { // TODO: throws ExpressionChangedAfterItHasBeenCheckedError, não pode ser async
		this.id = this.route.snapshot.params['id']

		if (this.id && this.id !== 'novo') {
			try {
				console.log(this.id)
				const lancamento = await this.lancamentoService.buscarPorID(this.id as number)

				console.log(lancamento)
				this.lancamento = lancamento
				this.lancamento.dataVencimento = formatISOToDate(lancamento.dataVencimento)
				this.lancamento.dataPagamento = formatISOToDate(lancamento.dataPagamento)
				this.categoriaSelecionada = { id: lancamento.categoriaId?.id ?? 0 }
				this.tipoSelecionado = capitalize(lancamento.tipo?.toLowerCase())
				this.pessoaSelecionada = { id: lancamento.pessoaId?.id ?? 0 }
			}
			catch (error) {
				this.errorHandler.handle(error)
			}
		}

	}

	transformaSelectOptions(o: any[], propertyName: string): SelectOptions[] { // TODO: fix this 'any'
		const mapped = o.map(p => {
			return { label: capitalize(p[propertyName]), value: { id: p.id } }
		})

		return mapped
	}

	async salvar(): Promise<void> {
		try {
			const formData = this.camposValidados()

			const newLancamento = await this.lancamentoService.salvar(formData)
			this.messageService.add({ severity: 'success', detail: `Lançamento #${newLancamento.id} criado!` })
		} catch (error) {
			this.errorHandler.handle(error)
		}

		this.router.navigate(['/lancamentos/novo'])
	}

	async atualizar(): Promise<void> {
		try {
			const formData = this.camposValidados()
			await this.lancamentoService.atualizar(formData)
			this.messageService.add({ severity: 'success', detail: `Lançamento #${formData.id} atualizado!` })
		} catch (error) {
			this.errorHandler.handle(error)
		}

		this.router.navigate(['/lancamentos/novo'])
	}

	camposValidados(): LancamentoDTO {
		const lancamento = this.lancamento
		// lancamento.categoriaId = { id:  }
		lancamento.categoriaId = this.categoriaSelecionada
		lancamento.pessoaId = this.pessoaSelecionada
		lancamento.tipo = this.tipoSelecionado?.toUpperCase() as TipoLancamentoDTO
		console.log(lancamento)
		return lancamento
	}
}
