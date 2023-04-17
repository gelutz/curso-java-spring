import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pageable } from '../@types/Pageable';
import { PessoaDTO } from './@types/PessoaDTO';
import { PessoaFiltro } from './@types/PessoaFiltro';

@Injectable({
	providedIn: 'root'
})
export class PessoaService {

	headers = (new HttpHeaders()).append('Authorization', `Basic ${environment.auth.basic}`)

	baseUrl = 'http://localhost:8080/pessoas'
	constructor(private http: HttpClient) { }

	pesquisar(filtro: PessoaFiltro): Promise<PessoaDTO[]> {

		const url = `${this.baseUrl}`

		let params = new HttpParams()
			.set('page', `${filtro.pagina}`)
			.set('size', `${filtro.itensPorPagina}`)

		if (filtro.nome)
			params = params.set('nome', filtro.nome ?? '')

		return new Promise((resolve, reject) => {
			const returned = this.http.get<Pageable<PessoaDTO>>(url, { headers: this.headers, params })

			returned.subscribe({
				next: (pessoas) => resolve(pessoas.content),
				error: reject
			})
		})
	}

	mudarAtivo(id: number, currentState: boolean): Promise<PessoaDTO> {
		const url = `${this.baseUrl}/${id}/ativo`
		this.headers.append('Content-Type', 'application/json')

		console.log(!currentState, this.headers)
		return new Promise((resolve, reject) => {
			const returned = this.http.put<PessoaDTO>(url, !currentState, { headers: this.headers })
			returned.subscribe({
				next: resolve,
				error: reject
			})
		})
	}

	excluir(id: number): Promise<void> {
		const url = `${this.baseUrl}/${id}`
		return new Promise((resolve, reject) => {
			const returned = this.http.delete<PessoaDTO>(url, { headers: this.headers })

			returned.subscribe({
				next: () => resolve(),
				error: reject
			})
		})
	}
}
