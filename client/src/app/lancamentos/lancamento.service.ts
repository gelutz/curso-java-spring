import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { environment } from "src/environments/environment"
import { LancamentoDTO } from "../@types/dtos/LancamentoDTO"
import { TipoLancamentoDTO } from "../@types/dtos/TipoLancamentoDTO"
import { LancamentoFiltro } from "../@types/filtros/LancamentoFiltro"
import { Pageable } from "../@types/filtros/Pageable"
import { AuthService } from "../seguranca/auth.service"

@Injectable({
	providedIn: "root",
})
export class LancamentoService {
	baseUrl = `${environment.baseUrl}/lancamentos`
	JSONheaders = new HttpHeaders().append("Content-Type", "application/json")


	uploadHeaders = new HttpHeaders().append(
		"Authorization",
		`Bearer ${localStorage.getItem(environment.jwtLocalStorageKey)}`
	)

	constructor(private http: HttpClient, private auth: AuthService) {}

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

		return new Promise((resolve, reject) => {
			const returned = this.http.get<LancamentoDTO>(url, { headers: this.JSONheaders })

			returned.subscribe({
				next: resolve,
				error: reject,
			})
		})
	}

	pesquisar(filtro: LancamentoFiltro): Promise<Pageable<LancamentoDTO[]>> {
		const url = `${this.baseUrl}`
		let params = new HttpParams().set("page", `${filtro.pagina}`).set("size", `${filtro.itensPorPagina}`)

		if (filtro.descricao) params = params.set("descricao", filtro.descricao || "")

		if (filtro.vencimentoDe) params = params.set("vencimentoDe", filtro.vencimentoDe || "")

		if (filtro.vencimentoAte) params = params.set("vencimentoAte", filtro.vencimentoAte || "")

		return new Promise((resolve, reject) => {
			const returned = this.http.get<Pageable<LancamentoDTO[]>>(url, {
				headers: this.JSONheaders,
				params,
			})

			returned.subscribe({
				next: resolve,
				error: reject,
			})
		})
	}

	salvar(lancamento: LancamentoDTO): Promise<LancamentoDTO> {
		const url = `${this.baseUrl}`

		return new Promise((resolve, reject) => {
			const returned = this.http.post<LancamentoDTO>(url, JSON.stringify(lancamento), {
				headers: this.JSONheaders,
			})

			returned.subscribe({
				next: resolve,
				error: reject,
			})
		})
	}

	atualizar(lancamento: LancamentoDTO): Promise<LancamentoDTO> {
		console.log(lancamento)

		const url = `${this.baseUrl}/${lancamento.id}`
		return new Promise((resolve, reject) => {
			const returned = this.http.put<LancamentoDTO>(url, JSON.stringify(lancamento), {
				headers: this.JSONheaders,
			})

			returned.subscribe({
				next: resolve,
				error: reject,
			})
		})
	}

	excluir(id: number): Promise<void> {
		const url = `${this.baseUrl}/${id}`

		return new Promise((resolve, reject) => {
			const returned = this.http.delete<Pageable<LancamentoDTO>>(url, { headers: this.JSONheaders })

			returned.subscribe({
				next: () => resolve(),
				error: reject,
			})
		})
	}
}
