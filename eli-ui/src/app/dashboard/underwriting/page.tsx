"use client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Share2, Plus, Filter, Calendar, BarChart3, PieChart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Settings,
  FileText,
  AlertTriangle,
  CheckCircle,
  Sliders,
  CreditCard,
  Home,
  ShoppingBag,
  Lock,
} from "lucide-react"
import { useState } from "react";

export default function UnderwritingPage() {
  const [approvalRateToggle, setApprovalRateToggle] = useState(true);
  const [creditLossesToggle, setCreditLossesToggle] = useState(true);
  const [interestRateMarginToggle, setInterestMarginToggle] = useState(false);
  

  const router = useRouter()
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Underwriting</h1>
        <p className="text-muted-foreground">Manage and monitor loan underwriting criteria and performance.</p>
      </div>
      {/* Report Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Button onClick={() => router.push("/dashboard/create-rules")}>
          <Plus className="mr-2 h-4 w-4" />
          Create Rules
        </Button>
      </div>

      {/* Underwriting Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.5%</div>
            <p className="text-xs text-muted-foreground">+2.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Decision Time</CardTitle>
            <Shield className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2 hrs</div>
            <p className="text-xs text-muted-foreground">-0.8 hrs from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Manual Review Rate</CardTitle>
            <FileText className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.3%</div>
            <p className="text-xs text-muted-foreground">-1.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Exceptions</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.8%</div>
            <p className="text-xs text-muted-foreground">+0.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Underwriting Criteria by Loan Type */}
      <Card>
        <CardHeader>
          <CardTitle>Underwriting Criteria by Loan Type</CardTitle>
          <CardDescription>Current criteria and thresholds for each loan type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="rounded-lg border p-4">
              <div className="flex items-center mb-4">
                <Home className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-medium">Housing Loans</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm font-medium">Credit Score</p>
                  <p className="text-sm text-muted-foreground">Minimum: 620</p>
                  <div className="h-2 w-full rounded-full bg-secondary mt-2">
                    <div className="h-2 w-[62%] rounded-full bg-blue-500"></div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Debt-to-Income Ratio</p>
                  <p className="text-sm text-muted-foreground">Maximum: 43%</p>
                  <div className="h-2 w-full rounded-full bg-secondary mt-2">
                    <div className="h-2 w-[43%] rounded-full bg-blue-500"></div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Loan-to-Value Ratio</p>
                  <p className="text-sm text-muted-foreground">Maximum: 80%</p>
                  <div className="h-2 w-full rounded-full bg-secondary mt-2">
                    <div className="h-2 w-[80%] rounded-full bg-amber-500"></div>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => router.push("/dashboard/edit-rules")}>
                <Settings className="mr-2 h-4 w-4" />
                Adjust Criteria
              </Button>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center mb-4">
                <ShoppingBag className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="text-lg font-medium">Consumer Durables</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm font-medium">Credit Score</p>
                  <p className="text-sm text-muted-foreground">Minimum: 600</p>
                  <div className="h-2 w-full rounded-full bg-secondary mt-2">
                    <div className="h-2 w-[60%] rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Debt-to-Income Ratio</p>
                  <p className="text-sm text-muted-foreground">Maximum: 50%</p>
                  <div className="h-2 w-full rounded-full bg-secondary mt-2">
                    <div className="h-2 w-[50%] rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Payment History</p>
                  <p className="text-sm text-muted-foreground">Max 2 late payments in 24 months</p>
                  <div className="h-2 w-full rounded-full bg-secondary mt-2">
                    <div className="h-2 w-[75%] rounded-full bg-green-500"></div>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => router.push("/dashboard/create-rules")}>
                <Settings className="mr-2 h-4 w-4" />
                Adjust Criteria
              </Button>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center mb-4">
                <Lock className="h-5 w-5 text-purple-500 mr-2" />
                <h3 className="text-lg font-medium">Secured Loans</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm font-medium">Credit Score</p>
                  <p className="text-sm text-muted-foreground">Minimum: 580</p>
                  <div className="h-2 w-full rounded-full bg-secondary mt-2">
                    <div className="h-2 w-[58%] rounded-full bg-purple-500"></div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Collateral Value</p>
                  <p className="text-sm text-muted-foreground">Minimum: 120% of loan</p>
                  <div className="h-2 w-full rounded-full bg-secondary mt-2">
                    <div className="h-2 w-[85%] rounded-full bg-purple-500"></div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Payment History</p>
                  <p className="text-sm text-muted-foreground">Max 3 late payments in 24 months</p>
                  <div className="h-2 w-full rounded-full bg-secondary mt-2">
                    <div className="h-2 w-[70%] rounded-full bg-purple-500"></div>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => router.push("/dashboard/create-rules")}>
                <Settings className="mr-2 h-4 w-4" />
                Adjust Criteria
              </Button>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center mb-4">
                <CreditCard className="h-5 w-5 text-pink-500 mr-2" />
                <h3 className="text-lg font-medium">Unsecured Loans</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm font-medium">Credit Score</p>
                  <p className="text-sm text-muted-foreground">Minimum: 650</p>
                  <div className="h-2 w-full rounded-full bg-secondary mt-2">
                    <div className="h-2 w-[65%] rounded-full bg-pink-500"></div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Debt-to-Income Ratio</p>
                  <p className="text-sm text-muted-foreground">Maximum: 45%</p>
                  <div className="h-2 w-full rounded-full bg-secondary mt-2">
                    <div className="h-2 w-[45%] rounded-full bg-pink-500"></div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Employment History</p>
                  <p className="text-sm text-muted-foreground">Minimum: 1 year current employer</p>
                  <div className="h-2 w-full rounded-full bg-secondary mt-2">
                    <div className="h-2 w-[80%] rounded-full bg-pink-500"></div>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => router.push("/dashboard/create-rules")}>
                <Settings className="mr-2 h-4 w-4" />
                Adjust Criteria
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Underwriting Recommendations */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">

        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5 text-primary" />
            AI Underwriting Recommendations
          </CardTitle>
          <CardDescription>AI-generated recommendations to optimize underwriting criteria</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 flex items-center justify-between border rounded-lg">
                  <span className="text-gray-800 font-medium">Approval Rate</span>
                  <div
                  className={`w-12 h-6 rounded-full relative cursor-pointer ${
                    approvalRateToggle ? "bg-teal-400" : "bg-gray-200"
                  }`}
                  onClick={() => setApprovalRateToggle(!approvalRateToggle)}
                  >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    approvalRateToggle ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  ></div>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between border rounded-lg">
                  <span className="text-gray-800 font-medium">Deliquency Rate</span>
                  <div
                  className={`w-12 h-6 rounded-full relative cursor-pointer ${
                    creditLossesToggle ? "bg-teal-400" : "bg-gray-200"
                  }`}
                  onClick={() => setCreditLossesToggle(!creditLossesToggle)}
                  >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    creditLossesToggle ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  ></div>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between border rounded-lg">
                  <span className="text-gray-800 font-medium">Interest Margin</span>
                  <div
                  className={`w-12 h-6 rounded-full relative cursor-pointer ${
                    interestRateMarginToggle ? "bg-teal-400" : "bg-gray-200"
                  }`}
                  onClick={() => setApprovalRateToggle(!interestRateMarginToggle)} // Kept purposely to avoid toggling during the DEMO
                  >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    interestRateMarginToggle ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  ></div>
                  </div>
                </div>
                </div>

            <div className="rounded-lg border bg-white dark:bg-gray-900 p-4">
              <h3 className="font-medium mb-2">Unsecured Loans</h3>
              <p className="text-sm text-muted-foreground mb-2">
              Based on recent performance data, consider adjusting the following:
              </p>
              <ul className="text-sm space-y-1 list-disc pl-5">
              <li>Implement tiered interest rates based on credit score bands</li>
              <li>Add additional verification for borrowers with recent address changes</li>
              <li>Reduce maximum loan amount for borrowers with DTI &gt; 40%</li>
              </ul>
              <p className="text-sm text-primary mt-2">Projected impact: -0.3% approval rate, -2.1% delinquency rate</p>
            </div>

            <div className="flex justify-start mt-4">
              <Button onClick={() => alert("Deploying changes...")}>
              <Sparkles className="mr-2 h-4 w-4" />
              Accept
              </Button>
            </div>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
