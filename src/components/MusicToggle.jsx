import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { assetUrl } from '../lib/assets'

// Muted by default. Visitors choose to turn the music on (browsers require a tap anyway).
// Put your song at public/audio/wedding-theme.mp3
export default function MusicToggle() {
  const audioRef = useRef(null)
  const toastTimer = useRef(null)
  const [on, setOn] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  const say = (message) => {
    setToast(message)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 2600)
  }

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (on) {
      audio.pause()
      setOn(false)
      return
    }
    try {
      audio.volume = 0.6
      await audio.play()
      setOn(true)
      say('Music on')
    } catch {
      setOn(false)
      say('Music is not available right now')
    }
  }

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex items-center gap-2">
      <AnimatePresence>
        {toast && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="rounded-full bg-ivory/90 px-3 py-1.5 font-sans text-xs text-ink/80 shadow backdrop-blur"
          >
            {toast}
          </motion.span>
        )}
      </AnimatePresence>

      <audio ref={audioRef} loop preload="none" src={assetUrl('audio/wedding-theme.mp3')} />

      <button
        type="button"
        onClick={toggle}
        aria-pressed={on}
        aria-label={on ? 'Turn music off' : 'Turn music on'}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-ivory/90 text-gold-deep shadow-lg backdrop-blur outline-none transition active:scale-95 focus-visible:ring-4 focus-visible:ring-gold/50"
      >
        {on ? (
          <span className="flex h-5 items-end gap-[3px]" aria-hidden="true">
            {[0, 0.2, 0.1, 0.3].map((delay, i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-gold-deep"
                animate={{ height: ['30%', '100%', '45%', '85%', '30%'] }}
                transition={{ duration: 1.1, repeat: Infinity, delay, ease: 'easeInOut' }}
                style={{ height: '30%' }}
              />
            ))}
          </span>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 9v6h4l5 4V5L8 9H4z" />
            <path d="M17 9l5 6M22 9l-5 6" />
          </svg>
        )}
      </button>
    </div>
  )
}
