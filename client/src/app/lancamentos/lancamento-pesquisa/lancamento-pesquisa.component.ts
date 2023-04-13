import { Component } from '@angular/core';
import { formatDateToISO } from 'src/app/core/utils/DateFormatter';
import { LancamentoDTO } from '../@types/LancamentoDTO';
import { LancamentoService } from '../lancamento.service';

@Component({
	selector: 'app-lancamento-pesquisa',
	templateUrl: './lancamento-pesquisa.component.html',
	styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent {

	PAGINA_INICIAL = 0
	ITENS_POR_PAGINA = 5

	descricao = ""
	vencimentoDe: Date | undefined
	vencimentoAte: Date | undefined
	lancamentos: LancamentoDTO[] = [];
	constructor(private lancamentoService: LancamentoService) { }

	async pesquisar(): Promise<void> {
		this.lancamentos = await this.lancamentoService.pesquisar({
			descricao: this.descricao,
			vencimentoDe: formatDateToISO(this.vencimentoDe),
			vencimentoAte: formatDateToISO(this.vencimentoAte),
			itensPorPagina: this.ITENS_POR_PAGINA,
			pagina: this.PAGINA_INICIAL
		})
	}
}
