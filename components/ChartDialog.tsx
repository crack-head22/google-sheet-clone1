import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import Chart from 'chart.js/auto'

interface ChartDialogProps {
  isOpen: boolean
  onClose: () => void
  data: { [key: string]: string }
  selectedRange: string
}

export default function ChartDialog({
  isOpen,
  onClose,
  data,
  selectedRange
}: ChartDialogProps) {
  const [chartType, setChartType] = useState('bar')
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current && isOpen) {
      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        // Cleanup previous chart
        if (chartInstance.current) {
          chartInstance.current.destroy()
        }

        // Create new chart
        chartInstance.current = new Chart(ctx, {
          type: chartType as any,
          data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
              label: 'Sample Data',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        })
      }
    }
  }, [chartType, isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Insert Chart</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Chart Type</Label>
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger>
                <SelectValue placeholder="Select chart type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bar">Bar Chart</SelectItem>
                <SelectItem value="line">Line Chart</SelectItem>
                <SelectItem value="pie">Pie Chart</SelectItem>
                <SelectItem value="doughnut">Doughnut Chart</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="h-[400px] border rounded-lg p-4">
            <canvas ref={chartRef} />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>
            Insert Chart
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

