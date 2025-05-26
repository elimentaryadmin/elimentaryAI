"use client"

import { useState } from "react"
import { BarChart3, LineChart, PieChart, Download, Copy, MessageSquare, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DelinquencyChart } from "@/components/delinquency-chart"
import { UnderwritingPerformanceChart } from "@/components/underwriting-performance-chart"

export function ChartVisualizer() {
  const [chartType, setChartType] = useState("line")
  const [chartValue, setChartvalue] = useState("DelinquencyChart")
  const [summaryGenerated, setSummaryGenerated] = useState(false)

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Chart Type:</span>
          <Select defaultValue="line" onValueChange={setChartType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select chart type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">
                <div className="flex items-center gap-2">
                  <LineChart className="h-4 w-4" />
                  <span>Line Chart</span>
                </div>
              </SelectItem>
              <SelectItem value="bar">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Bar Chart</span>
                </div>
              </SelectItem>
             {/* <SelectItem value="pie">
                <div className="flex items-center gap-2">
                  <PieChart className="h-4 w-4" />
                  <span>Pie Chart</span>
                </div>
              </SelectItem> */}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Metrics:</span>
          <Select defaultValue="delinquency">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select data source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="delinquency">Delinquency </SelectItem>
              <SelectItem value="underwriting">Underwriting </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="rounded-lg border p-4 ">
        {chartType === "line" && <DelinquencyChart />}
        {chartType === "bar" && <UnderwritingPerformanceChart />}
      </div>

      <div className="flex items-center gap-2">
        {/*<Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export Chart
        </Button>
        <Button variant="outline" size="sm">
          <Copy className="mr-2 h-4 w-4" />
          Copy to Clipboard
        </Button> */}
        <Button size="sm" onClick={() => setSummaryGenerated(true)}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Generate Summary
        </Button>
      </div>

      {summaryGenerated && (
        <div className="space-y-2">
          <h3 className="text-lg font-medium">AI-Generated Summary</h3>
          <Textarea
            className="min-h-[100px]"
            value="The chart shows a clear trend of increasing delinquency rates across all loan types over the past 7 months. Personal loans show the highest rate of increase, rising from 3.2% in January to 5.2% in July, representing a 62.5% increase. Business loans have the highest absolute delinquency rate at 6.1% in July. Mortgages maintain the lowest delinquency rates throughout the period, staying below 2%, which is consistent with their typically lower risk profile. The acceleration in delinquency rates appears to have increased in the April-July period, suggesting a potential systemic issue that warrants further investigation."
            readOnly
          />
        </div>
      )}
    </div>
  )
}

