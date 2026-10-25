import { motion } from 'motion/react'
import Flourish from './Flourish'

// The "page text" of each chapter: a soft parchment card that fades its lines in one by one.
export default function StoryCard({ lines, accentLine = lines.length - 1, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto max-w-md rounded-[28px] border border-gold/50 bg-ivory/85 px-6 py-7 text-center shadow-[0_24px_60px_-24px_rgba(90,55,30,0.55)] backdrop-blur-md"
    >
      <Flourish className="mx-auto mb-3 w-28" />
      {lines.map((line, i) => (
        <motion.p
          key={line}
          initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.35 + i * 0.9, duration: 1 }}
          className={
            i === accentLine
              ? 'mt-2 font-script text-[2rem] leading-snug text-gold-deep text-balance'
              : 'font-serif text-xl italic leading-snug text-ink/85 text-balance'
          }
        >
          {line}
        </motion.p>
      ))}
      {children}
    </motion.div>
  )
}
