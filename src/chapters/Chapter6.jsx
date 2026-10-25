import { motion } from 'motion/react'
import Scene from '../components/Scene'
import Art from '../components/Art'
import Person from '../components/Person'
import Petals from '../components/Petals'
import Flourish from '../components/Flourish'
import { SunsetBG } from '../components/placeholders/scenes'
import { couple, story } from '../config'

const line = (delay) => ({
  initial: { opacity: 0, y: 16, filter: 'blur(8px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.7 },
  transition: { delay, duration: 1.2 },
})

// Chapter 6 — sunset garden, falling petals, and the big reveal of the names and the hashtag.
export default function Chapter6() {
  const tag = couple.hashtag.split('')

  const stage = (
    <>
      <Petals count={26} fixed={false} />
      <motion.div
        className="absolute bottom-[18%] left-1/2 -ml-[26%] h-[40%] w-[52%]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.6, delay: 0.6 }}
      >
        <Art name="couple-together" alt="Mohak and Krishika together at sunset" fit="contain" className="h-full w-full">
          <div className="flex h-full w-full items-end justify-center gap-1">
            <Person who="groom" facing="right" view="full" silhouette="#2B2038" className="h-full w-1/2" />
            <Person who="bride" facing="left" view="full" silhouette="#2B2038" className="h-full w-1/2" />
          </div>
        </Art>
      </motion.div>
    </>
  )

  return (
    <Scene
      id="chapter-6"
      chapter="VI"
      title={story.ch6.tag}
      bgName="ch6-sunset-bg"
      bg={<SunsetBG />}
      stage={stage}
      overlay="from-black/0 via-black/0 to-[#1d1230]/55"
    >
      <div className="mx-auto max-w-md text-center">
        <motion.p {...line(0.2)} className="font-serif text-2xl italic leading-snug text-ivory [text-shadow:0_2px_14px_rgba(40,20,60,0.7)]">
          {story.ch6.lines[0]}
        </motion.p>
        <motion.p {...line(1.3)} className="mt-2 font-script text-4xl leading-snug text-champagne [text-shadow:0_2px_14px_rgba(40,20,60,0.7)]">
          {story.ch6.lines[1]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ delay: 2.8, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 rounded-[28px] border border-gold/50 bg-ivory/85 px-5 py-7 shadow-[0_24px_60px_-24px_rgba(20,10,40,0.7)] backdrop-blur-md"
        >
          <Flourish className="mx-auto mb-2 w-28" />
          <h2 className="gold-text font-script text-[2.9rem] leading-tight min-[380px]:text-[3.4rem]">
            {couple.groom} &amp; {couple.bride}
          </h2>
          <p aria-label={couple.hashtag} className="mt-3 font-sans text-lg tracking-[0.18em] text-sage-deep">
            {tag.map((ch, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 4.4 + i * 0.09, duration: 0.5 }}
                className="inline-block"
              >
                {ch}
              </motion.span>
            ))}
          </p>
        </motion.div>

        <motion.a
          href="#celebrations"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 6, duration: 1 }}
          className="mt-8 inline-block font-sans text-[11px] uppercase tracking-[0.35em] text-ivory/90"
        >
          Join our celebrations
          <motion.span className="mt-1 block text-lg" animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            ↓
          </motion.span>
        </motion.a>
      </div>
    </Scene>
  )
}
