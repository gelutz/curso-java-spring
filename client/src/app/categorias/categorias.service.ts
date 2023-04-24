import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { environment } from "src/environments/environment"
import { CategoriaDTO } from "../@types/dtos/CategoriaDTO"

@Injectable({
	providedIn: "root",
})
export class CategoriaService {
	private baseUrl = `${environment.baseUrl}/categorias`

	constructor(private http: HttpClient) {}

	async buscarCategorias(): Promise<CategoriaDTO[]> {
		const url = this.baseUrl
		const headers = new HttpHeaders().append("Authorization", `Basic ${environment.auth.basic}`)

		return new Promise((resolve, reject) => {
			const returned = this.http.get<CategoriaDTO[]>(url, { headers })

			returned.subscribe({
				next: resolve,
				error: reject,
			})
		})
	}
}
