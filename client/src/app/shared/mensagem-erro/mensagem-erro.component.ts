import { Component, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
	selector: 'app-mensagem-erro',
	templateUrl: './mensagem-erro.component.html',
	styleUrls: ['./mensagem-erro.component.css']
})
export class MensagemErroComponent {
	@Input() control: NgModel | undefined
	@Input() erro = ""
	@Input() dirty = false
	@Input() touched = false
	@Input() mensagem = ""

	temErro(): boolean | undefined {
		let err = this.control?.hasError(this.erro)
		if (this.dirty) err = err && (this.control?.dirty ?? false)
		if (this.touched) err = err && (this.control?.touched ?? false)

		return err
	}
}
