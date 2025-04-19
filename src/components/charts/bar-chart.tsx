"use client"

import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { name: "Digno é o Senhor", value: 18 },
  { name: "Teu Amor", value: 15 },
  { name: "Maravilhoso", value: 12 },
  { name: "Deus Está Aqui", value: 10 },
  { name: "Tua Graça Me Basta", value: 8 },
]

export function BarChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <RechartsBarChart data={data}>
        <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
