import { motion } from 'motion/react'
import { dateParts, mapsUrlFor } from '../config'
import Flourish from './Flourish'

function Icon({ kind, accent }) {
  const common = { viewBox: '0 0 64 64', className: 'h-14 w-14', fill: 'none', 'aria-hidden': true }
  if (kind === 'diya') {
    return (
      <svg {...common}>
        <motion.path
          d="M32 8 Q41 22 32 33 Q23 22 32 8Z"
          fill={accent}
          animate={{ scaleY: [1, 1.12, 0.95, 1.08, 1], opacity: [0.95, 1, 0.85, 1, 0.95] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originX: 0.5, originY: 1 }}
        />
        <path d="M10 36 Q32 62 54 36Z" fill="#E8D3A2" stroke="#C9A24D" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="32" cy="26" r="18" fill={accent} opacity="0.12" />
      </svg>
    )
  }
  if (kind === 'rings') {
    return (
      <svg {...common} stroke="#C9A24D" strokeWidth="3">
        <circle cx="25" cy="38" r="14" />
        <circle cx="39" cy="38" r="14" />
        <path d="M32 12 L37 19 L32 25 L27 19Z" fill="#F2C4CE" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    )
  }
  if (kind === 'paisley') {
    return (
      <svg {...common}>
        <path
          d="M34 8 C52 10 58 32 46 46 C38 56 20 54 18 41 C16 31 27 27 31 33 C34 38 29 42 26 40"
          stroke={accent}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="38" cy="26" r="2.4" fill="#C9A24D" />
        <circle cx="44" cy="34" r="2" fill="#C9A24D" />
      </svg>
    )
  }
  if (kind === 'marigold') {
    return (
      <svg {...common}>
        <g transform="translate(32 32)">
          {Array.from({ length: 10 }, (_, i) => (
            <ellipse key={i} cx="0" cy="-14" rx="6" ry="11" fill={accent} opacity="0.85" transform={`rotate(${i * 36})`} />
          ))}
          <circle r="7" fill="#C97A1A" />
        </g>
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M32 54 C10 38 8 20 22 16 C28 14 32 20 32 20 C32 20 36 14 42 16 C56 20 54 38 32 54Z" fill="#F2C4CE" stroke="#C9A24D" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  )
}

function Row({ label, children, muted }) {
  return (
    <div className="text-center">
      <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-sage-deep">{label}</p>
      <p className={`mt-1 font-serif text-xl leading-snug ${muted ? 'italic text-ink/55' : 'text-ink'}`}>{children}</p>
    </div>
  )
}

export default function EventCard({ event, index }) {
  const { day, month, year, weekday } = dateParts(event.iso)
  const mapsUrl = mapsUrlFor(event)
  const side = index % 2 === 0 ? -1.4 : 1.4

  return (
    <motion.article
      initial={{ opacity: 0, y: 70, rotate: side * 3 }}
      whileInView={{ opacity: 1, y: 0, rotate: side }}
      whileHover={{ rotate: 0, y: -4 }}
      whileTap={{ scale: 0.985, rotate: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ type: 'spring', stiffness: 70, damping: 16 }}
      className="paper relative mx-auto w-full max-w-sm overflow-hidden rounded-[28px] shadow-[0_26px_50px_-24px_rgba(110,70,30,0.55)]"
    >
      <div className="pointer-events-none absolute inset-2 rounded-[22px] border border-gold/60" />
      <div className="pointer-events-none absolute inset-[14px] rounded-[16px] border border-gold/25" />
      <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: event.accent }} />

      {/* light sweep */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(110deg, transparent 35%, rgba(255,236,190,0.5) 50%, transparent 65%)' }}
        initial={{ x: '-120%' }}
        animate={{ x: '120%' }}
        transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut', delay: index * 0.7 }}
      />

      <div className="relative px-8 pb-9 pt-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center">
          <Icon kind={event.icon} accent={event.accent} />
        </div>
        <p className="mt-3 font-sans text-[10px] uppercase tracking-[0.38em] text-sage-deep">You are invited to</p>
        <h3 className="mt-2 font-script text-[2.6rem] leading-[1.1] text-gold-deep text-balance">{event.title}</h3>
        <Flourish className="mx-auto mt-3 w-32" />

        <div className="mt-5 flex items-center justify-center gap-4">
          <span className="font-serif text-6xl leading-none text-ink">{day}</span>
          <span className="text-left font-serif leading-tight">
            <span className="block text-xl text-ink">{month}</span>
            <span className="block font-sans text-xs tracking-[0.2em] text-ink/60">{year}</span>
            <span className="block font-serif text-lg italic text-gold-deep">{weekday}</span>
          </span>
        </div>

        <div className="mt-6 space-y-4">
          <Row label="Time" muted={!event.time}>
            {event.time || 'To be announced'}
            {event.timeNote && <span className="mt-0.5 block text-base italic text-ink/55">{event.timeNote}</span>}
          </Row>
          <Row label="Venue" muted={!event.venue}>
            {event.venue ? (
              <>
                {event.venue.name && <span className="block">{event.venue.name}</span>}
                <span className="block text-lg">{event.venue.address}</span>
              </>
            ) : (
              'To be announced'
            )}
          </Row>
          {event.hostedBy && <Row label="Hosted by">{event.hostedBy}</Row>}
        </div>

        {mapsUrl ? (
          <motion.a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.96 }}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-gold to-gold-deep px-6 py-3 font-sans text-sm tracking-wide text-ivory shadow-md outline-none focus-visible:ring-4 focus-visible:ring-gold/50"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
            Open in Google Maps
          </motion.a>
        ) : (
          <p className="mt-7 font-serif text-base italic text-ink/50">Map link will be shared soon</p>
        )}
      </div>
    </motion.article>
  )
}
