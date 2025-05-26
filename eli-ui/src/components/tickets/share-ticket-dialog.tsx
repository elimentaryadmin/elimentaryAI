"use client"

import { useState } from "react"
import type { Ticket } from "@/types/ticket"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Copy, Check, Slack } from "lucide-react"

interface ShareTicketDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  ticket?: Ticket
}

export function ShareTicketDialog({ open, onOpenChange, ticket }: ShareTicketDialogProps) {
  const [message, setMessage] = useState("")
  const [recipients, setRecipients] = useState("")
  const [slackChannel, setSlackChannel] = useState("#general")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  if (!ticket) return null

  const ticketUrl = `https://jira.example.com/browse/${ticket.key}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(ticketUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShareViaEmail = async () => {
    if (!recipients.trim()) return

    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      // await fetch(`/api/tickets/${ticket.id}/share/email`, {
      //   method: "POST",
      //   body: JSON.stringify({
      //     recipients: recipients.split(',').map(r => r.trim()),
      //     message
      //   }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Ticket shared",
        description: `Ticket ${ticket.key} shared via email.`,
      })

      // Close the dialog
      onOpenChange(false)
      setMessage("")
      setRecipients("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to share ticket. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleShareViaSlack = async () => {
    if (!slackChannel.trim()) return

    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      // await fetch(`/api/tickets/${ticket.id}/share/slack`, {
      //   method: "POST",
      //   body: JSON.stringify({
      //     channel: slackChannel,
      //     message
      //   }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Ticket shared",
        description: `Ticket ${ticket.key} shared to Slack channel ${slackChannel}.`,
      })

      // Close the dialog
      onOpenChange(false)
      setMessage("")
      setSlackChannel("#general")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to share ticket. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Share Ticket</DialogTitle>
          <DialogDescription>
            Share ticket {ticket.key}: {ticket.summary}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="link" className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="link">Copy Link</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="slack">Slack</TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <Input value={ticketUrl} readOnly className="flex-1" />
              <Button size="sm" onClick={handleCopyLink}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="email" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="recipients">Recipients</Label>
              <Input
                id="recipients"
                placeholder="email1@example.com, email2@example.com"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Separate multiple email addresses with commas</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailMessage">Message (Optional)</Label>
              <Textarea
                id="emailMessage"
                placeholder="Please take a look at this ticket..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <DialogFooter>
              <Button onClick={handleShareViaEmail} disabled={!recipients.trim() || isSubmitting}>
                {isSubmitting ? "Sharing..." : "Share via Email"}
              </Button>
            </DialogFooter>
          </TabsContent>

          <TabsContent value="slack" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="slackChannel">Slack Channel</Label>
              <div className="flex items-center space-x-2">
                <Slack className="h-5 w-5 text-[#4A154B]" />
                <Input
                  id="slackChannel"
                  placeholder="#general"
                  value={slackChannel}
                  onChange={(e) => setSlackChannel(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="slackMessage">Message (Optional)</Label>
              <Textarea
                id="slackMessage"
                placeholder="Please take a look at this ticket..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <DialogFooter>
              <Button onClick={handleShareViaSlack} disabled={!slackChannel.trim() || isSubmitting}>
                {isSubmitting ? "Sharing..." : "Share to Slack"}
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

