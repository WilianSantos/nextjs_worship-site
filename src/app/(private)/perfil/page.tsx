'use client'
import Image from 'next/image'
import React from 'react'
import { Mail, Phone, User } from 'lucide-react'

import { formatDate } from '@/utils/formatDate'
import { useGetMember } from '@/services/hooks/useGetMember'
import { usePraiseScaleHistoryList } from '@/services/hooks/usePraiseScaleHistoryList'

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
import { ProfileForm } from './ProfileForm'

export default function ProfilePage() {
  const { data: memberData } = useGetMember()
  const { data: scalesData } = usePraiseScaleHistoryList()
  const [userEdit, setUserEdit] = React.useState(false)

  const member = memberData?.data
  const scales = scalesData?.data

  return (
    <div className="p-6 space-y-6 md:pt-32 sm:pt-32">
      <h1 className="text-2xl font-bold">Perfil do Usuário</h1>

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

                <div className="w-full mt-6 space-y-4">
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
                  <Button onClick={() => setUserEdit(true)} className="w-full">
                    Editar Perfil
                  </Button>
                </div>
              </div>
            </CardContent>
          ) : (
            <CardContent>
              {member && (
                <ProfileForm
                  member={member}
                  setUserEditFalse={() => setUserEdit(false)}
                />
              )}
            </CardContent>
          )}
        </Card>

        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Histórico de Escalas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Evento</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Função</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scales?.scales?.map((scale) => (
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
