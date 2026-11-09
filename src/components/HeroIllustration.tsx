import { siteConfig } from '../data/siteConfig'
import { palette } from '../styles/palette'

/**
 * Decorative illustration for the hero: a balanced statement of financial
 * position in front of a management report, with a small cash-flow card.
 * Figures are shown as redaction bars on purpose: no invented numbers.
 */

const NAVY = palette.navy
const PAPER = palette.paper
const GOLD = palette.gold
const GOLD_INK = palette.goldInk
const SLATE = palette.slate

const ROW_LABEL = { fill: NAVY, fillOpacity: 0.78, fontSize: 11.5 }

function Row({ y, label, width, total = false }: { y: number; label: string; width: number; total?: boolean }) {
  return (
    <g>
      <text x={84} y={y} {...ROW_LABEL} fontWeight={total ? 700 : 500} fillOpacity={total ? 1 : 0.78}>
        {label}
      </text>
      <rect
        x={340 - width}
        y={y - 7.5}
        width={width}
        height={8}
        rx={2}
        fill={total ? NAVY : SLATE}
        fillOpacity={total ? 0.8 : 0.22}
      />
    </g>
  )
}

function DoubleRule({ y }: { y: number }) {
  return (
    <path className="art-rule" d={`M262 ${y}H340M262 ${y + 3.5}H340`} stroke={GOLD} strokeWidth={1.4} />
  )
}

export function HeroIllustration() {
  return (
    <svg className="hero-art" viewBox="0 0 560 600" role="img" aria-labelledby="hero-art-title">
      <title id="hero-art-title">Illustration of a balanced financial statement and a management report</title>
      <defs>
        <filter id="hero-art-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="14" stdDeviation="16" floodColor={NAVY} floodOpacity="0.09" />
        </filter>
      </defs>

      {/* Ledger-paper backdrop */}
      <g className="art-backdrop">
        <rect x="24" y="36" width="512" height="528" rx="16" fill="#EFEDE5" />
        {Array.from({ length: 15 }, (_, i) => (
          <path key={i} d={`M24 ${84 + i * 32}H536`} stroke={NAVY} strokeOpacity="0.06" />
        ))}
        <path d="M86 36V564M90 36V564" stroke={GOLD} strokeOpacity="0.5" />
      </g>

      {/* Management report (behind) */}
      <g transform="rotate(5 372 242)">
        <g className="art-back">
          <rect x="250" y="84" width="244" height="316" rx="6" fill="#fff" stroke={NAVY} strokeOpacity="0.14" />
          <text x="274" y="118" fill={NAVY} fontSize="11.5" fontWeight="700">
            Management report
          </text>
          <rect x="274" y="128" width="72" height="5" rx="2.5" fill={SLATE} fillOpacity="0.25" />
          {[72, 96, 84, 118, 132, 156].map((h, i) => (
            <rect
              key={i}
              x={274 + i * 33}
              y={336 - h}
              width="20"
              height={h}
              rx="2"
              fill={i === 5 ? GOLD : NAVY}
              fillOpacity={i === 5 ? 0.85 : 0.09}
            />
          ))}
          <path d="M274 336H470" stroke={NAVY} strokeOpacity="0.2" />
          <path
            d="M284 264L317 240L350 252L383 218L416 204L449 180"
            fill="none"
            stroke={NAVY}
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          {[
            [284, 264],
            [317, 240],
            [350, 252],
            [383, 218],
            [416, 204],
            [449, 180],
          ].map(([cx, cy]) => (
            <circle key={cx} cx={cx} cy={cy} r="3" fill="#fff" stroke={NAVY} strokeWidth="1.5" />
          ))}
          <rect x="274" y="356" width="150" height="5" rx="2.5" fill={SLATE} fillOpacity="0.18" />
          <rect x="274" y="370" width="104" height="5" rx="2.5" fill={SLATE} fillOpacity="0.18" />
        </g>
      </g>

      {/* Statement of financial position (front) */}
      <g className="art-front">
        <rect x="56" y="150" width="312" height="392" rx="6" fill="#fff" stroke={NAVY} strokeOpacity="0.16" filter="url(#hero-art-shadow)" />

        {/* The practice's emblem, as on its letterhead */}
        <image href={siteConfig.brand.emblem} x="312" y="164" width="29" height="28.4" />


        <text x="84" y="186" fill={NAVY} fontSize="12.5" fontWeight="700">
          Statement of financial position
        </text>
        <rect x="84" y="198" width="118" height="6" rx="3" fill={SLATE} fillOpacity="0.22" />
        <path d="M84 222H340" stroke={NAVY} strokeOpacity="0.14" />
        <text x="340" y="243" fill={SLATE} fontSize="9.5" fontWeight="700" letterSpacing="1.2" textAnchor="end">
          KES
        </text>

        <Row y={267} label="Non-current assets" width={62} />
        <Row y={293} label="Current assets" width={50} />
        <path d="M262 307H340" stroke={NAVY} strokeOpacity="0.28" />
        <Row y={329} label="Total assets" width={78} total />
        <DoubleRule y={337} />

        <Row y={373} label="Equity" width={58} />
        <Row y={399} label="Liabilities" width={44} />
        <path d="M262 413H340" stroke={NAVY} strokeOpacity="0.28" />
        <Row y={435} label="Total equity & liabilities" width={78} total />
        <DoubleRule y={443} />

        <path d="M84 478H340" stroke={NAVY} strokeOpacity="0.1" />
        <g className="art-chip">
          <rect x="84" y="494" width="92" height="26" rx="13" fill={GOLD} fillOpacity="0.16" />
          <circle cx="100" cy="507" r="6.5" fill={GOLD} />
          <path d="M97 507.2l2.1 2.1 4-4.3" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <text x="112" y="511" fill={GOLD_INK} fontSize="10.5" fontWeight="700">
            Balanced
          </text>
        </g>
      </g>

      {/* Cash-flow card */}
      <g className="art-card">
        <rect x="316" y="448" width="200" height="124" rx="10" fill={NAVY} />
        <text x="336" y="476" fill={PAPER} fillOpacity="0.75" fontSize="11" fontWeight="600">
          Cash flow
        </text>
        <path d="M336 512H496" stroke={PAPER} strokeOpacity="0.08" strokeDasharray="3 4" />
        <path d="M336 548H496" stroke={PAPER} strokeOpacity="0.16" />
        <path
          d="M336 538C356 534 366 526 386 528S420 512 436 514S470 494 496 490V548H336Z"
          fill={GOLD}
          fillOpacity="0.14"
        />
        <path
          d="M336 538C356 534 366 526 386 528S420 512 436 514S470 494 496 490"
          fill="none"
          stroke={GOLD}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="496" cy="490" r="7" fill={GOLD} fillOpacity="0.22" />
        <circle cx="496" cy="490" r="3.5" fill={GOLD} />
      </g>
    </svg>
  )
}
