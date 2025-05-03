import { TableHead, TableHeader, TableRow } from '@/components/ui/table'

export function MusicTableHeaderMobile() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Título</TableHead>
        <TableHead>Ações</TableHead>
      </TableRow>
    </TableHeader>
  )
}
