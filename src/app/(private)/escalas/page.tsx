"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Calendar, Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ListMusic } from "lucide-react"

export default function EscalasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentDate, setCurrentDate] = useState("10/04/2025")

  const vocais = [
    { id: 1, name: "Vocal", member: "Aline", status: true },
    { id: 2, name: "Backing", member: "Wilson", status: true },
    { id: 3, name: "Backing", member: "Catarina Elétrica", status: true },
  ]

  const cordas = [
    { id: 1, name: "Guitarra", member: "Catarina Elétrica", status: true },
    { id: 2, name: "Baixo", member: "Bianca Elétrica", status: false },
    { id: 3, name: "Violão", member: "Barrito", status: true },
  ]

  const outros = [
    { id: 1, name: "Bateria", member: "Testoda", status: true },
    { id: 2, name: "Teclado", member: "Marjo Desenvolvi", status: true },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Escalas</h1>
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
          <Button>Nova Escala</Button>
        </div>
      </div>

      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-semibold">Culto de Domingo - {currentDate}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Anterior
          </Button>
          <Button variant="outline" size="sm">
            Próxima
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vocais</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Função</TableHead>
                  <TableHead>Membro</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vocais.map((vocal) => (
                  <TableRow key={vocal.id}>
                    <TableCell>{vocal.name}</TableCell>
                    <TableCell>{vocal.member}</TableCell>
                    <TableCell>
                      {vocal.status ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          <Check className="h-3 w-3 mr-1" /> Confirmado
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-red-800 border-red-200">
                          <X className="h-3 w-3 mr-1" /> Pendente
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cordas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Função</TableHead>
                  <TableHead>Membro</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cordas.map((corda) => (
                  <TableRow key={corda.id}>
                    <TableCell>{corda.name}</TableCell>
                    <TableCell>{corda.member}</TableCell>
                    <TableCell>
                      {corda.status ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          <Check className="h-3 w-3 mr-1" /> Confirmado
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-red-800 border-red-200">
                          <X className="h-3 w-3 mr-1" /> Pendente
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Outros</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Função</TableHead>
                  <TableHead>Membro</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {outros.map((outro) => (
                  <TableRow key={outro.id}>
                    <TableCell>{outro.name}</TableCell>
                    <TableCell>{outro.member}</TableCell>
                    <TableCell>
                      {outro.status ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          <Check className="h-3 w-3 mr-1" /> Confirmado
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-red-800 border-red-200">
                          <X className="h-3 w-3 mr-1" /> Pendente
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Playlist Associada</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ListMusic className="h-5 w-5 text-indigo-600" />
              <span className="font-medium">Culto de Domingo - Abril</span>
            </div>
            <Button variant="outline" size="sm">
              Ver Playlist
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
