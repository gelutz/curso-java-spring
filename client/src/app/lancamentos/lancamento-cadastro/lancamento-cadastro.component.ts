import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

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

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent {
  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ]
  lancamento = new Lancamento()

  categorias = [
    {label: 'Alimentação', value: 1},
    {label: 'Transporte', value: 2}
  ]

  pessoas = [
    {label: 'Juao', value: 1},
    {label: 'Jwam', value: 2}

  ]


  salvar(form: NgForm) {
    console.log(this.lancamento);
    form.reset()
  }
}
