import { motion } from 'motion/react'
import { rand } from '../../lib/rand'

// Reusable watercolour-style building blocks for the placeholder scenes.

export function Blossoms({
  cx,
  cy,
  spread = 50,
  n = 16,
  r = 7,
  seed = 1,
  palette = ['#F6C3CF', '#F9D8DF', '#EFA9BB', '#FBE9EE'],
  filter,
}) {
  return (
    <g filter={filter}>
      {Array.from({ length: n }, (_, i) => {
        const a = rand(seed + i) * Math.PI * 2
        const d = Math.sqrt(rand(seed + i + 40)) * spread
        const x = cx + Math.cos(a) * d
        const y = cy + Math.sin(a) * d * 0.8
        const rr = r * (0.7 + rand(seed + i + 80) * 0.7)
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={rr} fill={palette[i % palette.length]} opacity="0.92" />
            <circle cx={x} cy={y} r={rr * 0.35} fill="#F8E3A8" opacity="0.8" />
          </g>
        )
      })}
    </g>
  )
}

export function Leaves({ cx, cy, spread = 40, n = 12, seed = 1, palette = ['#8FA886', '#A9BCA0', '#6F8A6A', '#B9CBAE'], size = 9 }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const x = cx + (rand(seed + i) - 0.5) * spread * 2
        const y = cy + (rand(seed + i + 30) - 0.5) * spread * 2
        const rot = rand(seed + i + 60) * 180
        const s = size * (0.7 + rand(seed + i + 90) * 0.8)
        return <ellipse key={i} cx={x} cy={y} rx={s} ry={s * 0.42} fill={palette[i % palette.length]} opacity="0.9" transform={`rotate(${rot} ${x} ${y})`} />
      })}
    </g>
  )
}

export function Pendant({ x, y = 0, len = 100, id, delay = 0, shade = '#3D2A1C' }) {
  const bottom = y + len
  return (
    <g>
      <line x1={x} y1={y} x2={x} y2={bottom} stroke="#6B4A2F" strokeWidth="1.4" />
      <motion.circle
        cx={x}
        cy={bottom + 24}
        r="74"
        fill={`url(#${id}-glow)`}
        animate={{ opacity: [0.7, 1, 0.78, 1] }}
        transition={{ duration: 3 + delay, repeat: Infinity, ease: 'easeInOut' }}
      />
      <path d={`M${x - 19} ${bottom + 22} Q${x} ${bottom - 10} ${x + 19} ${bottom + 22}Z`} fill={shade} />
      <ellipse cx={x} cy={bottom + 22} rx="14" ry="5.5" fill="#FFE7A3" />
    </g>
  )
}

export function Candle({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="-4" y="0" width="8" height="20" rx="2" fill="#FBF3E2" />
      <motion.path
        d="M0 -14 Q6 -5 0 0 Q-6 -5 0 -14Z"
        fill="#FFC85A"
        animate={{ scaleY: [1, 1.18, 0.92, 1.1, 1], opacity: [0.95, 1, 0.85, 1, 0.95] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ originX: 0.5, originY: 1 }}
      />
      <circle cx="0" cy="-6" r="14" fill="#FFD27A" opacity="0.28" />
    </g>
  )
}

export function Vase({ x, y, scale = 1, seed = 4 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-12 0 Q-18 -24 -8 -38 L8 -38 Q18 -24 12 0Z" fill="#E9F0E4" stroke="#BFD0B6" strokeWidth="1" />
      <path d="M0 -38 C-2 -60 -10 -70 -16 -80 M0 -38 C4 -58 12 -68 18 -78 M0 -38 L0 -84" stroke="#6F8A6A" strokeWidth="1.4" fill="none" />
      <Blossoms cx={0} cy={-78} spread={24} n={9} r={6} seed={seed} />
    </g>
  )
}

export function WoodDefs({ id }) {
  return (
    <>
      <linearGradient id={`${id}-wood`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#B27C4A" />
        <stop offset="1" stopColor="#7A4F2D" />
      </linearGradient>
      <radialGradient id={`${id}-glow`}>
        <stop offset="0" stopColor="#FFE2A0" stopOpacity="0.7" />
        <stop offset="1" stopColor="#FFE2A0" stopOpacity="0" />
      </radialGradient>
      <filter id={`${id}-soft`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" />
      </filter>
      <filter id={`${id}-wc`} x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed="3" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="16" />
        <feGaussianBlur stdDeviation="1.4" />
      </filter>
    </>
  )
}
