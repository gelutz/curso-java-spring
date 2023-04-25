import { Component, EventEmitter, Input, Output } from "@angular/core"
import { LazyLoadEvent } from "primeng/api"

@Component({
	selector: "app-lancamento-grid",
	templateUrl: "./table-grid.component.html",
	styleUrls: ["./table-grid.component.css"],
})
export class LancamentoGridComponent {
	itens = 5
	@Input() totalElements = 0
	@Input() elements: object[] = []
	@Input() columns: string[] = []

	@Output() mudouPagina = new EventEmitter<number>()
	@Output() pagina = 0

	aoMudarDePagina(event: LazyLoadEvent): void {
		const pagina = (event.first || 0) / (event.rows || 1)
		this.mudouPagina.emit(pagina)
	}
}
