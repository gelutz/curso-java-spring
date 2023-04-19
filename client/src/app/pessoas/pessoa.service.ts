import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Pageable } from '../@types/Pageable'
import { PessoaDTO } from '../@types/PessoaDTO'
import { PessoaFiltro } from '../@types/PessoaFiltro'

@Injectable({
	providedIn: 'root'
})
export class PessoaService {

	headers = (new HttpHeaders()).append('Authorization', `Basic ${environment.auth.basic}`)

	baseUrl = 'http://localhost:8080/pessoas'
	constructor(private http: HttpClient) { }

	async pesquisarAtivos(filtro: PessoaFiltro): Promise<Pageable<PessoaDTO[]>> {
		const pessoas = await this.pesquisar(filtro)

		pessoas.content = pessoas.content.filter((p) => p.ativo)

		return pessoas
	}

	async pesquisar(filtro: PessoaFiltro): Promise<Pageable<PessoaDTO[]>> {

		const url = `${this.baseUrl}`

		let params = new HttpParams()
			.set('page', `${filtro.pagina}`)
			.set('size', `${filtro.itensPorPagina}`)

		Object.entries(filtro).forEach(([prop, value]) => {
			params = params.set(prop, value ?? '')
		})

		return new Promise((resolve, reject) => {
			const returned = this.http.get<Pageable<PessoaDTO[]>>(url, { headers: this.headers, params })

			returned.subscribe({
				next: resolve,
				error: reject
			})
		})
	}

	async salvar(pessoa: PessoaDTO): Promise<PessoaDTO> {
		const url = `${this.baseUrl}`

		pessoa.ativo = true

		return new Promise((resolve, reject) => {
			const returned = this.http.post<PessoaDTO>(url, JSON.stringify(pessoa))

			returned.subscribe({
				next: resolve,
				error: reject
			})
		})
	}

	mudarAtivo(id: number, currentState: boolean): Promise<PessoaDTO> {
		const url = `${this.baseUrl}/${id}/ativo`

		console.log(!currentState, this.headers)
		return new Promise((resolve, reject) => {
			const returned = this.http.put<PessoaDTO>(url, !currentState)
			returned.subscribe({
				next: resolve,
				error: reject
			})
		})
	}

	excluir(id: number): Promise<void> {
		const url = `${this.baseUrl}/${id}`
		return new Promise((resolve, reject) => {
			const returned = this.http.delete<PessoaDTO>(url)

			returned.subscribe({
				next: () => resolve(),
				error: reject
			})
		})
	}
}
