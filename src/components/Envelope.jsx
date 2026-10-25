import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import Petals from './Petals'

// Opening screen: tap the wax seal, the flap lifts, the letter rises, and the story begins.
export default function Envelope({ onOpen }) {
  const [open, setOpen] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const handleOpen = () => {
    if (open) return
    setOpen(true)
    timer.current = setTimeout(onOpen, 2300)
  }

  return (
    <motion.div
      className="paper fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Petals count={10} fixed={false} />

      <motion.p
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="relative z-20 mb-10 text-center font-sans text-[11px] uppercase tracking-[0.4em] text-sage-deep"
      >
        You are invited
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 aspect-[4/3] w-[min(88vw,380px)]"
        style={{ perspective: 1200 }}
      >
        {/* back of the envelope */}
        <div className="absolute inset-0 rounded-md bg-gradient-to-b from-champagne to-[#dcc48c] shadow-[0_30px_60px_-20px_rgba(120,80,30,0.55)]" />

        {/* the letter */}
        <motion.div
          className="absolute inset-x-[6%] top-[8%] bottom-[8%] flex flex-col items-center justify-center rounded-sm bg-ivory px-4 text-center shadow-md"
          animate={open ? { y: '-62%' } : { y: 0 }}
          transition={{ delay: open ? 0.7 : 0, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ zIndex: 2 }}
        >
          <span className="font-script text-4xl leading-tight text-gold-deep">A love story</span>
          <span className="mt-1 font-serif text-lg italic text-ink/70">is waiting for you</span>
        </motion.div>

        {/* front pocket: left, right and bottom folds */}
        <div className="absolute inset-0 z-[3] overflow-hidden rounded-md">
          <div className="absolute inset-0 bg-[#e6d3a1] [clip-path:polygon(0_0,50%_55%,0_100%)]" />
          <div className="absolute inset-0 bg-[#e9d7a8] [clip-path:polygon(100%_0,50%_55%,100%_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#dcc48c] to-[#ead9ab] [clip-path:polygon(0_100%,50%_48%,100%_100%)]" />
        </div>

        {/* flap */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[56%] origin-top"
          style={{ transformStyle: 'preserve-3d' }}
          animate={open ? { rotateX: 180, zIndex: 1 } : { rotateX: 0, zIndex: 5 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#ecdcae] to-[#dcc48c] [clip-path:polygon(0_0,100%_0,50%_100%)]"
            style={{ backfaceVisibility: 'hidden' }}
          />
          <div
            className="absolute inset-0 bg-[#f4ead0] [clip-path:polygon(0_0,100%_0,50%_100%)]"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
          />
        </motion.div>

        {/* wax seal */}
        <motion.button
          type="button"
          onClick={handleOpen}
          aria-label="Open the invitation"
          className="absolute left-1/2 top-[50%] z-[6] -ml-8 -mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blush-deep to-[#b9566d] shadow-[0_8px_18px_-4px_rgba(120,40,60,0.6)] outline-none focus-visible:ring-4 focus-visible:ring-gold/60"
          animate={open ? { scale: 0, opacity: 0, rotate: 40 } : { scale: [1, 1.08, 1] }}
          transition={open ? { duration: 0.4 } : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          whileTap={{ scale: 0.92 }}
        >
          <svg viewBox="0 0 40 40" className="h-8 w-8" aria-hidden="true">
            {[0, 72, 144, 216, 288].map((r) => (
              <ellipse key={r} cx="20" cy="11" rx="4.6" ry="7" fill="#F8DDE2" opacity="0.92" transform={`rotate(${r} 20 20)`} />
            ))}
            <circle cx="20" cy="20" r="3.6" fill="#E8D3A2" />
          </svg>
        </motion.button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 0 : [0.4, 1, 0.4] }}
        transition={open ? { duration: 0.3 } : { delay: 1.4, duration: 2.4, repeat: Infinity }}
        className="relative z-20 mt-12 font-serif text-lg italic text-ink/70"
      >
        Tap the seal to open
      </motion.p>
    </motion.div>
  )
}
