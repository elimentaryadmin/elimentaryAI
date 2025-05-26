"use client"

import { useState, useRef, useEffect } from "react"
import { Search, X, Mail, Link, Check, Clock, FileText, User, Settings, PlusCircle } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// Mock data for search suggestions
const recentSearches = [
  "verification workflow",
  "socure integration",
  "manual review process",
  "AML flags configuration",
]

const searchSuggestions = [
  { type: "document", name: "Verification Process", path: "/docs/verification" },
  { type: "document", name: "Socure API Integration", path: "/docs/socure-api" },
  { type: "document", name: "AML Compliance Guide", path: "/docs/aml-compliance" },
  { type: "setting", name: "API Configuration", path: "/settings/api" },
  { type: "setting", name: "Workflow Settings", path: "/settings/workflow" },
  { type: "user", name: "John Smith", email: "john@example.com" },
  { type: "user", name: "Sarah Johnson", email: "sarah@example.com" },
]

// Mock data for collaboration suggestions
const collaborators = [
  { name: "John Smith", email: "john@example.com", avatar: "/placeholder-user.jpg" },
  { name: "Sarah Johnson", email: "sarah@example.com", avatar: "/placeholder-user.jpg" },
  { name: "Michael Brown", email: "michael@example.com", avatar: "/placeholder-user.jpg" },
  { name: "Emily Davis", email: "emily@example.com", avatar: "/placeholder-user.jpg" },
  { name: "Robert Wilson", email: "robert@example.com", avatar: "/placeholder-user.jpg" },
]

export default function SearchAndCollaboration() {
  // Search state
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredSuggestions, setFilteredSuggestions] = useState(searchSuggestions)

  // Collaboration state
  const [collaborationOpen, setCollaborationOpen] = useState(false)
  const [emails, setEmails] = useState<string[]>([])
  const [inputValue, setInputValue] = useState("")
  const [permission, setPermission] = useState("view")
  const [linkCopied, setLinkCopied] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  // Filter search suggestions based on query
  useEffect(() => {
    if (searchQuery) {
      const filtered = searchSuggestions.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.type === "user" && item.email.toLowerCase().includes(searchQuery.toLowerCase())),
      )
      setFilteredSuggestions(filtered)
    } else {
      setFilteredSuggestions(searchSuggestions)
    }
  }, [searchQuery])

  // Handle adding an email
  const addEmail = (email: string) => {
    if (email && !emails.includes(email) && /\S+@\S+\.\S+/.test(email)) {
      setEmails([...emails, email])
      setInputValue("")
    }
  }

  // Handle removing an email
  const removeEmail = (email: string) => {
    setEmails(emails.filter((e) => e !== email))
  }

  // Handle copying link
  const copyLink = () => {
    navigator.clipboard.writeText("https://app.example.com/share/doc-123456")
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold mb-6">Search & Collaboration Components</h1>

      {/* Search with Auto-suggest */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Search with Auto-suggest</h2>
        <div className="relative w-full max-w-md">
          <Popover open={searchOpen} onOpenChange={setSearchOpen}>
            <PopoverTrigger asChild>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={() => setSearchOpen(true)}
                  className="pl-10 w-full"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[400px]" align="start">
              <Command>
                <CommandList>
                  {searchQuery.length > 0 && <CommandEmpty>No results found.</CommandEmpty>}

                  {searchQuery.length === 0 && (
                    <CommandGroup heading="Recent Searches">
                      {recentSearches.map((search) => (
                        <CommandItem
                          key={search}
                          onSelect={() => {
                            setSearchQuery(search)
                            setSearchOpen(false)
                          }}
                        >
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{search}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}

                  {filteredSuggestions.length > 0 && (
                    <>
                      <CommandGroup heading="Documents">
                        {filteredSuggestions
                          .filter((item) => item.type === "document")
                          .map((item) => (
                            <CommandItem
                              key={item.path}
                              onSelect={() => {
                                setSearchQuery(item.name)
                                setSearchOpen(false)
                              }}
                            >
                              <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{item.name}</span>
                            </CommandItem>
                          ))}
                      </CommandGroup>

                      <CommandGroup heading="Settings">
                        {filteredSuggestions
                          .filter((item) => item.type === "setting")
                          .map((item) => (
                            <CommandItem
                              key={item.path}
                              onSelect={() => {
                                setSearchQuery(item.name)
                                setSearchOpen(false)
                              }}
                            >
                              <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{item.name}</span>
                            </CommandItem>
                          ))}
                      </CommandGroup>

                      <CommandGroup heading="People">
                        {filteredSuggestions
                          .filter((item) => item.type === "user")
                          .map((item) => (
                            <CommandItem
                              key={item.email}
                              onSelect={() => {
                                setSearchQuery(item.name)
                                setSearchOpen(false)
                              }}
                            >
                              <User className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{item.name}</span>
                              <span className="ml-2 text-sm text-muted-foreground">{item.email}</span>
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Collaboration Dropdown */}
      <div className="space-y-2 pt-8">
        <h2 className="text-lg font-semibold">Collaboration Dropdown</h2>
        <div className="w-full max-w-md border rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Share Document</h3>
            <Button variant="outline" size="sm" onClick={copyLink}>
              {linkCopied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied
                </>
              ) : (
                <>
                  <Link className="h-4 w-4 mr-2" />
                  Copy Link
                </>
              )}
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-background">
              {emails.map((email) => (
                <Badge key={email} variant="secondary" className="flex items-center gap-1 py-1 px-2">
                  <span>{email}</span>
                  <button onClick={() => removeEmail(email)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addEmail(inputValue)
                  }
                }}
                placeholder={emails.length === 0 ? "Add people via email..." : ""}
                className="flex-1 min-w-[120px] outline-none bg-transparent"
              />
            </div>

            {inputValue && (
              <div className="border rounded-md shadow-sm">
                <div className="p-1">
                  {collaborators
                    .filter(
                      (collab) =>
                        collab.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                        collab.email.toLowerCase().includes(inputValue.toLowerCase()),
                    )
                    .map((collab) => (
                      <div
                        key={collab.email}
                        className="flex items-center gap-2 p-2 hover:bg-muted rounded cursor-pointer"
                        onClick={() => addEmail(collab.email)}
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={collab.avatar} alt={collab.name} />
                          <AvatarFallback>{collab.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium">{collab.name}</div>
                          <div className="text-sm text-muted-foreground">{collab.email}</div>
                        </div>
                        <PlusCircle className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <Select value={permission} onValueChange={setPermission}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Permission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">Can view</SelectItem>
                  <SelectItem value="comment">Can comment</SelectItem>
                  <SelectItem value="edit">Can edit</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>

              <Button
                disabled={emails.length === 0}
                onClick={() => {
                  // Handle sharing logic
                  console.log("Shared with:", emails, "Permission:", permission)
                  setEmails([])
                }}
              >
                <Mail className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">People with access</h4>
            <div className="space-y-2">
              {collaborators.slice(0, 3).map((collab) => (
                <div key={collab.email} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={collab.avatar} alt={collab.name} />
                      <AvatarFallback>{collab.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{collab.name}</div>
                      <div className="text-xs text-muted-foreground">{collab.email}</div>
                    </div>
                  </div>
                  <Select defaultValue="edit">
                    <SelectTrigger className="w-[110px] h-8">
                      <SelectValue placeholder="Permission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="view">Can view</SelectItem>
                      <SelectItem value="comment">Can comment</SelectItem>
                      <SelectItem value="edit">Can edit</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

