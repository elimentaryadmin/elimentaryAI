"use client"

import { useEffect, useState } from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"

export function Search() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="h-4 w-4 xl:mr-2" />
        <span className="hidden xl:inline-flex">Search risk insights...</span>
        <span className="sr-only">Search risk insights</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search risk insights, reports, and actions..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Risk Insights">
            <CommandItem>Delinquency by Loan Type</CommandItem>
            <CommandItem>Underwriting Performance</CommandItem>
            <CommandItem>Customer Segment Analysis</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Reports">
            <CommandItem>Monthly Risk Summary</CommandItem>
            <CommandItem>Quarterly Performance</CommandItem>
            <CommandItem>Annual Risk Assessment</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Actions">
            <CommandItem>Pending Approvals</CommandItem>
            <CommandItem>Recent Collaborations</CommandItem>
            <CommandItem>Integration Status</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

