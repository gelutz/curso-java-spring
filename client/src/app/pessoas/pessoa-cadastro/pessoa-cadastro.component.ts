import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PessoaDTO } from '../@types/PessoaDTO';

@Component({
	selector: 'app-pessoa-cadastro',
	templateUrl: './pessoa-cadastro.component.html',
	styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent {
	pessoa: PessoaDTO = {
		nome: "",
		logradouro: "",
		telefone: "",
		bairro: "",
		cep: "",
		observacao: "",
		complemento: "",
	}

	salvar(form: NgForm) {
		console.log(this.pessoa);
		form.reset()
	}
}
