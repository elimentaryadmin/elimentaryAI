"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Filter,
  Plus,
  Settings,
  TrendingDown,
  CreditCard,
  Home,
  ShoppingBag,
  Lock,
} from "lucide-react"

export default function AlertsPage() {
  const router = useRouter()

  const alerts = [
    {
      id: 1,
      title: "Increased delinquency in unsecured loans",
      description: "Delinquency rate for unsecured loans has increased by 1.2% in the last 30 days.",
      severity: "high",
      timestamp: "2 hours ago",
      status: "active",
      icon: CreditCard,
      loanType: "Unsecured Loans",
      affectedCustomers: "Age group: 25-35",
    },
    {
      id: 2,
      title: "Credit score decline in 30-40 age group",
      description: "Average credit score for customers aged 30-40 has declined by 15 points.",
      severity: "medium",
      timestamp: "Yesterday",
      status: "active",
      icon: AlertTriangle,
      loanType: "All Loans",
      affectedCustomers: "Age group: 30-40",
    },
    {
      id: 3,
      title: "Housing loan prepayments increased",
      description: "Prepayment rate for housing loans has increased by 5% this month.",
      severity: "low",
      timestamp: "3 days ago",
      status: "resolved",
      icon: Home,
      loanType: "Housing Loans",
      affectedCustomers: "Age group: 40-60",
    },
    {
      id: 4,
      title: "Consumer durables default risk",
      description: "AI model predicts increased default risk for consumer durables in the next quarter.",
      severity: "medium",
      timestamp: "1 week ago",
      status: "active",
      icon: ShoppingBag,
      loanType: "Consumer Durables",
      affectedCustomers: "Age group: 18-30",
    },
    {
      id: 5,
      title: "Secured loan collateral value decrease",
      description: "Average collateral value for secured loans has decreased by 3.5%.",
      severity: "medium",
      timestamp: "2 weeks ago",
      status: "active",
      icon: Lock,
      loanType: "Secured Loans",
      affectedCustomers: "All age groups",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-amber-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Metrics & Signals</h1>
        <p className="text-muted-foreground">Monitor and manage your portfolio</p>
      </div>

      {/* Alert Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex gap-2">
          <Button>
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Configure
          </Button>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create
        </Button>
      </div>

      {/* Alert Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
          </CardContent>
        </Card>
      </div>

      {/* Alert List */}
      <Card>
        <CardHeader>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => {
              const Icon = alert.icon
              return (
                <div key={alert.id} className="flex items-start p-4 rounded-lg border">
                  <div className={`mr-4 p-2 rounded-full ${getSeverityColor(alert.severity)}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{alert.title}</h3>
                      <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                        {alert.loanType}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                        {alert.affectedCustomers}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          alert.status === "active"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        }`}
                      >
                        {alert.status === "active" ? "Active" : "Resolved"}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/alert-reviews")}>
                      {alert.status === "active" ? "Review" : "Reopen"}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
