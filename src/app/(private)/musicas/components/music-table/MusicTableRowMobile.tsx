import {
  MusicSerializers,
  PraiseMusicMusics200MusicsItem
} from '@/client/schemas'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { Trash2, SquarePen, Ellipsis, Youtube } from 'lucide-react'
import { useState } from 'react'

export function MusicTableRowMobile({
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
  const [mobileTableMenuIsActive, setMobileTableMenuIsActive] = useState(false)

  return (
    <TableRow>
      <TableCell className="cursor-pointer" onClick={() => onSee(song)}>
        {song.music_title}
      </TableCell>
      <TableCell className="relative overflow-visible">
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer"
          onClick={() => setMobileTableMenuIsActive(!mobileTableMenuIsActive)}
        >
          <Ellipsis />
        </Button>

        {mobileTableMenuIsActive && (
          <div className="flex flex-col absolute top-10 right-0 z-10 bg-white p-2 rounded shadow-md">
            <Button
              className="mb-1 cursor-pointer"
              onClick={() => onEdit(song.id)}
              variant="outline"
              size="sm"
            >
              <SquarePen className="mr-1" /> Editar
            </Button>
            <Button
              onClick={() => onDelete(song.id)}
              variant="outline"
              size="sm"
              className="mb-1 cursor-pointer"
            >
              <Trash2 className="text-red-500 mr-1" /> Excluir
            </Button>
            <Button variant="outline" size="sm">
              {song.music_link && (
                <a
                  href={song.music_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex"
                >
                  <Youtube className="mr-1 text-indigo-600" /> Ver música
                </a>
              )}
            </Button>
          </div>
        )}
      </TableCell>
    </TableRow>
  )
}
