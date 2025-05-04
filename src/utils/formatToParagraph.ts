export function formatToParagraph(text: string | undefined): string {
  if (text) {
    const withBreaks = text.replace(/\r?\n/g, '<br />')
    return `<p>${withBreaks}</p>`
  }
  return ''
}
