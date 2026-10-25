import { motion } from 'motion/react'

// A tiny gold divider with a blossom in the middle. Draws itself when scrolled into view.
export default function Flourish({ className = '' }) {
  const draw = {
    initial: { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, amount: 0.8 },
    transition: { duration: 1.4, ease: 'easeOut' },
  }
  return (
    <svg viewBox="0 0 200 24" className={className} fill="none" aria-hidden="true">
      <motion.path d="M4 12 H78 C86 12 88 6 92 6" stroke="#C9A24D" strokeWidth="1.2" strokeLinecap="round" {...draw} />
      <motion.path d="M196 12 H122 C114 12 112 6 108 6" stroke="#C9A24D" strokeWidth="1.2" strokeLinecap="round" {...draw} />
      <g transform="translate(100 12)">
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} cx="0" cy="-5.2" rx="3.1" ry="5" fill="#F2C4CE" stroke="#C9A24D" strokeWidth="0.7" transform={`rotate(${r})`} />
        ))}
        <circle r="2" fill="#E8D3A2" stroke="#C9A24D" strokeWidth="0.6" />
      </g>
    </svg>
  )
}
