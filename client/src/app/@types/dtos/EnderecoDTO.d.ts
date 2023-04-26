import { CidadeDTO } from "./CidadeDTO"

export type EnderecoDTO = {
	logradouro: string
	bairro: string
	cep: string
	complemento?: string
	cidade: CidadeDTO
}
