import { useGetPlaylistLink } from '@/services/hooks/playlist/useGetPlaylistLink'
import { extractYouTubeId } from '@/utils/extractYouTubeId'
import { Share2 } from 'lucide-react'
import React from 'react'

export function ShareWhatsAppButton({ id }: { id: number | undefined }) {
  const { data: dataPlaylistLink } = useGetPlaylistLink(id || 0)
  const links = dataPlaylistLink?.data
  const videoIds = links?.links?.map((item) => extractYouTubeId(item))

  if (videoIds) {
    const playlistUrl = `https://www.youtube.com/watch_videos?video_ids=${videoIds.join(',')}`
    const message = `Confira essa playlist do YouTube:\n${playlistUrl}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`

    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between"
      >
        <Share2 className="h-4 w-4 mr-1" /> Compartilhar
      </a>
    )
  }
}
