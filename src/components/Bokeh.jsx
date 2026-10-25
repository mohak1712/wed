import { useMemo } from 'react'
import { motion } from 'motion/react'
import { rand } from '../lib/rand'

// Soft glowing orbs — warm light drifting in the air.
export default function Bokeh({ count = 10, color = '255,220,150', seed = 1 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: rand(seed + i) * 100,
        top: rand(seed + i + 50) * 80,
        size: 18 + rand(seed + i + 90) * 46,
        duration: 4 + rand(seed + i + 130) * 5,
        delay: rand(seed + i + 170) * 4,
      })),
    [count, seed],
  )

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {items.map((b, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle, rgba(${color},0.55), rgba(${color},0) 70%)`,
          }}
          animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
