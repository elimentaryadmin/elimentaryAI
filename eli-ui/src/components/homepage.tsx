"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
// import { AIPrompt } from "@/components/AIPrompt";
import { WeatherWidget } from "@/components/weather-widget"
import {
  ArrowUpRight,
  ChevronDown,
  Download,
  Globe,
  Home,
  ImageIcon,
  MessageSquare,
  Search,
  Settings,
  Smile,
  User,
  BarChart2,
  Share2,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIPrompt } from "./aiprompt";

export default function HomePage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAIPrompt, setShowAIPrompt] = useState(false); // State to control AIPrompt visibility
  const { toast } = useToast();

  const handleMetricSignals = () => {
    window.location.href = "/dashboard/metric-signals";
  };

  const handleGenerateAIReport = () => {
    setShowAIPrompt(true); // Show the AIPrompt component
  };

  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
            Yogesh, How I can help you?
          </h1>

          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Generate delinquency risk analysis by loan type for the state of Ohio."
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-2">
              <div className="flex items-center space-x-2"></div>
              <div className="flex items-center space-x-2">
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => alert("MCP Tools")}
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center text-white"
                  onClick={handleGenerateAIReport}
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Conditionally render AIPrompt */}
          {showAIPrompt && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                {/* Replace this with the actual AIPrompt component */}
                <AIPrompt></AIPrompt>
              </div>
            </div>
          )}

          {/* News Cards */}
          <div className="grid grid-cols-3 gap-4">
           {/* Weather Card - Replace the static weather card with our dynamic widget */}
             <div className="col-span-1">
                <WeatherWidget compact defaultCity="New York" />
              </div>

            {/* Overview Card */}
            <div
              className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer"
              onClick={() =>
                (window.location.href = "/dashboard/risk-insights-overview")
              }
            >
              <div className="flex mb-2">
                <div className="w-8 h-8 bg-black rounded-md mr-2"></div>
                <div>
                  <div className="text-xs font-medium">Overview</div>
                  <div className="text-xs text-gray-600">
                    Your customised summary
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics & signals Card */}
            <div
              className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer"
              onClick={handleMetricSignals}
            >
              <div className="flex mb-2">
                <div className="w-8 h-8 bg-gray-200 rounded-md mr-2"></div>
                <div>
                  <div className="text-xs font-medium">Metrics & Signals</div>
                  <div className="text-xs text-gray-600">
                    Monitor and manage your portfolio
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}