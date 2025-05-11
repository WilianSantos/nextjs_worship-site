'use client'

import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts'
import { DataPropsChart } from './pie-chart'

export function BarChart({ data }: DataPropsChart) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <RechartsBarChart data={data}>
        <XAxis dataKey="name" fontSize={6} axisLine={false} />
        <YAxis fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Bar
          dataKey="value"
          fill="#6366f1"
          radius={[4, 4, 0, 0]}
          label={({ x, y, width, height, name }) => (
            <text
              x={x + width / 2}
              y={y + height / 2}
              fill="white"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={11}
              transform={`rotate(-90, ${x + width / 2}, ${y + height / 2})`}
            >
              {name}
            </text>
          )}
          fontSize={12}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
