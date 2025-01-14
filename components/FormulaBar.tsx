import { Input } from "@/components/ui/input"

interface FormulaBarProps {
  activeCell: string | null
  cellData: { [key: string]: string }
  updateCellData: (cellId: string, value: string) => void
}

export default function FormulaBar({ activeCell, cellData, updateCellData }: FormulaBarProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (activeCell) {
      updateCellData(activeCell, e.target.value)
    }
  }

  return (
    <div className="flex items-center space-x-2 p-2 bg-white border-b">
      <div className="w-20 text-sm font-medium bg-gray-100 p-1 rounded">{activeCell || ''}</div>
      <Input
        value={activeCell ? cellData[activeCell] || '' : ''}
        onChange={handleInputChange}
        className="flex-grow shadow-sm"
        placeholder="Enter a value or formula (e.g., =SUM(A1:A5))"
      />
    </div>
  )
}

