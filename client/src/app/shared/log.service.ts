import { Inject, Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root'
})
export class LogService {
	constructor(@Inject('logmsg') private prefixo: string) {}

	log(msg: string) {
		console.log(`${this.prefixo}: ${msg}`)
	}
}