export const formatDate = (dateString: string): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}

export function formatToISOStringWithTimezone(date: Date): string {
  const offset = -date.getTimezoneOffset() // em minutos
  const absOffset = Math.abs(offset)
  const hours = String(Math.floor(absOffset / 60)).padStart(2, '0')
  const minutes = String(absOffset % 60).padStart(2, '0')
  const sign = offset >= 0 ? '+' : '-'

  const localISO = new Date(date.getTime() - offset * 60000)
    .toISOString()
    .slice(0, 19) // remove 'Z'

  return `${localISO}${sign}${hours}:${minutes}`
}
