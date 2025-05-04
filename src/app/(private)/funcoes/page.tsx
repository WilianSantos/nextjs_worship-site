'use client'

import { useState } from 'react'
import { Search, Briefcase, Edit, Trash } from 'lucide-react'

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
import { Card } from '@/components/ui/card'

import { useGetFunctionList } from '@/services/hooks/function/useGetFunctionList'
import { useGetMemberList } from '@/services/hooks/member/useGetMemberList'
import { FunctionForm } from './FunctionForm'
import { MemberFunctionsSerializers } from '@/client/schemas'
import { formatToParagraph } from '@/utils/formatToParagraph'
import { useDeleteFunction } from '@/services/hooks/function/useDeleteFunction'
import { useQueryClient } from '@tanstack/react-query'

export default function FuncoesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const { data: dataFunction } = useGetFunctionList({ search: searchTerm })

  const [functionForm, setFunctionForm] = useState(false)
  const [functionFormEdit, setFunctionFormEdit] = useState(false)
  const [messageSuccess, setMessageSuccess] = useState('')
  const [initialFormValue, setInitialFormValue] =
    useState<MemberFunctionsSerializers>()

  const filteredRoles = dataFunction?.data

  const { data: dataMembers } = useGetMemberList()
  const functionCountInCategory = (id: number | undefined) => {
    const functionCount = dataMembers?.data
      ? dataMembers?.data?.filter((member) =>
          member.function?.some((c) => c.id === id)
        ).length || 0
      : 0

    return functionCount
  }

  const { mutate: mutateDelete } = useDeleteFunction()
  const [messageError, setMessageError] = useState('')
  const queryClient = useQueryClient()
  const deleteFunction = (id: number | undefined) => {
    if (!id) return

    mutateDelete(
      { id: id },
      {
        onSuccess: () => {
          setMessageSuccess('Função deletada com sucesso.')
          queryClient.invalidateQueries({ queryKey: ['memberFunction'] })
          queryClient.invalidateQueries({ queryKey: ['member'] })
        },
        onError: (error) => {
          setMessageError(String(error.detail))
        }
      }
    )
  }

  const handlingTheEditingForm = (id: number | undefined) => {
    if (!id) return

    const functionMember = filteredRoles?.find((item) => item.id === id)

    if (functionMember) {
      setInitialFormValue(functionMember)
      setFunctionFormEdit(true)
    }
  }
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Funções</h1>
        <div>
          <p className="text-2xl text-green-500">{messageSuccess}</p>
        </div>
        <div>
          <p className="text-2xl text-red-400">{messageError}</p>
        </div>
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
          <Button onClick={() => setFunctionForm(true)}>Nova Função</Button>
        </div>
      </div>
      {functionForm || functionFormEdit ? (
        <>
          {functionForm && (
            <Card>
              <FunctionForm
                setMessageSuccess={(message: string) =>
                  setMessageSuccess(message)
                }
                setFunctionForm={() => setFunctionForm(false)}
              />
            </Card>
          )}

          {functionFormEdit && initialFormValue && (
            <Card>
              <FunctionForm
                initialValue={initialFormValue}
                setMessageSuccess={(message: string) =>
                  setMessageSuccess(message)
                }
                setFunctionForm={() => setFunctionFormEdit(false)}
              />
            </Card>
          )}
        </>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Função</TableHead>
                <TableHead>Membros</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles &&
                filteredRoles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Briefcase className="h-5 w-5 text-indigo-600" />
                        <span className="font-medium">
                          {role.function_name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{functionCountInCategory(role.id)}</TableCell>
                    <TableCell>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: formatToParagraph(role.description)
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => handlingTheEditingForm(role.id)}
                          variant="ghost"
                          size="icon"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => deleteFunction(role.id)}
                          variant="ghost"
                          size="icon"
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
