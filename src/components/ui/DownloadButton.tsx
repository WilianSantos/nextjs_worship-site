import { FileDown } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function DownloadButton({ playlistId }: { playlistId: number }) {
  const handleDownload = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/praise/slides-generator/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ playlist_id: playlistId })
        }
      )

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Erro: ${response.status} - ${errorText}`)
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'culto_slides.pptx'
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
    } catch (error) {
      alert(`Erro ao gerar o arquivo de slides. ${error}`)
    }
  }

  return (
    <Button size="sm" variant="outline" onClick={handleDownload}>
      <FileDown /> (slide)
    </Button>
  )
}
