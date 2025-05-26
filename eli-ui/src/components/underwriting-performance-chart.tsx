"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data
const data = [
  { segment: "Young Prof.", approvalRate: 68, defaultRate: 5.2, performanceScore: 72 },
  { segment: "Family", approvalRate: 82, defaultRate: 3.8, performanceScore: 85 },
  { segment: "Senior", approvalRate: 90, defaultRate: 1.2, performanceScore: 92 },
  { segment: "Student", approvalRate: 62, defaultRate: 7.5, performanceScore: 65 },
  { segment: "Small Biz", approvalRate: 75, defaultRate: 4.3, performanceScore: 78 },
]

export function UnderwritingPerformanceChart() {
  const chartConfig = {
    approvalRate: {
      label: "Approval Rate (%)",
      color: "hsl(var(--chart-1))",
    },
    defaultRate: {
      label: "Default Rate (%)",
      color: "hsl(var(--chart-2))",
    },
    performanceScore: {
      label: "Performance Score",
      color: "hsl(var(--chart-3))",
    },
  }

  return (
    <ChartContainer config={chartConfig} className="h-[400px] w-[1320px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="segment" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="approvalRate" fill="var(--color-approvalRate)" />
          <Bar dataKey="performanceScore" fill="var(--color-performanceScore)" />
          <Bar dataKey="defaultRate" fill="var(--color-defaultRate)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

