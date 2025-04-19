import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const schedules = [
  { id: 1, name: "Culto de Domingo", date: "09/04/2025", status: "Confirmado" },
  { id: 2, name: "Culto de Jovens", date: "14/04/2025", status: "Pendente" },
  { id: 3, name: "Culto de Oração", date: "16/04/2025", status: "Confirmado" },
]

export function UpcomingSchedules() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Evento</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {schedules.map((schedule) => (
          <TableRow key={schedule.id}>
            <TableCell className="font-medium">{schedule.name}</TableCell>
            <TableCell>{schedule.date}</TableCell>
            <TableCell>
              <Badge variant={schedule.status === "Confirmado" ? "default" : "outline"}>{schedule.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
