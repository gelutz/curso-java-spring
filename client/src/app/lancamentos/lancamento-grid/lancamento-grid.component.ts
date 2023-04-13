import { Component, Input, Output } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { LancamentoDTO } from '../@types/LancamentoDTO';

@Component({
	selector: 'app-lancamento-grid',
	templateUrl: './lancamento-grid.component.html',
	styleUrls: ['./lancamento-grid.component.css']
})
export class LancamentoGridComponent {

	@Output() itens = 5

	@Input() pagina = 0
	@Input() totalElements = 0
	@Input() lancamentos: LancamentoDTO[] = []


	aoMudarDePagina(event: LazyLoadEvent): void {
		const pagina = (event.first ?? 0) / (event.rows ?? 1)
		this.pesquisar(pagina)
	}
}
