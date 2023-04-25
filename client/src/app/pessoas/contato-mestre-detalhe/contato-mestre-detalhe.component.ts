import { Component, Input, OnInit } from "@angular/core"
import { ContatoDTO } from "src/app/@types/dtos/ContatoDTO"

class Contato {
	id?: number
	nome = ""
	email = ""
	telefone = ""
}

@Component({
	selector: "app-contato-mestre-detalhe",
	templateUrl: "./contato-mestre-detalhe.component.html",
	styleUrls: ["./contato-mestre-detalhe.component.css"],
})
export class ContatoMestreDetalheComponent implements OnInit {
	@Input() contatos: ContatoDTO[] = []
	contato = new Contato()
	exbindoFormularioContato = false
	editandoContato = false

	constructor() {}

	ngOnInit(): void {}

	protected getIndexContatoByID = (id: number): number => {
		return this.contatos.indexOf(this.contatos.filter((contato) => contato.id === id)[0])
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
			this.contatos[index] = this.contato
		} else {
			this.contatos?.push(this.contato)
		}

		this.fecharModalContato()
		this.contato = new Contato()
	}

	excluirContato(id: number): void {
		const index = this.getIndexContatoByID(id)
		this.contatos.splice(index, 1)
	}
}
