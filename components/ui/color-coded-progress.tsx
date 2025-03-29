import { cn } from "@/lib/utils"

interface ColorCodedProgressProps {
  value: number
  className?: string
  showLabel?: boolean
}

export function ColorCodedProgress({ value, className, showLabel = false }: ColorCodedProgressProps) {
  // Determine color based on percentage
  const getColorClass = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500"
    if (percentage >= 51) return "bg-yellow-500"
    return "bg-red-500"
  }

  // Determine text color based on percentage
  const getTextColorClass = (percentage: number) => {
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 51) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-1.5">
      {showLabel && (
        <div className="flex justify-end">
          <span className={`text-sm font-medium ${getTextColorClass(value)}`}>{value}%</span>
        </div>
      )}
      <div className={cn("h-2 w-full overflow-hidden rounded-full bg-slate-100", className)}>
        <div
          className={`h-full ${getColorClass(value)} transition-all duration-300 ease-in-out`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

