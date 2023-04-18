import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
	providedIn: 'root'
})
export class ErrorHandlerService {

	message = ""
	constructor(private messageService: MessageService) { }

	handle(error: unknown): void {
		// erro interno
		if (error instanceof Error) {
			this.message = error.message
			console.log(`ERROR: ${error.name} => ${error.message}`)
			console.error(error.stack)
		}

		// erro na API
		if (error instanceof HttpErrorResponse) {
			const status = error.status
			const messages = []

			// ordem de importância
			if (error.error) {
				if (error.error.error_description) messages.push(error.error.error_description)
				if (error.error.message) messages.push(error.error.message)
			}

			if (error.message) messages.push(error.message)

			console.log(error)
			this.message = messages[0] // mostra a mais importante

			if (status.toString().startsWith('5'))
				this.message = 'Erro interno no servidor.'

			if (status === 401)
				this.message = 'Você não possui permissão para isso.'

			if (status === 404)
				this.message = 'Recurso não encontrado'

		}
		this.messageService.add({ severity: 'error', detail: this.message })
	}
}
