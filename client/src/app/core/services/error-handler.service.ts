import { HttpErrorResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { MessageService } from "primeng/api"
import { AuthError } from "../errors/AuthError"

@Injectable({
	providedIn: "root",
})
export class ErrorHandlerService {
	redirect = false
	message = ""
	constructor(private messageService: MessageService, private router: Router) {}

	handle(error: unknown): void {
		// erro interno
		if (error instanceof Error) {
			this.message = error.message
			console.error(error.stack)
		}

		if (error instanceof AuthError) {
			this.message = error.message
			this.redirect = true
		}

		// erro na API
		if (error instanceof HttpErrorResponse) {
			const status = error.status.toString()
			const messages = []

			// ordem de importância
			if (error.error) {
				if (error.error.error_description) messages.push(error.error.error_description)
				if (error.error.message) messages.push(error.error.message)
			}

			if (error.message) messages.push(error.message)

			console.log(error)
			this.message = messages[0] // mostra a mais importante

			const messageByError = {
				401: "Você não possui permissão para isso.",
				403: "Você não tem permissão para executar essa ação.",
				404: "Recurso não encontrado.",
				500: "Erro interno no servidor.",
			}

			Object.entries(messageByError).map(([code, message]) => {
				if (code !== status) return
				this.message = message
			})
		}

		this.messageService.add({ severity: "error", detail: this.message })

		if (this.redirect) {
			this.router.navigate(["/login"])
		}
	}
}
