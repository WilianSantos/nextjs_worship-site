'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Music } from 'lucide-react'

import { useGetMusicListPage } from '@/services/hooks/music/useGetMusicListPage'
import { useGetMusic } from '@/services/hooks/music/useGetMusic'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PaginationControls } from '../../../components/page-controls/PaginationControls'
import { SearchInput } from '../../../components/page-controls/SearchInput'
import { MusicSerializers } from '@/client/schemas'
import { Loader } from '@/components/Loader'
import { handleNextPage, handlePreviousPage } from '@/utils/pageControls'

const MusicTable = dynamic(
  () => import('./MusicTable').then((mod) => mod.MusicTable),
  { ssr: false }
)
const MusicForm = dynamic(
  () => import('./MusicForm').then((mod) => mod.MusicForm),
  { ssr: false }
)

export default function MusicsPage() {
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)
  const [musicForm, setMusicForm] = useState(false)
  const [musicFormEdit, setMusicFormEdit] = useState(false)
  const [messageSuccess, setMessageSuccess] = useState('')

  const [page, setPage] = useState(1)
  const { data: dataMusicPage } = useGetMusicListPage({
    page: page,
    search: searchTerm
  })
  const musicListPage = dataMusicPage?.data?.results

  const [getMusicWithId, setGetMusicWithId] = useState<number | null>(null)
  const { data: getMusicData, isLoading } = useGetMusic(getMusicWithId || 0)
  const getMusicId = getMusicData?.data

  const handleMusicFormEdit = (id?: number) => {
    if (id) {
      setGetMusicWithId(id)
      setMusicFormEdit(true)
    }
  }

  const handleCloseForm = () => {
    setMusicForm(false)
    setMusicFormEdit(false)
    setGetMusicWithId(null)
  }

  const handleMessageSuccess = (message: string) => {
    setMessageSuccess(message)
  }
  return (
    <div className="p-6 md:pt-32 lg:p-6 space-y-6">
      <div className="flex flex-col justify-between gap-2 lg:items-center lg:justify-between lg:flex-row md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold font-parkinsans text-orange-500">
          Músicas
        </h1>
        <div>
          <p className="text-lg text-green-500">{messageSuccess}</p>
        </div>
        <div className="flex flex-col items-end lg:flex-row md:flex-row lg:items-center md:items-center gap-4">
          {searchTerm ? (
            <SearchInput
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          ) : (
            <SearchInput
              value=""
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
          <Button
            className="cursor-pointer"
            type="button"
            onClick={() => setMusicForm(true)}
          >
            Nova Música
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Total</h2>
            <Music className="h-5 w-5 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold mt-2">
            {dataMusicPage?.data?.count}
          </p>
          <p className="text-sm text-gray-500">músicas</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {!musicForm &&
          !musicFormEdit &&
          (searchTerm && musicListPage && musicListPage.length > 0 ? (
            <MusicTable
              setMusicFormEdit={handleMusicFormEdit}
              musics={musicListPage}
              setMessageSuccess={handleMessageSuccess}
            />
          ) : musicListPage && musicListPage.length > 0 ? (
            <MusicTable
              setMusicFormEdit={handleMusicFormEdit}
              musics={musicListPage}
              setMessageSuccess={handleMessageSuccess}
            />
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-lg text-gray-600">Sem registros.</p>
            </div>
          ))}
        {musicForm && (
          <Card className="p-10">
            <MusicForm
              setMusicForm={handleCloseForm}
              setMessageSuccess={handleMessageSuccess}
            />
          </Card>
        )}
        {musicFormEdit && getMusicId && !isLoading && (
          <Card className="p-10">
            <MusicForm
              music={getMusicId as MusicSerializers}
              setMusicForm={handleCloseForm}
              setMessageSuccess={handleMessageSuccess}
            />
          </Card>
        )}
        {musicFormEdit && isLoading && (
          <Card className="p-10 text-center">
            <Loader />
          </Card>
        )}
      </div>

      {!musicForm && !musicFormEdit && (
        <PaginationControls
          page={page}
          onNext={() => handleNextPage(dataMusicPage?.data.next, setPage)}
          onPrev={() =>
            handlePreviousPage(dataMusicPage?.data.previous, setPage)
          }
        />
      )}
    </div>
  )
}
