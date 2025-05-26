"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertTriangle,
  ArrowUpDown,
  Calendar,
  Clock,
  Filter,
  Mail,
  Search,
  Share2,
  Slack,
  TicketCheck,
  TrendingDown,
  TrendingUp,
  CheckCircle,
  Loader2,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { createJiraTicket } from "@/lib/jira"
import { useCollaboration } from "@/hooks/use-collaboration"
import { getErrorMessage, getErrorAction } from "@/lib/error-mapping"
import { Toaster } from "@/components/ui/toaster"

export default function DelinquencyReviewPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLoans, setSelectedLoans] = useState<string[]>([])
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isJiraModalOpen, setIsJiraModalOpen] = useState(false)
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false)
  const [selectedLoanDetail, setSelectedLoanDetail] = useState<any>(null)
  const [shareOption, setShareOption] = useState("email")

  const {
    loading,
    error,
    errorAction,
    success,
    selectedLabels,
    setSelectedLabels,
    ticketFormData,
    setTicketFormData,
    handleCreateTicket,
    resetState
  } = useCollaboration({
    onSuccess: () => {
      // Close modal after 1 second
      setTimeout(() => {
        setIsJiraModalOpen(false);
        resetState();
      }, 1000);
    }
  });

  // Sample delinquent loans data
  const delinquentLoans = [
    {
      id: "UL-56789",
      type: "Unsecured Loan",
      customer: "Sarah Wilson",
      age: 24,
      amount: 12000,
      daysLate: 45,
      missedPayments: 2,
      creditScore: 650,
      riskLevel: "Medium",
      lastContact: "3 days ago",
      nextAction: "Follow-up call",
    },
    {
      id: "SL-12345",
      type: "Secured Loan",
      customer: "Michael Brown",
      age: 35,
      amount: 45000,
      daysLate: 60,
      missedPayments: 3,
      creditScore: 690,
      riskLevel: "High",
      lastContact: "1 week ago",
      nextAction: "Restructure proposal",
    },
    {
      id: "CD-45678",
      type: "Consumer Durables",
      customer: "Emily Johnson",
      age: 29,
      amount: 8500,
      daysLate: 30,
      missedPayments: 1,
      creditScore: 710,
      riskLevel: "Low",
      lastContact: "Yesterday",
      nextAction: "Payment reminder",
    },
    {
      id: "HL-23456",
      type: "Housing Loan",
      customer: "Robert Davis",
      age: 51,
      amount: 275000,
      daysLate: 90,
      missedPayments: 4,
      creditScore: 780,
      riskLevel: "Critical",
      lastContact: "2 weeks ago",
      nextAction: "Legal review",
    },
    {
      id: "UL-34567",
      type: "Unsecured Loan",
      customer: "Jennifer Lee",
      age: 32,
      amount: 15000,
      daysLate: 35,
      missedPayments: 1,
      creditScore: 675,
      riskLevel: "Medium",
      lastContact: "5 days ago",
      nextAction: "Payment plan discussion",
    },
  ]

  const filteredLoans = delinquentLoans.filter(
    (loan) =>
      loan.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loan.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loan.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSelectLoan = (loanId: string) => {
    if (selectedLoans.includes(loanId)) {
      setSelectedLoans(selectedLoans.filter((id) => id !== loanId))
    } else {
      setSelectedLoans([...selectedLoans, loanId])
    }
  }

  const handleSelectAll = () => {
    if (selectedLoans.length === filteredLoans.length) {
      setSelectedLoans([])
    } else {
      setSelectedLoans(filteredLoans.map((loan) => loan.id))
    }
  }

  const handleViewDetail = (loan: any) => {
    setSelectedLoanDetail(loan)
    setIsDetailViewOpen(true)
  }

  const handleShareReport = () => {
    setIsShareModalOpen(true)
  }

  const handleCreateJiraTicket = () => {
    setIsJiraModalOpen(true);
    resetState();
  }

  const handleCreateTicketClick = async () => {
    if (selectedLoans.length === 0) {
      await handleCreateTicket({
        summary: "",
        description: "",
        labels: [],
        status: "open"
      });
      return;
    }

    await handleCreateTicket({
      summary: ticketFormData.summary || `Delinquency Review Required - ${selectedLoans.length} Loans`,
      description: ticketFormData.description || `Please review and take appropriate action on the following delinquent loans:\n\n${selectedLoans.join(
        ", ",
      )}\n\nTotal loans: ${selectedLoans.length}`,
      ticketType: ticketFormData.ticketType,
      priority: ticketFormData.priority,
      assignee: ticketFormData.assignee,
      includeDetails: ticketFormData.includeDetails,
      labels: ["Underwriting", "Policy", "Delinquency"],
      status: "open"
    });
  }

  const handleSendEmail = () => {
    toast({
      title: "Report Shared",
      description: `Delinquency report for ${selectedLoans.length} loans has been sent via email.`,
    })
    setIsShareModalOpen(false)
  }

  const handleSendToSlack = () => {
    toast({
      title: "Report Shared",
      description: `Delinquency report for ${selectedLoans.length} loans has been sent to Slack.`,
    })
    setIsShareModalOpen(false)
  }

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
      case "High":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "Critical":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  const getDaysLateColor = (days: number) => {
    if (days < 30) return "text-amber-500"
    if (days < 60) return "text-orange-500"
    if (days < 90) return "text-red-500"
    return "text-red-700"
  }

  return (
    <div className="space-y-6">
      <Toaster />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Alert Reviews</h1>
        <p className="text-muted-foreground">Review and manage your alert pipeline</p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">187</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">187</div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search alerts..."
            className="w-full sm:w-[300px] pl-8 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button variant="outline" onClick={handleShareReport} disabled={selectedLoans.length === 0}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button onClick={handleCreateJiraTicket} disabled={selectedLoans.length === 0}>
            <TicketCheck className="mr-2 h-4 w-4" />
            Create Ticket
          </Button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="rounded-md bg-destructive/15 p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-destructive">Error</h3>
              <div className="mt-2 text-sm text-destructive">
                <p>{error}</p>
                {errorAction && (
                  <p className="mt-1 text-xs">{errorAction}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Loading tickets...</span>
        </div>
      )}

      {/* Delinquent Loans Table */}
      <Card>
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      <Checkbox
                        checked={selectedLoans.length === filteredLoans.length && filteredLoans.length > 0}
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all"
                      />
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <span>Loan ID</span>
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Type</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Amount</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Days Late</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Risk Level</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Last Contact</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {filteredLoans.map((loan) => (
                    <tr
                      key={loan.id}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <td className="p-4 align-middle">
                        <Checkbox
                          checked={selectedLoans.includes(loan.id)}
                          onCheckedChange={() => handleSelectLoan(loan.id)}
                          aria-label={`Select loan ${loan.id}`}
                        />
                      </td>
                      <td className="p-4 align-middle font-medium">{loan.id}</td>
                      <td className="p-4 align-middle">
                        <div>
                          <p>{loan.customer}</p>
                          <p className="text-xs text-muted-foreground">Age: {loan.age}</p>
                        </div>
                      </td>
                      <td className="p-4 align-middle">{loan.type}</td>
                      <td className="p-4 align-middle">${loan.amount.toLocaleString()}</td>
                      <td className="p-4 align-middle">
                        <span className={`font-medium ${getDaysLateColor(loan.daysLate)}`}>{loan.daysLate} days</span>
                        <p className="text-xs text-muted-foreground">{loan.missedPayments} missed payments</p>
                      </td>
                      <td className="p-4 align-middle">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getRiskLevelColor(
                            loan.riskLevel,
                          )}`}
                        >
                          {loan.riskLevel}
                        </span>
                      </td>
                      <td className="p-4 align-middle text-muted-foreground">{loan.lastContact}</td>
                      <td className="p-4 align-middle">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetail(loan)}>
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Share Modal */}
      <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Share Delinquency Report</DialogTitle>
            <DialogDescription>
              Share the delinquency report for {selectedLoans.length} selected loans.
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="email" onValueChange={(value) => setShareOption(value)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="slack">
                <Slack className="mr-2 h-4 w-4" />
                Slack
              </TabsTrigger>
            </TabsList>
            <TabsContent value="email" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="recipients">Recipients</Label>
                <Input id="recipients" placeholder="Enter email addresses" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  defaultValue={`Delinquency Report - ${selectedLoans.length} Loans - ${new Date().toLocaleDateString()}`}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Add a message..."
                  defaultValue={`Please review the attached delinquency report for ${selectedLoans.length} loans that require attention.`}
                  rows={4}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="include-details" defaultChecked />
                <label
                  htmlFor="include-details"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Include detailed loan information
                </label>
              </div>
            </TabsContent>
            <TabsContent value="slack" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="channel">Slack Channel</Label>
                <Select defaultValue="delinquency-alerts">
                  <SelectTrigger>
                    <SelectValue placeholder="Select channel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="delinquency-alerts">#delinquency-alerts</SelectItem>
                    <SelectItem value="loan-portfolio">#loan-portfolio</SelectItem>
                    <SelectItem value="risk-management">#risk-management</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="slack-message">Message</Label>
                <Textarea
                  id="slack-message"
                  placeholder="Add a message..."
                  defaultValue={`@channel Please review the delinquency report for ${selectedLoans.length} loans that require attention.`}
                  rows={4}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="include-details-slack" defaultChecked />
                <label
                  htmlFor="include-details-slack"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Include detailed loan information
                </label>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsShareModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={shareOption === "email" ? handleSendEmail : handleSendToSlack}>
              {shareOption === "email" ? "Send Email" : "Send to Slack"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Jira Ticket Modal */}
      <Dialog open={isJiraModalOpen} onOpenChange={setIsJiraModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Jira Ticket</DialogTitle>
            <DialogDescription>
              Create a Jira ticket for {selectedLoans.length} selected delinquent loans.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ticket-type">Ticket Type</Label>
              <Select 
                defaultValue={ticketFormData.ticketType}
                onValueChange={(value) => setTicketFormData(prev => ({ ...prev, ticketType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select ticket type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="task">Task</SelectItem>
                  <SelectItem value="bug">Bug</SelectItem>
                  <SelectItem value="story">Story</SelectItem>
                  <SelectItem value="epic">Epic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select 
                defaultValue={ticketFormData.priority}
                onValueChange={(value) => setTicketFormData(prev => ({ ...prev, priority: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="highest">Highest</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignee">Assignee</Label>
              <Select 
                defaultValue={ticketFormData.assignee}
                onValueChange={(value) => setTicketFormData(prev => ({ ...prev, assignee: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delinquency-team">Delinquency Team</SelectItem>
                  <SelectItem value="john.smith">John Smith</SelectItem>
                  <SelectItem value="sarah.johnson">Sarah Johnson</SelectItem>
                  <SelectItem value="michael.brown">Michael Brown</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Input 
                id="summary" 
                defaultValue={ticketFormData.summary || `Delinquency Review Required - ${selectedLoans.length} Loans`}
                onChange={(e) => setTicketFormData(prev => ({ ...prev, summary: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Add a description..."
                defaultValue={ticketFormData.description || `Please review and take appropriate action on the following delinquent loans:\n\n${selectedLoans.join(
                  ", ",
                )}\n\nTotal loans: ${selectedLoans.length}`}
                onChange={(e) => setTicketFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="include-loan-details" 
                defaultChecked={ticketFormData.includeDetails}
                onCheckedChange={(checked) => 
                  setTicketFormData(prev => ({ ...prev, includeDetails: checked as boolean }))
                }
              />
              <label
                htmlFor="include-loan-details"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Include detailed loan information
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsJiraModalOpen(false);
                resetState();
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateTicketClick} 
              disabled={loading}
              variant={error ? "destructive" : success ? "default" : "default"}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : error ? (
                <div className="flex flex-col items-center">
                  <div className="flex items-center">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    {error}
                  </div>
                  {errorAction && (
                    <span className="text-xs mt-1">{errorAction}</span>
                  )}
                </div>
              ) : success ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Ticket Created!
                </>
              ) : (
                "Create Ticket"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Loan Detail View */}
      <Dialog open={isDetailViewOpen} onOpenChange={setIsDetailViewOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Loan Details</DialogTitle>
            <DialogDescription>Detailed information for loan {selectedLoanDetail?.id}</DialogDescription>
          </DialogHeader>
          {selectedLoanDetail && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Loan Information</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Loan ID:</span>
                      <span className="text-sm font-medium">{selectedLoanDetail.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Type:</span>
                      <span className="text-sm font-medium">{selectedLoanDetail.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Amount:</span>
                      <span className="text-sm font-medium">${selectedLoanDetail.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Days Late:</span>
                      <span className={`text-sm font-medium ${getDaysLateColor(selectedLoanDetail.daysLate)}`}>
                        {selectedLoanDetail.daysLate} days
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Missed Payments:</span>
                      <span className="text-sm font-medium">{selectedLoanDetail.missedPayments}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Customer Information</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Name:</span>
                      <span className="text-sm font-medium">{selectedLoanDetail.customer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Age:</span>
                      <span className="text-sm font-medium">{selectedLoanDetail.age}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Credit Score:</span>
                      <span className="text-sm font-medium">{selectedLoanDetail.creditScore}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Risk Level:</span>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getRiskLevelColor(
                          selectedLoanDetail.riskLevel,
                        )}`}
                      >
                        {selectedLoanDetail.riskLevel}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Last Contact:</span>
                      <span className="text-sm font-medium">{selectedLoanDetail.lastContact}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Action Plan</h3>
                <div className="rounded-md border p-3">
                  <p className="text-sm">Next Action: {selectedLoanDetail.nextAction}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Contact History</h3>
                <div className="rounded-md border p-3 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium">Phone Call</p>
                      <p className="text-xs text-muted-foreground">
                        Discussed payment options and promised to pay by end of week
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">3 days ago</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-xs text-muted-foreground">Sent payment reminder and late fee notification</p>
                    </div>
                    <span className="text-xs text-muted-foreground">1 week ago</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium">SMS</p>
                      <p className="text-xs text-muted-foreground">Automated payment reminder sent</p>
                    </div>
                    <span className="text-xs text-muted-foreground">2 weeks ago</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Add Note</h3>
                <Textarea placeholder="Add a note about this delinquent loan..." rows={2} />
              </div>
            </div>
          )}
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" onClick={() => setIsDetailViewOpen(false)}>
                Cancel
              </Button>
              <Button variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Email Customer
              </Button>
              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
            <Button
              onClick={() => {
                toast({
                  title: "Note Added",
                  description: "Your note has been added to the loan record.",
                })
                setIsDetailViewOpen(false)
              }}
            >
              Save Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
