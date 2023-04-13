import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ResponseDTO } from 'src/app/@types/ResponseDTO';
import { formatDateToISO } from 'src/app/core/utils/DateFormatter';
import { LancamentoDTO } from '../@types/LancamentoDTO';
import { LancamentoService } from '../lancamento.service';

@Component({
	selector: 'app-lancamento-pesquisa',
	templateUrl: './lancamento-pesquisa.component.html',
	styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent {

	ITENS_POR_PAGINA = 5

	descricao = ""
	vencimentoDe?: Date
	vencimentoAte?: Date
	response: ResponseDTO<LancamentoDTO> = {} as ResponseDTO<LancamentoDTO>

	constructor(private lancamentoService: LancamentoService) { }

	async pesquisar(pagina = 0): Promise<void> {
		this.response = await this.lancamentoService.pesquisar({
			itensPorPagina: this.ITENS_POR_PAGINA,
			pagina,
			descricao: this.descricao,
			vencimentoDe: formatDateToISO(this.vencimentoDe),
			vencimentoAte: formatDateToISO(this.vencimentoAte)
		})
	}

	aoMudarDePagina(event: LazyLoadEvent): void {
		const pagina = (event.first ?? 0) / (event.rows ?? 1)
		this.pesquisar(pagina)
	}
}
