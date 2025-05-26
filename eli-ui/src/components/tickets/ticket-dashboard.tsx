"use client"

import { useState, useEffect } from "react"
import { TicketList } from "./ticket-list"
import { TicketFilters } from "./ticket-filters"
import { TicketStats } from "./ticket-stats"
import { Button } from "@/components/ui/button"
import { PlusCircle, RefreshCw, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getJiraTickets } from "@/lib/jira"
import { getErrorMessage, getErrorAction } from "@/lib/error-mapping"
import { useToast } from "@/components/ui/use-toast"

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

export function TicketDashboard() {
  const { toast } = useToast()
  const [tickets, setTickets] = useState<JiraTicket[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  const fetchTickets = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await getJiraTickets();
      if (result.success && result.data) {
        setTickets(result.data);
      } else {
        const errorMessage = getErrorMessage(result.error);
        const errorAction = getErrorAction(result.error);
        setError(new Error(errorMessage));
        toast({
          title: "Error",
          description: errorAction ? `${errorMessage}\n\n${errorAction}` : errorMessage,
          variant: "destructive",
        });
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      const errorAction = getErrorAction(error);
      setError(new Error(errorMessage));
      toast({
        title: "Error",
        description: errorAction ? `${errorMessage}\n\n${errorAction}` : errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Helper function to safely filter tickets
  const filterTickets = (filterFn: (ticket: JiraTicket) => boolean) => {
    return Array.isArray(tickets) ? tickets.filter(filterFn) : [];
  };

  // Helper function to safely sort tickets
  const sortTickets = (sortFn: (a: JiraTicket, b: JiraTicket) => number) => {
    return Array.isArray(tickets) ? [...tickets].sort(sortFn) : [];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tickets</h1>
          <p className="text-muted-foreground">Manage and track all your team's tickets in one place</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={fetchTickets} variant="outline" size="sm" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </>
            )}
          </Button>
         {/* <Button size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Ticket
          </Button> */}
        </div>
      </div>

     

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          {/*<TabsList>
            <TabsTrigger value="all">All Tickets</TabsTrigger>
            <TabsTrigger value="assigned">Assigned to Me</TabsTrigger>
            <TabsTrigger value="watching">Watching</TabsTrigger>
            <TabsTrigger value="recent">Recently Updated</TabsTrigger>
          </TabsList>
          <TicketFilters />*/}
        </div>

        <TabsContent value="all" className="mt-6">
          <TicketList tickets={tickets} isLoading={isLoading} error={error} />
        </TabsContent>

        <TabsContent value="assigned" className="mt-6">
          <TicketList
            tickets={filterTickets(ticket => ticket.fields.assignee?.displayName === "current-user")}
            isLoading={isLoading}
            error={error}
          />
        </TabsContent>

        <TabsContent value="watching" className="mt-6">
          <TicketList
            tickets={filterTickets(ticket => ticket.fields.labels?.includes("watching"))}
            isLoading={isLoading}
            error={error}
          />
        </TabsContent>

        <TabsContent value="recent" className="mt-6">
          <TicketList
            tickets={sortTickets((a, b) => new Date(b.fields.updated).getTime() - new Date(a.fields.updated).getTime()).slice(0, 10)}
            isLoading={isLoading}
            error={error}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

