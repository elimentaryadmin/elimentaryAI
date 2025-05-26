"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data
const data = [
  { segment: "Jan", personal: 3.2, auto: 2.8, mortgage: 1.2, business: 4.5 },
  { segment: "Feb", personal: 3.5, auto: 3.1, mortgage: 1.3, business: 4.8 },
  { segment: "Mar", personal: 3.8, auto: 3.3, mortgage: 1.4, business: 5.0 },
  { segment: "Apr", personal: 4.2, auto: 3.5, mortgage: 1.5, business: 5.2 },
  { segment: "May", personal: 4.5, auto: 3.8, mortgage: 1.6, business: 5.5 },
  { segment: "Jun", personal: 5.0, auto: 4.0, mortgage: 1.7, business: 5.8 },
  { segment: "Jul", personal: 5.2, auto: 4.2, mortgage: 1.8, business: 6.1 },
]

export function DelinquencyReviewBarChart() {
  const chartConfig = {
    personal: {
      label: "Personal Loans",
      color: "hsl(var(--chart-1))",
    },
    auto: {
      label: "Auto Loans",
      color: "hsl(var(--chart-2))",
    },
    mortgage: {
      label: "Mortgages",
      color: "hsl(var(--chart-3))",
    },
    business: {
      label: "Business Loans",
      color: "hsl(var(--chart-4))",
    },
  }

  return (
    <ChartContainer config={chartConfig} className="h-[400px] w-[700px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="segment" />
          <YAxis label={{ value: "Delinquency Rate (%)", angle: -90, position: "insideLeft" }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="personal" fill="var(--color-personal)" />
          <Bar dataKey="auto" fill="var(--color-auto)" />
          <Bar dataKey="mortgage" fill="var(--color-mortgage)" />
          <Bar dataKey="business" fill="var(--color-business)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

