"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { MessageSquare, Eye, Clock, User, History, Plus, Filter, SortAsc, Download } from "lucide-react"
import { AnnotationSystem } from "@/components/annotation-system"
import { CollaborationModal } from "@/components/collaboration-modal-edit"

export function CollaborationPanel() {
  const [collaborationModalOpen, setCollaborationModalOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<{ type: string; title: string } | null>(null)

  const documents = [
    { type: "delinquency", title: "Delinquency Analysis" },
    { type: "underwriting", title: "Underwriting Performance Review" },
    { type: "regional", title: "Regional Risk Assessment" },
    { type: "customer", title: "Customer Segment Analysis" },
  ]

  const handleOpenDocument = (document: { type: string; title: string }) => {
    setSelectedDocument(document)
    setCollaborationModalOpen(true)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
         
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="documents">
            <TabsList className="mb-4">
              <TabsTrigger value="documents">Reviews</TabsTrigger>
              <TabsTrigger value="audit">Audit Trail</TabsTrigger>
            </TabsList>

            <TabsContent value="documents">
              <div className="mb-4 flex items-center gap-2">
                <Input placeholder="Search documents..." className="max-w-sm" />
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <SortAsc className="mr-2 h-4 w-4" />
                  Sort
                </Button>
              </div>

              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {documents.map((doc, i) => (
                    <Card key={i} className="cursor-pointer hover:bg-muted/50" onClick={() => handleOpenDocument(doc)}>
                      <CardHeader className="p-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{doc.title}</CardTitle>
                          <Badge variant="outline">
                            {doc.type === "delinquency"
                              ? "Delinquency"
                              : doc.type === "underwriting"
                                ? "Underwriting"
                                : doc.type === "regional"
                                  ? "Regional"
                                  : "Customer"}
                          </Badge>
                        </div>
                        <CardDescription>Last edited by John Doe • 2 hours ago</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex items-center gap-4">
                          <div className="flex -space-x-2">
                            <Avatar className="h-6 w-6 border-2 border-background">
                              <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <Avatar className="h-6 w-6 border-2 border-background">
                              <AvatarFallback>SC</AvatarFallback>
                            </Avatar>
                            <Avatar className="h-6 w-6 border-2 border-background">
                              <AvatarFallback>EJ</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <MessageSquare className="h-4 w-4" />
                            <span>{i + 3} comments</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="annotations">
              <AnnotationSystem />
            </TabsContent>

            <TabsContent value="audit">
              <div className="mb-4 flex items-center gap-2">
                <Input placeholder="Search audit trail..." className="max-w-sm" />
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>

              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                    <div key={i} className="flex items-start gap-4 border-b pb-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        {i % 4 === 0 && <MessageSquare className="h-4 w-4" />}
                        {i % 4 === 1 && <User className="h-4 w-4" />}
                        {i % 4 === 2 && <Eye className="h-4 w-4" />}
                        {i % 4 === 3 && <History className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {i % 3 === 0 ? "Sarah Connor" : i % 3 === 1 ? "John Doe" : "Emily Johnson"}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {i % 4 === 0
                              ? "added an annotation"
                              : i % 4 === 1
                                ? "viewed a document"
                                : i % 4 === 2
                                  ? "exported data"
                                  : "created a document"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {i % 4 === 0
                            ? "Added annotation to Delinquency Analysis"
                            : i % 4 === 1
                              ? "Viewed Underwriting Performance Report"
                              : i % 4 === 2
                                ? "Exported Delinquency Data"
                                : "Created Regional Risk Assessment document"}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {i % 2 === 0 ? "2 hours ago" : "Yesterday"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <CollaborationModal
        open={collaborationModalOpen}
        onOpenChange={setCollaborationModalOpen}
        initialContext={selectedDocument || undefined}
      />
    </div>
  )
}

