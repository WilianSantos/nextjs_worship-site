'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { Mail, Phone, User } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProfileForm, valueForm } from './ProfileForm'

import { formatDate } from '@/utils/formatDate'
import { useGetMember } from '@/services/hooks/member/useGetMember'
import { usePraiseScaleHistoryList } from '@/services/hooks/scale/usePraiseScaleHistoryList'
import { useUpdateMember } from '@/services/hooks/member/useUpdateMember'

export default function ProfilePage() {
  const [userEdit, setUserEdit] = React.useState(false)

  const { data: scalesData } = usePraiseScaleHistoryList()
  const scales = scalesData?.data

  const { data: memberData } = useGetMember()
  const member = memberData?.data
  const initialValues = {
    firstName: member?.user?.first_name || '',
    lastName: member?.user?.last_name || '',
    username: member?.user?.username || '',
    email: member?.user?.email || '',
    function: member?.function?.map((item) => item.id) || [],
    profilePicture: member?.profile_picture as unknown as File | null,
    cellPhone: member?.cell_phone || '',
    name: member?.name || '',
    availability: member?.availability || false
  }

  const { isPending, mutateAsync } = useUpdateMember()
  const queryClient = useQueryClient()
  const [messageSuccess, setMessageSuccess] = useState<string | null>(null)

  const submitForm = (values: valueForm) => {
    mutateAsync(
      {
        id: Number(member?.id) ?? 0,
        values: {
          user: {
            id: Number(member?.user?.id),
            first_name: values.firstName,
            last_name: values.lastName,
            username: values.username,
            email: values.email
          },
          function: values.function.map((item) => Number(item)),
          cell_phone: values.cellPhone,
          name: values.name,
          availability: values.availability,
          profile_picture: values.profilePicture as File | string
        }
      },
      {
        onSuccess: () => {
          setUserEdit(false)
          queryClient.invalidateQueries({ queryKey: ['member'] })
          setMessageSuccess('Dados atualizados com sucesso.')
        }
      }
    )
  }
  return (
    <div className="p-6 space-y-6 md:pt-32 lg:p-6">
      <h1 className="text-2xl font-parkinsans font-bold text-orange-500">
        Perfil do Usuário
      </h1>

      <div>
        <p className="text-lg text-green-500">
          {messageSuccess ? messageSuccess : ''}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        <Card className="md:col-span-2 lg:col-span-1">
          {!userEdit ? (
            <CardContent className="pt-6 ">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  {member?.profile_picture ? (
                    <Image
                      src={member.profile_picture}
                      alt="Foto de perfil"
                      width={100}
                      height={100}
                      className="rounded-full object-cover h-28 w-28"
                    />
                  ) : (
                    <User className="h-24 w-24 text-indigo-600" />
                  )}
                </div>
                <h2 className="text-xl font-bold">{member?.name}</h2>

                <div className="w-full mt-6 space-y-4 flex flex-col items-center">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-indigo-600" />
                    <span>{member?.user?.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-indigo-600" />
                    <span>{member?.cell_phone}</span>
                  </div>
                </div>

                <div className="w-full mt-6">
                  <Button
                    onClick={() => setUserEdit(true)}
                    className="w-full cursor-pointer"
                  >
                    Editar Perfil
                  </Button>
                </div>
              </div>
            </CardContent>
          ) : (
            <CardContent>
              <ProfileForm
                initialValue={initialValues}
                onSubmit={submitForm}
                setUserEditFalse={() => setUserEdit(false)}
                isPending={isPending}
              />
            </CardContent>
          )}
        </Card>

        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Histórico de Escalas</CardTitle>
          </CardHeader>
          <CardContent>
            {scales?.scales && scales.scales.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-orange-500">Evento</TableHead>
                    <TableHead className="text-orange-500">Data</TableHead>
                    <TableHead className="text-orange-500">Função</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scales.scales?.map((scale) => (
                    <TableRow key={scale.id}>
                      <TableCell className="font-medium">
                        {scale.lineup_event}
                      </TableCell>
                      <TableCell>
                        {scale.lineup_date &&
                          formatDate(scale.lineup_date.toString())}
                      </TableCell>
                      <TableCell>{scale.function_name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex items-center justify-center">
                <p className="text-sm text-gray-600">Sem registros.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
