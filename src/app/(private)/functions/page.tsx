'use client'

import { useState } from 'react'
import { Search, Briefcase, Edit, Trash, Ellipsis } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'

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
import { Loader } from '@/components/Loader'
import { FunctionForm } from './FunctionForm'

import { useGetFunctionList } from '@/services/hooks/function/useGetFunctionList'
import { useGetMemberList } from '@/services/hooks/member/useGetMemberList'
import { useDeleteFunction } from '@/services/hooks/function/useDeleteFunction'
import { MemberFunctionsSerializers } from '@/client/schemas'
import { formatToParagraph } from '@/utils/formatToParagraph'

export default function FunctionsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeMenuId, setActiveMenuId] = useState<number | undefined>(
    undefined
  )

  const [functionForm, setFunctionForm] = useState(false)
  const [functionFormEdit, setFunctionFormEdit] = useState(false)
  const [messageSuccess, setMessageSuccess] = useState('')
  const [initialFormValue, setInitialFormValue] =
    useState<MemberFunctionsSerializers>()

  const { data: dataFunction } = useGetFunctionList({ search: searchTerm })
  const filteredRoles = dataFunction?.data

  const { data: dataMembers } = useGetMemberList({})
  const functionCountInCategory = (id: number | undefined) => {
    const functionCount = dataMembers?.data
      ? dataMembers?.data?.filter((member) =>
          member.function?.some((c) => c.id === id)
        ).length || 0
      : 0

    return functionCount
  }

  const { mutate: mutateDelete, isPending: isPendingDelete } =
    useDeleteFunction()
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

  if (isPendingDelete) {
    return <Loader />
  }

  return (
    <div className="p-6 space-y-6 md:pt-32">
      <div className="flex flex-col items-center gap-1 justify-between lg:flex-row lg:items-center lg:justify-between md:items-center md:justify-between md:flex-row">
        <h1 className="text-2xl font-bold font-parkinsans text-orange-500">
          Funções
        </h1>
        <div>
          <p className="text-lg text-green-500">{messageSuccess}</p>
        </div>
        <div>
          <p className="text-lg text-red-500">{messageError}</p>
        </div>
        <div className="flex flex-col items-end gap-1 justify-between lg:flex-row lg:items-center lg:justify-between md:items-center md:justify-between md:flex-row">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Pesquisar..."
              className="pl-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            className="cursor-pointer"
            onClick={() => setFunctionForm(true)}
          >
            Nova Função
          </Button>
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
        <>
          <div className="hidden md:block lg:block bg-white rounded-lg shadow overflow-hidden">
            {filteredRoles && filteredRoles.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-orange-500">Função</TableHead>
                    <TableHead className="text-orange-500">Membros</TableHead>
                    <TableHead className="text-orange-500">Descrição</TableHead>
                    <TableHead className="text-orange-500">Ações</TableHead>
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
                        <TableCell>
                          {functionCountInCategory(role.id)}
                        </TableCell>
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
                              className="cursor-pointer"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              onClick={() => deleteFunction(role.id)}
                              variant="ghost"
                              size="icon"
                              className="cursor-pointer"
                            >
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex items-center justify-center">
                <p className="text-sm text-gray-600">Sem registros</p>
              </div>
            )}
          </div>

          {/* Versão mobile */}
          <div className="block md:hidden lg:hidden bg-white rounded-lg shadow overflow-hidden">
            {filteredRoles && filteredRoles.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-orange-500">Função</TableHead>
                    <TableHead className="text-orange-500">Ações</TableHead>
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
                        <TableCell className="relative overflow-visible">
                          <Button
                            variant="outline"
                            size="icon"
                            className="cursor-pointer"
                            onClick={() =>
                              setActiveMenuId(
                                activeMenuId === role.id ? undefined : role.id
                              )
                            }
                          >
                            <Ellipsis />
                          </Button>
                          {activeMenuId === role.id && (
                            <div className="flex flex-col absolute top-10 right-0 z-10 bg-white p-2 rounded shadow-md">
                              <Button
                                onClick={() => handlingTheEditingForm(role.id)}
                                variant="ghost"
                                size="icon"
                                className="cursor-pointer"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                onClick={() => deleteFunction(role.id)}
                                variant="ghost"
                                size="icon"
                                className="cursor-pointer"
                              >
                                <Trash className="h-4 w-4 text-red-500" />
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
                <p className="text-sm text-gray-600">Sem registros</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
