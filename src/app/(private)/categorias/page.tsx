"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, FolderOpen, Edit, Trash } from "lucide-react"

const categories = [
  { id: 1, name: "Adoração", count: 45 },
  { id: 2, name: "Louvor", count: 38 },
  { id: 3, name: "Natal", count: 12 },
  { id: 4, name: "Páscoa", count: 8 },
  { id: 5, name: "Infantil", count: 15 },
  { id: 6, name: "Cura/Milagres", count: 10 },
  { id: 7, name: "Avivamento", count: 7 },
  { id: 8, name: "Oferta", count: 5 },
]

export default function CategoriasPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categorias</h1>
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
          <Button>Nova Categoria</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCategories.map((category) => (
          <Card key={category.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-md font-medium">{category.name}</CardTitle>
              <FolderOpen className="h-5 w-5 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{category.count} músicas</Badge>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
