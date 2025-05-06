import { Youtube, Trash2, SquarePen } from 'lucide-react'

import {
  MusicSerializers,
  PraiseMusicMusics200MusicsItem
} from '@/client/schemas'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

export function MusicTableRow({
  song,
  onEdit,
  onDelete,
  onSee
}: {
  song: MusicSerializers | PraiseMusicMusics200MusicsItem
  onEdit: (id: number | undefined) => void
  onDelete: (id: number | undefined) => void
  onSee: (music: MusicSerializers | PraiseMusicMusics200MusicsItem) => void
}) {
  return (
    <TableRow>
      <TableCell className="cursor-pointer" onClick={() => onSee(song)}>
        {song.music_title}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => onSee(song)}>
        {song.author}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => onSee(song)}>
        {song.music_tone}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => onSee(song)}>
        {song.category?.map((cat) => (
          <Badge key={cat.id} variant="outline">
            {cat.category_name}
          </Badge>
        ))}
      </TableCell>
      <TableCell>
        {song.music_link && (
          <a href={song.music_link} target="_blank" rel="noopener noreferrer">
            <Youtube className="h-4 w-4 text-indigo-600" />
          </a>
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            className="cursor-pointer"
            onClick={() => onEdit(song.id)}
            variant="outline"
            size="sm"
          >
            <SquarePen />
          </Button>
          <Button
            className="cursor-pointer"
            onClick={() => onDelete(song.id)}
            variant="outline"
            size="sm"
          >
            <Trash2 className="text-red-500" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
