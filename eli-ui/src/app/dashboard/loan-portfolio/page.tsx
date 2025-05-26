import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, ShoppingBag, Lock, CreditCard, Filter, Download, Search, ArrowUpDown } from "lucide-react"

export default function LoanPortfolioPage() {
  // Sample loan data
  const loans = [
    {
      id: "HL-78945",
      type: "Housing Loan",
      customer: "John Smith",
      age: 42,
      amount: 320000,
      term: "30 years",
      interestRate: "4.5%",
      creditScore: 745,
      status: "Current",
      icon: Home,
    },
    {
      id: "CD-45678",
      type: "Consumer Durables",
      customer: "Emily Johnson",
      age: 29,
      amount: 8500,
      term: "3 years",
      interestRate: "8.2%",
      creditScore: 710,
      status: "Current",
      icon: ShoppingBag,
    },
    {
      id: "SL-12345",
      type: "Secured Loan",
      customer: "Michael Brown",
      age: 35,
      amount: 45000,
      term: "5 years",
      interestRate: "6.7%",
      creditScore: 690,
      status: "30+ Days Late",
      icon: Lock,
    },
    {
      id: "UL-56789",
      type: "Unsecured Loan",
      customer: "Sarah Wilson",
      age: 24,
      amount: 12000,
      term: "2 years",
      interestRate: "12.5%",
      creditScore: 650,
      status: "Current",
      icon: CreditCard,
    },
    {
      id: "HL-23456",
      type: "Housing Loan",
      customer: "Robert Davis",
      age: 51,
      amount: 275000,
      term: "25 years",
      interestRate: "4.2%",
      creditScore: 780,
      status: "Current",
      icon: Home,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Current":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "30+ Days Late":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
      case "60+ Days Late":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "90+ Days Late":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Loan Portfolio</h1>
        <p className="text-muted-foreground">Manage and monitor your loan portfolio details.</p>
      </div>

      {/* Loan Portfolio Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search loans..."
            className="w-full sm:w-[300px] pl-8 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Loan Type Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Housing Loans</CardTitle>
            <Home className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$152.4M</div>
            <p className="text-xs text-muted-foreground">1,245 active loans</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consumer Durables</CardTitle>
            <ShoppingBag className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$36.8M</div>
            <p className="text-xs text-muted-foreground">4,567 active loans</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Secured Loans</CardTitle>
            <Lock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$31.9M</div>
            <p className="text-xs text-muted-foreground">2,134 active loans</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unsecured Loans</CardTitle>
            <CreditCard className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24.6M</div>
            <p className="text-xs text-muted-foreground">3,789 active loans</p>
          </CardContent>
        </Card>
      </div>

      {/* Loan Portfolio Table */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Details</CardTitle>
          <CardDescription>Detailed view of loans in your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <span>Loan ID</span>
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Type</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Age</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Amount</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Credit Score</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {loans.map((loan) => {
                    const Icon = loan.icon
                    return (
                      <tr
                        key={loan.id}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle font-medium">{loan.id}</td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center">
                            <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
                            {loan.type}
                          </div>
                        </td>
                        <td className="p-4 align-middle">{loan.customer}</td>
                        <td className="p-4 align-middle">{loan.age}</td>
                        <td className="p-4 align-middle">${loan.amount.toLocaleString()}</td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center">
                            <div
                              className={`h-2 w-2 rounded-full mr-2 ${
                                loan.creditScore >= 740
                                  ? "bg-green-500"
                                  : loan.creditScore >= 670
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                              }`}
                            ></div>
                            {loan.creditScore}
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(loan.status)}`}
                          >
                            {loan.status}
                          </span>
                        </td>
                        <td className="p-4 align-middle">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credit Bureau Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Credit Bureau Integration</CardTitle>
          <CardDescription>Automated underwriting insights from credit bureaus</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-medium mb-2">Underwriting Criteria</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm font-medium">Credit Score Threshold</p>
                  <p className="text-sm text-muted-foreground">Minimum: 620 for unsecured, 580 for secured</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Debt-to-Income Ratio</p>
                  <p className="text-sm text-muted-foreground">Maximum: 43% for housing, 50% for others</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Payment History</p>
                  <p className="text-sm text-muted-foreground">No more than 2 late payments in 24 months</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-medium mb-2">Bureau Data Refresh</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">
                    Last data refresh: <span className="font-medium">Today, 09:45 AM</span>
                  </p>
                  <p className="text-sm text-muted-foreground">Automated daily refresh at 9:00 AM</p>
                </div>
                <Button>Refresh Now</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

