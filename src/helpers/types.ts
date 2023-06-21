export function formatDateToQuery(date: Date) {
  return date.toISOString().split('T')[0]
}

export function formatArrayToQuery<T>(array: Array<T>) {
  return array.map((filter) => (filter instanceof Date ? formatDateToQuery(filter) : filter)).join(',')
}
