import { useMemo } from 'react'
import Cell from './Cell'

interface GridProps {
  activeCell: string | null
  setActiveCell: (cellId: string | null) => void
  cellData: { [key: string]: string }
  evaluatedCellData: { [key: string]: number | string }
  cellFormat: { [key: string]: { bold?: boolean, italic?: boolean } }
  updateCellData: (cellId: string, value: string) => void
  zoom: number
}

export default function Grid({
  activeCell,
  setActiveCell,
  cellData,
  evaluatedCellData,
  cellFormat,
  updateCellData,
  zoom
}: GridProps) {
  const rows = 100
  const cols = 26

  const headerRow = useMemo(() => {
    return Array.from({ length: cols }, (_, i) => String.fromCharCode(65 + i))
  }, [cols])

  const cellSize = useMemo(() => {
    return Math.floor(96 * (zoom / 100)) // 96px is the base cell width
  }, [zoom])

  return (
    <div className="overflow-auto flex-grow">
      <table className="border-collapse" style={{ fontSize: `${zoom}%` }}>
        <thead>
          <tr>
            <th className={`w-10 h-8 bg-gray-100 border sticky top-0 left-0 z-10`}></th>
            {headerRow.map((header) => (
              <th
                key={header}
                className="h-8 bg-gray-100 border text-sm font-normal sticky top-0"
                style={{ width: `${cellSize}px` }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <tr key={rowIndex}>
              <td className="w-10 h-8 bg-gray-100 border text-sm text-center sticky left-0">
                {rowIndex + 1}
              </td>
              {headerRow.map((colHeader) => {
                const cellId = `${colHeader}${rowIndex + 1}`
                return (
                  <Cell
                    key={cellId}
                    id={cellId}
                    rawValue={cellData[cellId] || ''}
                    displayValue={evaluatedCellData[cellId]}
                    format={cellFormat[cellId]}
                    isActive={activeCell === cellId}
                    setActiveCell={setActiveCell}
                    updateCellData={updateCellData}
                    width={cellSize}
                  />
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

