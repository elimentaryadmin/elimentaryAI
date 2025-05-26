"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, Info, Maximize2, Minus, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SocureVerificationUI() {
  const [activeTab, setActiveTab] = useState("logic")
  const [isConfigExpanded, setIsConfigExpanded] = useState(true)
  const [zoomLevel, setZoomLevel] = useState(95)
  const router = useRouter()

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side - Workflow diagram */}
      <div className="flex-1 p-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#e0e0e0_1px,transparent_1px)] bg-[size:10px_10px]"></div>
        <div className="relative flex flex-col items-center pt-16 space-y-8">
         {/* User Input Node */}
          <div className="z-10 w-full max-w-md">
            <div className="border border-blue-300 rounded-lg bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="text-green-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zN2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Define Node</div>
                  <div className="font-medium">Start defining the rule</div>
                </div>
              </div>
            </div>
          </div>

          
          {/* Zoom controls */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white rounded-md shadow-sm border p-1">
            <button className="p-1">
              <Maximize2 size={16} />
            </button>
            <button className="p-1">
              <Minus size={16} />
            </button>
            <span className="text-sm font-medium">{zoomLevel}%</span>
            <button className="p-1">
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Right side - Configuration panel */}
      <div className="w-[550px] border-l bg-white">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-orange-500">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <div>
              <div className="text-sm text-gray-500">Credit Approval flow</div>
              <div className="font-medium">Define the product type</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-gray-400 hover:text-gray-600">
              <Info size={18} />
            </button>
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={() => router.push("/dashboard/underwriting")}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
        {["Logic","Version","Mode", "Comments (0)"].map((tab) => (  
            <button
              key={tab}
              className={cn(
                "px-4 py-3 text-sm font-medium",
                activeTab === tab.toLowerCase() ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600",
              )}
              onClick={() => setActiveTab(tab.toLowerCase())}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Configuration content */}
        <div className="p-4">
          <div className="border rounded-md mb-4">
            <button
              className="w-full p-3 flex items-center justify-between"
              onClick={() => setIsConfigExpanded(!isConfigExpanded)}
            >
              <span className="font-medium">Configure Approval criteria</span>
              <ChevronDown
                size={20}
                className={cn("transition-transform", isConfigExpanded ? "transform rotate-180" : "")}
              />
            </button>

            {isConfigExpanded && (
              <div className="p-4 pt-0 space-y-4">
                {[
                  { label: "Credit Score", field: "" },
                  { label: "Debt-to-income", field: "" },
                  { label: "Loan-to-Value", field: "" },
                  { label: "Delayed-Payment", field: "" },
                  { label: "Employment-Years", field: "" },
                ].map((item) => (
                  <div key={item.label} className="grid grid-cols-[180px_1fr] gap-4 items-center">
                    <div className="flex items-center gap-1">
                      <span>{item.label}</span>
                      <button className="text-gray-400 ml-1">
                        <Info size={14} />
                      </button>
                    </div>
                    <input
                      type="text"
                      onChange={(e) => (item.field = e.target.value)}
                      placeholder="Enter value"
                      className="border rounded-md p-2 bg-gray-50 text-gray-500 w-full"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
