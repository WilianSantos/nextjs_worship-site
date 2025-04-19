"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2, PieChart, Calendar, Download } from "lucide-react"
import { BarChart } from "@/components/charts/bar-chart"
import { PieChart as PieChartComponent } from "@/components/charts/pie-chart"

export default function RelatoriosPage() {
  const [period, setPeriod] = useState("month")

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Relatórios e Análises</h1>
        <div className="flex items-center gap-4">
          <select className="border rounded-md px-3 py-2" value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="week">Última Semana</option>
            <option value="month">Último Mês</option>
            <option value="quarter">Último Trimestre</option>
            <option value="year">Último Ano</option>
          </select>
          <Button>
            <Download className="h-4 w-4 mr-2" /> Exportar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Músicas Mais Tocadas</CardTitle>
            <BarChart2 className="h-5 w-5 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <BarChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Membros Mais Escalados</CardTitle>
            <PieChart className="h-5 w-5 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <PieChartComponent />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Distribuição de Tons</CardTitle>
            <PieChart className="h-5 w-5 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <div className="w-full max-w-md">
                <div className="flex items-center justify-between mb-2">
                  <span>Tom C</span>
                  <span>25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: "25%" }}></div>
                </div>

                <div className="flex items-center justify-between mb-2 mt-4">
                  <span>Tom G</span>
                  <span>35%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: "35%" }}></div>
                </div>

                <div className="flex items-center justify-between mb-2 mt-4">
                  <span>Tom D</span>
                  <span>20%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: "20%" }}></div>
                </div>

                <div className="flex items-center justify-between mb-2 mt-4">
                  <span>Tom E</span>
                  <span>15%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: "15%" }}></div>
                </div>

                <div className="flex items-center justify-between mb-2 mt-4">
                  <span>Outros</span>
                  <span>5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: "5%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Eventos por Mês</CardTitle>
            <Calendar className="h-5 w-5 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <div className="w-full max-w-md">
                <div className="flex items-center justify-between mb-2">
                  <span>Janeiro</span>
                  <span>4 eventos</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: "40%" }}></div>
                </div>

                <div className="flex items-center justify-between mb-2 mt-4">
                  <span>Fevereiro</span>
                  <span>5 eventos</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: "50%" }}></div>
                </div>

                <div className="flex items-center justify-between mb-2 mt-4">
                  <span>Março</span>
                  <span>6 eventos</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: "60%" }}></div>
                </div>

                <div className="flex items-center justify-between mb-2 mt-4">
                  <span>Abril</span>
                  <span>8 eventos</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: "80%" }}></div>
                </div>

                <div className="flex items-center justify-between mb-2 mt-4">
                  <span>Maio</span>
                  <span>10 eventos</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: "100%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
