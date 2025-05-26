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
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

interface SendReminderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  ticket?: Ticket
}

export function SendReminderDialog({ open, onOpenChange, ticket }: SendReminderDialogProps) {
  const [message, setMessage] = useState("")
  const [sendEmail, setSendEmail] = useState(true)
  const [sendSlack, setSendSlack] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  if (!ticket) return null

  const handleSendReminder = async () => {
    if (!message.trim()) return

    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      // await fetch(`/api/tickets/${ticket.id}/reminders`, {
      //   method: "POST",
      //   body: JSON.stringify({
      //     message,
      //     channels: {
      //       email: sendEmail,
      //       slack: sendSlack
      //     }
      //   }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Reminder sent",
        description: `Reminder sent to ${ticket.assignee?.name || "the assignee"}.`,
      })

      // Close the dialog
      onOpenChange(false)
      setMessage("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reminder. Please try again.",
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
          <DialogTitle>Send Reminder</DialogTitle>
          <DialogDescription>
            Send a reminder to {ticket.assignee?.name || "the assignee"} about ticket {ticket.key}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Please provide an update on this ticket..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Notification Channels</Label>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sendEmail"
                  checked={sendEmail}
                  onCheckedChange={(checked) => setSendEmail(checked === true)}
                />
                <Label htmlFor="sendEmail" className="font-normal">
                  Send email notification
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sendSlack"
                  checked={sendSlack}
                  onCheckedChange={(checked) => setSendSlack(checked === true)}
                />
                <Label htmlFor="sendSlack" className="font-normal">
                  Send Slack notification
                </Label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSendReminder} disabled={!message.trim() || isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Reminder"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

