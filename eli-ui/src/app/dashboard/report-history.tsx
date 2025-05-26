import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download, Eye, FileCheck, FileWarning } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function ReportHistory() {
  const reportHistory = [
    {
      id: "rep-001",
      name: "Monthly Business Review - March 2025",
      type: "Internal",
      submittedDate: "April 5, 2025",
      status: "Approved",
      submittedBy: "Jane Smith",
    },
    {
      id: "rep-002",
      name: "FCA Compliance Report - H2 2024",
      type: "Regulatory",
      submittedDate: "Dec 31, 2024",
      status: "Approved",
      submittedBy: "John Doe",
    },
    {
      id: "rep-003",
      name: "Quarterly Business Review - Q1 2025",
      type: "Internal",
      submittedDate: "Mar 15, 2025",
      status: "Approved",
      submittedBy: "Alex Johnson",
    },
    {
      id: "rep-004",
      name: "Federal Reserve Report - Q1 2025",
      type: "Regulatory",
      submittedDate: "April 25, 2025",
      status: "Rejected",
      submittedBy: "Sarah Williams",
    },
    {
      id: "rep-005",
      name: "AML/KYC Compliance Report - April 2025",
      type: "Regulatory",
      submittedDate: "May 10, 2025",
      status: "Pending Review",
      submittedBy: "Michael Brown",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-900">
            <FileCheck className="mr-1 h-3 w-3" />
            {status}
          </Badge>
        )
      case "Rejected":
        return (
          <Badge variant="destructive">
            <FileWarning className="mr-1 h-3 w-3" />
            {status}
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="w-full p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Report History</h2>
        <p className="text-muted-foreground">View and manage your previously submitted reports</p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Submitted Date</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportHistory.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.name}</TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell>{report.submittedDate}</TableCell>
                <TableCell>{report.submittedBy}</TableCell>
                <TableCell>{getStatusBadge(report.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

