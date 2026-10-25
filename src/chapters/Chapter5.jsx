import { useState } from 'react'
import { motion } from 'motion/react'
import StoryCard from '../components/StoryCard'
import Art from '../components/Art'
import Petals from '../components/Petals'
import { PolaroidArt, PaperBG } from '../components/placeholders/scenes'
import { polaroids, story } from '../config'

// Where each photo flies in from.
const FROM = [
  { x: -140, y: -60 },
  { x: 140, y: -80 },
  { x: -140, y: 60 },
  { x: 140, y: 80 },
]

// Chapter 5 — Polaroid memories that "develop" as they land. Tap one to bring it to the front.
export default function Chapter5() {
  const [active, setActive] = useState(null)

  return (
    <section id="chapter-5" className="relative isolate overflow-hidden px-5 pb-14 pt-20">
      <div className="absolute inset-0 -z-10">
        <Art name="ch5-memories-bg" className="h-full w-full">
          <PaperBG />
        </Art>
      </div>
      <Petals count={8} fixed={false} />

      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.4 }}
        style={{ originY: 0 }}
        className="absolute right-5 top-0 z-20 flex w-10 flex-col items-center bg-gradient-to-b from-gold to-gold-deep pb-5 pt-3 text-ivory shadow-lg [clip-path:polygon(0_0,100%_0,100%_100%,50%_86%,0_100%)]"
      >
        <span className="font-sans text-[9px] uppercase tracking-[0.2em]">Ch</span>
        <span className="font-serif text-xl leading-none">V</span>
      </motion.div>

      <div className="absolute left-4 top-4 z-20 rounded-full bg-ivory/80 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.28em] text-gold-deep backdrop-blur">
        {story.ch5.tag}
      </div>

      <div className="relative z-10 mx-auto grid max-w-md grid-cols-2 gap-x-4 gap-y-8">
        {polaroids.map((p, i) => {
          const isActive = active === p.id
          return (
            // Outer layer: the entrance (flies in and settles at its tilt).
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: FROM[i].x, y: FROM[i].y, rotate: p.tilt * 5, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, y: i % 2 ? 22 : 0, rotate: p.tilt, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: 'spring', stiffness: 70, damping: 14, delay: i * 0.25 }}
              style={{ zIndex: isActive ? 30 : 1, position: 'relative' }}
            >
              {/* Inner layer: tap to straighten and enlarge. */}
              <motion.button
                type="button"
                onClick={() => setActive(isActive ? null : p.id)}
                aria-label={p.caption}
                aria-pressed={isActive}
                animate={{ scale: isActive ? 1.12 : 1, rotate: isActive ? -p.tilt : 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                whileTap={{ scale: isActive ? 1.1 : 0.97 }}
                className="relative block w-full bg-white p-2.5 pb-9 text-left shadow-[0_18px_30px_-14px_rgba(80,50,20,0.55)] outline-none focus-visible:ring-4 focus-visible:ring-gold/50"
              >
                <motion.div
                  className="aspect-square w-full overflow-hidden bg-ivory-deep"
                  initial={{ filter: 'sepia(1) blur(8px) brightness(1.4)' }}
                  whileInView={{ filter: 'sepia(0) blur(0px) brightness(1)' }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 2.2, delay: 0.6 + i * 0.25 }}
                >
                  <Art name={p.art} alt={p.caption} className="h-full w-full">
                    <PolaroidArt kind={p.id} />
                  </Art>
                </motion.div>
                <span className="absolute inset-x-0 bottom-1.5 text-center font-script text-2xl text-ink/80">{p.caption}</span>
                <span aria-hidden="true" className="absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 rotate-[-3deg] bg-champagne/80" />
              </motion.button>
            </motion.div>
          )
        })}
      </div>

      <div className="relative z-20 mt-14">
        <StoryCard lines={story.ch5.lines} accentLine={1} />
      </div>
    </section>
  )
}
