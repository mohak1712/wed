import { createContext, useContext, useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Art from './Art'

const SceneContext = createContext(null)

// Scroll progress (0 → 1) of the current chapter, for children that move as you scroll.
export const useSceneProgress = () => useContext(SceneContext)

/**
 * One storybook "page".
 *  - bgName / bg : custom background image name in /public/assets, and the placeholder used until it exists
 *  - stage       : animated characters and props, drawn over the top ~68% of the page
 *  - children    : the text card at the bottom
 */
export default function Scene({
  id,
  bgName,
  bg,
  chapter,
  title,
  stage,
  children,
  overlay = 'from-black/0 via-black/0 to-[#2a1a12]/35',
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <SceneContext.Provider value={scrollYProgress}>
      <section ref={ref} id={id} className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
        {/* Background — opens like an iris, then drifts slowly as you scroll */}
        <motion.div
          className="absolute inset-0 -z-20"
          initial={{ clipPath: 'circle(6% at 50% 58%)' }}
          whileInView={{ clipPath: 'circle(150% at 50% 58%)' }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div style={{ y: bgY }} className="absolute inset-x-0 -top-[8%] h-[116%]">
            <Art name={bgName} className="h-full w-full">
              {bg}
            </Art>
          </motion.div>
        </motion.div>
        <div className={`absolute inset-0 -z-10 bg-gradient-to-b ${overlay}`} />

        {/* Bookmark ribbon with the chapter number */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
          style={{ originY: 0 }}
          className="absolute right-5 top-0 z-20 flex w-10 flex-col items-center bg-gradient-to-b from-gold to-gold-deep pb-5 pt-[max(0.75rem,env(safe-area-inset-top))] text-ivory shadow-lg [clip-path:polygon(0_0,100%_0,100%_100%,50%_86%,0_100%)]"
        >
          <span className="font-sans text-[9px] uppercase tracking-[0.2em]">Ch</span>
          <span className="font-serif text-xl leading-none">{chapter}</span>
        </motion.div>

        <div className="absolute left-4 top-[max(1rem,env(safe-area-inset-top))] z-20 rounded-full bg-ivory/80 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.28em] text-gold-deep backdrop-blur">
          {title}
        </div>

        {/* Stage: characters + props. Height is viewport-relative (svh), matching the text's pt-[62svh] below —
            sections can grow taller than 100svh when a chapter's text block is long (e.g. Chapter 6's reveal
            card), and a %-based height here would drift out of sync with that fixed text offset. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[62svh]">{stage}</div>

        {/* Text */}
        <div className="relative z-20 px-5 pb-12 pt-[62svh]">{children}</div>
      </section>
    </SceneContext.Provider>
  )
}
