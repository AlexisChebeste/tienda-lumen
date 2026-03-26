"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

export function SalesChart({
  data
}: {
  data: { month: string; total: number }[]
}) {
  return (
    <div className="w-full h-64 xl:h-full">

      <ResponsiveContainer className="text-sm" width="100%" height="100%" aspect={0}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>

          {/* Grid suave */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          {/* Eje X */}
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          {/* Eje Y */}
          <YAxis
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `$${value}`}
          />

          {/* Tooltip custom */}
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              fontSize: "12px"
            }}
            formatter={(value) => [`$${value ?? 0}`, "Ingresos"]}
            labelFormatter={(label) => `Mes: ${label}`}
          />

          {/* Línea */}
          <Line
            type="monotone"
            dataKey="total"
            stroke="#111827"
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}