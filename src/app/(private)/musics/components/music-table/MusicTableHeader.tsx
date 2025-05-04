import { TableHead, TableHeader, TableRow } from '@/components/ui/table'

export function MusicTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="text-orange-500">Título</TableHead>
        <TableHead className="text-orange-500">Autor</TableHead>
        <TableHead className="text-orange-500">Tom</TableHead>
        <TableHead className="text-orange-500">Categoria</TableHead>
        <TableHead className="text-orange-500">YouTube</TableHead>
        <TableHead className="text-orange-500">Ações</TableHead>
      </TableRow>
    </TableHeader>
  )
}
