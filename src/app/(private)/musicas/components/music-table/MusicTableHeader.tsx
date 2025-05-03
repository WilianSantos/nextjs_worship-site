import { TableHead, TableHeader, TableRow } from '@/components/ui/table'

export function MusicTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Título</TableHead>
        <TableHead>Autor</TableHead>
        <TableHead>Tom</TableHead>
        <TableHead>Categoria</TableHead>
        <TableHead>YouTube</TableHead>
        <TableHead>Ações</TableHead>
      </TableRow>
    </TableHeader>
  )
}
