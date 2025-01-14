import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bold, Italic, AlignLeft, AlignCenter, AlignRight, Save, Upload, ChevronDown, Undo, Redo, Printer, PaintbrushIcon as Paint, Percent, Currency, BarChartIcon as ChartBar, Search, Table, Plus, ActivityIcon as Function } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import EditableTitle from './EditableTitle'

interface EnhancedToolbarProps {
  activeCell: string | null
  cellFormat: { [key: string]: { bold?: boolean, italic?: boolean } }
  updateCellFormat: (cellId: string, format: { bold?: boolean, italic?: boolean }) => void
  onSave: () => void
  onLoad: () => void
  onFindReplace: () => void
  onRemoveDuplicates: () => void
  onCreateChart: () => void
  onAddRow: () => void
  onAddColumn: () => void
  zoom: number
  onZoomChange: (zoom: number) => void
  title: string
  onTitleChange: (title: string) => void
  onOpenFunctionTester: () => void
}

export default function EnhancedToolbar({
  activeCell,
  cellFormat,
  updateCellFormat,
  onSave,
  onLoad,
  onFindReplace,
  onRemoveDuplicates,
  onCreateChart,
  onAddRow,
  onAddColumn,
  zoom,
  onZoomChange,
  title,
  onTitleChange,
  onOpenFunctionTester
}: EnhancedToolbarProps) {
  return (
    <div className="flex flex-col border-b">
      {/* Top Menu Bar */}
      <div className="flex items-center justify-between p-1 bg-[#00ac47] text-white">
        <div className="flex items-center space-x-4">
          <EditableTitle initialTitle={title} onTitleChange={onTitleChange} />
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-[#018c3a]">File</Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-[#018c3a]">Edit</Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-[#018c3a]">View</Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-[#018c3a]">Insert</Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-[#018c3a]">Format</Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-[#018c3a]">Data</Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-[#018c3a]">Tools</Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-[#018c3a]">Extensions</Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-[#018c3a]">Help</Button>
          </div>
        </div>
      </div>

      {/* Main Toolbar */}
      <div className="flex items-center space-x-2 p-1 bg-white">
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon">
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Redo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Paint className="h-4 w-4" />
          </Button>
        </div>

        <div className="h-4 border-l" />

        <Select value={zoom.toString()} onValueChange={(value) => onZoomChange(Number(value))}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Zoom" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="50">50%</SelectItem>
            <SelectItem value="75">75%</SelectItem>
            <SelectItem value="90">90%</SelectItem>
            <SelectItem value="100">100%</SelectItem>
            <SelectItem value="125">125%</SelectItem>
            <SelectItem value="150">150%</SelectItem>
            <SelectItem value="200">200%</SelectItem>
          </SelectContent>
        </Select>

        <div className="h-4 border-l" />

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onAddColumn} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Column
          </Button>
          <Button variant="ghost" size="sm" onClick={onAddRow} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Row
          </Button>
        </div>

        <div className="h-4 border-l" />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => updateCellFormat(activeCell!, { bold: !cellFormat[activeCell!]?.bold })}
          className={activeCell && cellFormat[activeCell]?.bold ? 'bg-gray-200' : ''}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => updateCellFormat(activeCell!, { italic: !cellFormat[activeCell!]?.italic })}
          className={activeCell && cellFormat[activeCell]?.italic ? 'bg-gray-200' : ''}
        >
          <Italic className="h-4 w-4" />
        </Button>

        <div className="h-4 border-l" />

        <Button variant="ghost" size="icon">
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <AlignRight className="h-4 w-4" />
        </Button>

        <div className="h-4 border-l" />

        <Button variant="ghost" size="icon" onClick={onCreateChart}>
          <ChartBar className="h-4 w-4" />
        </Button>

        <div className="h-4 border-l" />

        <Button variant="ghost" size="icon" onClick={onFindReplace}>
          <Search className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="icon" onClick={onRemoveDuplicates}>
          <Table className="h-4 w-4" />
        </Button>

        <div className="h-4 border-l" />

        <Button variant="ghost" size="icon" onClick={onSave}>
          <Save className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onLoad}>
          <Upload className="h-4 w-4" />
        </Button>

        <div className="h-4 border-l" />

        <Button variant="ghost" size="icon" onClick={onOpenFunctionTester}>
          <Function className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

