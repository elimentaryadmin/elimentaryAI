"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle, XCircle } from "lucide-react"
import https from "https"

export function TestConnection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState<string>("")
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false, // Disable certificate validation
  })

  const testConnection = async () => {
    setStatus("loading")
    setMessage("")

    try {
      const response = await fetch("/api/test-connection", {
        method: "POST",
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(data.message || "Connection successful!")
      } else {
        setStatus("error")
        setMessage(data.error || "Connection failed. Please check your API key.")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Network error. Please try again.")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Test OpenAI Connection</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">Click the button below to test your OpenAI API connection.</p>

        {status !== "idle" && (
          <div className="flex items-center gap-2 p-4 rounded-md bg-muted">
            {status === "loading" && (
              <>
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                <span>Testing connection...</span>
              </>
            )}
            {status === "success" && (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-green-600">{message}</span>
              </>
            )}
            {status === "error" && (
              <>
                <XCircle className="h-5 w-5 text-red-500" />
                <span className="text-red-600">{message}</span>
              </>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={testConnection} disabled={status === "loading"} className="w-full">
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : (
            "Test Connection"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

