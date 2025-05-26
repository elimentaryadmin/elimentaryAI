"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Paperclip,
  AtSign,
  ArrowUp,
  Bold,
  Italic,
  Link,
  List,
  ListOrdered,
  Code,
  Eye,
  Edit2,
  ImageIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CommentInputProps {
  onSubmit?: (comment: string, isMarkdown: boolean) => void
  onAttach?: (file: File) => void
  onMention?: () => void
  placeholder?: string
  className?: string
}

export function CommentInput({
  onSubmit,
  onAttach,
  onMention,
  placeholder = "Add a comment...",
  className,
}: CommentInputProps) {
  const [comment, setComment] = useState("")
  const [mode, setMode] = useState<"write" | "preview">("write")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = () => {
    if (comment.trim() && onSubmit) {
      onSubmit(comment, true)
      setComment("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleAttachClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0 && onAttach) {
      onAttach(files[0])
      // Reset the input
      e.target.value = ""
    }
  }

  const insertMarkdown = (prefix: string, suffix = "") => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = comment.substring(start, end)
    const beforeText = comment.substring(0, start)
    const afterText = comment.substring(end)

    // If text is selected, wrap it with the markdown syntax
    // If no text is selected, insert the markdown syntax with a placeholder
    const newText = selectedText
      ? `${beforeText}${prefix}${selectedText}${suffix}${afterText}`
      : `${beforeText}${prefix}${suffix}${afterText}`

    setComment(newText)

    // Set cursor position after the operation
    setTimeout(() => {
      textarea.focus()
      if (selectedText) {
        // If text was selected, place cursor after the formatted text
        const newCursorPos = start + prefix.length + selectedText.length + suffix.length
        textarea.setSelectionRange(newCursorPos, newCursorPos)
      } else {
        // If no text was selected, place cursor between the markdown syntax
        const newCursorPos = start + prefix.length
        textarea.setSelectionRange(newCursorPos, newCursorPos)
      }
    }, 0)
  }

  const formatBold = () => insertMarkdown("**", "**")
  const formatItalic = () => insertMarkdown("*", "*")
  const formatLink = () => insertMarkdown("[", "](url)")
  const formatCode = () => insertMarkdown("`", "`")
  const formatBulletList = () => insertMarkdown("\n- ")
  const formatNumberedList = () => insertMarkdown("\n1. ")
  const formatImage = () => insertMarkdown("![alt text](", ")")

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [comment])

  return (
    <div className={cn("rounded-lg border border-gray-200 bg-white overflow-hidden", className)}>
      <Tabs defaultValue="write" value={mode} onValueChange={(value) => setMode(value as "write" | "preview")}>
        <div className="flex items-center justify-between border-b border-gray-200 px-3 py-2">
          <TabsList className="grid w-[180px] grid-cols-2">
            <TabsTrigger value="write" className="flex items-center gap-1">
              <Edit2 className="w-4 h-4" />
              Write
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-1">
            <button
              onClick={formatBold}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
              title="Bold (Ctrl+B)"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={formatItalic}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
              title="Italic (Ctrl+I)"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              onClick={formatLink}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
              title="Link (Ctrl+K)"
            >
              <Link className="w-4 h-4" />
            </button>
            <button
              onClick={formatBulletList}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={formatNumberedList}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
              title="Numbered List"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
            <button
              onClick={formatCode}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
              title="Code"
            >
              <Code className="w-4 h-4" />
            </button>
            <button
              onClick={formatImage}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
              title="Image"
            >
              <ImageIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        <TabsContent value="write" className="p-0 m-0">
          <textarea
            ref={textareaRef}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full p-4 min-h-[100px] focus:outline-none resize-none"
            rows={3}
          />
        </TabsContent>

        <TabsContent value="preview" className="p-0 m-0">
          <div className="p-4 min-h-[100px] prose prose-sm max-w-none">
            {comment ? (
              <ReactMarkdown>{comment}</ReactMarkdown>
            ) : (
              <p className="text-gray-400 italic">Nothing to preview</p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleAttachClick}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Attach file"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <button
            onClick={onMention}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Mention someone"
          >
            <AtSign className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center">
          <span className="text-xs text-gray-500 mr-2">
            Press <kbd className="px-1 py-0.5 bg-gray-100 rounded border border-gray-300">Ctrl</kbd>+
            <kbd className="px-1 py-0.5 bg-gray-100 rounded border border-gray-300">Enter</kbd> to submit
          </span>
          <button
            onClick={handleSubmit}
            disabled={!comment.trim()}
            className={cn(
              "p-2 rounded-full transition-colors",
              comment.trim() ? "text-white bg-teal-500 hover:bg-teal-600" : "text-gray-400 bg-gray-100",
            )}
            aria-label="Submit comment"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hidden file input */}
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
    </div>
    )
  }
