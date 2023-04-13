export const formatDateToISO = (date?: Date): string => {
	if (!date) {
		return ""
	}

	const offset = date.getTimezoneOffset()
	date = new Date(date.getTime() - (offset * 60 * 1000))
	return date.toISOString().split('T')[0]
}
