"use client"

import { useState, useEffect } from "react"
import type { Ticket } from "@/types/ticket"

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchTickets = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // In a real app, this would be an API call
      // const response = await fetch("/api/tickets")
      // const data = await response.json()
      // setTickets(data)

      // Simulate API call with mock data
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setTickets(mockTickets)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch tickets"))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [])

  return {
    tickets,
    isLoading,
    error,
    refresh: fetchTickets,
  }
}

// Mock data for tickets
const mockTickets: Ticket[] = [
  {
    id: "1",
    key: "PROJ-123",
    summary: "Increase the bureau cut-off to 700 for Mortgage loans",
    description: "The bureau cut-off for Mortgage loans is currently set to 650. We need to increase it to 700 to align with the new policy.",
    status: "In Progress",
    priority: "High",
    type: "Bug",
    assignee: {
      id: "user1",
      name: "Jane Smith",
      email: "jane@example.com",
      avatarUrl: "",
    },
    reporter: {
      id: "user2",
      name: "John Doe",
      email: "john@example.com",
      avatarUrl: "",
    },
    createdAt: "2025-05-10T09:00:00Z",
    updatedAt: "2025-05-13T14:30:00Z",
    dueDate: "2025-05-14T00:00:00Z",
    components: ["Underwriting", "Policy"],
    labels: ["urgent"],
    comments: [
      {
        id: "comment1",
        author: {
          id: "user2",
          name: "John Doe",
          email: "john@example.com",
          avatarUrl: "",
        },
        content: "The issue is picked in the current sprint.",
        createdAt: "2025-05-13T14:00:00Z",
      },
      {
        id: "comment2",
        author: {
          id: "user1",
          name: "Jane Smith",
          email: "jane@example.com",
          avatarUrl: "",
        },
        content: "Working on it. Should be ready for testing by tomorrow.",
        createdAt: "2025-05-13T14:20:00Z",
      },
    ],
    activityLog: [
      {
        user: {
          id: "user2",
          name: "John Doe",
          email: "john@example.com",
          avatarUrl: "",
        },
        action: "Created the issue",
        timestamp: "2025-05-13T14:00:00Z",
      },
      {
        user: {
          id: "user1",
          name: "Jane Smith",
          email: "jane@example.com",
          avatarUrl: "",
        },
        action: "Changed status from 'Open' to 'In Progress'",
        timestamp: "2025-05-13T14:20:00Z",
      },
      {
        user: {
          id: "user3",
          name: "Mike Johnson",
          email: "mike@example.com",
          avatarUrl: "",
        },
        action: "Added label 'urgent'",
        timestamp: "2025-05-13T14:30:00Z",
      },
    ],
  },
  {
    id: "2",
    key: "PROJ-124",
    summary: "Increase the debt to income ratio for top cohort",
    description: "We see good performance in the top cohort. We need to increase the debt to income ratio to 51% for this group.",
    status: "Open",
    priority: "Medium",
    type: "Feature",
    assignee: null,
    reporter: {
      id: "user3",
      name: "Mike Johnson",
      email: "mike@example.com",
      avatarUrl: "",
    },
    createdAt: "2025-05-01T13:45:00Z",
    updatedAt: "2025-05-12T13:45:00Z",
    dueDate: "2025-06-01T00:00:00Z",
    components: ["Underwriting"],
    labels: ["Growth"],
    comments: [],
    activityLog: [
      {
        user: {
          id: "user3",
          name: "Mike Johnson",
          email: "mike@example.com",
          avatarUrl: "",
        },
        action: "Created the issue",
        timestamp: "2025-05-12T13:45:00Z",
      },
    ],
  },
  {
    id: "3",
    key: "PROJ-125",
    summary: "Deliquency increase for Jan 2025 disbursement cohort",
    description:
      "The first month delinquency rate for the Jan 2025 disbursement cohort is higher than expected. We need to investigate the cause.",
    status: "In Progress",
    priority: "Highest",
    type: "Task",
    assignee: {
      id: "user4",
      name: "Sarah Williams",
      email: "sarah@example.com",
      avatarUrl: "",
    },
    reporter: {
      id: "user1",
      name: "Jane Smith",
      email: "jane@example.com",
      avatarUrl: "",
    },
    createdAt: "2025-05-11T10:30:00Z",
    updatedAt: "2025-05-12T09:15:00Z",
    dueDate: "2025-05-13T00:00:00Z",
    components: ["Payback"],
    labels: ["Deliquency"],
    comments: [
      {
        id: "comment3",
        author: {
          id: "user4",
          name: "Sarah Williams",
          email: "sarah@example.com",
          avatarUrl: "",
        },
        content: "I've started analyzing. Will provide an update by EOD.",
        createdAt: "2025-05-13T14:20:00Z",
      },
    ],
    activityLog: [
      {
        user: {
          id: "user1",
          name: "Jane Smith",
          email: "jane@example.com",
          avatarUrl: "",
        },
        action: "Created the issue",
        timestamp: "2025-05-11T10:30:00Z",
      },
      {
        user: {
          id: "user1",
          name: "Jane Smith",
          email: "jane@example.com",
          avatarUrl: "",
        },
        action: "Assigned to Sarah Williams",
        timestamp: "2025-05-12T10:35:00Z",
      },
    ],
  },
  {
    id: "4",
    key: "PROJ-126",
    summary: "When was the data for estimation model refreshed",
    description: "The data for the estimation model was last refreshed on 2023-05-01. We need to check if it has been updated since then.",
    status: "Resolved",
    priority: "Low",
    type: "Task",
    assignee: {
      id: "user5",
      name: "Alex Brown",
      email: "alex@example.com",
      avatarUrl: "",
    },
    reporter: {
      id: "user3",
      name: "Mike Johnson",
      email: "mike@example.com",
      avatarUrl: "",
    },
    createdAt: "2025-05-05T11:20:00Z",
    updatedAt: "2025-05-06T16:45:00Z",
    dueDate: "2025-05-07T00:00:00Z",
    components: ["Model"],
    labels: ["Model", "Query"],
    comments: [
      {
        id: "comment4",
        author: {
          id: "user5",
          name: "Alex Brown",
          email: "alex@example.com",
          avatarUrl: "",
        },
        content: "Documentation updates completed. Ready for review.",
        createdAt: "2025-05-05T16:40:00Z",
      },
    ],
    activityLog: [
      {
        user: {
          id: "user3",
          name: "Mike Johnson",
          email: "mike@example.com",
          avatarUrl: "",
        },
        action: "Created the issue",
        timestamp: "2025-05-05T11:20:00Z",
      },
      {
        user: {
          id: "user5",
          name: "Alex Brown",
          email: "alex@example.com",
          avatarUrl: "",
        },
        action: "Changed status from 'In Progress' to 'Resolved'",
        timestamp: "2025-05-06T16:45:00Z",
      },
    ],
  },
  {
    id: "5",
    key: "PROJ-127",
    summary: "Revise the APR for the new product launch",
    description: "Revise the APR for the new product launch based on the latest market trends and competitor analysis.",
    status: "Blocked",
    priority: "High",
    type: "Bug",
    assignee: {
      id: "current-user",
      name: "Current User",
      email: "you@example.com",
      avatarUrl: "",
    },
    reporter: {
      id: "user2",
      name: "John Doe",
      email: "john@example.com",
      avatarUrl: "",
    },
    createdAt: "2025-04-13T09:15:00Z",
    updatedAt: "2025-04-16T11:30:00Z",
    dueDate: "2025-04-19T00:00:00Z",
    components: ["Credit card"],
    labels: ["credit card"],
    comments: [
      {
        id: "comment5",
        author: {
          id: "current-user",
          name: "Current User",
          email: "you@example.com",
          avatarUrl: "",
        },
        content: "I'm blocked on this because market research report is not reviewed yet",
        createdAt: "2025-04-16T11:25:00Z",
      },
    ],
    activityLog: [
      {
        user: {
          id: "user2",
          name: "John Doe",
          email: "john@example.com",
          avatarUrl: "",
        },
        action: "Created the issue",
        timestamp: "2025-04-13T09:15:00Z",
      },
      {
        user: {
          id: "current-user",
          name: "Current User",
          email: "you@example.com",
          avatarUrl: "",
        },
        action: "Changed status from 'In Progress' to 'Blocked'",
        timestamp: "2025-04-16T11:30:00Z",
      },
    ],
  },
  {
    id: "6",
    key: "PROJ-128",
    summary: "Add integration for a new alt data source",
    description: "Add integration for new data sources to enhance the model's predictive capabilities.",
    status: "In Progress",
    priority: "Medium",
    type: "Feature",
    assignee: {
      id: "user1",
      name: "Jane Smith",
      email: "jane@example.com",
      avatarUrl: "",
    },
    reporter: {
      id: "user3",
      name: "Mike Johnson",
      email: "mike@example.com",
      avatarUrl: "",
    },
    createdAt: "2025-03-11T14:00:00Z",
    updatedAt: "2025-03-14T09:30:00Z",
    dueDate: "2025-03-30T00:00:00Z",
    components: ["Integration"],
    labels: ["Integration"],
    comments: [],
    activityLog: [
      {
        user: {
          id: "user3",
          name: "Mike Johnson",
          email: "mike@example.com",
          avatarUrl: "",
        },
        action: "Created the issue",
        timestamp: "2025-03-11T14:00:00Z",
      },
      {
        user: {
          id: "user1",
          name: "Jane Smith",
          email: "jane@example.com",
          avatarUrl: "",
        },
        action: "Changed status from 'Open' to 'In Progress'",
        timestamp: "2025-03-14T09:30:00Z",
      },
    ],
  },
  {
    id: "7",
    key: "PROJ-129",
    summary: "Review the increase in the student loan delinquency rate",
    description: "The delinquency rate for student loans has increased significantly in the last quarter. We need to review the data and identify the cause.",
    status: "Open",
    priority: "Highest",
    type: "Bug",
    assignee: {
      id: "user4",
      name: "Sarah Williams",
      email: "sarah@example.com",
      avatarUrl: "",
    },
    reporter: {
      id: "user2",
      name: "John Doe",
      email: "john@example.com",
      avatarUrl: "",
    },
    createdAt: "2025-05-13T08:45:00Z",
    updatedAt: "2025-05-13T08:45:00Z",
    dueDate: "2023-05-22T00:00:00Z",
    components: ["Deliquency", "Payback"],
    labels: [ "critical",],
    comments: [],
    activityLog: [
      {
        user: {
          id: "user2",
          name: "John Doe",
          email: "john@example.com",
          avatarUrl: "",
        },
        action: "Created the issue",
        timestamp: "2025-05-13T08:45:00Z",
      },
    ],
  },
  {
    id: "8",
    key: "PROJ-130",
    summary: "Implement a new risk policy for auto loans",
    description: "The current risk policy for auto loans needs to be revised to account for the latest market trends and data analysis.",
    status: "Closed",
    priority: "Low",
    type: "Feature",
    assignee: {
      id: "user5",
      name: "Alex Brown",
      email: "alex@example.com",
      avatarUrl: "",
    },
    reporter: {
      id: "user1",
      name: "Jane Smith",
      email: "jane@example.com",
      avatarUrl: "",
    },
    createdAt: "2025-05-01T10:00:00Z",
    updatedAt: "2025-05-10T15:30:00Z",
    dueDate: null,
    components: ["Policy"],
    labels: ["enhancement"],
    comments: [
      {
        id: "comment6",
        author: {
          id: "user5",
          name: "Alex Brown",
          email: "alex@example.com",
          avatarUrl: "",
        },
        content: "Feature implemented and tested. Ready for review.",
        createdAt: "2025-05-08T14:15:00Z",
      },
      {
        id: "comment7",
        author: {
          id: "user1",
          name: "Jane Smith",
          email: "jane@example.com",
          avatarUrl: "",
        },
        content: "Looks good! Approved for release.",
        createdAt: "2025-05-08T15:20:00Z",
      },
    ],
    activityLog: [
      {
        user: {
          id: "user1",
          name: "Jane Smith",
          email: "jane@example.com",
          avatarUrl: "",
        },
        action: "Created the issue",
        timestamp: "2025-05-01T10:00:00Z",
      },
      {
        user: {
          id: "user5",
          name: "Alex Brown",
          email: "alex@example.com",
          avatarUrl: "",
        },
        action: "Changed status from 'In Progress' to 'Resolved'",
        timestamp: "2023-05-08T14:15:00Z",
      },
      {
        user: {
          id: "user1",
          name: "Jane Smith",
          email: "jane@example.com",
          avatarUrl: "",
        },
        action: "Changed status from 'Resolved' to 'Closed'",
        timestamp: "2023-05-08T15:20:00Z",
      },
    ],
  },
]

