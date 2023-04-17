import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { PessoaDTO } from '../../@types/PessoaDTO';
import { PessoaService } from '../pessoa.service';

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
	pessoa = new Pessoa() as PessoaDTO

	constructor(
		private pessoaService: PessoaService,
		private errorHandler: ErrorHandlerService,
		private messageService: MessageService
	) { }

	async salvar(form: NgForm): Promise<void> {
		const pessoa = this.pessoa
		Object.assign(pessoa, this.pessoa);

		try {
			const newPessoa = await this.pessoaService.salvar(this.pessoa)
			this.messageService.add({ severity: 'success', detail: `Pessoa #${newPessoa.id} criado!` })
		} catch (error) {
			this.errorHandler.handle(error)
		}

		form.reset()
	}
}
