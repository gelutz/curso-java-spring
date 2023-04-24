import { PessoaDTO } from "./PessoaDTO"

export type ContatoDTO = Omit<PessoaDTO, "contato">
