import { motion } from 'motion/react'
import { rand } from '../../lib/rand'
import { Blossoms, Leaves, Pendant, Candle, Vase, WoodDefs } from './shapes'

const svgProps = (extra = {}) => ({
  viewBox: '0 0 400 720',
  preserveAspectRatio: 'xMidYMid slice',
  className: 'h-full w-full',
  'aria-hidden': true,
  ...extra,
})

/* ------------------------------------------------------------------ Chapter 1 & 4 — café */
export function CafeBG({ tone = 'gold' }) {
  const id = `cafe-${tone}`
  const rose = tone === 'rose'
  return (
    <svg {...svgProps()}>
      <defs>
        <WoodDefs id={id} />
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={rose ? '#F8DCD6' : '#F5E0BE'} />
          <stop offset="1" stopColor={rose ? '#E8B9AC' : '#E2B681'} />
        </linearGradient>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CFE6F2" />
          <stop offset="1" stopColor="#F8E8EE" />
        </linearGradient>
        <clipPath id={`${id}-win`}>
          <path d="M110 440 V212 Q110 120 200 120 Q290 120 290 212 V440Z" />
        </clipPath>
      </defs>

      <rect width="400" height="720" fill={`url(#${id}-wall)`} />
      <g filter={`url(#${id}-wc)`} opacity="0.5">
        <ellipse cx="55" cy="300" rx="90" ry="170" fill="#F2C48A" />
        <ellipse cx="352" cy="260" rx="80" ry="150" fill="#F6D4A0" />
      </g>

      {/* window with a blossoming tree outside */}
      <g clipPath={`url(#${id}-win)`}>
        <rect x="100" y="110" width="200" height="340" fill={`url(#${id}-sky)`} />
        <path d="M200 440 C198 380 190 330 160 290 M200 400 C210 350 230 320 262 296 M180 330 C170 300 150 280 126 270" stroke="#7A5638" strokeWidth="5" fill="none" strokeLinecap="round" />
        <g filter={`url(#${id}-soft)`}>
          <Blossoms cx={150} cy={270} spread={42} n={22} r={12} seed={3} />
          <Blossoms cx={255} cy={290} spread={46} n={22} r={12} seed={9} />
          <Blossoms cx={205} cy={200} spread={50} n={24} r={13} seed={15} />
        </g>
      </g>
      <path d="M110 440 V212 Q110 120 200 120 Q290 120 290 212 V440Z" fill="none" stroke="#7A5030" strokeWidth="7" />
      <path d="M200 120 V440 M110 270 H290" stroke="#7A5030" strokeWidth="4" />

      {/* flower box under the window */}
      <rect x="100" y="440" width="200" height="22" rx="4" fill="#8A5A36" />
      <Blossoms cx={150} cy={436} spread={40} n={10} r={7} seed={21} />
      <Blossoms cx={250} cy={436} spread={40} n={10} r={7} seed={27} />
      <Leaves cx={200} cy={440} spread={90} n={14} seed={5} size={7} />

      {/* pendant lights */}
      <Pendant x={62} len={150} id={id} delay={0} />
      <Pendant x={200} len={90} id={id} delay={0.8} />
      <Pendant x={338} len={140} id={id} delay={1.6} />

      {/* wooden floor */}
      <rect y="580" width="400" height="140" fill={`url(#${id}-wood)`} />
      <path d="M0 610 H400 M0 650 H400 M0 690 H400" stroke="#5C3B22" strokeWidth="1.2" opacity="0.35" />
    </svg>
  )
}

export function TableFront() {
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMax slice" className="h-full w-full" aria-hidden="true">
      <defs>
        <WoodDefs id="tablefront" />
      </defs>
      <path d="M0 52 Q200 36 400 52 L400 240 L0 240Z" fill="url(#tablefront-wood)" />
      <path d="M0 52 Q200 36 400 52" stroke="#D9A872" strokeWidth="3" fill="none" />
      <path d="M0 120 H400 M0 170 H400 M0 210 H400" stroke="#5C3B22" strokeWidth="1.2" opacity="0.3" />
      {/* two cups with saucers */}
      <g>
        <ellipse cx="96" cy="58" rx="30" ry="8" fill="#FBF6EC" />
        <path d="M80 36 H112 L108 56 H84Z" fill="#FFFFFF" stroke="#E5D9C5" />
        <ellipse cx="304" cy="58" rx="30" ry="8" fill="#FBF6EC" />
        <path d="M288 36 H320 L316 56 H292Z" fill="#FFFFFF" stroke="#E5D9C5" />
        <motion.path d="M96 30 C90 20 102 14 96 4" stroke="#fff" strokeWidth="2" fill="none" opacity="0.6" animate={{ opacity: [0, 0.7, 0], y: [0, -6, -12] }} transition={{ duration: 3, repeat: Infinity }} />
      </g>
      <Vase x={200} y={54} scale={0.9} />
      <Candle x={156} y={44} scale={0.8} />
      <Candle x={246} y={44} scale={0.8} />
    </svg>
  )
}

/* ------------------------------------------------------------------ Chapter 2 — garden */
export function GardenBG() {
  const id = 'garden'
  return (
    <svg {...svgProps()}>
      <defs>
        <WoodDefs id={id} />
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F9E3D7" />
          <stop offset="0.5" stopColor="#F6CBD5" />
          <stop offset="1" stopColor="#E6EDDC" />
        </linearGradient>
        <linearGradient id={`${id}-grass`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B5C9A6" />
          <stop offset="1" stopColor="#7C9A74" />
        </linearGradient>
      </defs>
      <rect width="400" height="720" fill={`url(#${id}-sky)`} />
      <circle cx="290" cy="170" r="120" fill="url(#garden-glow)" />
      <circle cx="290" cy="170" r="34" fill="#FFF1C9" opacity="0.9" />

      <g filter={`url(#${id}-wc)`}>
        <path d="M0 380 Q90 320 190 360 T400 340 V720 H0Z" fill="#C9D8BD" />
        <path d="M0 440 Q120 390 230 430 T400 410 V720 H0Z" fill="#AFC6A1" />
      </g>

      {/* blossom trees */}
      <g>
        <path d="M70 470 C66 400 62 350 70 290 M70 400 C90 370 104 350 124 336" stroke="#7A5638" strokeWidth="8" fill="none" strokeLinecap="round" />
        <g filter={`url(#${id}-soft)`}>
          <Blossoms cx={80} cy={290} spread={70} n={34} r={13} seed={31} />
          <Blossoms cx={130} cy={336} spread={40} n={16} r={11} seed={39} />
        </g>
        <path d="M335 470 C338 410 346 360 340 300" stroke="#7A5638" strokeWidth="7" fill="none" strokeLinecap="round" />
        <g filter={`url(#${id}-soft)`}>
          <Blossoms cx={338} cy={300} spread={62} n={30} r={13} seed={45} />
        </g>
      </g>

      <rect y="470" width="400" height="250" fill={`url(#${id}-grass)`} />
      <g filter={`url(#${id}-wc)`} opacity="0.7">
        <Leaves cx={60} cy={560} spread={60} n={14} seed={11} size={14} />
        <Leaves cx={340} cy={600} spread={60} n={14} seed={17} size={14} />
      </g>
      <Blossoms cx={70} cy={600} spread={50} n={12} r={5} seed={51} />
      <Blossoms cx={330} cy={640} spread={55} n={12} r={5} seed={57} />
    </svg>
  )
}

/* ------------------------------------------------------------------ Chapter 3 — restaurant */
export function RestaurantBG() {
  const id = 'resto'
  return (
    <svg {...svgProps()}>
      <defs>
        <WoodDefs id={id} />
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4A3426" />
          <stop offset="1" stopColor="#8A5E3F" />
        </linearGradient>
      </defs>
      <rect width="400" height="720" fill={`url(#${id}-wall)`} />

      {/* living green wall */}
      <g>
        <rect x="24" y="90" width="352" height="300" rx="18" fill="#3E5A3C" />
        <g filter={`url(#${id}-soft)`}>
          <Leaves cx={110} cy={170} spread={80} n={30} seed={2} size={18} />
          <Leaves cx={290} cy={230} spread={80} n={30} seed={8} size={18} />
          <Leaves cx={200} cy={320} spread={110} n={34} seed={14} size={18} />
        </g>
        <Blossoms cx={120} cy={300} spread={30} n={6} r={5} seed={61} palette={['#F8DDE2', '#FBE9EE']} />
        <Blossoms cx={290} cy={150} spread={30} n={6} r={5} seed={66} palette={['#F8DDE2', '#FBE9EE']} />
      </g>

      {/* hanging globes */}
      {[90, 200, 310].map((x, i) => (
        <g key={x}>
          <line x1={x} y1="0" x2={x} y2={70 + i * 14} stroke="#C9A24D" strokeWidth="1.2" />
          <motion.circle cx={x} cy={96 + i * 14} r="64" fill={`url(#${id}-glow)`} animate={{ opacity: [0.6, 1, 0.7] }} transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }} />
          <circle cx={x} cy={96 + i * 14} r="13" fill="#FFE9B0" />
        </g>
      ))}

      {/* floor */}
      <rect y="560" width="400" height="160" fill="#2E2018" />

      {/* two intimate tables */}
      {[
        { x: 105, y: 540, s: 1 },
        { x: 300, y: 590, s: 1.15 },
      ].map((t, i) => (
        <g key={i} transform={`translate(${t.x} ${t.y}) scale(${t.s})`}>
          <ellipse cx="0" cy="40" rx="64" ry="12" fill="#000" opacity="0.25" />
          <path d="M-6 0 H6 L10 40 H-10Z" fill="#6B4A2F" />
          <ellipse cx="0" cy="0" rx="62" ry="14" fill="#F3E7D2" />
          <ellipse cx="0" cy="-2" rx="62" ry="12" fill="#FBF3E2" />
          <Candle x={0} y={-12} scale={0.9} />
          <circle cx="-30" cy="-8" r="6" fill="#fff" opacity="0.85" />
          <circle cx="30" cy="-8" r="6" fill="#fff" opacity="0.85" />
        </g>
      ))}
    </svg>
  )
}

/* ------------------------------------------------------------------ Chapter 6 — sunset garden */
export function SunsetBG() {
  const id = 'sunset'
  const stars = Array.from({ length: 28 }, (_, i) => ({ x: rand(i + 1) * 400, y: rand(i + 40) * 260, r: 0.6 + rand(i + 80) * 1.2, d: 2 + rand(i + 120) * 3 }))
  const lights = Array.from({ length: 14 }, (_, i) => ({ x: 16 + i * 27, y: 470 + Math.sin(i * 0.9) * 14 }))
  return (
    <svg {...svgProps()}>
      <defs>
        <WoodDefs id={id} />
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3B2B5C" />
          <stop offset="0.35" stopColor="#9C4C7E" />
          <stop offset="0.62" stopColor="#F08F6E" />
          <stop offset="0.78" stopColor="#FFCB8A" />
          <stop offset="1" stopColor="#FFE3B0" />
        </linearGradient>
        <radialGradient id={`${id}-sun`}>
          <stop offset="0" stopColor="#FFF4CF" stopOpacity="1" />
          <stop offset="0.35" stopColor="#FFD38A" stopOpacity="0.7" />
          <stop offset="1" stopColor="#FFB070" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="720" fill={`url(#${id}-sky)`} />
      {stars.map((s, i) => (
        <motion.circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#FFF6DD" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: s.d, repeat: Infinity, delay: i * 0.13 }} />
      ))}
      <circle cx="200" cy="430" r="190" fill={`url(#${id}-sun)`} />
      <circle cx="200" cy="430" r="46" fill="#FFF1C9" />

      <g filter={`url(#${id}-wc)`}>
        <path d="M0 450 Q100 400 200 440 T400 420 V720 H0Z" fill="#5B3F6B" />
        <path d="M0 500 Q120 450 240 490 T400 470 V720 H0Z" fill="#43304F" />
      </g>

      {/* silhouetted blossom trees */}
      <g>
        <path d="M58 520 C54 450 52 400 62 340" stroke="#2B2038" strokeWidth="9" fill="none" strokeLinecap="round" />
        <g filter={`url(#${id}-soft)`}>
          <Blossoms cx={64} cy={340} spread={72} n={34} r={13} seed={71} palette={['#E7A1BC', '#F2B9CC', '#D98AAB']} />
        </g>
        <path d="M346 520 C350 460 356 410 348 350" stroke="#2B2038" strokeWidth="9" fill="none" strokeLinecap="round" />
        <g filter={`url(#${id}-soft)`}>
          <Blossoms cx={346} cy={352} spread={70} n={32} r={13} seed={77} palette={['#E7A1BC', '#F2B9CC', '#D98AAB']} />
        </g>
      </g>

      {/* fairy lights */}
      <path d={`M0 470 ${lights.map((l) => `L${l.x} ${l.y}`).join(' ')}`} stroke="#2B2038" strokeWidth="1" fill="none" opacity="0.7" />
      {lights.map((l, i) => (
        <motion.circle key={i} cx={l.x} cy={l.y + 4} r="3.2" fill="#FFE6A0" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.2 }} />
      ))}

      <rect y="560" width="400" height="160" fill="#2B2038" />
      <Blossoms cx={90} cy={600} spread={60} n={10} r={5} seed={83} palette={['#E7A1BC', '#F2B9CC']} />
      <Blossoms cx={320} cy={620} spread={60} n={10} r={5} seed={89} palette={['#E7A1BC', '#F2B9CC']} />
    </svg>
  )
}

/* ------------------------------------------------------------------ Chapter 7 — invitation paper */
export function PaperBG() {
  const id = 'paper'
  return (
    <svg {...svgProps({ preserveAspectRatio: 'xMidYMin slice' })}>
      <defs>
        <WoodDefs id={id} />
      </defs>
      <rect width="400" height="720" fill="#FBF6EC" />
      <g filter={`url(#${id}-wc)`} opacity="0.55">
        <ellipse cx="40" cy="80" rx="120" ry="90" fill="#F6D3DB" />
        <ellipse cx="370" cy="260" rx="100" ry="120" fill="#CFDCC6" />
        <ellipse cx="60" cy="560" rx="110" ry="120" fill="#EFD9AE" />
      </g>
      <path d="M-10 40 C60 60 100 20 170 50" stroke="#7A5638" strokeWidth="4" fill="none" strokeLinecap="round" />
      <g filter={`url(#${id}-soft)`}>
        <Blossoms cx={70} cy={48} spread={46} n={18} r={10} seed={91} />
        <Blossoms cx={150} cy={52} spread={34} n={12} r={9} seed={97} />
      </g>
      <path d="M410 640 C340 620 310 660 250 640" stroke="#7A5638" strokeWidth="4" fill="none" strokeLinecap="round" />
      <g filter={`url(#${id}-soft)`}>
        <Blossoms cx={340} cy={640} spread={44} n={16} r={10} seed={101} />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ Polaroid pictures */
export function PolaroidArt({ kind }) {
  const id = `pol-${kind}`
  const frame = { viewBox: '0 0 200 200', preserveAspectRatio: 'xMidYMid slice', className: 'h-full w-full', 'aria-hidden': true }
  if (kind === 'dessert') {
    return (
      <svg {...frame}>
        <defs><WoodDefs id={id} /></defs>
        <rect width="200" height="200" fill="#F7E4D0" />
        <circle cx="100" cy="110" r="78" fill="#FFFFFF" />
        <circle cx="100" cy="110" r="64" fill="#F6EAD9" />
        <path d="M60 120 Q100 40 140 120Z" fill="#F4B9C6" />
        <circle cx="100" cy="64" r="14" fill="#E7889F" />
        <circle cx="86" cy="96" r="5" fill="#fff" opacity="0.5" />
        <path d="M44 138 H156" stroke="#C9A24D" strokeWidth="3" />
        <path d="M150 40 L176 20 M156 52 L186 44" stroke="#C9A24D" strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  }
  if (kind === 'smiling') {
    return (
      <svg {...frame}>
        <rect width="200" height="200" fill="#F9DCE3" />
        <circle cx="100" cy="100" r="90" fill="#FBEAD7" opacity="0.7" />
        <circle cx="76" cy="92" r="30" fill="#EBBF9F" />
        <path d="M46 88 C44 54 106 54 104 88 C96 72 56 72 46 88Z" fill="#2B2220" />
        <circle cx="130" cy="96" r="30" fill="#EBBF9F" />
        <path d="M98 96 C94 44 168 44 162 96 C156 70 108 70 98 96Z" fill="#2B2220" />
        <path d="M62 104 Q76 118 90 104 M116 108 Q130 122 144 108" stroke="#A8474B" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M30 170 Q76 130 100 170Z" fill="#1F2F55" />
        <path d="M100 170 Q130 126 176 170Z" fill="#4D7BBF" />
      </svg>
    )
  }
  if (kind === 'delhi') {
    return (
      <svg {...frame}>
        <defs>
          <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F6D9C0" /><stop offset="1" stopColor="#FBEBD0" /></linearGradient>
        </defs>
        <rect width="200" height="200" fill={`url(#${id}-sky)`} />
        <path d="M30 150 V96 Q30 60 70 60 Q110 60 110 96 V150Z" fill="#D9A17E" />
        <path d="M46 150 V102 Q46 80 70 80 Q94 80 94 102 V150Z" fill="#F6D9C0" />
        <path d="M120 150 V110 Q120 84 148 84 Q176 84 176 110 V150Z" fill="#C98F6D" />
        <path d="M70 60 Q70 36 70 30" stroke="#C9A24D" strokeWidth="3" />
        <circle cx="70" cy="28" r="4" fill="#C9A24D" />
        <rect y="150" width="200" height="50" fill="#9DB48E" />
      </svg>
    )
  }
  return (
    <svg {...frame}>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8E4F7E" /><stop offset="0.6" stopColor="#F08F6E" /><stop offset="1" stopColor="#FFD08A" /></linearGradient>
      </defs>
      <rect width="200" height="200" fill={`url(#${id}-sky)`} />
      <circle cx="100" cy="120" r="34" fill="#FFF1C9" />
      <path d="M0 150 Q60 126 120 148 T200 140 V200 H0Z" fill="#4A3566" />
      <circle cx="88" cy="146" r="7" fill="#2B2038" /><path d="M80 152 Q88 190 96 152Z" fill="#2B2038" />
      <circle cx="112" cy="144" r="7" fill="#2B2038" /><path d="M104 150 Q112 190 120 150Z" fill="#2B2038" />
    </svg>
  )
}
