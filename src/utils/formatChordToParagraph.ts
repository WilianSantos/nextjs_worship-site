export function formatChordToParagraph(text: string | undefined): string {
  const withBreaks = text.replace(/\r?\n/g, '<br />')
  return `<p>${withBreaks}</p>`
}
