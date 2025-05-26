"use client"

import { LogOut, Settings, User, Users } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-dark">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" alt="@user" />
            <AvatarFallback className="bg-muted text-muted-foreground dark:bg-muted-dark dark:text-muted-foreground-dark">YG</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white border border-border rounded-md shadow-md" align="end" forceMount>
        <DropdownMenuLabel className="font-normal px-4 py-2">
            <div className="flex flex-col space-y-1 bg-primary text-primary-foreground p-2 rounded-md">
            <p className="text-sm font-medium leading-none">Yogesh Gorjila</p>
            <p className="text-xs leading-none text-primary-foreground/80">yogesh@elimentary.com</p>
            </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1 border-t border-border" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex items-center px-4 py-2 hover:bg-muted hover:text-primary rounded-md">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center px-4 py-2 hover:bg-muted hover:text-primary rounded-md">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center px-4 py-2 hover:bg-muted hover:text-primary rounded-md">
            <Users className="mr-2 h-4 w-4" />
            <span>Team</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="my-1 border-t border-border" />
        <DropdownMenuItem className="flex items-center px-4 py-2 hover:bg-muted hover:text-primary rounded-md">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
