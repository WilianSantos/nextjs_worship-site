"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Check, X } from "lucide-react"
import Image from "next/image"

const members = [
  {
    id: 1,
    name: "Marjo Desenvolvi",
    role: "Desenvolvedor",
    phone: "(11) 98765-4321",
    available: true,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Backing Vocal",
    role: "Vocal",
    phone: "(11) 91234-5678",
    available: true,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Catarina Elétrica",
    role: "Guitarra",
    phone: "(11) 99876-5432",
    available: true,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Bianca Elétrica",
    role: "Baixo",
    phone: "(11) 95678-1234",
    available: false,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Testoda",
    role: "Bateria",
    phone: "(11) 92345-6789",
    available: true,
    image: "/placeholder.svg?height=40&width=40",
  },
]

export default function MembrosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("")

  const filteredMembers = members.filter(
    (member) =>
      (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (roleFilter === "" || member.role === roleFilter),
  )

  const roles = [...new Set(members.map((member) => member.role))]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Membros</h1>
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
          <select
            className="border rounded-md px-3 py-2"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">Todas as funções</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <Button>Novo Membro</Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Membro</TableHead>
              <TableHead>Função</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Disponibilidade</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <span className="font-medium">{member.name}</span>
                  </div>
                </TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>{member.phone}</TableCell>
                <TableCell>
                  {member.available ? (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <Check className="h-3 w-3 mr-1" /> Disponível
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-red-800 border-red-200">
                      <X className="h-3 w-3 mr-1" /> Indisponível
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button variant="outline" size="sm">
                      Perfil
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
