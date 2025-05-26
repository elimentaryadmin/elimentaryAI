"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tickets, Ticket, TicketCheck, Settings, Users, Bell, Shield, Database, Lock, Globe, Cpu, BarChart3, Sliders, CreditCard, CheckCircle, AlertCircle, Clock, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { API_CONFIG } from "@/config/api"

interface JiraTicket {
  id: string;
  key: string;
  fields: {
    summary: string;
    description: string;
    status: {
      name: string;
    };
    priority: {
      name: string;
    };
    issuetype: {
      id: string;
      name: string;
    };
    assignee: {
      displayName: string;
    };
    created: string;
    updated: string;
    labels: string[];
  };
}

export default function AdminConsolePage() {
  const { toast } = useToast()
  const [aiModelStatus, setAiModelStatus] = useState("Active")
  const [tickets, setTickets] = useState<JiraTicket[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleRetrainModel = () => {
    toast({
      title: "AI Model Retraining Initiated",
      description: "The loan portfolio AI model retraining process has been started. This may take several hours.",
    })
  }

  const handleToggleAIStatus = () => {
    const newStatus = aiModelStatus === "Active" ? "Paused" : "Active"
    setAiModelStatus(newStatus)
    toast({
      title: `AI Model ${newStatus}`,
      description: `The loan portfolio AI model has been ${newStatus === "Active" ? "activated" : "paused"}.`,
    })
  }

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.JIRA_API.BASE_URL}${API_CONFIG.JIRA_API.ENDPOINTS.GET_ISSUES_BY_PROJECT}?projectKey=MAQ`,
          {
            headers: API_CONFIG.JIRA_API.HEADERS
          }
        )
        if (response.data && response.data.issues) {
          setTickets(response.data.issues)
        } else {
          setTickets([])
        }
      } catch (err) {
        setError('Failed to fetch tickets. Please try again later.')
        console.error('Error fetching tickets:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTickets()
  }, [])

  // Calculate ticket statistics
  const totalTickets = tickets.length
  const openTickets = tickets.filter(ticket => 
    ticket.fields.status.name.toLowerCase() === "open"
  ).length
  const inProgressTickets = tickets.filter(ticket => 
    ticket.fields.status.name.toLowerCase() === "in progress"
  ).length

  const renderTicketStats = () => {
    if (isLoading) {
      return (
        <>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[60px]" />
              <Skeleton className="h-4 w-[150px] mt-1" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[60px]" />
              <Skeleton className="h-4 w-[150px] mt-1" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[60px]" />
              <Skeleton className="h-4 w-[150px] mt-1" />
            </CardContent>
          </Card>
        </>
      )
    }

    if (error) {
      return (
        <div className="col-span-3">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )
    }

    return (
      <>
        <Card onClick={() => window.location.href = "/dashboard/admin/tickets"}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <Tickets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTickets}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total number of tickets in the project
            </p>
          </CardContent>
        </Card>
        <Card onClick={() => window.location.href = "/dashboard/admin/tickets"}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openTickets}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Tickets that need attention
            </p>
          </CardContent>
        </Card>
        <Card onClick={() => window.location.href = "/dashboard/admin/tickets"}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressTickets}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Tickets currently being worked on
            </p>
          </CardContent>
        </Card>
      </>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Admin Console</h1>
        <p className="text-muted-foreground">
          Review all the actions and configurations
        </p>
      </div>

      {/* Admin Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {renderTicketStats()}
      </div>

      {/* Admin Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* AI Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Cpu className="mr-2 h-5 w-5" />
              Loan Portfolio AI Configuration
            </CardTitle>
            <CardDescription>Manage AI model settings and behavior for loan analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Model Version</span>
                <span>v2.4.1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Accuracy</span>
                <span>85.3%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Last Trained</span>
                <span>90 days ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Status</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    aiModelStatus === "Active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                  }`}
                >
                  {aiModelStatus}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={handleRetrainModel}>
                <BarChart3 className="mr-2 h-4 w-4" />
                Retrain Model
              </Button>
              <Button variant={aiModelStatus === "Active" ? "destructive" : "default"} onClick={handleToggleAIStatus}>
                <Sliders className="mr-2 h-4 w-4" />
                {aiModelStatus === "Active" ? "Pause Model" : "Activate Model"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Alert Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Loan Risk Alert Configuration
            </CardTitle>
            <CardDescription>Manage system-wide loan risk alert settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Default Risk Threshold</span>
                <span>Medium</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Alert Retention Period</span>
                <span>90 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Email Notifications</span>
                <span>Enabled</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Delinquency Alert Threshold</span>
                <span>30+ days</span>
              </div>
            </div>
            <Button>Configure Alert Settings</Button>
          </CardContent>
        </Card>
      </div>

      {/* Credit Bureau Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Credit Bureau Integration</CardTitle>
          <CardDescription>Manage credit bureau data integration and settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">API Configuration</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Status</span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">Connected</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Version</span>
                    <span className="text-sm font-medium">v3.2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Request Limit</span>
                    <span className="text-sm font-medium">10,000/day</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Requests Today</span>
                    <span className="text-sm font-medium">3,245</span>
                  </div>
                </div>
                <Button size="sm" className="mt-4">
                  <Settings className="mr-2 h-4 w-4" />
                  Configure API
                </Button>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">Data Refresh Settings</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Automatic Refresh</span>
                    <span className="text-sm font-medium">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Refresh Frequency</span>
                    <span className="text-sm font-medium">Quarterly</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Refresh Time</span>
                    <span className="text-sm font-medium">9:00 AM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last Refresh</span>
                    <span className="text-sm font-medium">Today, 9:00 AM</span>
                  </div>
                </div>
                <Button size="sm" className="mt-4">
                  <Sliders className="mr-2 h-4 w-4" />
                  Adjust Schedule
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            System Logs
          </CardTitle>
          <CardDescription>View system activity and error logs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-[200px] overflow-auto rounded-md border p-4 text-sm">
            <div className="space-y-2">
              <div>
                <span className="text-muted-foreground">[2023-09-01 14:32:15]</span> Loan portfolio AI model updated
                to version 2.4.1
              </div>
              <div>
                <span className="text-muted-foreground">[2023-09-01 12:15:03]</span> Credit bureau API integration
                refreshed
              </div>
              <div>
                <span className="text-muted-foreground">[2023-09-01 10:05:47]</span> New underwriter added:
                sarah.johnson@example.com
              </div>
              <div>
                <span className="text-muted-foreground">[2023-09-01 09:12:33]</span> Risk threshold updated for
                unsecured loans
              </div>
              <div>
                <span className="text-muted-foreground">[2023-08-31 18:45:22]</span> Loan database optimization
                completed
              </div>
            </div>
          </div>
          <Button variant="outline">View All Logs</Button>
        </CardContent>
      </Card>
    </div>
  )
}
