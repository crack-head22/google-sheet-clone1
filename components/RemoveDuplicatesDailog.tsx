import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface RemoveDuplicatesDialogProps {
  isOpen: boolean
  onClose: () => void
  onRemoveDuplicates: (columns: string[]) => void
  selectedRange: string
}

export default function RemoveDuplicatesDialog({
  isOpen,
  onClose,
  onRemoveDuplicates,
  selectedRange
}: RemoveDuplicatesDialogProps) {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])

  const handleRemove = () => {
    onRemoveDuplicates(selectedColumns)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove Duplicates</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            Selected range: {selectedRange}
          </p>
          <div className="space-y-2">
            <Label>Select columns to check for duplicates:</Label>
            {['A', 'B', 'C', 'D'].map((column) => (
              <div key={column} className="flex items-center space-x-2">
                <Checkbox
                  id={`column-${column}`}
                  checked={selectedColumns.includes(column)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedColumns([...selectedColumns, column])
                    } else {
                      setSelectedColumns(selectedColumns.filter(col => col !== column))
                    }
                  }}
                />
                <Label htmlFor={`column-${column}`}>Column {column}</Label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleRemove} disabled={selectedColumns.length === 0}>
            Remove Duplicates
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

