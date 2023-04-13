import { Component, Input } from '@angular/core';
import { LancamentoDTO } from '../@types/LancamentoDTO';

@Component({
	selector: 'app-lancamento-grid',
	templateUrl: './lancamento-grid.component.html',
	styleUrls: ['./lancamento-grid.component.css']
})
export class LancamentoGridComponent {
	@Input() lancamentos: LancamentoDTO[] = []
	@Input() pagina = 0
	@Input() itensPorPagina = 5
	@Input() totalItens = 0
}
