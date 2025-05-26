"use client"

import { useState } from "react"
import {
  Download,
  Share2,
  MessageSquare,
  Plus,
  FileText,
  Pencil,
  Eye,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DataTable } from "@/components/data-table"
import { DelinquencyChart } from "@/components/delinquency-chart"
import { UnderwritingPerformanceChart } from "@/components/underwriting-performance-chart"
import { ChartVisualizer } from "@/components/chart-visualizer"
import { CollaborationPanel } from "@/components/collaboration-panel"
import { IntegrationPanel } from "@/components/integration-panel"
import { ActionCreator } from "@/app/dashboard/action-creator/page"

export default function RiskInsightsOverview() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showActionCreator, setShowActionCreator] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <h4 className="text tracking-tight">Your customised summary</h4>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-2">
      { /* <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="delinquency">Delinquency Analysis</TabsTrigger>
          <TabsTrigger value="underwriting">Underwriting Performance</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger> 
           <TabsTrigger value="integrations">Integrations</TabsTrigger> 
        </TabsList> */}

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Delinquent Loans</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                <Badge className="mt-2" variant="destructive">
                  Critical
                </Badge>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Underwriting Approval Rate</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78.2%</div>
                <p className="text-xs text-muted-foreground">-2.5% from last month</p>
                <Badge className="mt-2">Stable</Badge>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High-Risk Customers</CardTitle>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,324</div>
                <p className="text-xs text-muted-foreground">+12.3% from last month</p>
                <Badge className="mt-2" variant="secondary">
                  Needs Review
                </Badge>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">4 require immediate attention</p>
                <Badge className="mt-2" variant="outline">
                  In Progress
                </Badge>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-20 lg:grid-cols-20">
            <Card className="col-span-20">
              <CardHeader>
                <CardTitle>Performance</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                { /*<DelinquencyChart /> */}
                <ChartVisualizer />
              </CardContent>
            </Card>
           {/* <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Underwriting Performance</CardTitle>
                <CardDescription>Performance metrics for different customer segments</CardDescription>
              </CardHeader>
              <CardContent>
                <UnderwritingPerformanceChart />
              </CardContent>
            </Card> */}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Annotations</CardTitle>
                <CardDescription>Latest comments and notes from your team</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex gap-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/placeholder-user.jpg`} />
                          <AvatarFallback>{`U${i}`}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Sarah Connor</span>
                            <span className="text-xs text-muted-foreground">2 hours ago</span>
                            {i % 2 === 0 && (
                              <Badge variant="outline" className="ml-auto">
                                Private
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            The increase in delinquency for personal loans needs further investigation. I've noticed a
                            correlation with recent marketing campaigns.
                          </p>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-7 px-2">
                              <MessageSquare className="mr-1 h-3 w-3" />
                              Reply
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 px-2">
                              <Eye className="mr-1 h-3 w-3" />
                              View Context
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Actions & Reports</CardTitle>
                <CardDescription>Status of recent actions and reports</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    {[
                      {
                        title: "Monthly Risk Report",
                        status: "Approved",
                        assignee: "John Smith",
                        date: "2024-07-15",
                        type: "report",
                      },
                      {
                        title: "Delinquency Alert for Auto Loans",
                        status: "Pending Approval",
                        assignee: "Emily Johnson",
                        date: "2024-07-14",
                        type: "alert",
                      },
                      {
                        title: "Underwriting Policy Update",
                        status: "In Progress",
                        assignee: "Michael Chen",
                        date: "2024-07-12",
                        type: "policy",
                      },
                      {
                        title: "Quarterly Risk Assessment",
                        status: "Completed",
                        assignee: "Lisa Rodriguez",
                        date: "2024-07-10",
                        type: "assessment",
                      },
                      {
                        title: "High-Risk Customer Segment Review",
                        status: "Needs Attention",
                        assignee: "David Kim",
                        date: "2024-07-08",
                        type: "review",
                      },
                    ].map((action, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`rounded-full p-2 ${
                              action.status === "Approved"
                                ? "bg-green-100"
                                : action.status === "Pending Approval"
                                  ? "bg-yellow-100"
                                  : action.status === "In Progress"
                                    ? "bg-blue-100"
                                    : action.status === "Completed"
                                      ? "bg-green-100"
                                      : "bg-red-100"
                            }`}
                          >
                            {action.type === "report" && <FileText className="h-4 w-4" />}
                            {action.type === "alert" && <AlertCircle className="h-4 w-4" />}
                            {action.type === "policy" && <FileText className="h-4 w-4" />}
                            {action.type === "assessment" && <CheckCircle2 className="h-4 w-4" />}
                            {action.type === "review" && <Eye className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{action.title}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">Assigned to {action.assignee}</span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{action.date}</span>
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant={
                            action.status === "Approved"
                              ? "default"
                              : action.status === "Pending Approval"
                                ? "outline"
                                : action.status === "In Progress"
                                  ? "secondary"
                                  : action.status === "Completed"
                                    ? "default"
                                    : "destructive"
                          }
                        >
                          {action.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="delinquency" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Delinquency Analysis</CardTitle>
                  <CardDescription>
                    Detailed breakdown of delinquent loans by type, region, and customer segment
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </Button>
                  <Button variant="outline" size="sm">
                    <Pencil className="mr-2 h-4 w-4" />
                    Comment
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Delinquency by Loan Type</CardTitle>
                <CardDescription>Distribution of delinquent loans across different loan categories</CardDescription>
              </CardHeader>
              <CardContent>
                <DelinquencyChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Delinquency by Region</CardTitle>
                <CardDescription>Geographical distribution of delinquent loans</CardDescription>
              </CardHeader>
              <CardContent>
                <DelinquencyChart />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Data Visualization</CardTitle>
              <CardDescription>Convert table data into different chart types</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartVisualizer />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="underwriting" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Underwriting Performance</CardTitle>
                  <CardDescription>
                    Analysis of underwriting performance across different customer segments
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </Button>
                  <Button variant="outline" size="sm">
                    <Pencil className="mr-2 h-4 w-4" />
                    Comment
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <UnderwritingPerformanceChart />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Approval Rate by Segment</CardTitle>
                <CardDescription>Underwriting approval rates across different customer segments</CardDescription>
              </CardHeader>
              <CardContent>
                <UnderwritingPerformanceChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Performance Degradation</CardTitle>
                <CardDescription>Segments showing significant performance changes</CardDescription>
              </CardHeader>
              <CardContent>
                <UnderwritingPerformanceChart />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
              <CardDescription>AI-generated summary of underwriting performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border bg-muted p-4">
                <p className="text-sm">
                  The underwriting performance shows a significant degradation in the "Young Professional" segment, with
                  approval rates dropping by 15% compared to the previous quarter. This appears to be correlated with
                  recent changes in the credit scoring model. The "Small Business Owner" segment continues to perform
                  well, with stable approval rates and low default rates. Recommend reviewing the credit scoring
                  adjustments made in Q2 for the affected segments.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export Summary
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collaboration" className="space-y-4">
          <CollaborationPanel />
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Actions & Reports</CardTitle>
                  <CardDescription>Create and manage actions and reports for risk insights</CardDescription>
                </div>
                <Button onClick={() => setShowActionCreator(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="pending">
                <TabsList className="mb-4">
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <Card key={i}>
                        <CardHeader className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge variant={i % 3 === 0 ? "outline" : i % 3 === 1 ? "secondary" : "default"}>
                                {i % 3 === 0 ? "Pending Approval" : i % 3 === 1 ? "In Progress" : "Approved"}
                              </Badge>
                              <span className="text-sm text-muted-foreground">Created on July 15, 2023</span>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <span className="sr-only">Actions</span>
                                  <span className="text-xs">•••</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Share</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <CardTitle className="text-lg">
                            {i % 2 === 0 ? "Monthly Risk Report" : "Delinquency Alert for Auto Loans"}
                          </CardTitle>
                          <CardDescription>
                            {i % 2 === 0
                              ? "Comprehensive analysis of risk metrics for the month of July 2023"
                              : "Alert regarding increasing delinquency rates in the auto loan portfolio"}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="text-sm font-medium">Assigned to</p>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src="/placeholder-user.jpg" />
                                  <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <span className="text-sm">John Doe</span>
                              </div>
                            </div>
                            <Separator orientation="vertical" className="h-10" />
                            <div>
                              <p className="text-sm font-medium">Due Date</p>
                              <p className="text-sm">July 30, 2023</p>
                            </div>
                            <Separator orientation="vertical" className="h-10" />
                            <div>
                              <p className="text-sm font-medium">Priority</p>
                              <Badge variant={i % 3 === 0 ? "destructive" : i % 3 === 1 ? "default" : "outline"}>
                                {i % 3 === 0 ? "High" : i % 3 === 1 ? "Medium" : "Low"}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <div className="flex w-full items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                              </Button>
                            </div>
                            <div>
                              {i % 3 === 0 && (
                                <Button size="sm">
                                  <CheckCircle2 className="mr-2 h-4 w-4" />
                                  Approve
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <IntegrationPanel />
        </TabsContent>
      </Tabs>

      {showActionCreator && <ActionCreator onClose={() => setShowActionCreator(false)} />}
    </div>
  )
}

