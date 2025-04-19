"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Briefcase, Edit, Trash } from "lucide-react"

const roles = [
  { id: 1, name: "Vocal Principal", members: 3, description: "Responsável pelo vocal principal" },
  { id: 2, name: "Backing Vocal", members: 5, description: "Responsável pelo vocal de apoio" },
  { id: 3, name: "Guitarra", members: 2, description: "Responsável pela guitarra" },
  { id: 4, name: "Baixo", members: 1, description: "Responsável pelo baixo" },
  { id: 5, name: "Bateria", members: 2, description: "Responsável pela bateria" },
  { id: 6, name: "Teclado", members: 3, description: "Responsável pelo teclado" },
  { id: 7, name: "Violão", members: 4, description: "Responsável pelo violão" },
]

export default function FuncoesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Funções</h1>
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
          <Button>Nova Função</Button>
        </div>
      </div>

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
            {filteredRoles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-5 w-5 text-indigo-600" />
                    <span className="font-medium">{role.name}</span>
                  </div>
                </TableCell>
                <TableCell>{role.members}</TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
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
