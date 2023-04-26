import { EstadoDTO } from "./EstadoDTO"

export type CidadeDTO = {
	id: number
	nome: string
	estado: EstadoDTO
}
