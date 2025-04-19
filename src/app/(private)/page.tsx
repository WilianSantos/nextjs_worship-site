import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Music, Users, ListMusic, Calendar } from 'lucide-react'
import { BarChart } from '@/components/charts/bar-chart'
import { PieChart } from '@/components/charts/pie-chart'
import { RecentEvents } from '@/components/recent-events'
import { UpcomingSchedules } from '@/components/upcoming-schedules'

export default function Dashboard() {
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
            <div className="text-2xl font-bold">120</div>
            <p className="text-xs text-muted-foreground">+5 no último mês</p>
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
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 no último mês</p>
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
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">+3 no último mês</p>
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
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+1 no último mês</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Músicas Mais Tocadas</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Membros Mais Escalados</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Últimos Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentEvents />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximas Escalas</CardTitle>
          </CardHeader>
          <CardContent>
            <UpcomingSchedules />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
