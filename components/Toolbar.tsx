import { Button } from "@/components/ui/button"
import { Bold, Italic, AlignLeft, AlignCenter, AlignRight, Save, Upload } from 'lucide-react'

interface ToolbarProps {
  activeCell: string | null
  cellFormat: { [key: string]: { bold?: boolean, italic?: boolean } }
  updateCellFormat: (cellId: string, format: { bold?: boolean, italic?: boolean }) => void
  onSave: () => void
  onLoad: () => void
}

export default function Toolbar({ activeCell, cellFormat, updateCellFormat, onSave, onLoad }: ToolbarProps) {
  const handleFormatClick = (format: 'bold' | 'italic') => {
    if (activeCell) {
      updateCellFormat(activeCell, { [format]: !cellFormat[activeCell]?.[format] })
    }
  }

  return (
    <div className="flex items-center space-x-2 p-2 bg-white border-b shadow-sm">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleFormatClick('bold')}
        className={activeCell && cellFormat[activeCell]?.bold ? 'bg-gray-200' : ''}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleFormatClick('italic')}
        className={activeCell && cellFormat[activeCell]?.italic ? 'bg-gray-200' : ''}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <div className="border-l mx-2 h-6" />
      <Button variant="ghost" size="icon">
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <AlignRight className="h-4 w-4" />
      </Button>
      <div className="border-l mx-2 h-6" />
      <Button variant="ghost" size="icon" onClick={onSave}>
        <Save className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={onLoad}>
        <Upload className="h-4 w-4" />
      </Button>
    </div>
  )
}

