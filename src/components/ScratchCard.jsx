import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { rand } from '../lib/rand'

// Scratch-to-reveal. Paints a gold foil over `children` and wipes it away as the guest scratches.
// Auto-reveals once about half of the foil is gone. A "tap to reveal" button is kept for accessibility.
export default function ScratchCard({ children, hint = 'Scratch to reveal', className = '' }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const touched = useRef(false)
  const drawing = useRef(false)
  const last = useRef(null)
  const lastCheck = useRef(0)
  const [revealed, setRevealed] = useState(false)

  const paintFoil = useCallback(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const { width, height } = wrap.getBoundingClientRect()
    if (!width || !height) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    const ctx = canvas.getContext('2d')
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.globalCompositeOperation = 'source-over'

    const g = ctx.createLinearGradient(0, 0, width, height)
    g.addColorStop(0, '#E9D3A0')
    g.addColorStop(0.35, '#F7EBC8')
    g.addColorStop(0.6, '#D9B866')
    g.addColorStop(1, '#EBD59C')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, width, height)

    for (let i = 0; i < 80; i++) {
      ctx.fillStyle = `rgba(255,255,255,${0.15 + rand(i + 3) * 0.35})`
      ctx.beginPath()
      ctx.arc(rand(i + 11) * width, rand(i + 29) * height, rand(i + 47) * 1.8 + 0.4, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.fillStyle = 'rgba(120,88,32,0.88)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = `italic 600 ${Math.max(20, width * 0.075)}px "Cormorant Garamond", Georgia, serif`
    ctx.fillText(hint, width / 2, height / 2 - 8)
    ctx.font = `${Math.max(11, width * 0.032)}px "Jost", system-ui, sans-serif`
    ctx.fillText('✦  use your finger  ✦', width / 2, height / 2 + width * 0.06)
  }, [hint])

  useEffect(() => {
    paintFoil()
    const wrap = wrapRef.current
    if (!wrap) return undefined
    let width = wrap.getBoundingClientRect().width
    const observer = new ResizeObserver(() => {
      const next = wrap.getBoundingClientRect().width
      if (next !== width && !touched.current) {
        width = next
        paintFoil()
      }
    })
    observer.observe(wrap)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!touched.current) paintFoil()
      })
    }
    return () => observer.disconnect()
  }, [paintFoil])

  const point = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const wipe = (e) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const p = point(e)
    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = 44
    ctx.beginPath()
    if (last.current) {
      ctx.moveTo(last.current.x, last.current.y)
      ctx.lineTo(p.x, p.y)
      ctx.stroke()
    } else {
      ctx.arc(p.x, p.y, 22, 0, Math.PI * 2)
      ctx.fill()
    }
    last.current = p
  }

  const checkProgress = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let clear = 0
    let total = 0
    for (let i = 3; i < data.length; i += 4 * 24) {
      total += 1
      if (data[i] < 40) clear += 1
    }
    if (total && clear / total > 0.5) setRevealed(true)
  }

  const onDown = (e) => {
    if (revealed) return
    touched.current = true
    drawing.current = true
    last.current = null
    e.currentTarget.setPointerCapture(e.pointerId)
    wipe(e)
  }

  const onMove = (e) => {
    if (!drawing.current || revealed) return
    wipe(e)
    const now = performance.now()
    if (now - lastCheck.current > 250) {
      lastCheck.current = now
      checkProgress()
    }
  }

  const onUp = () => {
    if (!drawing.current) return
    drawing.current = false
    last.current = null
    if (!revealed) checkProgress()
  }

  return (
    <div className={className}>
      <div
        ref={wrapRef}
        className="relative mx-auto h-44 w-full max-w-xs overflow-hidden rounded-3xl border border-gold/60 bg-ivory shadow-[0_18px_40px_-18px_rgba(120,80,30,0.5)]"
      >
        <div className="absolute inset-0 flex items-center justify-center">{children}</div>
        <motion.canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ touchAction: 'none', pointerEvents: revealed ? 'none' : 'auto' }}
          animate={{ opacity: revealed ? 0 : 1 }}
          transition={{ duration: 0.9 }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          aria-hidden="true"
        />
        {revealed && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {Array.from({ length: 14 }, (_, i) => {
              const angle = (i / 14) * Math.PI * 2
              return (
                <motion.span
                  key={i}
                  className="absolute left-1/2 top-1/2 block h-3 w-2.5"
                  style={{ background: i % 2 ? '#F2C4CE' : '#E8D3A2', borderRadius: '60% 40% 60% 40%' }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
                  animate={{ x: Math.cos(angle) * 130, y: Math.sin(angle) * 80, opacity: 0, scale: 1.2, rotate: 200 }}
                  transition={{ duration: 1.3, ease: 'easeOut' }}
                />
              )
            })}
          </div>
        )}
      </div>

      {!revealed && (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="mx-auto mt-3 block font-sans text-xs tracking-wide text-ink/50 underline underline-offset-4"
        >
          or tap here to reveal
        </button>
      )}
    </div>
  )
}
