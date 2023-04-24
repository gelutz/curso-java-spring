import { Component, OnInit } from "@angular/core"
import { LineChartData, PieChartData } from "../../@types/ChartConfig"
import { DashboardService } from "../dashboard.service"

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
	protected height = "30em"

	protected pieChartData = {} as PieChartData

	protected lineChartData = {} as LineChartData

	constructor(private dashService: DashboardService) {}

	ngOnInit(): void {
		this.dashService.lancamentosPorCategoria().then((data) => {
			console.log(data)
			this.pieChartData = data
		})

		this.dashService.lancamentosPorDia().then((data) => {
			this.lineChartData = data
		})
	}
}
