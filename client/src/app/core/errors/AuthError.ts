export class AuthError extends Error {
	constructor(private msg: string) {
		super(msg)
		super.stack = ""
	}
}
