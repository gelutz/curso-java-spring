import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { environment } from "src/environments/environment"
import { LancamentoDTO } from "../@types/LancamentoDTO"
import { LancamentoFiltro } from "../@types/LancamentoFiltro"
import { Pageable } from "../@types/Pageable"
import { TipoLancamentoDTO } from "../@types/TipoLancamentoDTO"

@Injectable({
	providedIn: "root",
})
export class LancamentoService {
	baseUrl = `${environment.baseUrl}/lancamentos`
	constructor(private http: HttpClient) {}

	async buscarTipos(): Promise<TipoLancamentoDTO[]> {
		const url = `${this.baseUrl}/tipos`

		return new Promise((resolve, reject) => {
			const returned = this.http.get<TipoLancamentoDTO[]>(url)

			returned.subscribe({
				next: (tipos) => {
					resolve(tipos)
				},
				error: reject,
			})
		})
	}

	async buscarPorID(id: number): Promise<LancamentoDTO> {
		const url = `${this.baseUrl}/${id}`
		const headers = new HttpHeaders().append("Content-Type", "application/json")

		return new Promise((resolve, reject) => {
			const returned = this.http.get<LancamentoDTO>(url, { headers })

			returned.subscribe({
				next: resolve,
				error: reject,
			})
		})
	}

	pesquisar(filtro: LancamentoFiltro): Promise<Pageable<LancamentoDTO[]>> {
		const url = `${this.baseUrl}`
		let params = new HttpParams().set("page", `${filtro.pagina}`).set("size", `${filtro.itensPorPagina}`)

		if (filtro.descricao) params = params.set("descricao", filtro.descricao ?? "")

		if (filtro.vencimentoDe) params = params.set("vencimentoDe", filtro.vencimentoDe ?? "")

		if (filtro.vencimentoAte) params = params.set("vencimentoAte", filtro.vencimentoAte ?? "")

		return new Promise((resolve, reject) => {
			const returned = this.http.get<Pageable<LancamentoDTO[]>>(url, { params })

			returned.subscribe({
				next: resolve,
				error: reject,
			})
		})
	}

	salvar(lancamento: LancamentoDTO): Promise<LancamentoDTO> {
		const url = `${this.baseUrl}`

		return new Promise((resolve, reject) => {
			const returned = this.http.post<LancamentoDTO>(url, JSON.stringify(lancamento))

			returned.subscribe({
				next: resolve,
				error: reject,
			})
		})
	}

	atualizar(lancamento: LancamentoDTO): Promise<LancamentoDTO> {
		const url = `${this.baseUrl}/${lancamento.id}`
		const headers = new HttpHeaders().append("Content-Type", "application/json")

		return new Promise((resolve, reject) => {
			const returned = this.http.put<LancamentoDTO>(url, JSON.stringify(lancamento), { headers })

			returned.subscribe({
				next: resolve,
				error: reject,
			})
		})
	}

	excluir(id: number): Promise<void> {
		const url = `${this.baseUrl}/${id}`

		return new Promise((resolve, reject) => {
			const returned = this.http.delete<Pageable<LancamentoDTO>>(url)

			returned.subscribe({
				next: () => resolve(),
				error: reject,
			})
		})
	}
}
