'use client'

import { useState, useCallback, useMemo } from 'react'
import EnhancedToolbar from './EnhancedToolbar'
import FormulaBar from './FormulaBar'
import Grid from './Grid'
import FindReplaceDialog from './FindReplaceDialog'
import RemoveDuplicatesDialog from './RemoveDuplicatesDialog'
import ChartDialog from './ChartDialog'
import FunctionTester from './FunctionTester'
import { evaluateFormula, validateDataType } from '../utils/mathFunctions'

export default function Spreadsheet() {
  const [title, setTitle] = useState('Untitled spreadsheet')
  const [activeCell, setActiveCell] = useState<string | null>(null)
  const [cellData, setCellData] = useState<{ [key: string]: string }>({})
  const [cellFormat, setCellFormat] = useState<{ [key: string]: { bold?: boolean, italic?: boolean } }>({})
  const [selectedRange, setSelectedRange] = useState<string>('')
  const [zoom, setZoom] = useState(100)
  const [isFindReplaceOpen, setIsFindReplaceOpen] = useState(false)
  const [isRemoveDuplicatesOpen, setIsRemoveDuplicatesOpen] = useState(false)
  const [isChartOpen, setIsChartOpen] = useState(false)
  const [isFunctionTesterOpen, setIsFunctionTesterOpen] = useState(false)

  const updateCellData = useCallback((cellId: string, value: string) => {
    setCellData(prev => ({ ...prev, [cellId]: value }))
  }, [])

  const updateCellFormat = useCallback((cellId: string, format: { bold?: boolean, italic?: boolean }) => {
    setCellFormat(prev => ({
      ...prev,
      [cellId]: { ...prev[cellId], ...format }
    }))
  }, [])

  const getCellValue = useCallback((cellId: string): number | string => {
    const value = cellData[cellId]
    if (typeof value === 'string' && value.startsWith('=')) {
      return evaluateFormula(value, getCellValue, cellId)
    }
    return isNaN(Number(value)) ? value : Number(value)
  }, [cellData])

  const evaluatedCellData = useMemo(() => {
    const evaluated: { [key: string]: number | string } = {}
    for (const [cellId, value] of Object.entries(cellData)) {
      evaluated[cellId] = getCellValue(cellId)
    }
    return evaluated
  }, [cellData, getCellValue])

  const handleSave = () => {
    const data = JSON.stringify({ cellData, cellFormat, title })
    localStorage.setItem('spreadsheetData', data)
    alert('Spreadsheet saved successfully!')
  }

  const handleLoad = () => {
    const data = localStorage.getItem('spreadsheetData')
    if (data) {
      const { cellData: loadedCellData, cellFormat: loadedCellFormat, title: loadedTitle } = JSON.parse(data)
      setCellData(loadedCellData)
      setCellFormat(loadedCellFormat)
      setTitle(loadedTitle)
      alert('Spreadsheet loaded successfully!')
    }
  }

  const handleFindReplace = (find: string, replace: string) => {
    const newCellData = { ...cellData }
    Object.entries(cellData).forEach(([cellId, value]) => {
      if (typeof value === 'string') {
        newCellData[cellId] = value.replace(new RegExp(find, 'g'), replace)
      }
    })
    setCellData(newCellData)
  }

  const handleRemoveDuplicates = (columns: string[]) => {
    const newCellData = { ...cellData }
    const values = new Set()
    const duplicates = new Set()

    Object.entries(cellData).forEach(([cellId, value]) => {
      const [col] = cellId.match(/[A-Z]+/) || []
      if (columns.includes(col)) {
        if (values.has(value)) {
          duplicates.add(cellId)
        } else {
          values.add(value)
        }
      }
    })

    duplicates.forEach(cellId => {
      delete newCellData[cellId]
    })

    setCellData(newCellData)
  }

  const handleAddRow = () => {
    const newCellData = { ...cellData }
    Object.entries(cellData).forEach(([cellId, value]) => {
      const [col, row] = cellId.match(/([A-Z]+)(\d+)/)?.slice(1) || []
      const newRow = parseInt(row) + 1
      newCellData[`${col}${newRow}`] = value
    })
    setCellData(newCellData)
  }

  const handleAddColumn = () => {
    const newCellData = { ...cellData }
    Object.entries(cellData).forEach(([cellId, value]) => {
      const [col, row] = cellId.match(/([A-Z]+)(\d+)/)?.slice(1) || []
      const newCol = String.fromCharCode(col.charCodeAt(0) + 1)
      newCellData[`${newCol}${row}`] = value
    })
    setCellData(newCellData)
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <EnhancedToolbar
        activeCell={activeCell}
        cellFormat={cellFormat}
        updateCellFormat={updateCellFormat}
        onSave={handleSave}
        onLoad={handleLoad}
        onFindReplace={() => setIsFindReplaceOpen(true)}
        onRemoveDuplicates={() => setIsRemoveDuplicatesOpen(true)}
        onCreateChart={() => setIsChartOpen(true)}
        onAddRow={handleAddRow}
        onAddColumn={handleAddColumn}
        zoom={zoom}
        onZoomChange={setZoom}
        title={title}
        onTitleChange={setTitle}
        onOpenFunctionTester={() => setIsFunctionTesterOpen(true)}
      />
      <FormulaBar
        activeCell={activeCell}
        cellData={cellData}
        updateCellData={updateCellData}
      />
      <div className="flex flex-grow overflow-hidden">
        <Grid
          activeCell={activeCell}
          setActiveCell={setActiveCell}
          cellData={cellData}
          evaluatedCellData={evaluatedCellData}
          cellFormat={cellFormat}
          updateCellData={updateCellData}
          zoom={zoom}
        />
        {isFunctionTesterOpen && (
          <div className="w-80 border-l">
            <FunctionTester getCellValue={getCellValue} />
          </div>
        )}
      </div>
      <FindReplaceDialog
        isOpen={isFindReplaceOpen}
        onClose={() => setIsFindReplaceOpen(false)}
        onFindReplace={handleFindReplace}
      />
      <RemoveDuplicatesDialog
        isOpen={isRemoveDuplicatesOpen}
        onClose={() => setIsRemoveDuplicatesOpen(false)}
        onRemoveDuplicates={handleRemoveDuplicates}
        selectedRange={selectedRange}
      />
      <ChartDialog
        isOpen={isChartOpen}
        onClose={() => setIsChartOpen(false)}
        data={cellData}
        selectedRange={selectedRange}
      />
    </div>
  )
}

