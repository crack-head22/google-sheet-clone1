'use client'

import { useState, useRef, useEffect } from 'react'
import { Input } from "../components/ui/input"

interface EditableTitleProps {
  initialTitle: string
  onTitleChange: (newTitle: string) => void
}

export default function EditableTitle({ initialTitle, onTitleChange }: EditableTitleProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(initialTitle)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  const handleBlur = () => {
    setIsEditing(false)
    onTitleChange(title)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false)
      onTitleChange(title)
    }
  }

  return isEditing ? (
    <Input
      ref={inputRef}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className="w-64 h-8 text-lg font-medium"
    />
  ) : (
    <span
      onDoubleClick={handleDoubleClick}
      className="text-lg font-medium cursor-pointer hover:bg-green-50 px-2 py-1 rounded"
    >
      {title}
    </span>
  )
}

