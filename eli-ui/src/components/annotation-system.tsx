"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Eye, EyeOff, Plus, X } from "lucide-react"
import { CollaborationModal } from "@/components/collaboration-modal-edit"

interface AnnotationProps {
  context?: {
    type: string
    title: string
  }
}

export function AnnotationSystem({
  context = { type: "delinquency", title: "Delinquency Analysis" },
}: AnnotationProps) {
  const [annotations, setAnnotations] = useState([
    {
      id: 1,
      user: "John Doe",
      content:
        "The increase in delinquency for personal loans needs further investigation. I've noticed a correlation with recent marketing campaigns.",
      timestamp: "2 hours ago",
      isPrivate: false,
    },
    {
      id: 2,
      user: "Sarah Connor",
      content:
        "Underwriting performance for the 'Young Professional' segment has degraded significantly. We should review our credit scoring model for this segment.",
      timestamp: "Yesterday",
      isPrivate: true,
    },
  ])

  const [showAnnotationForm, setShowAnnotationForm] = useState(false)
  const [newAnnotation, setNewAnnotation] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)
  const [activeAnnotation, setActiveAnnotation] = useState<number | null>(null)
  const [collaborationModalOpen, setCollaborationModalOpen] = useState(false)

  const handleAddAnnotation = () => {
    if (newAnnotation.trim()) {
      const annotation = {
        id: annotations.length + 1,
        user: "John Doe",
        content: newAnnotation,
        timestamp: "Just now",
        isPrivate: isPrivate,
      }
      setAnnotations([...annotations, annotation])
      setNewAnnotation("")
      setShowAnnotationForm(false)
    }
  }

  const handleDeleteAnnotation = (id: number) => {
    setAnnotations(annotations.filter((annotation) => annotation.id !== id))
  }

  const handleTogglePrivacy = (id: number) => {
    setAnnotations(
      annotations.map((annotation) =>
        annotation.id === id ? { ...annotation, isPrivate: !annotation.isPrivate } : annotation,
      ),
    )
  }

  return (
    <div className="relative">
      <Card className="mb-4">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-md font-medium">Annotations</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setCollaborationModalOpen(true)}>
              <Eye className="mr-2 h-4 w-4" />
              View Document
            </Button>
            <Button size="sm" onClick={() => setShowAnnotationForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Annotation
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {annotations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No annotations yet</p>
              <Button variant="outline" size="sm" className="mt-2" onClick={() => setShowAnnotationForm(true)}>
                Add an annotation
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {annotations.map((annotation) => (
                <div
                  key={annotation.id}
                  className="border rounded-lg p-3 relative"
                  onMouseEnter={() => setActiveAnnotation(annotation.id)}
                  onMouseLeave={() => setActiveAnnotation(null)}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{annotation.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{annotation.user}</span>
                          <span className="text-xs text-muted-foreground">{annotation.timestamp}</span>
                          {annotation.isPrivate && (
                            <Badge variant="outline" className="flex items-center gap-1">
                              <EyeOff className="h-3 w-3" />
                              Private
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm mt-1">{annotation.content}</p>
                    </div>
                  </div>

                  {activeAnnotation === annotation.id && (
                    <div className="absolute top-2 right-2 flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleTogglePrivacy(annotation.id)}
                      >
                        {annotation.isPrivate ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive"
                        onClick={() => handleDeleteAnnotation(annotation.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {showAnnotationForm && (
            <div className="mt-4 border rounded-lg p-3">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Add your annotation..."
                    value={newAnnotation}
                    onChange={(e) => setNewAnnotation(e.target.value)}
                    className="mb-2"
                    rows={3}
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-1" onClick={() => setIsPrivate(!isPrivate)}>
                        {isPrivate ? (
                          <>
                            <EyeOff className="h-4 w-4" />
                            <span>Private</span>
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4" />
                            <span>Public</span>
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => setShowAnnotationForm(false)}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleAddAnnotation}>
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <CollaborationModal
        open={collaborationModalOpen}
        onOpenChange={setCollaborationModalOpen}
        initialContext={context}
      />
    </div>
  )
}

