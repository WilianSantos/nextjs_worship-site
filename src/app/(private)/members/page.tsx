'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Search, Check, X, User } from 'lucide-react'

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
import { Badge } from '@/components/ui/badge'
import { MemberForm } from './MemberForm'

import { useGetMemberList } from '@/services/hooks/member/useGetMemberList'
import { useGetFunctionList } from '@/services/hooks/function/useGetFunctionList'

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [messageSuccess, setMessageSuccess] = useState<string | null>(null)
  const [errorPage, setErrorPage] = useState<string | null>(null)

  const [functionFilter, setFunctionFilter] = useState('')
  const [memberForm, setMemberForm] = useState(false)

  const { data } = useGetMemberList({ search: searchTerm || functionFilter })
  const members = data?.data

  const { data: dataFunction } = useGetFunctionList({})
  const functions = dataFunction?.data

  return (
    <div className="p-6 space-y-6 md:pt-32 lg:p-6">
      <div className="flex flex-col items-center gap-2 justify-between lg:flex-row lg:items-center lg:justify-between md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl text-orange-500 font-bold">Membros</h1>
        <div className="p-4">
          <p className="text-lg text-green-500">
            {messageSuccess ? messageSuccess : ''}
          </p>
          <p className="text-lg text-red-500">{errorPage ? errorPage : ''}</p>
        </div>
        <div className="flex flex-col items-end gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Pesquisar..."
              className="pl-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border rounded-md px-3 py-2 cursor-pointer"
            value={functionFilter}
            onChange={(e) => setFunctionFilter(e.target.value)}
          >
            <option value="">Todas as funções</option>
            {functions?.map((role) => (
              <option key={role.id} value={role.function_name}>
                {role.function_name}
              </option>
            ))}
          </select>
          <Button
            className="cursor-pointer"
            onClick={() => setMemberForm(true)}
          >
            Novo Membro
          </Button>
        </div>
      </div>

      {memberForm ? (
        <MemberForm
          setMessageSuccess={(message: string) => setMessageSuccess(message)}
          setMemberForm={() => setMemberForm(false)}
          setErrorPage={(message: string) => setErrorPage(message)}
        />
      ) : (
        <>
          <div className="hidden md:block lg:block bg-white rounded-lg shadow overflow-hidden">
            {members && members.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-orange-500">Nome</TableHead>
                    <TableHead className="text-orange-500">Função</TableHead>
                    <TableHead className="text-orange-500">Telefone</TableHead>
                    <TableHead className="text-orange-500">
                      Disponibilidade
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members?.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {member.profile_picture ? (
                            <Image
                              src={member.profile_picture}
                              alt={member.name}
                              width={60}
                              height={60}
                              className="rounded-full object-cover w-10 h-10"
                            />
                          ) : (
                            <User size={16} className="w-10 h-10" />
                          )}
                          <span className="font-medium">{member.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {member.function?.map((item) => (
                          <p key={item.id}>{item.function_name}</p>
                        ))}
                      </TableCell>
                      <TableCell>{member.cell_phone}</TableCell>
                      <TableCell>
                        {member.availability ? (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            <Check className="h-3 w-3 mr-1" /> Disponível
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-red-800 border-red-200"
                          >
                            <X className="h-3 w-3 mr-1" /> Indisponível
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
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
          <div className="block md:hidden lg:hidden bg-white rounded-lg shadow overflow-hidden">
            {members && members.length > 0 ? (
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-orange-500">Nome</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members?.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {member.profile_picture ? (
                            <Image
                              src={member.profile_picture}
                              alt={member.name}
                              width={60}
                              height={60}
                              className="rounded-full object-cover w-10 h-10"
                            />
                          ) : (
                            <User size={16} className="w-10 h-10" />
                          )}
                          <span className="font-medium">{member.name}</span>
                        </div>
                      </TableCell>
                    </TableRow>
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
      )}
    </div>
  )
}
