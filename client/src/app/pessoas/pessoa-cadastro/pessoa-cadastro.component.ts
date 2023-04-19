import { Component } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service'
import { PessoaDTO } from '../../@types/PessoaDTO'
import { PessoaService } from '../pessoa.service'

class Pessoa {
	nome = ""
	endereco = {
		logradouro: "",
		bairro: "",
		cep: "",
		complemento: "",
	}
}

@Component({
	selector: 'app-pessoa-cadastro',
	templateUrl: './pessoa-cadastro.component.html',
	styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent {
	id: string | number = 0
	pessoa = new Pessoa() as PessoaDTO

	constructor(
		private pessoaService: PessoaService,
		private errorHandler: ErrorHandlerService,
		private messageService: MessageService,
		private route: ActivatedRoute,
		private router: Router,
		private title: Title
	) { }

	ngOnInit(): void {
		this.id = this.route.snapshot.params['id']
		this.atualizarTitulo()
	}

	atualizarTitulo(): void {
		const title = `${this.isEdicao() ? 'Edição' : 'Cadastro'}/Pessoa`
		this.title.setTitle(title)
	}

	// equivale a (this.id != undefined) && (this.id != 'novo')
	// mas a expressão acima não funciona no TS
	private isEdicao = (): boolean => !(!(this.id != undefined) || !(this.id != 'novo'))

	async salvar(): Promise<void> {
		const pessoa = this.pessoa
		Object.assign(pessoa, this.pessoa)

		try {
			const newPessoa = await this.pessoaService.salvar(this.pessoa)
			this.messageService.add({ severity: 'success', detail: `Pessoa #${newPessoa.id} criado!` })
		} catch (error) {
			this.errorHandler.handle(error)
		}

		this.router.navigate(['/pessoas'])

	}
}
