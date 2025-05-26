"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Users, Save, X, Share2, Send, Slack } from "lucide-react"
import { toast } from "@/components/ui/use-toast";
import { ToastProvider } from "@/components/ui/toast";
import { CommentInput } from "@/components/comment-input";
import { DialogTitle } from "@radix-ui/react-dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartVisualizerReview } from "@/components/chart-visualizer-review"

interface CollaborationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialContext?: {
    type: string
    title: string
  }
}

export function CollaborationModal({
  open,
  onOpenChange,
  initialContext = { type: "delinquency", title: "Delinquency Risk Analysis by Loan Type" },
}: CollaborationModalProps) {
  const [title, setTitle] = useState(initialContext.title || "Untitled Analysis")
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentContext, setCommentContext] = useState<string | null>(null);

  const handleShareToSlack = () => {
    // Add logic to share to Slack here
    toast({
      title: "Slack",
      description: "The report has been successfully shared on Slack!",
    });
  };

  const handleExportToGoogleWorkspace = () => {
    // TODO: Implement the logic to export the report to Google Workspace.
    // This might involve calling an API or integrating with Google services.
    toast({
      title: "Exported to Google",
      description: "The report has been successfully exported to your Google Workspace.",
    });
  };

  const handleRightClick = (event: React.MouseEvent, context: string) => {
    event.preventDefault(); // Prevent the default context menu
    setShowCommentInput(true); // Show the comment input
    setCommentContext(context); // Optionally set the context for the comment
  };

  const comments = [
    {
      id: 1,
      user: "Sarah Connor",
      content: "I think we should investigate the increase in delinquency rates for personal loans further.",
      timestamp: "10 minutes ago",
    },
    {
      id: 2,
      user: "John Doe",
      content: "Agreed. I'll look into the correlation with recent marketing campaigns.",
      timestamp: "5 minutes ago",
    },
  ]

  const collaborators = [
    { id: 1, name: "John Doe", status: "active" },
    { id: 2, name: "Sarah Connor", status: "idle" },
    { id: 3, name: "Emily Johnson", status: "offline" },
  ]

  return (
    <ToastProvider>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTitle></DialogTitle>
        <DialogContent className="max-w-6xl h-[95vh] flex flex-col p-0 bg-white shadow-lg rounded-lg">
          <DialogHeader className="px-6 py-4 border-b flex flex-row items-center justify-between bg-gray-50">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="max-w-sm border-0 text-lg font-medium focus-visible:ring-0 bg-transparent"
              placeholder="Untitled"
            />
          </DialogHeader>
          <div className="flex flex-1 overflow-hidden" onContextMenu={(e) => handleRightClick(e, "Report")}>
            {/* Main content area */}
            <div className="flex-1 overflow-auto p-6 bg-gray-50">
              <div className="prose prose-sm max-w-3xl mx-auto">
                <h2 className="text-lg font-semibold text-gray-700">Executive Summary</h2>
                <p className="text-gray-600">
                  Delinquency rates have exhibited a notable upward trend, with personal loans experiencing the most significant increase. This trend raises concerns about potential systemic risks and necessitates immediate attention to mitigate further escalation.
                </p>
                <div className="h-6"></div>
                <h2 className="text-lg font-semibold text-gray-700">Key Findings</h2>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>
                    <strong>Personal Loans:</strong> Delinquency rates increased from 3.2% in January to 5.2% in July, marking a 62.5% rise.
                  </li>
                  <li>
                    <strong>Business Loans:</strong> Highest absolute delinquency rate at 6.1% in July.
                  </li>
                  <li>
                    <strong>Mortgages:</strong> Maintained the lowest delinquency rates, consistently below 2% throughout the period.
                  </li>
                  <li>
                    <strong>Acceleration Period:</strong> The April-July period saw a sharper increase in delinquency rates across all loan types.
                  </li>
                </ul>
                <div className="h-6"></div>
                <div className="grid gap-4 md:grid-cols-20 lg:grid-cols-20">
                  <Card className="col-span-20">
                    <CardHeader></CardHeader>
                    <CardContent className="pl-2">
                      <ChartVisualizerReview />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Comment Input */}
            {showCommentInput && (
              <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4">
                <CommentInput
                  onSubmit={handleExportToGoogleWorkspace}
                  onAttach={handleExportToGoogleWorkspace}
                  onMention={handleExportToGoogleWorkspace}
                  className="mt-4"
                />
                <button
                  className="mt-2 text-sm text-gray-500"
                  onClick={() => setShowCommentInput(false)}
                >
                  Close
                </button>
              </div>
            )}

            {/* Sidebar*/}
            <div className="w-72 border-l flex flex-col bg-gray-50">
              <Tabs defaultValue="comments" className="flex-1 flex flex-col">
                <TabsList className="w-full rounded-none border-b bg-gray-100">
                  <TabsTrigger value="comments" className="flex-1 text-gray-700">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Comments
                  </TabsTrigger>
                  <TabsTrigger value="people" className="flex-1 text-gray-700">
                    <Users className="h-4 w-4 mr-2" />
                    People
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="comments" className="flex-1 p-0 m-0">
                  <ScrollArea className="h-full">
                    <div className="p-4 space-y-4">
                      {comments.map((comment) => (
                        <div key={comment.id} className="border rounded-lg p-3 bg-white shadow-sm">
                          <div className="flex items-start gap-2">
                            <Avatar className="h-8 w-8 bg-gray-200">
                              <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-800">{comment.user}</span>
                                <span className="text-xs text-gray-500">{comment.timestamp}</span>
                              </div>
                              <p className="text-sm mt-1 text-gray-600">{comment.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="people" className="flex-1 p-0 m-0">
                  <ScrollArea className="h-full">
                    <div className="p-4 space-y-4">
                      <h3 className="text-sm font-medium text-gray-700">Collaborators</h3>
                      <div className="space-y-2">
                        {collaborators.map((user) => (
                          <div
                            key={user.id}
                            className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100"
                          >
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8 bg-gray-200">
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                                <div className="flex items-center gap-1">
                                  <span
                                    className={`h-2 w-2 rounded-full ${user.status === "active"
                                      ? "bg-green-500"
                                      : user.status === "idle"
                                        ? "bg-yellow-500"
                                        : "bg-gray-300"
                                      }`}
                                  />
                                  <span className="text-xs text-gray-500">
                                    {user.status === "active"
                                      ? "Active now"
                                      : user.status === "idle"
                                        ? "Idle"
                                        : "Offline"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <DialogFooter className="px-80 py-4 border-t bg-gray-300 flex justify-between items-center">
            <div className="flex justify-between w-full">
              <div className="relative group">
                <img
                  src="/slack.png"
                  alt="Share to Slack"
                  className="h-8 w-8 cursor-pointer"
                  onClick={handleShareToSlack}
                />
                <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100">
                  Share to Slack
                </span>
              </div>
              <div className="relative group">
                <img
                  src="/google.png"
                  alt="Export to Google"
                  className="h-8 w-8 cursor-pointer"
                  onClick={handleExportToGoogleWorkspace}
                />
                <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100">
                  Export to Google
                </span>
              </div>
              <div className="relative group">
                <img
                  src="/adduser.png"
                  alt="Invite Users"
                  className="h-8 w-8 cursor-pointer"
                  onClick={handleExportToGoogleWorkspace}
                />
                <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100">
                  Invite Users
                </span>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ToastProvider>
  )
}
