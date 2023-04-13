import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseDTO } from '../@types/ResponseDTO';
import { LancamentoDTO } from './@types/LancamentoDTO';
import { LancamentoFiltro } from './@types/LancamentoFiltro';

@Injectable({
	providedIn: 'root'
})
export class LancamentoService {

	baseUrl = 'http://localhost:8080'
	constructor(private http: HttpClient) { }

	pesquisar(filtro: LancamentoFiltro): Promise<LancamentoDTO[]> {

		const url = `${this.baseUrl}/lancamentos`
		const headers = (new HttpHeaders()).append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')

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
			const returned = this.http.get<ResponseDTO>(url, { headers, params })

			returned.subscribe({
				next: value => {
					resolve(value.content as LancamentoDTO[])
				},
				error: err => {
					reject(err)
				}
			})
		})
	}
}
