'use client'

interface RatingTrendProps {
  businessId: string
}

// Mock trend data - in production, this would come from Supabase
const mockTrendData = [
  { month: 'Jan', rating: 4.6 },
  { month: 'Feb', rating: 4.7 },
  { month: 'Mar', rating: 4.7 },
  { month: 'Apr', rating: 4.8 },
  { month: 'May', rating: 4.8 },
  { month: 'Jun', rating: 4.8 },
]

export default function RatingTrend({ businessId }: RatingTrendProps) {
  const maxRating = 5
  const minRating = 4.0 // For better visualization
  const chartHeight = 200

  const getYPosition = (rating: number) => {
    const percentage = (rating - minRating) / (maxRating - minRating)
    return chartHeight - percentage * chartHeight
  }

  // Calculate path for the line chart
  const points = mockTrendData.map((data, index) => {
    const x = (index / (mockTrendData.length - 1)) * 100
    const y = getYPosition(data.rating)
    return { x, y, rating: data.rating }
  })

  const pathD = points
    .map((point, index) => {
      const command = index === 0 ? 'M' : 'L'
      return `${command} ${point.x}% ${point.y}`
    })
    .join(' ')

  // Calculate trend
  const firstRating = mockTrendData[0].rating
  const lastRating = mockTrendData[mockTrendData.length - 1].rating
  const trend = lastRating - firstRating
  const trendPercentage = ((trend / firstRating) * 100).toFixed(1)

  return (
    <div>
      {/* Trend Summary */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Last 6 months</p>
          <p className="text-2xl font-bold text-gray-900">{lastRating.toFixed(1)}</p>
        </div>
        <div className="text-right">
          {trend >= 0 ? (
            <div className="flex items-center space-x-1 text-green-600">
              <span className="text-2xl">↑</span>
              <span className="text-lg font-bold">+{Math.abs(trend).toFixed(1)}</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-red-600">
              <span className="text-2xl">↓</span>
              <span className="text-lg font-bold">-{Math.abs(trend).toFixed(1)}</span>
            </div>
          )}
          <p className="text-sm text-gray-600">{trendPercentage}% change</p>
        </div>
      </div>

      {/* Chart */}
      <div className="relative" style={{ height: `${chartHeight}px` }}>
        <svg
          className="w-full h-full"
          viewBox={`0 0 100 ${chartHeight}`}
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {[4.0, 4.2, 4.4, 4.6, 4.8, 5.0].map((rating) => {
            const y = getYPosition(rating)
            return (
              <line
                key={rating}
                x1="0"
                y1={y}
                x2="100%"
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            )
          })}

          {/* Area under the line */}
          <path
            d={`${pathD} L 100% ${chartHeight} L 0 ${chartHeight} Z`}
            fill="url(#gradient)"
            opacity="0.2"
          />

          {/* Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#2563eb"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={`${point.x}%`}
              cy={point.y}
              r="4"
              fill="#2563eb"
              stroke="white"
              strokeWidth="2"
            />
          ))}

          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-xs text-gray-500 pr-2">
          <span>5.0</span>
          <span>4.8</span>
          <span>4.6</span>
          <span>4.4</span>
          <span>4.2</span>
          <span>4.0</span>
        </div>
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between mt-2 text-sm text-gray-600 pl-8">
        {mockTrendData.map((data) => (
          <span key={data.month}>{data.month}</span>
        ))}
      </div>
    </div>
  )
}
