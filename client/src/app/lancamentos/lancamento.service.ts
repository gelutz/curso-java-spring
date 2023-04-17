import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pageable } from '../@types/Pageable';
import { LancamentoDTO } from './@types/LancamentoDTO';
import { LancamentoFiltro } from './@types/LancamentoFiltro';
import { TipoLancamentoDTO } from './@types/TipoLancamentoDTO';

@Injectable({
	providedIn: 'root'
})
export class LancamentoService {


	baseUrl = `${environment.baseUrl}/lancamentos`
	constructor(private http: HttpClient) { }

	async buscarTipos(): Promise<TipoLancamentoDTO[]> {
		const url = `${this.baseUrl}/tipos`
		const headers = (new HttpHeaders()).append('Authorization', `Basic ${environment.auth.basic}`)

		return new Promise((resolve, reject) => {
			const returned = this.http.get<TipoLancamentoDTO[]>(url, { headers })

			returned.subscribe({
				next: (tipos) => {
					resolve(tipos)
				},
				error: reject
			})
		})
	}

	pesquisar(filtro: LancamentoFiltro): Promise<Pageable<LancamentoDTO>> {

		const url = `${this.baseUrl}`
		const headers = (new HttpHeaders()).append('Authorization', `Basic ${environment.auth.basic}`)

		let params = new HttpParams()
			.set('page', `${filtro.pagina}`)
			.set('size', `${filtro.itensPorPagina}`)

		if (filtro.descricao)
			params = params.set('descricao', filtro.descricao ?? '')

		if (filtro.vencimentoDe)
			params = params.set('vencimentoDe', filtro.vencimentoDe ?? '')

		if (filtro.vencimentoAte)
			params = params.set('vencimentoAte', filtro.vencimentoAte ?? '')

		return new Promise((resolve, reject) => {
			const returned = this.http.get<Pageable<LancamentoDTO>>(url, { headers, params })

			returned.subscribe({
				next: resolve,
				error: reject
			})
		})
	}

	excluir(id: number): Promise<void> {
		const url = `${this.baseUrl}/${id}`

		const headers = (new HttpHeaders()).append('Authorization', `Basic ${environment.auth.basic}`)
		return new Promise((resolve, reject) => {
			const returned = this.http.delete<Pageable<LancamentoDTO>>(url, { headers })

			returned.subscribe({
				next: () => resolve(),
				error: reject
			})
		})
	}
}
