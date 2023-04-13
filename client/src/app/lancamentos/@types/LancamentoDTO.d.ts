export type LancamentoDTO = {
	tipo: string;
	descricao: string;
	dataVencimento: Date;
	dataPagamento?: Date;
	valor: number;
	pessoa: string;
}
