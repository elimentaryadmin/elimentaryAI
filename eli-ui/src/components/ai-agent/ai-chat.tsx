"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useChat } from "ai/react"
import { X, MessageSquare, Send, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AIChatProps {
  debugMode?: boolean
}

export function AIChat({ debugMode = false }: AIChatProps) {
  const [open, setOpen] = useState(false)
  const [apiKeyStatus, setApiKeyStatus] = useState<"checking" | "valid" | "invalid" | "missing">("checking")
  const { toast } = useToast()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Check API key status
  useEffect(() => {
    const checkApiKey = async () => {
      if (!open) return

      try {
        setApiKeyStatus("checking")
        const response = await fetch("/api/check-api-key")

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`)
        }

        const data = await response.json()
        setApiKeyStatus(data.hasApiKey ? "valid" : "missing")
      } catch (error) {
        console.error("Error checking API key:", error)
        setApiKeyStatus("invalid")
        toast({
          title: "Error",
          description: "Failed to check API key status",
          variant: "destructive",
        })
      }
    }

    checkApiKey()
  }, [open, toast])

  const { messages, input, handleInputChange, handleSubmit, isLoading, error, reload, setMessages } = useChat({
    api: "/api/chat",
    onError: (error) => {
      console.error("Chat error:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      })
    },
    onFinish: () => {

      console.log("===================On finish section ===============")
      // Scroll to the bottom when a new message is received
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
      }
    },
  })

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  // Close chat with escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  const handleOpenChat = () => {
    setOpen(true)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (apiKeyStatus !== "valid") {
      toast({
        title: "API Key Required",
        description: "Please ensure your OpenAI API key is configured.",
        variant: "destructive",
      })
      return
    }

    if (!input.trim()) {
      toast({
        title: "Empty Message",
        description: "Please enter a message.",
        variant: "destructive",
      })
      return
    }

    try {
      handleSubmit(e)
    } catch (error) {
      console.error("Error submitting message:", error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  return (
    <>
      {/* Floating button */}
      <Button
        onClick={() => (open ? setOpen(false) : handleOpenChat())}
        className={cn(
          "fixed z-50 rounded-full p-3 shadow-lg transition-all duration-300",
          isMobile ? "bottom-4 right-4" : "bottom-6 right-6",
          open ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90",
        )}
        aria-label={open ? "Close AI chat" : "Open AI chat"}
      >
        {open ? <X size={24} /> : <MessageSquare size={24} />}
      </Button>

      {/* Chat interface */}
      <Card
        className={cn(
          "fixed z-40 flex flex-col transition-all duration-300 shadow-lg border border-border",
          isMobile ? "bottom-20 right-4 left-4 max-h-[80vh]" : "bottom-24 right-6 w-[400px] max-h-[600px]",
          open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
        )}
      >
        <CardHeader className="p-4 border-b bg-card">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">AI Assistant</h3>
            <div className="flex items-center space-x-2">
              {messages.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearChat} className="text-xs">
                  Clear Chat
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close chat">
                <X size={18} />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4" ref={chatContainerRef}>
          {apiKeyStatus === "checking" ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground mr-2" />
              <span className="text-muted-foreground">Checking API configuration...</span>
            </div>
          ) : apiKeyStatus !== "valid" ? (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>API Key Not Configured</AlertTitle>
              <AlertDescription>
                Please ensure your OpenAI API key is properly configured in your environment variables.
              </AlertDescription>
            </Alert>
          ) : messages.length === 0 ? (
            <div className="text-center text-muted-foreground font-semibold py-6">
              <p>Welcome to Elimentary</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex flex-col max-w-[80%] rounded-lg p-3",
                  message.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted",
                )}
              >
                {message.content}
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex items-center justify-center py-2">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          )}
        </CardContent>

        <CardFooter className="p-4 border-t">
          <form onSubmit={onSubmit} className="flex w-full items-center space-x-2">
            <Textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1 min-h-10 max-h-40"
              disabled={apiKeyStatus !== "valid" || isLoading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  onSubmit(e as any)
                }
              }}
            />
            <Button
              type="submit"
              size="icon"
              disabled={apiKeyStatus !== "valid" || isLoading || !input.trim()}
              aria-label="Send message"
            >
              <Send size={18} />
            </Button>
          </form>
        </CardFooter>
      </Card>

      {/* Debug information */}
      {debugMode && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/80 text-white p-2 text-xs font-mono z-50">
          <div>API Key Status: {apiKeyStatus}</div>
          <div>Messages: {messages.length}</div>
          <div>Status: {isLoading ? "Loading..." : error ? "Error" : "Ready"}</div>
          {error && <div>Error: {error.message}</div>}
        </div>
      )}
    </>
  )
}

