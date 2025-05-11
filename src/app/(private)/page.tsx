'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Music, Users, ListMusic, Calendar } from 'lucide-react'
import { BarChart } from '@/components/charts/bar-chart'
import { PieChart } from '@/components/charts/pie-chart'
import { RecentEvents } from '@/components/recent-events'
import { UpcomingSchedules } from '@/components/upcoming-schedules'
import { useGetTotalScale } from '@/services/hooks/scale/useGetTotalScale'
import { useGetMemberMostEscalatedList } from '@/services/hooks/member/useGetMostEscalatedMembers'
import { useGetTotalMember } from '@/services/hooks/member/useGetTotalMember'
import { useGetTotalPlaylist } from '@/services/hooks/playlist/useGetTotalPlaylist'
import { useGetTotalMusic } from '@/services/hooks/music/useGetTotalMusic'
import { useGetMusicMostPlayedList } from '@/services/hooks/music/useGetMusicMostPlayed'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useGetNextScale } from '@/services/hooks/scale/useGetNextScale'
import { useGetPreviousScale } from '@/services/hooks/scale/useGetPreviousScale'
import { formatDate } from '@/utils/formatDate'

export default function Dashboard() {
  const { data: dataTotalScale } = useGetTotalScale()
  const { data: dataTotalMember } = useGetTotalMember()
  const { data: dataTotalPlaylist } = useGetTotalPlaylist()
  const { data: dataTotalMusic } = useGetTotalMusic()
  const { data: dataMostEscalated } = useGetMemberMostEscalatedList()
  const { data: dataMostPlayed } = useGetMusicMostPlayedList()
  const { data: dataNextScale } = useGetNextScale()
  const { data: dataPreviousScale } = useGetPreviousScale()

  const mostEscalatedMember =
    dataMostEscalated?.data.top_members && dataMostEscalated?.data.top_members

  const mostPlayed =
    dataMostPlayed?.data.top_musics && dataMostPlayed.data.top_musics

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Músicas
            </CardTitle>
            <Music className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dataTotalMusic?.data.total ? dataTotalMusic.data.total : ''}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Membros
            </CardTitle>
            <Users className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dataTotalMember?.data.total ? dataTotalMember.data.total : ''}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Playlists
            </CardTitle>
            <ListMusic className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dataTotalPlaylist?.data.total
                ? dataTotalPlaylist.data.total
                : ''}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Escalas
            </CardTitle>
            <Calendar className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dataTotalScale?.data.total ? dataTotalScale?.data.total : ''}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Músicas Mais Tocadas</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={mostPlayed?.map((item) => ({
                name: `${item.music} - ${item.author}`,
                value: item.total
              }))}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Membros Mais Escalados</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart
              data={mostEscalatedMember?.map((item) => ({
                name: item.name,
                value: item['total-member']
              }))}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Últimos Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Evento</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataPreviousScale?.data['previous-scales'] ? (
                  dataPreviousScale?.data['previous-scales'].map((event) => (
                    <TableRow key={event.date}>
                      <TableCell className="font-medium">
                        {event.event}
                      </TableCell>
                      <TableCell>{formatDate(String(event.date))}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2}>
                      <p>Sem registros</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximas Escalas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Evento</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataNextScale?.data['next-scales'] ? (
                  dataNextScale?.data['next-scales'].map((event) => (
                    <TableRow key={event.date}>
                      <TableCell className="font-medium">
                        {event.event}
                      </TableCell>
                      <TableCell>{formatDate(String(event.date))}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2}>
                      <p>Sem registros</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
