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
  const [fields, setFields] = useState([
    { label: "Credit Score", field: "620", hasAsterisk: false },
    { label: "Debt-to-income", field: "43%", hasAsterisk: false },
    { label: "Loan-to-Value", field: "80%", hasAsterisk: false },
    { label: "Delayed-Payment", field: "1", hasAsterisk: false },
    { label: "Employment-Years", field: "5", hasAsterisk: false },
  ])

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side - Workflow diagram */}
      <div className="flex-1 p-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#e0e0e0_1px,transparent_1px)] bg-[size:10px_10px]"></div>
        <div className="relative flex flex-col items-center pt-16 space-y-8">
          {/* Vertical line */}
          <div className="absolute h-96 w-3.5 bg-gray-500 top-32 z-0"></div>

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
                  <div className="text-sm text-gray-500">User Input</div>
                  <div className="font-medium">Take User Input for KYC</div>
                </div>
              </div>
            </div>
          </div>

          {/* Credit bureau Node */}
          <div className="z-10 w-full max-w-md">
            <div className="border border-blue-300 rounded-lg bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="text-orange-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Credit Bureau</div>
                  <div className="font-medium">Fetch Credit Bureau</div>
                </div>
              </div>
            </div>
          </div>

          {/* Evaluate credit eligibilty node */}
          <div className="z-10 w-full max-w-md">
            <div className="border border-blue-200 rounded-lg bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="bg-pink-100 text-pink-500 p-1 rounded">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Underwriting</div>
                  <div className="font-medium">Evaluate credit eligibilty</div>
                </div>
              </div>
            </div>
          </div>

          {/* EDD node 
          <div className="z-10 w-full max-w-md">
            <div className="border border-gray-200 rounded-lg bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 text-blue-500 p-1 rounded">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 3H8C6.9 3 6 3.9 6 5V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V5C18 3.9 17.1 3 16 3ZM14 17H10V15H14V17ZM14 13H10V11H14V13ZM14 9H10V7H14V9Z"></path>
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">EDD</div>
                  <div className="font-medium">Liveliness check</div>
                </div>
              </div>
            </div>
          </div>*/}

          {/* Decision buttons 
          <div className="z-10 w-full max-w-md flex justify-between">
            <button className="bg-white rectan-full px-6 py-2 shadow-sm border">Manual review</button>
            <button className="bg-white rounded-full px-6 py-2 shadow-sm border">Continue</button>
          </div>*/}

          {/* Manual review screening node */}
          <div className="z-10 w-full max-w-md">
            <div className="border border-gray-200 rounded-lg bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="bg-gray-100 text-gray-500 p-1 rounded-full">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Manual Review</div>
                  <div className="font-medium">Manual review of application</div>
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
              <div className="font-medium">Consumer durable loans</div>
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
                  { label: "Credit Score"},
                  { label: "Debt-to-income"},
                  { label: "Loan-to-Value"},
                  { label: "Delayed-Payment"},
                  { label: "Employment-Years"},
                ].map((item, index) => (
                    <div key={item.label} className="grid grid-cols-[180px_1fr] gap-4 items-center">
                    <div className="flex items-center gap-1">
                      <span>{item.label}</span>
                      <button className="text-gray-400 ml-1">
                      <Info size={12} />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={fields[index].field}
                      onChange={(e) => {
                        const updatedFields = [...fields];
                        updatedFields[index] = { ...updatedFields[index], field: e.target.value };
                        setFields(updatedFields);
                      }}
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
