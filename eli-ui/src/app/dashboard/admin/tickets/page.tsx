import type React from "react"
import { Inter } from "next/font/google"
import { AIProvider } from "@/components/ai-agent/ai-provider"
import { TicketDashboard } from "@/components/tickets/ticket-dashboard"
import { AuthProvider } from "@/contexts/auth-context"


const inter = Inter({ subsets: ["latin"] })

export default function tickets({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <TicketDashboard />
        <div className="container mx-auto">
          <AuthProvider>
            <AIProvider>{children}</AIProvider>
          </AuthProvider>
        </div>
    </body>
    </html>
  )
}
