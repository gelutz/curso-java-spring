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
		if (typeof error === 'string') {
			this.message = error
		}

		if (error instanceof Error) {
			this.message = error.message
			console.log(`ERROR: ${error.name} => ${error.message}`)
		}

		if (error instanceof HttpErrorResponse) {
			if (error.status.toString().startsWith('5')) {
				console.log(error)
				this.message = `Erro interno no servidor.`
			}

			if (`${error.status}`.startsWith('4')) {
				this.message = error.error.message
			}

			if (error.error.status === 401)
				this.message = `Você não possui permissão para isso.`

			if (error.error.status === 404)
				this.message = `Recurso não encontrado`

			console.log(`ERROR ${error.status}: ${error.name} => ${error.message}`)
		}

		this.messageService.add({ severity: 'error', detail: this.message })
	}
}
