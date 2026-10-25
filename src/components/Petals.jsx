import { useMemo } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { rand } from '../lib/rand'

const COLORS = ['#F4C9D1', '#F8DDE2', '#EFB3C0', '#FBEAD7', '#E9C6D2']

// Falling petals. `fixed` = covers the whole screen; otherwise fills its (relative) parent.
export default function Petals({ count = 14, fixed = true, className = '' }) {
  const reduce = useReducedMotion()
  const total = reduce ? Math.min(5, count) : count

  const petals = useMemo(
    () =>
      Array.from({ length: total }, (_, i) => ({
        id: i,
        left: rand(i + 1) * 100,
        size: 9 + rand(i + 7) * 13,
        duration: 12 + rand(i + 3) * 14,
        delay: -rand(i + 5) * 20,
        sway: 18 + rand(i + 9) * 46,
        color: COLORS[i % COLORS.length],
        rotate: rand(i + 11) * 360,
      })),
    [total],
  )

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none ${fixed ? 'fixed z-30' : 'absolute z-10'} inset-0 overflow-hidden ${className}`}
    >
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-0 block"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.25,
            background: p.color,
            borderRadius: '60% 40% 60% 40% / 70% 60% 40% 30%',
            opacity: 0.8,
          }}
          initial={{ y: '-10vh', x: 0, rotate: p.rotate }}
          animate={{
            y: '110vh',
            x: [0, p.sway, -p.sway, p.sway / 2],
            rotate: p.rotate + 360,
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  )
}
