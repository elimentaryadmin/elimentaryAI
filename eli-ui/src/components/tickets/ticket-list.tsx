"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ChevronDown, ChevronUp, AlertCircle, MessageSquare, Share2, Bell, TicketCheck, Clock, CheckCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { TicketDetails } from "./ticket-details"
import { SendReminderDialog } from "./send-reminder-dialog"
import { ShareTicketDialog } from "./share-ticket-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import React from "react"

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
    assignee: {
      displayName: string;
    };
    created: string;
    updated: string;
    labels: string[];
  };
}

interface TicketListProps {
  tickets: JiraTicket[] | { issues: JiraTicket[] };
  isLoading: boolean;
  error: Error | null;
}

export function TicketList({ tickets = [], isLoading, error }: TicketListProps) {
  const [expandedTicketId, setExpandedTicketId] = useState<string | null>(null)
  const [reminderTicketId, setReminderTicketId] = useState<string | null>(null)
  const [shareTicketId, setShareTicketId] = useState<string | null>(null)

  const toggleExpand = (ticketId: string) => {
    setExpandedTicketId(expandedTicketId === ticketId ? null : ticketId)
  }

  // Handle both direct array and API response structure
  const ticketList = Array.isArray(tickets) ? tickets : tickets.issues || []

  // Calculate ticket statistics
  const totalTickets = ticketList.length
  const inProgressTickets = ticketList.filter(ticket => 
    ticket.fields.status.name.toLowerCase() === "in progress"
  ).length
  const closedTickets = ticketList.filter(ticket => 
    ["done", "closed", "resolved"].includes(ticket.fields.status.name.toLowerCase())
  ).length

  // Safe date formatting function
  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return "N/A"
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return "Invalid date"
      return formatDistanceToNow(date, { addSuffix: true })
    } catch (error) {
      return "Invalid date"
    }
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load tickets: {error.message}</AlertDescription>
      </Alert>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-[100px]" />
          ))}
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    )
  }

  if (!ticketList || ticketList.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium">No tickets found</h3>
        <p className="text-muted-foreground">There are no tickets matching your criteria.</p>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-blue-500"
      case "in progress":
        return "bg-yellow-500"
      case "resolved":
        return "bg-green-500"
      case "done":
        return "bg-green-500"
      case "closed":
        return "bg-gray-500"
      case "blocked":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "highest":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      case "lowest":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* Ticket Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <TicketCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTickets}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressTickets}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Closed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{closedTickets}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tickets Table */}
      <Table className="border rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Key</TableHead>
            <TableHead>Summary</TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
            <TableHead className="w-[120px]">Priority</TableHead>
            <TableHead className="w-[150px]">Assignee</TableHead>
            <TableHead className="w-[150px]">Created</TableHead>
            <TableHead className="w-[150px]">Updated</TableHead>
            <TableHead className="w-[150px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ticketList.map((ticket) => (
            <React.Fragment key={ticket.id}>
              <TableRow key={`${ticket.id}-main`} className="hover:bg-muted/50">
                <TableCell className="font-medium">{ticket.key}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto mr-2"
                      onClick={() => toggleExpand(ticket.id)}
                    >
                      {expandedTicketId === ticket.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                    {ticket.fields.summary}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(ticket.fields.status.name)}>
                    {ticket.fields.status.name}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(ticket.fields.priority.name)}>
                    {ticket.fields.priority.name}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {ticket.fields.assignee ? (
                      <>
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs mr-2">
                          {ticket.fields.assignee.displayName.charAt(0)}
                        </div>
                        <span>{ticket.fields.assignee.displayName}</span>
                      </>
                    ) : (
                      <span className="text-muted-foreground">Unassigned</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>{formatDate(ticket.fields.created)}</TableCell>
                <TableCell>{formatDate(ticket.fields.updated)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setReminderTicketId(ticket.id)}
                      title="Send reminder"
                    >
                      <Bell className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => toggleExpand(ticket.id)} title="View comments">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShareTicketId(ticket.id)}
                      title="Share ticket"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              {expandedTicketId === ticket.id && (
                <TableRow key={`${ticket.id}-details`}>
                  <TableCell colSpan={8} className="p-0">
                    <TicketDetails ticket={ticket} />
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>

      {/* Reminder Dialog */}
      <SendReminderDialog
        open={!!reminderTicketId}
        onOpenChange={() => setReminderTicketId(null)}
        ticket={ticketList.find((t) => t.id === reminderTicketId)}
      />

      {/* Share Dialog */}
      <ShareTicketDialog
        open={!!shareTicketId}
        onOpenChange={() => setShareTicketId(null)}
        ticket={ticketList.find((t) => t.id === shareTicketId)}
      />
    </div>
  )
}

