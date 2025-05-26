"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Users, History, Save, X } from "lucide-react"

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
  initialContext = { type: "delinquency", title: "Delinquency Analysis" },
}: CollaborationModalProps) {
  const [title, setTitle] = useState(initialContext.title || "Untitled")
  const [activeTab, setActiveTab] = useState("editor")
  const [isPrivate, setIsPrivate] = useState(false)

  // Simplified data
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

  const history = [
    { id: 1, user: "John Doe", action: "created this document", timestamp: "2 hours ago" },
    { id: 2, user: "Sarah Connor", action: "added a comment", timestamp: "30 minutes ago" },
    { id: 3, user: "John Doe", action: "updated the content", timestamp: "15 minutes ago" },
  ]

  const [showCommentInput, setShowCommentInput] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [activeComment, setActiveComment] = useState<number | null>(null)
  const [newReply, setNewReply] = useState("")

  // Simplified useEffect to avoid potential React version conflicts
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCollaborators((prev) =>
  //       prev.map((user) => ({
  //         ...user,
  //         status: Math.random() > 0.7 ? (user.status === "active" ? "idle" : "active") : user.status,
  //       })),
  //     )
  //   }, 5000)

  //   return () => clearInterval(interval)
  // }, [])

  const handleAddComment = () => {
    // if (newComment.trim()) {
    //   const comment = {
    //     id: comments.length + 1,
    //     user: { id: 1, name: "John Doe", avatar: "/placeholder-user.jpg" },
    //     content: newComment,
    //     timestamp: "Just now",
    //     resolved: false,
    //     replies: [],
    //   }
    //   setComments([comment, ...comments])
    //   setNewComment("")
    //   setShowCommentInput(false)
    //   // Add to history
    //   setHistory([
    //     {
    //       id: history.length + 1,
    //       user: { id: 1, name: "John Doe", avatar: "/placeholder-user.jpg" },
    //       action: "added a comment",
    //       timestamp: "Just now",
    //     },
    //     ...history,
    //   ])
    // }
  }

  const handleAddReply = (commentId: number) => {
    // if (newReply.trim()) {
    //   setComments(
    //     comments.map((comment) => {
    //       if (comment.id === commentId) {
    //         return {
    //           ...comment,
    //           replies: [
    //             ...comment.replies,
    //             {
    //               id: Date.now(),
    //               user: { id: 1, name: "John Doe", avatar: "/placeholder-user.jpg" },
    //               content: newReply,
    //               timestamp: "Just now",
    //             },
    //           ],
    //         }
    //       }
    //       return comment
    //     }),
    //   )
    //   setNewReply("")
    //   setActiveComment(null)
    // }
  }

  const handleResolveComment = (commentId: number) => {
    // setComments(comments.map((comment) => (comment.id === commentId ? { ...comment, resolved: true } : comment)))
  }

  const handleDeleteComment = (commentId: number) => {
    // setComments(comments.filter((comment) => comment.id !== commentId))
  }

  // Render collaborator avatars
  const renderCollaboratorAvatars = () => {
    // return collaborators.slice(0, 3).map((user) => (
    //   <TooltipProvider key={user.id}>
    //     <Tooltip>
    //       <TooltipTrigger asChild>
    //         <Avatar
    //           className={cn(
    //             "h-8 w-8 border-2 border-background",
    //             user.status === "active"
    //               ? "ring-2 ring-green-500"
    //               : user.status === "idle"
    //                 ? "ring-2 ring-yellow-500"
    //                 : "",
    //           )}
    //         >
    //           <AvatarImage src={user.avatar} alt={user.name} />
    //           <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
    //         </Avatar>
    //       </TooltipTrigger>
    //       <TooltipContent>
    //         {user.name} - {user.status === "active" ? "Active now" : user.status === "idle" ? "Idle" : "Offline"}
    //       </TooltipContent>
    //     </Tooltip>
    //   </TooltipProvider>
    // ))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0">
        <DialogHeader className="px-4 py-2 border-b flex flex-row items-center justify-between">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="max-w-sm border-0 text-lg font-medium focus-visible:ring-0"
            placeholder="Untitled"
          />
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="flex flex-1 overflow-hidden">
          {/* Main content area */}
          <div className="flex-1 overflow-auto p-6">
            <div className="prose prose-sm max-w-3xl mx-auto">
              <h1>Delinquency Analysis</h1>
              <p>
              -------------------Add Details-------------------
              </p>
              <h2>Key Findings</h2>
              -------------------Add Details-------------------
              <h2>Recommendations</h2>
              -------------------Add Details-------------------
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-72 border-l flex flex-col">
            <Tabs defaultValue="comments" className="flex-1 flex flex-col">
              <TabsList className="w-full rounded-none border-b">
                <TabsTrigger value="comments" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Comments
                </TabsTrigger>
                <TabsTrigger value="people" className="flex-1">
                  <Users className="h-4 w-4 mr-2" />
                  People
                </TabsTrigger>
                <TabsTrigger value="history" className="flex-1">
                  <History className="h-4 w-4 mr-2" />
                  History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="comments" className="flex-1 p-0 m-0">
                <ScrollArea className="h-full">
                  <div className="p-4 space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="border rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{comment.user}</span>
                              <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                            </div>
                            <p className="text-sm mt-1">{comment.content}</p>
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
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium">Collaborators</h3>
                    </div>

                    <div className="space-y-2">
                      {collaborators.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{user.name}</p>
                              <div className="flex items-center gap-1">
                                <span
                                  className={`h-2 w-2 rounded-full ${
                                    user.status === "active"
                                      ? "bg-green-500"
                                      : user.status === "idle"
                                        ? "bg-yellow-500"
                                        : "bg-gray-300"
                                  }`}
                                />
                                <span className="text-xs text-muted-foreground">
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

              <TabsContent value="history" className="flex-1 p-0 m-0">
                <ScrollArea className="h-full">
                  <div className="p-4 space-y-4">
                    <h3 className="text-sm font-medium">Document History</h3>

                    <div className="space-y-3">
                      {history.map((item) => (
                        <div key={item.id} className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{item.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-medium">{item.user}</span>
                              <span className="text-xs text-muted-foreground">{item.action}</span>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              <span className="text-xs text-muted-foreground">{item.timestamp}</span>
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

        <DialogFooter className="px-4 py-2 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

