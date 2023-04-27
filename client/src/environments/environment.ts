// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	baseUrl: 'http://localhost:8080',
	tokenAllowedDomains: [/localhost:8080/],
	tokenDisasllowedRoutes: [/\/oauth2\/token/],
	oauthCallbackUrl: "http://localhost:4200/authorized",
	auth: {
		basic: 'YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==',
		jwtBasic: 'YW5ndWxhcjpAbmd1bEByMA==',
		jwtSecret: 's3cr3t'
	},
	localStorage: {
		jwtKey: 'algamoney:jwt',
		stateKey: 'algamoney:state',
		codeKey: 'algamoney:code',
		refreshKey: 'algamoney:refresh'
	}
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
