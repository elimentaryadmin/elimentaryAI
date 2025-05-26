"use client"

import { type ReactNode, createContext, useContext, useState } from "react"
import { AIChat } from "./ai-chat"

type AIContextType = {
  isOpen: boolean
  openChat: () => void
  closeChat: () => void
  toggleChat: () => void
  debugMode: boolean
  setDebugMode: (value: boolean) => void
}

const AIContext = createContext<AIContextType | undefined>(undefined)

interface AIProviderProps {
  children: ReactNode
  initialDebugMode?: boolean
}

export function AIProvider({ children, initialDebugMode = false }: AIProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [debugMode, setDebugMode] = useState(initialDebugMode)

  const openChat = () => setIsOpen(true)
  const closeChat = () => setIsOpen(false)
  const toggleChat = () => setIsOpen((prev) => !prev)

  return (
    <AIContext.Provider
      value={{
        isOpen,
        openChat,
        closeChat,
        toggleChat,
        debugMode,
        setDebugMode,
      }}
    >
      {children}
      <AIChat debugMode={debugMode} />
    </AIContext.Provider>
  )
}

export function useAI() {
  const context = useContext(AIContext)

  if (context === undefined) {
    throw new Error("useAI must be used within an AIProvider")
  }

  return context
}

