export function formatCifraToParagraph(text: string): string {
  const withBreaks = text.replace(/\r?\n/g, '<br />')
  return `<p>${withBreaks}</p>`
}
