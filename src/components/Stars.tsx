import { Star } from 'lucide-react'

interface StarsProps {
  rating: number
  outOf?: number
  size?: number
  className?: string
}

/** Row of star icons with partial fill for the fractional star. Decorative: pair it with text. */
export function Stars({ rating, outOf = 5, size = 16, className }: StarsProps) {
  return (
    <span className={`stars${className ? ` ${className}` : ''}`} aria-hidden="true">
      {Array.from({ length: outOf }, (_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i))
        return (
          <span key={i} className="stars__item" style={{ width: size, height: size }}>
            <Star size={size} className="stars__empty" />
            {fill > 0 && (
              <span className="stars__fill" style={{ width: `${fill * 100}%` }}>
                <Star size={size} />
              </span>
            )}
          </span>
        )
      })}
    </span>
  )
}
