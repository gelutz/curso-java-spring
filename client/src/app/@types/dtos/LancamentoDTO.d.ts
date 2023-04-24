import { CategoriaDTO } from "src/app/@types/dtos/CategoriaDTO"
import { PessoaDTO } from "./PessoaDTO"
import { TipoLancamentoDTO } from "./TipoLancamentoDTO"

export type LancamentoDTO = {
	id: number
	tipo?: TipoLancamentoDTO
	categoria?: CategoriaDTO
	pessoa?: PessoaDTO
	descricao: string
	dataVencimento: Date
	dataPagamento?: Date
	valor: number
	observacao: string
}
