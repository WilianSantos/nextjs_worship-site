import { Youtube, Trash2, SquarePen } from 'lucide-react'

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

import { MusicSerializers } from '@/client/schemas'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { formatCifraToParagraph } from '@/utils/formatCifraToParagraph'

type PropsMusic = {
  musics: MusicSerializers[]
  setMusicFormEdit: (id?: number) => void
}

export function MusicTable({ musics, setMusicFormEdit }: PropsMusic) {
  const [seeMusic, setSeeMusic] = useState(false)
  const [music, setMusic] = useState<MusicSerializers | null>(null)

  const handleSeeMusic = (object: MusicSerializers) => {
    setMusic(object)
    setSeeMusic(true)
  }
  return seeMusic && music ? (
    <Card className="p-5">
      <h3>{music.music_title}</h3>
      <p>{music.author}</p>
      <p>{music.music_tone}</p>
      <p>
        <ul className="flex gap-1">
          {music.category?.map((item) => (
            <li key={item.id}>{item.category_name}</li>
          ))}
        </ul>
      </p>
      <div
        dangerouslySetInnerHTML={{
          __html: formatCifraToParagraph(music.music_text)
        }}
      />
      <div>
        <Button onClick={() => setSeeMusic(false)}>Voltar</Button>
      </div>
    </Card>
  ) : (
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
        {musics?.map((song) => (
          <TableRow key={song.id}>
            <TableCell
              onClick={() => handleSeeMusic(song)}
              className="font-medium cursor-pointer"
            >
              {song.music_title}
            </TableCell>
            <TableCell
              className="cursor-pointer"
              onClick={() => handleSeeMusic(song)}
            >
              {song.author}
            </TableCell>
            <TableCell
              className="cursor-pointer"
              onClick={() => handleSeeMusic(song)}
            >
              {song.music_tone}
            </TableCell>
            <TableCell
              className="cursor-pointer"
              onClick={() => handleSeeMusic(song)}
            >
              {song.category?.map((item) => (
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
                className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setMusicFormEdit(song.id)}
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                >
                  <SquarePen />
                </Button>
                <Button className="cursor-pointer" variant="outline">
                  <Trash2 className="text-red-500" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
