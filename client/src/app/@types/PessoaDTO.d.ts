import { EnderecoDTO } from "./EnderecoDTO"

export type PessoaDTO = {
	id?: number
	nome?: string
	ativo?: boolean
	endereco?: EnderecoDTO
}
