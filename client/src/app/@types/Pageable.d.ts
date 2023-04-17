export type Pageable<T = object> = {
	content: T
	pageable: object
	empty: boolean
	first: boolean
	last: boolean
	size: number
	number: number
	numberOfElements: number
	totalElements: number
	totalPages: number
}
