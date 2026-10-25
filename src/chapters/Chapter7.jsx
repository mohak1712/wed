import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Art from '../components/Art'
import EventCard from '../components/EventCard'
import ScratchCard from '../components/ScratchCard'
import Flourish from '../components/Flourish'
import { PaperBG } from '../components/placeholders/scenes'
import { couple, dateParts, events, weddingIso } from '../config'

// Chapter 7 — the wedding celebrations: scratch card for the date, then one animated invitation per event.
export default function Chapter7() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.6', 'end 0.7'] })
  const thread = useTransform(scrollYProgress, [0, 1], [0, 1])
  const wedding = dateParts(weddingIso)

  const shareText = `You are invited to celebrate the wedding of ${couple.groom} & ${couple.bride} ${couple.hashtag}`
  const shareHref = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${typeof window !== 'undefined' ? window.location.href : ''}`)}`

  return (
    <section id="celebrations" ref={ref} className="relative isolate overflow-hidden px-5 pb-20 pt-24">
      <div className="absolute inset-0 -z-10">
        <Art name="ch7-events-bg" className="h-full w-full">
          <PaperBG />
        </Art>
      </div>

      <div className="mx-auto max-w-md text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-sans text-[11px] uppercase tracking-[0.4em] text-sage-deep"
        >
          Chapter VII
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-2 font-script text-5xl leading-tight text-gold-deep"
        >
          Wedding celebrations
        </motion.h2>
        <Flourish className="mx-auto mt-3 w-36" />
        <p className="mt-4 font-serif text-xl italic text-ink/80 text-balance">
          With the blessings of our families, we invite you to be part of every moment.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9 }}
          className="mt-10"
        >
          <p className="mb-4 font-sans text-[11px] uppercase tracking-[0.35em] text-sage-deep">Save the date</p>
          <ScratchCard>
            <div className="text-center">
              <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-sage-deep">{wedding.weekday}</p>
              <p className="gold-text font-serif text-6xl leading-none">{wedding.day}</p>
              <p className="mt-1 font-script text-3xl text-gold-deep">
                {wedding.month} {wedding.year}
              </p>
            </div>
          </ScratchCard>
        </motion.div>
      </div>

      <div className="relative mx-auto mt-16 max-w-sm">
        <motion.div
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 top-0 w-px origin-top bg-gradient-to-b from-gold/0 via-gold/70 to-gold/0"
          style={{ scaleY: thread }}
        />
        <div className="relative space-y-12">
          {events.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>

      <footer className="mx-auto mt-20 max-w-md text-center">
        <Flourish className="mx-auto w-36" />
        <p className="mt-4 font-serif text-xl italic text-ink/80">With love and blessings,</p>
        <p className="gold-text mt-1 font-script text-5xl leading-tight">
          {couple.groom} &amp; {couple.bride}
        </p>
        <p className="mt-2 font-sans text-lg tracking-[0.18em] text-sage-deep">{couple.hashtag}</p>

        <motion.a
          href={shareHref}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.96 }}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-sage-deep/50 bg-ivory/80 px-6 py-3 font-sans text-sm tracking-wide text-sage-deep shadow outline-none backdrop-blur focus-visible:ring-4 focus-visible:ring-sage/50"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.4A8.4 8.4 0 1 1 21 11.5z" />
          </svg>
          Share this invitation on WhatsApp
        </motion.a>
      </footer>
    </section>
  )
}
