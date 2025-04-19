"use client"

import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Catarina Elétrica", value: 12 },
  { name: "Bianca Elétrica", value: 10 },
  { name: "Backing Vocal", value: 8 },
  { name: "Testoda", value: 7 },
  { name: "Marjo Desenvolvi", value: 5 },
]

const COLORS = ["#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899"]

export function PieChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <RechartsPieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}
