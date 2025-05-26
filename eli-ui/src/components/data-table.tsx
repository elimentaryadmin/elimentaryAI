"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, Download, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample data
const data = [
  {
    id: "1",
    loanType: "Personal",
    region: "Northeast",
    segment: "Young Professional",
    amount: 12500,
    delinquencyRate: 5.2,
    status: "High Risk",
    trend: "Increasing",
  },
  {
    id: "2",
    loanType: "Auto",
    region: "Midwest",
    segment: "Family",
    amount: 28750,
    delinquencyRate: 3.8,
    status: "Medium Risk",
    trend: "Stable",
  },
  {
    id: "3",
    loanType: "Mortgage",
    region: "West",
    segment: "Senior",
    amount: 320000,
    delinquencyRate: 1.2,
    status: "Low Risk",
    trend: "Decreasing",
  },
  {
    id: "4",
    loanType: "Personal",
    region: "Southeast",
    segment: "Student",
    amount: 8500,
    delinquencyRate: 7.5,
    status: "High Risk",
    trend: "Increasing",
  },
  {
    id: "5",
    loanType: "Business",
    region: "Southwest",
    segment: "Small Business Owner",
    amount: 75000,
    delinquencyRate: 4.3,
    status: "Medium Risk",
    trend: "Increasing",
  },
  {
    id: "6",
    loanType: "Auto",
    region: "Northeast",
    segment: "Young Professional",
    amount: 32000,
    delinquencyRate: 2.9,
    status: "Medium Risk",
    trend: "Stable",
  },
  {
    id: "7",
    loanType: "Mortgage",
    region: "Midwest",
    segment: "Family",
    amount: 275000,
    delinquencyRate: 1.8,
    status: "Low Risk",
    trend: "Stable",
  },
  {
    id: "8",
    loanType: "Personal",
    region: "West",
    segment: "Senior",
    amount: 15000,
    delinquencyRate: 3.2,
    status: "Medium Risk",
    trend: "Decreasing",
  },
  {
    id: "9",
    loanType: "Business",
    region: "Southeast",
    segment: "Small Business Owner",
    amount: 120000,
    delinquencyRate: 6.1,
    status: "High Risk",
    trend: "Increasing",
  },
  {
    id: "10",
    loanType: "Auto",
    region: "Southwest",
    segment: "Student",
    amount: 18500,
    delinquencyRate: 5.7,
    status: "High Risk",
    trend: "Increasing",
  },
]

// Column definitions
const columns: ColumnDef<(typeof data)[0]>[] = [
  {
    accessorKey: "loanType",
    header: "Loan Type",
    cell: ({ row }) => <div>{row.getValue("loanType")}</div>,
  },
  {
    accessorKey: "region",
    header: "Region",
    cell: ({ row }) => <div>{row.getValue("region")}</div>,
  },
  {
    accessorKey: "segment",
    header: "Customer Segment",
    cell: ({ row }) => <div>{row.getValue("segment")}</div>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "delinquencyRate",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Delinquency Rate
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const rate = Number.parseFloat(row.getValue("delinquencyRate"))
      return <div className="text-right font-medium">{rate}%</div>
    },
  },
  {
    accessorKey: "status",
    header: "Risk Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "High Risk" ? "destructive" : status === "Medium Risk" ? "default" : "outline"}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "trend",
    header: "Trend",
    cell: ({ row }) => {
      const trend = row.getValue("trend") as string
      return (
        <Badge variant={trend === "Increasing" ? "destructive" : trend === "Stable" ? "secondary" : "outline"}>
          {trend}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const loan = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Add to report</DropdownMenuItem>
            <DropdownMenuItem>Create annotation</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Export data</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function DataTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter loan types..."
          value={(table.getColumn("loanType")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("loanType")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  )
}

