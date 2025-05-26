"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Filter, SortAsc, SortDesc, Search } from "lucide-react"

export function TicketFilters() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search tickets..."
          className="w-[200px] pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span>Open</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <span>In Progress</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>Resolved</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-gray-500" />
                <span>Closed</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <span>Blocked</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <span>Highest</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-orange-500" />
                <span>High</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <span>Medium</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>Low</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span>Lowest</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuLabel>Filter by Assignee</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <span>Assigned to me</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Unassigned</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <SortAsc className="h-4 w-4 mr-2" />
            Sort
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuItem>
            <SortAsc className="h-4 w-4 mr-2" />
            <span>Created (Oldest first)</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SortDesc className="h-4 w-4 mr-2" />
            <span>Created (Newest first)</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SortAsc className="h-4 w-4 mr-2" />
            <span>Due Date (Earliest first)</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SortDesc className="h-4 w-4 mr-2" />
            <span>Due Date (Latest first)</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SortAsc className="h-4 w-4 mr-2" />
            <span>Priority (Highest first)</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SortDesc className="h-4 w-4 mr-2" />
            <span>Priority (Lowest first)</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

