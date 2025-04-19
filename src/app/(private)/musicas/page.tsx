'use client'

import { useEffect, useState } from 'react'
import { Search, Music, SkipBack, SkipForward } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MusicForm } from './musicForm'
import { MusicTable } from './musicTable'

import { useGetMusicListPage } from '@/services/hooks/useGetMusicListPage'
import { useGetMusicList } from '@/services/hooks/useGetMusicList'

export default function MusicsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [musicForm, setMusicForm] = useState(false)

  const { data: dataMusicPage } = useGetMusicListPage({
    page
  })
  const { data: dataMusicList } = useGetMusicList()
  const musicListPage = dataMusicPage?.data?.results
    ? dataMusicPage.data.results
    : []
  const musicList = dataMusicList?.data?.musics ? dataMusicList.data.musics : []

  const handleNextPage = () => {
    if (dataMusicPage?.data?.next) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (dataMusicPage?.data?.previous) {
      setPage((prevPage) => prevPage - 1)
    }
  }

  const filteredSongs = searchTerm
    ? musicList?.filter(
        (song) =>
          song.music_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.category?.some((item) =>
            item.category_name?.toLowerCase().includes(searchTerm.toLowerCase())
          )
      )
    : null

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Músicas</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Pesquisar..."
              className="pl-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => setMusicForm(true)}>Nova Música</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Total</h2>
            <Music className="h-5 w-5 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold mt-2">
            {dataMusicList?.data?.counts}
          </p>
          <p className="text-sm text-gray-500">músicas</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredSongs && musicForm === false ? (
          <MusicTable music={filteredSongs} />
        ) : (
          musicListPage &&
          musicForm === false && <MusicTable music={musicListPage} />
        )}
        {musicForm && (
          <Card className="p-10">
            <MusicForm setMusicForm={() => setMusicForm(false)} />
          </Card>
        )}
      </div>
      {!musicForm && (
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center gap-2.5">
            <div className="cursor-pointer" onClick={handlePreviousPage}>
              <SkipBack size={20} />
            </div>
            <div className="cursor-pointer" onClick={handleNextPage}>
              <SkipForward size={20} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
