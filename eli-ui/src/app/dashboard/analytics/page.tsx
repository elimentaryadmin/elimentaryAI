import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, PieChart, LineChart, Calendar, Download, Share2, Filter, Users } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Loan Portfolio Analytics</h1>
        <p className="text-muted-foreground">
          Detailed analytics and insights for your loan portfolio.
        </p>
      </div>

      {/* Analytics Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex gap-2">
          <Button>
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Portfolio Performance</CardTitle>
          <CardDescription>
            Performance overview for the last 12 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full rounded-md border bg-muted flex items-center justify-center">
            <LineChart className="h-8 w-8 text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Loan Performance Chart</span>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Loan Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Loan Type Distribution</CardTitle>
            <CardDescription>
              Current distribution of your loan portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full rounded-md border bg-muted flex flex-col items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-sm">Housing Loans</span>
                    </div>
                    <span className="text-sm font-medium">62%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-2 w-[62%] rounded-full bg-blue-500"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">Consumer Durables</span>
                    </div>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-2 w-[15%] rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                      <span className="text-sm">Secured Loans</span>
                    </div>
                    <span className="text-sm font-medium">13%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-2 w-[13%] rounded-full bg-purple-500"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
                      <span className="text-sm">Unsecured Loans</span>
                    </div>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-2 w-[10%] rounded-full bg-amber-500"></div>
                  </div>
                </div>
              </div>
              <PieChart className="h-8 w-8 text-muted-foreground mt-4" />
              <span className="text-muted-foreground">Loan Distribution Chart</span>
            </div>
          </CardContent>
        </Card>

        {/* Delinquency by Loan Type */}
        <Card>
          <CardHeader>
            <CardTitle>Delinquency by Loan Type</CardTitle>
            <CardDescription>
              Delinquency rates across different loan types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full rounded-md border bg-muted flex items-center justify-center">
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Delinquency Chart</span>
            </div>
          </CardContent>
        </Card>

        {/* Age Demographics */}
        <Card>
          <CardHeader>
            <CardTitle>Age Demographics</CardTitle>
            <CardDescription>
              Loan distribution by customer age groups
            </CardDescription>
          </CardHeader>
          <CardContent>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="font-medium">Customer Age Distribution</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">18-25 years</span>
                    <span className="text-sm font-medium">8%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-2 w-[8%] rounded-full bg-primary"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">26-35 years</span>
                    <span className="text-sm font-medium">27%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-2 w-[27%] rounded-full bg-primary"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">36-45 years</span>
                    <span className="text-sm font-medium">35%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-2 w-[35%] rounded-full bg-primary"></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
