'use client'

import { useEffect, useState } from 'react'
import { ScaleForm } from './ScaleForm'
import { useQueryClient } from '@tanstack/react-query'

import { SearchInput } from '@/components/page-controls/SearchInput'
import { Button } from '@/components/ui/button'
import AnimatedMulti from '@/components/ui/multiple-selector'
import { Card } from '@/components/ui/card'

import { formatDate } from '@/utils/formatDate'
import { extractYouTubeId } from '@/utils/extractYouTubeId'
import { useGetScaleListPage } from '@/services/hooks/scale/useGetScaleListPage'
import { useGetScaleMemberList } from '@/services/hooks/scale/useGetScaleMemberList'
import { useGetScaleList } from '@/services/hooks/scale/useGetScaleList'
import { useDeleteScale } from '@/services/hooks/scale/useDeleteScale'
import {
  LineupMemberSerializers,
  PraiseLineupSerializers
} from '@/client/schemas'
import { ScaleTable } from './ScaleTable'

export default function ScalesPage() {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const [initialScale, setInitialScale] = useState<PraiseLineupSerializers>()
  const [initialScaleMembers, setInitialScaleMembers] =
    useState<LineupMemberSerializers[]>()
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [scaleFormEditVisible, setScaleFormEditVisible] = useState(false)
  const [scaleFormVisible, setScaleFormVisible] = useState(false)
  const [messageSuccess, setMessageSuccess] = useState('')
  const [page, setPage] = useState(1)

  const { data: dataScalesPage } = useGetScaleListPage({
    search: searchTerm,
    page: page
  })
  const { data: dataScaleList } = useGetScaleList()
  const { data: dataScaleMember } = useGetScaleMemberList({})
  const { mutate: deleteScale, isPending: isDeleting } = useDeleteScale()

  const queryClient = useQueryClient()

  const scaleListPage =
    dataScalesPage?.data.results && dataScalesPage?.data.results
  const scaleMemberList = dataScaleMember?.data && dataScaleMember?.data

  // função para gerar mensagens de todos os checkbox para o whatsapp
  const messageWhats = (id: number | undefined) => {
    const scale = scaleListPage && scaleListPage?.find((item) => item.id === id)

    const scaleMembers =
      scaleMemberList &&
      scaleMemberList?.filter((item) => item.lineup === scale?.id)

    const event = scale?.lineup_event || ''
    const date = formatDate(String(scale?.lineup_date))

    const members =
      scaleMembers
        ?.map((item) => `--> ${item.function_display}: ${item.member_display}`)
        .join('\n') || ''

    const links = Array.isArray(scale?.playlist_link_display)
      ? scale.playlist_link_display.map((item) => extractYouTubeId(item))
      : []

    const playlistUrl = links.length
      ? `https://www.youtube.com/watch_videos?video_ids=${links.join(',')}`
      : 'Nenhuma música vinculada'

    // Emojis compatíveis com WhatsApp
    const emoji = {
      event: '🎯', // Evento
      date: '📆', // Data
      members: '👥', // Membros
      playlist: '🎵' // Playlist
    }

    const message = `${emoji.event} *EVENTO:* ${event}
    ${emoji.date} *DATA:* ${date}
    ${emoji.members} *ESCALADOS:*
    ${members}
    ${emoji.playlist} *PLAYLIST:*
    ${playlistUrl}`

    return message
  }

  // adição ou remoção dos checkbox
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const isAllSelected = !!(
    scaleListPage?.length && selectedIds.length === scaleListPage.length
  )

  // Seleção dos checkbox
  const toggleSelectAll = () => {
    if (!scaleListPage) return
    if (isAllSelected) {
      setSelectedIds([])
    } else {
      setSelectedIds(scaleListPage.map((item) => item.id))
    }
  }

  const handleDeleteSelected = () => {
    selectedIds.forEach((id) => {
      deleteScale(
        { id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scaleList'] })
            queryClient.invalidateQueries({ queryKey: ['scaleListPage'] })
            setSelectedIds((prev) => prev.filter((i) => i !== id))
            setMessageSuccess('Deletado com sucesso')
          }
        }
      )
    })
  }

  const handleDelete = (id: number | undefined) => {
    if (id)
      deleteScale(
        { id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scaleList'] })
            queryClient.invalidateQueries({ queryKey: ['scaleListPage'] })
            setSelectedIds((prev) => prev.filter((i) => i !== id))
            setMessageSuccess('Deletado com sucesso')
          }
        }
      )
  }

  const handlingFormEditing = (id: number | undefined) => {
    const scale = scaleListPage?.find((item) => item.id === id)
    const scaleMembers = scaleMemberList?.filter(
      (item) => item.lineup === scale?.id
    )

    // Use diretamente aqui
    console.log('Scale:', scale)
    console.log('Members:', scaleMembers)

    // Agora seta os estados
    setInitialScale(scale)
    setInitialScaleMembers(scaleMembers)
    setScaleFormEditVisible(true)
  }

  return (
    <div className="p-6 space-y-6 md:pt-32 lg:p-6">
      <div className="flex items-center justify-between flex-col lg:flex-row md:flex-row">
        <h1 className="text-2xl font-bold min-w-3/12 text-orange-500">
          Escalas
        </h1>
        <div className="flex items-end w-full gap-4 lg:items-center flex-col lg:flex-row md:items-end">
          <SearchInput
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />

          <div className="w-full">
            {dataScaleList?.data.scales &&
              dataScaleList.data.scales.length > 0 && (
                <AnimatedMulti
                  isMultiple={false}
                  options={
                    dataScaleList?.data.scales?.map((m) => ({
                      value: String(m.lineup_date),
                      label: `${m.lineup_event} - ${formatDate(String(m.lineup_date))}`
                    })) || []
                  }
                  onChange={(selectedOptions) => {
                    if (selectedOptions[0].value)
                      setSearchTerm(selectedOptions[0].value)
                  }}
                />
              )}
          </div>

          <Button
            onClick={() => setScaleFormVisible(true)}
            className="cursor-pointer"
          >
            Nova Escala
          </Button>
        </div>
      </div>

      {messageSuccess && <p className="text-green-500">{messageSuccess}</p>}

      {scaleFormVisible || scaleFormEditVisible ? (
        scaleFormVisible ? (
          <Card>
            <ScaleForm
              setScaleForm={() => setScaleFormVisible(false)}
              setMessageSuccess={setMessageSuccess}
            />
          </Card>
        ) : (
          scaleFormEditVisible &&
          initialScale &&
          initialScaleMembers && (
            <Card>
              <ScaleForm
                initialValue={initialScale}
                initialValueScaleMember={initialScaleMembers}
                setScaleForm={() => setScaleFormEditVisible(false)}
                setMessageSuccess={setMessageSuccess}
              />
            </Card>
          )
        )
      ) : (
        <>
          <ScaleTable
            handleDelete={handleDelete}
            handleDeleteSelected={handleDeleteSelected}
            handlingFormEditing={handlingFormEditing}
            isAllSelected={isAllSelected}
            isDeleting={isDeleting}
            messageWhats={messageWhats}
            nextPage={
              dataScalesPage?.data.next ? dataScalesPage?.data.next : null
            }
            page={page}
            previousPage={
              dataScalesPage?.data.previous
                ? dataScalesPage.data.previous
                : null
            }
            scaleListPage={scaleListPage}
            scaleMemberList={scaleMemberList}
            selectedIds={selectedIds}
            setPage={setPage}
            toggleSelect={(id: number) => toggleSelect(id)}
            toggleSelectAll={toggleSelectAll}
          />
        </>
      )}
    </div>
  )
}
