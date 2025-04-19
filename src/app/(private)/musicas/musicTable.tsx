import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Youtube } from 'lucide-react'

type PropsMusic = {
  music: {
    id?: number | undefined
    category?: {
      id?: number | undefined
      category_name?: string | undefined
    }[]
    music_chord?: {
      id?: number | undefined
      chord_name?: string | undefined
      chord_image?: string | null
    }[]
    created_at?: Date
    updated_at?: Date
    music_title?: string
    author?: string
    music_tone?: string
    music_text?: string
    music_link?: string | undefined
  }[]
}

export function MusicTable({ music }: PropsMusic) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Autor</TableHead>
          <TableHead>Tom</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>YouTube</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {music.map((song) => (
          <TableRow key={song.id}>
            <TableCell className="font-medium">{song.music_title}</TableCell>
            <TableCell>{song.author}</TableCell>
            <TableCell>{song.music_tone}</TableCell>
            <TableCell>
              {song.category.map((item) => (
                <Badge key={item.id} variant="outline">
                  {item.category_name}
                </Badge>
              ))}
            </TableCell>
            <TableCell>
              <a
                href={song.music_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Ver
                </Button>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
