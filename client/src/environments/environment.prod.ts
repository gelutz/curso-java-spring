export const environment = {
	production: true,
	baseUrl: 'http://localhost:8080',
	auth: {
		basic: 'YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==',
		jwtBasic: 'YW5ndWxhcjpAbmd1bEByMA==',
		jwtSecret: 's3cr3t'
	},
	jwtLocalStorageKey: 'algamoney:jwt'
};
