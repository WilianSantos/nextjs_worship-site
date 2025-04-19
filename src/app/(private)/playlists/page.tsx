"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ListMusic, Eye, Share2 } from "lucide-react"

const playlists = [
  { id: 1, name: "Culto de Domingo", date: "17/05/2024", songs: 8, lastUsed: "02/04/2025" },
  { id: 2, name: "Culto de Jovens", date: "12/06/2021", songs: 6, lastUsed: "28/03/2025" },
  { id: 3, name: "Culto de Oração", date: "11/05/2025", songs: 4, lastUsed: "26/03/2025" },
]

export default function PlaylistsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Playlists</h1>
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
          <Button>Nova Playlist</Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Data de Criação</TableHead>
              <TableHead>Músicas</TableHead>
              <TableHead>Último Uso</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlaylists.map((playlist) => (
              <TableRow key={playlist.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <ListMusic className="h-5 w-5 text-indigo-600" />
                    <span className="font-medium">{playlist.name}</span>
                  </div>
                </TableCell>
                <TableCell>{playlist.date}</TableCell>
                <TableCell>{playlist.songs}</TableCell>
                <TableCell>{playlist.lastUsed}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" /> Ver
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-1" /> Compartilhar
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
