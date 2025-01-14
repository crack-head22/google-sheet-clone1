import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mathFunctions } from '../utils/mathFunctions'

interface FunctionTesterProps {
  getCellValue: (cellId: string) => number | string
}

export default function FunctionTester({ getCellValue }: FunctionTesterProps) {
  const [selectedFunction, setSelectedFunction] = useState<keyof typeof mathFunctions>('SUM')
  const [input, setInput] = useState('')
  const [result, setResult] = useState<number | string>('')

  const handleTest = () => {
    const values = input.split(',').map(value => {
      if (value.trim().match(/^[A-Z]+\d+$/)) {
        return getCellValue(value.trim())
      }
      return Number(value)
    }).filter(value => !isNaN(Number(value))) as number[]

    const functionResult = mathFunctions[selectedFunction](values)
    setResult(functionResult)
  }

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Function Tester</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="function-select">Select Function</Label>
          <Select value={selectedFunction} onValueChange={(value) => setSelectedFunction(value as keyof typeof mathFunctions)}>
            <SelectTrigger id="function-select">
              <SelectValue placeholder="Select function" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(mathFunctions).map((func) => (
                <SelectItem key={func} value={func}>
                  {func}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="input-values">Input Values (comma-separated or cell references)</Label>
          <Input
            id="input-values"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., 1,2,3 or A1,B2,C3"
          />
        </div>
        <Button onClick={handleTest}>Test Function</Button>
        {result !== '' && (
          <div className="mt-4 p-2 bg-green-50 border border-green-200 rounded">
            <Label>Result:</Label>
            <div className="text-lg font-semibold">{result}</div>
          </div>
        )}
      </div>
    </div>
  )
}

