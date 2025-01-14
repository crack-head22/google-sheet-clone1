import { useState, useEffect, useRef } from 'react'
import { Input } from "../components/ui/input"
import { validateDataType } from '../utils/mathFunctions'

interface CellProps {
  id: string
  rawValue: string
  displayValue: string | number
  format?: { bold?: boolean, italic?: boolean }
  isActive: boolean
  setActiveCell: (cellId: string | null) => void
  updateCellData: (cellId: string, value: string) => void
}

export default function Cell({ id, rawValue, displayValue, format, isActive, setActiveCell, updateCellData }: CellProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [localValue, setLocalValue] = useState(rawValue)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isActive && isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isActive, isEditing])

  useEffect(() => {
    setLocalValue(rawValue)
  }, [rawValue])

  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  const handleBlur = () => {
    setIsEditing(false)
    updateCellData(id, localValue)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false)
      updateCellData(id, localValue)
    }
  }

  const cellStyle = {
    fontWeight: format?.bold ? 'bold' : 'normal',
    fontStyle: format?.italic ? 'italic' : 'normal',
  }

  const dataType = validateDataType(rawValue)

  return (
    <td
      className={`w-24 h-8 border ${isActive ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
      onClick={() => setActiveCell(id)}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <Input
          ref={inputRef}
          value={localValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full h-full border-none p-0"
          type={dataType === 'number' ? 'number' : 'text'}
        />
      ) : (
        <div className={`w-full h-full p-1 overflow-hidden ${dataType === 'number' ? 'text-right' : ''}`} style={cellStyle}>
          {displayValue}
        </div>
      )}
    </td>
  )
}

