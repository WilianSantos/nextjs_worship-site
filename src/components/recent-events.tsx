import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const events = [
  { id: 1, name: "Culto de Domingo", date: "02/04/2025", songs: 8 },
  { id: 2, name: "Culto de Jovens", date: "28/03/2025", songs: 6 },
  { id: 3, name: "Culto de Oração", date: "26/03/2025", songs: 4 },
]

export function RecentEvents() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Evento</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Músicas</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell className="font-medium">{event.name}</TableCell>
            <TableCell>{event.date}</TableCell>
            <TableCell>{event.songs}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
