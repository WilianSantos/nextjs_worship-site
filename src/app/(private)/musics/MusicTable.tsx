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
import { Loader } from '@/components/Loader'

export function MusicTable({
  musics,
  setMusicFormEdit,
  setMessageSuccess
}: {
  musics: MusicSerializers[] | PraiseMusicMusics200MusicsItem[]
  setMusicFormEdit: (id?: number) => void
  setMessageSuccess: (message: string) => void
}) {
  const [seeMusic, setSeeMusic] = useState(false)
  const [music, setMusic] = useState<
    MusicSerializers | PraiseMusicMusics200MusicsItem | null
  >(null)

  const queryClient = useQueryClient()
  const { mutate, isPending } = useDeleteMusic()

  const handleDelete = (id: number | undefined) => {
    if (id)
      mutate(
        { id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['musicList'] })
            queryClient.invalidateQueries({ queryKey: ['musicPage'] })
            setMessageSuccess('Musica deletada com sucesso')
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

  if (isPending) {
    return <Loader />
  }

  return (
    <>
      {/* Versão desktop/tablet */}
      <div className="hidden md:block lg:block">
        {musics && musics.length > 0 ? (
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
        ) : (
          <div className="flex items-center justify-center">
            <p className="text-lg text-gray-600">Sem registros</p>
          </div>
        )}
      </div>

      {/* Versão mobile */}
      <div className="block md:hidden lg:hidden">
        {musics && musics.length > 0 ? (
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
        ) : (
          <div className="flex items-center justify-center">
            <p className="text-lg text-gray-600">Sem registros</p>
          </div>
        )}
      </div>
    </>
  )
}
