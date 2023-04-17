import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriaService } from 'src/app/categorias/categorias.service';
import { capitalize } from 'src/app/core/utils/Capitalize';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { TipoLancamentoDTO } from '../@types/TipoLancamentoDTO';
import { LancamentoService } from '../lancamento.service';

class Lancamento {
	tipo = ""
	vencimento = ""
	recebimento = ""
	descricao = ""
	valor = ""
	categoria = ""
	pessoa = ""
	observacao = ""
}

type SelectOptions = {
	label: string
	value: number | string
}

@Component({
	selector: 'app-lancamento-cadastro',
	templateUrl: './lancamento-cadastro.component.html',
	styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent {



	lancamento = new Lancamento()
	tipos?: TipoLancamentoDTO[]
	categorias?: SelectOptions[]
	pessoas?: SelectOptions[]

	constructor(
		private lancamentoService: LancamentoService,
		private categoriaService: CategoriaService,
		private pessoaService: PessoaService
	) { }

	async ngOnInit(): Promise<void> {
		this.tipos = await this.lancamentoService.buscarTipos()
		const categorias = await this.categoriaService.buscarCategorias()
		this.categorias = this.transformaSelectOptions(categorias, 'nome')

		const pessoas = await this.pessoaService.pesquisar({})
		this.pessoas = this.transformaSelectOptions(pessoas, 'nome')

	}

	transformaSelectOptions(o: any[], propertyName: string): SelectOptions[] { // TODO: fix this 'any'
		const mapped = o.map(p => {
			return { label: capitalize(p[propertyName]), value: `${p.id}`.toUpperCase() }
		})

		return mapped
	}

	salvar(form: NgForm): void {
		console.log(this.lancamento);
		form.reset()
	}
}
