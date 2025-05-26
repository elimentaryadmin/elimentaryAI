"use client"

import { useState } from "react"
import { X, FileText, Mail, AlertCircle, BarChart3, LineChart, PieChart, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DelinquencyChart } from "@/components/delinquency-chart"
import { UnderwritingPerformanceChart } from "@/components/underwriting-performance-chart"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface ActionCreatorProps {
  onClose: () => void
}

export function ActionCreator({ onClose }: ActionCreatorProps) {
  const [actionType, setActionType] = useState("report")
  const [selectedCharts, setSelectedCharts] = useState<string[]>([])

  const handleAddChart = (chartId: string) => {
    if (!selectedCharts.includes(chartId)) {
      setSelectedCharts([...selectedCharts, chartId])
    }
  }

  const handleRemoveChart = (chartId: string) => {
    setSelectedCharts(selectedCharts.filter((id) => id !== chartId))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Create New Action</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <CardDescription>Create a new action or report for risk insights</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Action Type</label>
            <Select defaultValue={actionType} onValueChange={setActionType}>
              <SelectTrigger>
                <SelectValue placeholder="Select action type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="report">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Report</span>
                  </div>
                </SelectItem>
                <SelectItem value="email">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </div>
                </SelectItem>
                <SelectItem value="alert">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>Alert</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              placeholder={`${actionType === "report" ? "Monthly Risk Report" : actionType === "email" ? "Risk Summary for CRO" : "Delinquency Alert"}`}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder={`${actionType === "report" ? "Comprehensive analysis of risk metrics..." : actionType === "email" ? "Summary of key risk insights for review..." : "Alert regarding increasing delinquency rates..."}`}
              className="min-h-[100px]"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Assigned To</label>
              <Select defaultValue="john">
                <SelectTrigger>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <span>John Doe</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="sarah">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      <span>Sarah Connor</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="emily">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>EJ</AvatarFallback>
                      </Avatar>
                      <span>Emily Johnson</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Due Date</label>
              <Input type="date" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Priority</label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">
                    <Badge variant="destructive">High</Badge>
                  </SelectItem>
                  <SelectItem value="medium">
                    <Badge>Medium</Badge>
                  </SelectItem>
                  <SelectItem value="low">
                    <Badge variant="outline">Low</Badge>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Approval Required</label>
              <Select defaultValue="yes">
                <SelectTrigger>
                  <SelectValue placeholder="Select approval requirement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Include Charts</label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddChart("chart-" + (selectedCharts.length + 1))}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Chart
              </Button>
            </div>

            {selectedCharts.length > 0 ? (
              <div className="mt-2 space-y-4">
                {selectedCharts.map((chartId, index) => (
                  <Card key={chartId}>
                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">Chart {index + 1}</CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveChart(chartId)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <Select defaultValue={index % 2 === 0 ? "delinquency" : "underwriting"}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select chart type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="delinquency">
                            <div className="flex items-center gap-2">
                              <LineChart className="h-4 w-4" />
                              <span>Delinquency by Loan Type</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="underwriting">
                            <div className="flex items-center gap-2">
                              <BarChart3 className="h-4 w-4" />
                              <span>Underwriting Performance</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="regional">
                            <div className="flex items-center gap-2">
                              <PieChart className="h-4 w-4" />
                              <span>Regional Distribution</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <div className="mt-4 h-[200px]">
                        {index % 2 === 0 ? <DelinquencyChart /> : <UnderwritingPerformanceChart />}
                      </div>

                      <div className="mt-4">
                        <label className="text-sm font-medium">Chart Description</label>
                        <Textarea placeholder="Add a description for this chart..." className="mt-1 min-h-[80px]" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="mt-2 rounded-lg border border-dashed p-4 text-center text-muted-foreground">
                No charts added. Click "Add Chart" to include visualizations.
              </div>
            )}
          </div>

          {actionType === "email" && (
            <div>
              <label className="text-sm font-medium">Recipients</label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="cro" />
                  <Label htmlFor="cro">Chief Risk Officer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="team" />
                  <Label htmlFor="team">Risk Management Team</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="stakeholders" />
                  <Label htmlFor="stakeholders">Key Stakeholders</Label>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onClose}>
          Create {actionType === "report" ? "Report" : actionType === "email" ? "Email" : "Alert"}
        </Button>
      </CardFooter>
    </Card>
  )
}

