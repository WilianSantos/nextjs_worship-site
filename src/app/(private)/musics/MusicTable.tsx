'use client'

import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import {
  MusicSerializers,
  PraiseMusicMusics200MusicsItem
} from '@/client/schemas'
import { useDeleteMusic } from '@/services/hooks/music/useDeleteMusic'

import { Table, TableBody } from '@/components/ui/table'
import { MusicTableHeader } from './components/music-table/MusicTableHeader'
import { MusicTableRow } from './components/music-table/MusicTableRow'
import { MusicTableExpanded } from './components/music-table/MusicTableExpanded'
import { MusicTableHeaderMobile } from './components/music-table/MusicTableHeaderMobile'
import { MusicTableRowMobile } from './components/music-table/MusicTableRowMobile'

export function MusicTable({
  musics,
  setMusicFormEdit
}: {
  musics: MusicSerializers[] | PraiseMusicMusics200MusicsItem[]
  setMusicFormEdit: (id?: number) => void
}) {
  const [seeMusic, setSeeMusic] = useState(false)
  const [music, setMusic] = useState<
    MusicSerializers | PraiseMusicMusics200MusicsItem | null
  >(null)

  const queryClient = useQueryClient()
  const { mutate } = useDeleteMusic()

  const handleDelete = (id: number | undefined) => {
    if (id)
      mutate(
        { id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['musicList'] })
            queryClient.invalidateQueries({ queryKey: ['musicPage'] })
          }
        }
      )
  }

  const handleSeeMusic = (
    object: MusicSerializers | PraiseMusicMusics200MusicsItem
  ) => {
    setMusic(object)
    setSeeMusic(true)
  }

  if (seeMusic && music) {
    return (
      <MusicTableExpanded music={music} onBack={() => setSeeMusic(false)} />
    )
  }

  return (
    <>
      {/* Versão desktop/tablet */}
      <div className="hidden md:block lg:block">
        <Table>
          <MusicTableHeader />
          <TableBody>
            {musics?.map((song) => (
              <MusicTableRow
                key={song.id}
                song={song}
                onEdit={setMusicFormEdit}
                onDelete={handleDelete}
                onSee={handleSeeMusic}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Versão mobile */}
      <div className="block md:hidden lg:hidden">
        <Table>
          <MusicTableHeaderMobile />
          <TableBody>
            {musics?.map((song) => (
              <MusicTableRowMobile
                key={song.id}
                song={song}
                onEdit={setMusicFormEdit}
                onDelete={handleDelete}
                onSee={handleSeeMusic}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
