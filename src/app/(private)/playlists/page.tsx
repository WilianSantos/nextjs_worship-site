'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { ListMusic, Eye, Share2, Edit, Trash, Ellipsis } from 'lucide-react'
import { useGetPlaylistList } from '@/services/hooks/playlist/useGetPlaylistList'
import { SearchInput } from '@/components/page-controls/SearchInput'
import { formatDate } from '@/utils/formatDate'
import { PaginationControls } from '@/components/page-controls/PaginationControls'
import { handleNextPage, handlePreviousPage } from '@/utils/pageControls'
import { useGetScaleList } from '@/services/hooks/scale/useGetScaleList'
import { PlaylistForm } from './PlaylistForm'
import { Card } from '@/components/ui/card'
import { PlaylistSerializers } from '@/client/schemas'
import { useGetPlaylist } from '@/services/hooks/playlist/useGetPlaylist'
import { useGetPlaylistLink } from '@/services/hooks/playlist/useGetPlaylistLink'
import { ShareWhatsAppButton } from '@/components/ui/ShareWhatsAppButton'
import { extractYouTubeId } from '@/utils/extractYouTubeId'
import { useDeletePlaylist } from '@/services/hooks/playlist/useDeletePlaylist'
import { useQueryClient } from '@tanstack/react-query'

export default function PlaylistsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [playlistForm, setPlaylistForm] = useState(false)
  const [activeMenuId, setActiveMenuId] = useState<number | undefined>(
    undefined
  )

  const [messageSuccess, setMessageSuccess] = useState('')

  const { data: dataPlaylistList } = useGetPlaylistList({
    search: searchTerm,
    page: page
  })

  const { data: dataScale } = useGetScaleList({})

  const filteredPlaylists = dataPlaylistList?.data.results
  const scaleList = dataScale?.data

  const lastPlaylistEntry = (id: number | undefined) => {
    const today = new Date()
    const lastPlaylist =
      scaleList && scaleList?.find((item) => item.playlist === id)

    if (!lastPlaylist?.lineup_date) return ''

    const lineupDate = new Date(lastPlaylist.lineup_date)

    if (lineupDate < today) {
      return formatDate(String(lineupDate))
    }

    return ''
  }

  const [playlistFormEdit, setPlaylistFormEdit] = useState(false)
  const [initialFormValue, setInitialFormValue] =
    useState<PlaylistSerializers>()
  const [playlistId, setPlaylistId] = useState<number | null>(null)
  const { data: dataPlaylist } = useGetPlaylist(playlistId || 0)

  const handlingTheEditingForm = (id: number | undefined) => {
    if (!id) return

    setPlaylistId(id)
    const playlist = dataPlaylist?.data

    if (playlist) {
      setInitialFormValue(playlist)
      setPlaylistFormEdit(true)
    }
  }

  const { mutate: mutateDelete } = useDeletePlaylist()
  const queryClient = useQueryClient()
  const deletePlaylist = (id: number | undefined) => {
    if (id) {
      mutateDelete(
        { id: id },
        {
          onSuccess: () => {
            setMessageSuccess('Playlist deletada com sucesso.')
            queryClient.invalidateQueries({ queryKey: ['playlistList'] })
          }
        }
      )
    }
  }

  return (
    <div className="p-6 space-y-6 md:pt-32 lg:p-6">
      <div className="flex flex-col items-center justify-between gap-1 md:flex-row lg:flex-row">
        <h1 className="text-2xl font-bold font-parkinsans text-orange-500">
          Playlists
        </h1>
        <div className="flex items-center justify-center">
          <p className="text-lg text-green-500">{messageSuccess}</p>
        </div>
        <div className="flex flex-col items-end gap-4">
          <SearchInput
            onChange={({ target }) => setSearchTerm(target.value)}
            value={searchTerm}
          />
          <Button
            className="cursor-pointer"
            onClick={() => setPlaylistForm(true)}
          >
            Nova Playlist
          </Button>
        </div>
      </div>

      {playlistForm || playlistFormEdit ? (
        playlistFormEdit ? (
          <Card>
            <PlaylistForm
              setMessageSuccess={(message: string) =>
                setMessageSuccess(message)
              }
              setPlaylistForm={() => setPlaylistFormEdit(false)}
              initialValue={initialFormValue}
            />
          </Card>
        ) : (
          <Card>
            <PlaylistForm
              setMessageSuccess={(message: string) =>
                setMessageSuccess(message)
              }
              setPlaylistForm={() => setPlaylistForm(false)}
            />
          </Card>
        )
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden hidden md:hidden lg:block">
            {filteredPlaylists && filteredPlaylists.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-orange-500">Nome</TableHead>
                    <TableHead className="text-orange-500">Data</TableHead>
                    <TableHead className="text-orange-500">Músicas</TableHead>
                    <TableHead className="text-orange-500">
                      Último Uso
                    </TableHead>
                    <TableHead className="text-orange-500">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlaylists.map((playlist) => (
                    <TableRow key={playlist.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <ListMusic className="h-5 w-5 text-indigo-600" />
                          <span className="font-medium">
                            {playlist.playlist_name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {formatDate(String(playlist.playlist_date))}
                      </TableCell>
                      <TableCell>{playlist.music?.length}</TableCell>
                      <TableCell>{lastPlaylistEntry(playlist.id)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => handlingTheEditingForm(playlist.id)}
                            variant="outline"
                            size="sm"
                            className="cursor-pointer"
                          >
                            <Edit className="h-4 w-4 mr-1" /> Editar
                          </Button>
                          <Button
                            onClick={() => deletePlaylist(playlist.id)}
                            variant="outline"
                            size="sm"
                            className="cursor-pointer"
                          >
                            <Trash className="h-4 w-4 text-red-500" /> Excluir
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="cursor-pointer"
                          >
                            <ShareWhatsAppButton id={playlist.id} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex items-center justify-center">
                <p className="text-lg text-gray-600">Sem registros.</p>
              </div>
            )}
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden block md:block lg:hidden">
            {filteredPlaylists && filteredPlaylists.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-orange-500">Nome</TableHead>
                    <TableHead className="text-orange-500">Data</TableHead>
                    <TableHead className="text-orange-500">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlaylists.map((playlist) => (
                    <TableRow key={playlist.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <ListMusic className="h-5 w-5 text-indigo-600" />
                          <span className="font-medium">
                            {playlist.playlist_name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {formatDate(String(playlist.playlist_date))}
                      </TableCell>
                      <TableCell className="relative overflow-visible">
                        <Button
                          variant="outline"
                          size="icon"
                          className="cursor-pointer"
                          onClick={() =>
                            setActiveMenuId(
                              activeMenuId === playlist.id
                                ? undefined
                                : playlist.id
                            )
                          }
                        >
                          <Ellipsis />
                        </Button>
                        {activeMenuId === playlist.id && (
                          <div className="flex flex-col absolute top-10 right-0 z-10 bg-white p-2 rounded shadow-md">
                            <Button
                              onClick={() =>
                                handlingTheEditingForm(playlist.id)
                              }
                              variant="outline"
                              size="sm"
                              className="cursor-pointer"
                            >
                              <Edit className="h-4 w-4 mr-1" /> Editar
                            </Button>
                            <Button
                              onClick={() => deletePlaylist(playlist.id)}
                              variant="outline"
                              size="sm"
                              className="cursor-pointer"
                            >
                              <Trash className="h-4 w-4 text-red-500" /> Excluir
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="cursor-pointer"
                            >
                              <ShareWhatsAppButton id={playlist.id} />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex items-center justify-center">
                <p className="text-lg text-gray-600">Sem registros.</p>
              </div>
            )}
          </div>
          {!playlistForm && !playlistFormEdit && (
            <PaginationControls
              onNext={() =>
                handleNextPage(dataPlaylistList?.data.next, setPage)
              }
              onPrev={() =>
                handlePreviousPage(dataPlaylistList?.data.previous, setPage)
              }
              page={page}
            />
          )}
        </>
      )}
    </div>
  )
}
