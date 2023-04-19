export type JwtPayload = {
	client_id: string
	user_name: string
	nome: string
	exp: number
	jti: string
	scope: string[]
	authorities: string[]
}
