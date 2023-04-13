import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

type Pessoa = {
  nome: string
  logradouro: string
  telefone: string
  bairro: string
  cep: string
  observacao?: string
  complemento?: string
}

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent {
  pessoa: Pessoa = {
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
