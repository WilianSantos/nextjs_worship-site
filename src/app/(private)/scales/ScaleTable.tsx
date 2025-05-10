'use client'
import {
  LineupMemberSerializers,
  PraiseLineupSerializers
} from '@/client/schemas'
import { PaginationControls } from '@/components/page-controls/PaginationControls'
import { Button } from '@/components/ui/button'
import { ShareWhatsAppButton } from '@/components/ui/ShareWhatsAppButton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { formatDate } from '@/utils/formatDate'
import { handleNextPage, handlePreviousPage } from '@/utils/pageControls'
import { Edit, Ellipsis, Share2, Trash } from 'lucide-react'
import { useState } from 'react'

type PropsScaleTable = {
  selectedIds: number[]
  isDeleting: boolean
  isAllSelected: boolean
  scaleListPage: PraiseLineupSerializers[] | undefined
  scaleMemberList: LineupMemberSerializers[] | undefined
  nextPage: string | null
  previousPage: string | null
  page: number
  setPage: () => void
  toggleSelectAll: () => void
  handleDeleteSelected: () => void
  messageWhats: (id: number | undefined) => string
  toggleSelect: (id: number) => void
  handlingFormEditing: (id: number | undefined) => void
  handleDelete: (id: number | undefined) => void
}

export function ScaleTable({
  selectedIds,
  isDeleting,
  isAllSelected,
  scaleListPage,
  scaleMemberList,
  nextPage,
  previousPage,
  page,
  handleDeleteSelected,
  messageWhats,
  toggleSelectAll,
  toggleSelect,
  handlingFormEditing,
  handleDelete,
  setPage
}: PropsScaleTable) {
  const [activeMenuId, setActiveMenuId] = useState<number | undefined>(
    undefined
  )
  return (
    <>
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-end">
          <Button
            className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
            disabled={isDeleting}
            onClick={handleDeleteSelected}
            size="sm"
          >
            <Trash /> {isDeleting ? 'Excluindo...' : 'Excluir Selecionados'}
          </Button>

          <Button
            className="bg-green-600 hover:bg-green-700 text-white ml-2 cursor-pointer"
            onClick={() => {
              const selectedMessages = selectedIds.map((id) => messageWhats(id))
              const fullMessage = `${selectedMessages.map((item) => `${item}`).join('\n\n\n') || ''}`
              window.open(
                `https://wa.me/?text=${encodeURIComponent(fullMessage)}`,
                '_blank'
              )
            }}
            size="sm"
          >
            <Share2 className="h-4 w-4 mr-1" /> Compartilhar Selecionados
          </Button>
        </div>
      )}

      {/* Tabela para desktop */}
      <div className="hidden md:hidden lg:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="text-orange-500">Evento</TableHead>
              <TableHead className="text-orange-500">Data</TableHead>
              <TableHead className="text-orange-500">Membros</TableHead>
              <TableHead className="text-orange-500">Playlist</TableHead>
              <TableHead className="text-orange-500">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scaleListPage && scaleListPage.length > 0 ? (
              scaleListPage.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                    />
                  </TableCell>
                  <TableCell>{item.lineup_event}</TableCell>
                  <TableCell>{formatDate(String(item.lineup_date))}</TableCell>
                  <TableCell>
                    {scaleMemberList &&
                      scaleMemberList.length > 0 &&
                      scaleMemberList
                        ?.filter((scale) => item.id === scale.lineup)
                        .map((member) => (
                          <p key={member.id}>
                            {`${member.function_display} - ${member.member_display}`}
                          </p>
                        ))}
                  </TableCell>
                  <TableCell>{item?.playlist_display}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                        onClick={() => handlingFormEditing(item.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                      >
                        <ShareWhatsAppButton
                          messageWhats={messageWhats(item.id)}
                        />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>
                  <p className="text-lg text-center">Sem registros</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Tabela para Tablet */}
      <div className="hidden md:block lg:hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="text-orange-500">Data</TableHead>
              <TableHead className="text-orange-500">Membros</TableHead>
              <TableHead className="text-orange-500">Playlist</TableHead>
              <TableHead className="text-orange-500">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scaleListPage && scaleListPage.length > 0 ? (
              scaleListPage.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                    />
                  </TableCell>
                  <TableCell>{formatDate(String(item.lineup_date))}</TableCell>
                  <TableCell>
                    {scaleMemberList &&
                      scaleMemberList.length > 0 &&
                      scaleMemberList
                        ?.filter((scale) => item.id === scale.lineup)
                        .map((member) => (
                          <p key={member.id}>
                            {`${member.function_display} - ${member.member_display}`}
                          </p>
                        ))}
                  </TableCell>
                  <TableCell>{item?.playlist_display}</TableCell>
                  <TableCell className="relative overflow-visible">
                    <Button
                      variant="outline"
                      size="icon"
                      className="cursor-pointer"
                      onClick={() =>
                        setActiveMenuId(
                          activeMenuId === item.id ? undefined : item.id
                        )
                      }
                    >
                      <Ellipsis />
                    </Button>
                    {activeMenuId === item.id && (
                      <div className="flex flex-col absolute top-10 right-0 z-10 bg-white p-2 rounded shadow-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="cursor-pointer"
                          onClick={() => handlingFormEditing(item.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="cursor-pointer"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="cursor-pointer"
                        >
                          <ShareWhatsAppButton
                            messageWhats={messageWhats(item.id)}
                          />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>
                  <p className="text-lg text-center">Sem registros</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Tabela para Mobile */}
      <div className="block md:hidden lg:hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="text-orange-500">Data</TableHead>
              <TableHead className="text-orange-500">Playlist</TableHead>
              <TableHead className="text-orange-500">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scaleListPage && scaleListPage.length > 0 ? (
              scaleListPage.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                    />
                  </TableCell>
                  <TableCell>{formatDate(String(item.lineup_date))}</TableCell>
                  <TableCell>{item?.playlist_display}</TableCell>
                  <TableCell className="relative overflow-visible">
                    <Button
                      variant="outline"
                      size="icon"
                      className="cursor-pointer"
                      onClick={() =>
                        setActiveMenuId(
                          activeMenuId === item.id ? undefined : item.id
                        )
                      }
                    >
                      <Ellipsis />
                    </Button>
                    {activeMenuId === item.id && (
                      <div className="flex flex-col absolute top-10 right-0 z-10 bg-white p-2 rounded shadow-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="cursor-pointer"
                          onClick={() => handlingFormEditing(item.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="cursor-pointer"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="cursor-pointer"
                        >
                          <ShareWhatsAppButton
                            messageWhats={messageWhats(item.id)}
                          />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>
                  <p className="text-lg text-center">Sem registros</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <PaginationControls
        onNext={() => handleNextPage(nextPage, setPage)}
        onPrev={() => handlePreviousPage(previousPage, setPage)}
        page={page}
      />
    </>
  )
}
