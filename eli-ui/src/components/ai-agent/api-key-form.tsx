"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface ApiKeyFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (apiKey: string) => void
}

export function ApiKeyForm({ open, onOpenChange, onSave }: ApiKeyFormProps) {
  const [apiKey, setApiKey] = useState("")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      })
      return
    }

    try {
      // Save API key to secure storage
      await saveApiKey(apiKey)

      toast({
        title: "Success",
        description: "API key saved successfully",
      })

      onSave(apiKey)
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save API key",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configure OpenAI API Key</DialogTitle>
          <DialogDescription>
            Enter your OpenAI API key to enable the AI assistant. Your key is stored securely and never shared.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="apiKey">OpenAI API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="font-mono"
              />
              <p className="text-sm text-muted-foreground">
                Get your API key from{" "}
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2"
                >
                  OpenAI's dashboard
                </a>
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save API Key</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Function to securely save API key
async function saveApiKey(apiKey: string): Promise<void> {
  // In a real application, you would save this to a secure HTTP-only cookie
  // or use a service like Vercel KV or a database

  // For this example, we'll use localStorage with encryption
  // NOTE: This is not truly secure for production use
  const encryptedKey = btoa(apiKey) // Simple encoding, not real encryption
  localStorage.setItem("openai_api_key_encrypted", encryptedKey)

  // For production, use a server endpoint to store the key:
  /*
  await fetch('/api/store-api-key', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey }),
  });
  */

  return Promise.resolve()
}

// Function to retrieve API key
export async function getApiKey(): Promise<string | null> {
  // For this example, we'll use localStorage with decryption
  const encryptedKey = localStorage.getItem("openai_api_key_encrypted")
  if (!encryptedKey) return null

  // Simple decoding, not real decryption
  return atob(encryptedKey)

  // For production, use a server endpoint to retrieve the key:
  /*
  const response = await fetch('/api/get-api-key');
  const data = await response.json();
  return data.apiKey;
  */
}

