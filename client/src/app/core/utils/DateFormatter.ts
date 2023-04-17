export const formatDateToISO = (date?: Date): string => {
	if (!date) {
		return ""
	}

	const offset = date.getTimezoneOffset()
	date = new Date(date.getTime() - (offset * 60 * 1000))
	return date.toISOString().split('T')[0]
}

export const formatISOToDate = (date?: Date): Date => {
	if (!date) {
		return new Date()
	}

	const newDate = new Date(date)
	// const dateString = newDate.toLocaleString().split(',')[0]

	return newDate
}
