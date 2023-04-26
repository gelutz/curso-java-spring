import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { environment } from "src/environments/environment"
import { CidadeDTO } from "../@types/dtos/CidadeDTO"
import { EstadoDTO } from "../@types/dtos/EstadoDTO"
import { PessoaDTO } from "../@types/dtos/PessoaDTO"
import { Pageable } from "../@types/filtros/Pageable"
import { PessoaFiltro } from "../@types/filtros/PessoaFiltro"

@Injectable({
	providedIn: "root",
})
export class PessoaService {
	headers = new HttpHeaders().append("Content-Type", "application/json")

	baseUrl = `${environment.baseUrl}/pessoas`
	cidadesUrl = `${environment.baseUrl}/cidades`
	estadosUrl = `${environment.baseUrl}/estados`

	constructor(private http: HttpClient) { }

	find = <T>(url = this.baseUrl, options: { params?: any, headers?: any } = {}): Promise<T> => new Promise((resolve, reject) => {
		const returned = this.http.get<T>(url, { ...options })

		returned.subscribe({
			next: resolve,
			error: reject,
		})
	})

	async listarEstados() {
		return await this.find<EstadoDTO[]>(this.estadosUrl)
	}

	async pesquisarCidades(estadoID: number) {
		const headers = new HttpHeaders().append("Content-Type", "application/json")
		const params = new HttpParams().set("estado", `${estadoID}`)

		return await this.find<CidadeDTO[]>(this.cidadesUrl, { headers, params })
	}

	async pesquisarAtivos(filtro: PessoaFiltro = {}): Promise<Pageable<PessoaDTO[]>> {
		const pessoas = await this.pesquisar(filtro)

		pessoas.content = pessoas.content.filter((p) => p.ativo)

		return pessoas
	}

	async buscarPorID(id: number): Promise<PessoaDTO> {
		const url = `${this.baseUrl}/${id}`
		return new Promise((resolve, reject) => {
			const returned = this.http.get<PessoaDTO>(url)

			returned.subscribe({
				next: resolve,
				error: reject,
			})
		})
	}

	async pesquisar(filtro: PessoaFiltro): Promise<Pageable<PessoaDTO[]>> {
		let params = new HttpParams().set("page", `${filtro.pagina}`).set("size", `${filtro.itensPorPagina}`)

		Object.entries(filtro).forEach(([prop, value]) => {
			params = params.set(prop, value || "")
		})

		return new Promise((resolve, reject) => {
			const returned = this.http.get<Pageable<PessoaDTO[]>>(this.baseUrl, {
				headers: this.headers,
				params,
			})

			returned.subscribe({
				next: resolve,
				error: reject,
			})
		})
	}

	async salvar(pessoa: PessoaDTO): Promise<PessoaDTO> {
		const url = `${this.baseUrl}`

		pessoa.ativo = true

		return new Promise((resolve, reject) => {
			const returned = this.http.post<PessoaDTO>(url, JSON.stringify(pessoa), { headers: this.headers })

			returned.subscribe({
				next: resolve,
				error: reject,
			})
		})
	}

	async atualizar(pessoa: PessoaDTO): Promise<PessoaDTO> {
		const url = `${this.baseUrl}/${pessoa.id}`

		return new Promise((resolve, reject) => {
			const returned = this.http.put<PessoaDTO>(url, JSON.stringify(pessoa), { headers: this.headers })

			returned.subscribe({
				next: resolve,
				error: reject,
			})
		})
	}

	async mudarAtivo(id: number, currentState: boolean): Promise<PessoaDTO> {
		const url = `${this.baseUrl}/${id}/ativo`

		return new Promise((resolve, reject) => {
			const returned = this.http.put<PessoaDTO>(url, !currentState)
			returned.subscribe({
				next: resolve,
				error: reject,
			})
		})
	}

	async excluir(id: number): Promise<void> {
		const url = `${this.baseUrl}/${id}`
		return new Promise((resolve, reject) => {
			const returned = this.http.delete<PessoaDTO>(url)

			returned.subscribe({
				next: () => resolve(),
				error: reject,
			})
		})
	}
}
