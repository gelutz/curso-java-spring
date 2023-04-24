import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { map } from "rxjs"
import { environment } from "src/environments/environment"
import { LineChartData, PieChartData } from "../@types/ChartConfig"

type EstatisticasCategoriaResponse = {
	categoria: {
		id: number
		nome: string
	}
	total: number
}

type EstatisticasDiaResponse = {
	tipoLancamento: string
	dia: Date
	total: number
}

@Injectable({
	providedIn: "root",
})
export class DashboardService {
	private baseUrl = `${environment.baseUrl}/lancamentos/estatisticas`

	constructor(private http: HttpClient) {}

	lancamentosPorCategoria(): Promise<PieChartData> {
		return new Promise((resolve, reject) => {
			const response = this.http.get<EstatisticasCategoriaResponse[]>(`${this.baseUrl}/categoria`, {})

			const data: PieChartData = {
				labels: [],
				datasets: [
					{
						backgroundColor: ["#c43957", "#1f79b4", "#c2b222"],
						data: [],
					},
				],
			}

			const temporaryData: number[] = []

			return response
				.pipe(
					map((dados) => {
						dados.map((estatistica) => {
							data.labels!.push(estatistica.categoria.nome)
							temporaryData.push(estatistica.total)
						})
					})
				)
				.subscribe({
					error: reject,
					complete: () => {
						data.datasets[0].data = temporaryData
						console.log(data)
						resolve(data)
					},
				})
		})
	}

	lancamentosPorDia(): Promise<LineChartData> {
		return new Promise((resolve, reject) => {
			const response = this.http.get<EstatisticasDiaResponse[]>(`${this.baseUrl}/dia`, {})

			const data: LineChartData = {
				labels: [],
				datasets: [
					{
						borderColor: "#c43957",
						fill: false,
						tension: 0.1,
						label: "Receita",
						data: [],
					},
					{
						borderColor: "#1f79b4",
						fill: false,
						tension: 0.1,
						label: "Despesa",
						data: [],
					},
				],
			}

			const receitaTotal: number[] = []
			const despesaTotal: number[] = []

			return response
				.pipe(
					map((dados) => {
						dados.forEach((estatistica) => {
							let dia = new Date(estatistica.dia).getUTCDate()
							if (!data.labels?.includes(dia)) {
								data.labels?.push(dia)
							}

							if (estatistica.tipoLancamento == "RECEITA") {
								receitaTotal.push(estatistica.total)
							}

							if (estatistica.tipoLancamento == "DESPESA") {
								despesaTotal.push(estatistica.total)
							}
						})
					})
				)
				.subscribe({
					complete: () => {
						data.datasets[0].data = receitaTotal

						data.datasets[1].data = despesaTotal

						resolve(data)
					},
					error: reject,
				})
		})
	}
}
