import { siteConfig, type CoverageArea } from '../data/siteConfig'
import { palette } from '../styles/palette'

/**
 * Areas served, placed by their real direction and distance from the base
 * town. It shows reach, not offices: there are no branch markers.
 */

const NAVY = palette.navy
const GOLD = palette.gold
const GOLD_INK = palette.goldInk
const SLATE = palette.slate

const VIEW = { w: 480, h: 372 }
const CENTER = { x: 240, y: 186 }
const UNITS_PER_KM = 1.55
const RINGS_KM = [25, 50, 75, 100]

/** Label placement per town, tuned so labels never collide. Defaults to the right of the dot. */
const LABEL_SIDE: Record<string, 'left' | 'right' | 'below'> = {
  Nairobi: 'right',
}

function project(base: CoverageArea, area: CoverageArea) {
  const [lat0, lon0] = base.coords
  const [lat, lon] = area.coords
  const kmEast = (lon - lon0) * 111.32 * Math.cos((lat0 * Math.PI) / 180)
  const kmNorth = (lat - lat0) * 110.57
  return { x: CENTER.x + kmEast * UNITS_PER_KM, y: CENTER.y - kmNorth * UNITS_PER_KM }
}

export function ReachDiagram() {
  const { areas } = siteConfig.coverage
  const base = areas.find((area) => area.isBase) ?? areas[0]
  const others = areas.filter((area) => area !== base)

  return (
    <svg className="reach" viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} role="img" aria-labelledby="reach-title reach-desc">
      <title id="reach-title">{`Areas served from ${base.name}`}</title>
      <desc id="reach-desc">
        {`${others.map((area) => area.name).join(', ')} shown by approximate direction and distance from ${base.name}.`}
      </desc>

      {/* Distance rings and compass axes */}
      <g fill="none" stroke={NAVY}>
        {RINGS_KM.map((km) => (
          <circle
            key={km}
            cx={CENTER.x}
            cy={CENTER.y}
            r={km * UNITS_PER_KM}
            strokeOpacity={km % 50 === 0 ? 0.16 : 0.08}
            strokeDasharray={km % 50 === 0 ? undefined : '2 5'}
          />
        ))}
        <path
          d={`M${CENTER.x} ${CENTER.y - 170}V${CENTER.y + 170}M${CENTER.x - 170} ${CENTER.y}H${CENTER.x + 170}`}
          strokeOpacity="0.07"
        />
      </g>
      {/* Ring labels sit on the empty south-west diagonal, clear of the towns. */}
      {[50, 100].map((km) => {
        const offset = km * UNITS_PER_KM * Math.SQRT1_2
        return (
          <text
            key={km}
            className="reach__ring"
            x={CENTER.x - offset - 6}
            y={CENTER.y + offset + 12}
            textAnchor="end"
            fill={SLATE}
            fontSize="10.5"
            fontWeight="600"
            letterSpacing="0.6"
          >
            {km} km
          </text>
        )
      })}
      <text x={CENTER.x} y={CENTER.y - 176} fill={SLATE} fontSize="11" fontWeight="700" textAnchor="middle">
        N
      </text>

      {/* Spokes from the base */}
      <g stroke={GOLD} strokeWidth="1.25" strokeOpacity="0.75">
        {others.map((area) => {
          const p = project(base, area)
          return <path key={area.name} className="reach__spoke" d={`M${CENTER.x} ${CENTER.y}L${p.x} ${p.y}`} pathLength={1} />
        })}
      </g>

      {/* Towns */}
      {others.map((area) => {
        const p = project(base, area)
        const side = LABEL_SIDE[area.name] ?? 'right'
        const anchor = side === 'left' ? 'end' : side === 'below' ? 'middle' : 'start'
        const lx = side === 'left' ? p.x - 12 : side === 'below' ? p.x : p.x + 12
        const ly = side === 'below' ? p.y + 22 : p.y + 1
        return (
          <g key={area.name}>
            <circle cx={p.x} cy={p.y} r="5.5" fill={NAVY} stroke="#fff" strokeWidth="2" />
            <text className="reach__name" x={lx} y={ly} textAnchor={anchor} fill={NAVY} fontSize="14" fontWeight="700">
              {area.name}
            </text>
            <text className="reach__county" x={lx} y={ly + 15} textAnchor={anchor} fill={SLATE} fontSize="11">
              {area.county}
            </text>
          </g>
        )
      })}

      {/* Base */}
      <circle cx={CENTER.x} cy={CENTER.y} r="15" fill={GOLD} fillOpacity="0.18" />
      <circle cx={CENTER.x} cy={CENTER.y} r="7" fill={GOLD} stroke="#fff" strokeWidth="2" />
      <text className="reach__base" x={CENTER.x - 14} y={CENTER.y - 2} textAnchor="end" fill={NAVY} fontSize="15" fontWeight="700">
        {base.name}
      </text>
      <text
        className="reach__base-tag"
        x={CENTER.x - 14}
        y={CENTER.y + 13}
        textAnchor="end"
        fill={GOLD_INK}
        fontSize="10.5"
        fontWeight="700"
        letterSpacing="1"
      >
        OUR BASE
      </text>
    </svg>
  )
}
