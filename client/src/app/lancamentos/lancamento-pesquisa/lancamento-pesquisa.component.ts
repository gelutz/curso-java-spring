import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Pageable } from 'src/app/@types/Pageable';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { formatDateToISO } from 'src/app/core/utils/DateFormatter';
import { LancamentoDTO } from '../../@types/LancamentoDTO';
import { LancamentoService } from '../lancamento.service';


@Component({
	selector: 'app-lancamento-pesquisa',
	templateUrl: './lancamento-pesquisa.component.html',
	styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent {


	@ViewChild(Table) private tabela!: Table;

	ITENS_POR_PAGINA = 5

	descricao = ""
	vencimentoDe?: Date
	vencimentoAte?: Date
	response: Pageable<LancamentoDTO[]> = {} as Pageable<LancamentoDTO[]>

	constructor(
		private lancamentoService: LancamentoService,
		private messageService: MessageService,
		private confirmationService: ConfirmationService,
		private errorHandler: ErrorHandlerService,
		private router: Router
	) { }

	async pesquisar(pagina = 0): Promise<void> {
		try {
			this.response = await this.lancamentoService.pesquisar({
				itensPorPagina: this.ITENS_POR_PAGINA,
				pagina,
				descricao: this.descricao,
				vencimentoDe: formatDateToISO(this.vencimentoDe),
				vencimentoAte: formatDateToISO(this.vencimentoAte)
			})
		} catch (e) {
			this.errorHandler.handle(e);
		}
	}

	async excluir(id: number): Promise<void> {

		try {
			await this.lancamentoService.excluir(id)
		} catch (e) {
			this.errorHandler.handle(e);
			return
		}

		this.router.navigate(['/lancamentos'])

		this.messageService.add({ severity: 'success', detail: 'Lançamento excluído com sucesso!' })
	}

	confirmarExclusao(id: number): void {
		this.confirmationService.confirm({
			message: 'Deseja excluir o lançamento?',
			accept: async () => await this.excluir(id)
		})
	}

	aoMudarDePagina(event: LazyLoadEvent): void {
		const pagina = (event.first ?? 0) / (event.rows ?? 1)
		this.pesquisar(pagina)
	}
}
