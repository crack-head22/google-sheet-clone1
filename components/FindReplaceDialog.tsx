import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface FindReplaceDialogProps {
  isOpen: boolean
  onClose: () => void
  onFindReplace: (find: string, replace: string) => void
}

export default function FindReplaceDialog({ isOpen, onClose, onFindReplace }: FindReplaceDialogProps) {
  const [findText, setFindText] = useState('')
  const [replaceText, setReplaceText] = useState('')

  const handleReplace = () => {
    onFindReplace(findText, replaceText)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Find and Replace</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="find">Find</Label>
            <Input
              id="find"
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
              placeholder="Text to find"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="replace">Replace with</Label>
            <Input
              id="replace"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              placeholder="Replacement text"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleReplace}>
            Replace All
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

