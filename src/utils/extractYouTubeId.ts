export function extractYouTubeId(url: string): string | null {
  try {
    const parsedUrl = new URL(url)

    // Para links como https://youtu.be/VIDEO_ID
    if (parsedUrl.hostname === 'youtu.be') {
      return parsedUrl.pathname.slice(1) // remove a barra inicial
    }

    // Para links normais como https://www.youtube.com/watch?v=VIDEO_ID
    if (parsedUrl.hostname.includes('youtube.com')) {
      return parsedUrl.searchParams.get('v')
    }

    return ''
  } catch (e) {
    return `${e}`
  }
}
