import { motion } from 'motion/react'
import Scene from '../components/Scene'
import StoryCard from '../components/StoryCard'
import Art from '../components/Art'
import Person from '../components/Person'
import Bokeh from '../components/Bokeh'
import { CafeBG } from '../components/placeholders/scenes'
import { flags, story } from '../config'

// Little icons drift from her towards him — "a thousand stories".
function StoryBubble({ kind, delay, lane }) {
  const shapes = {
    heart: <path d="M12 21C3 14 2 8 7 6c3-1 5 2 5 2s2-3 5-2c5 2 4 8-5 15z" fill="#EFA9BB" />,
    flower: (
      <g transform="translate(12 12)">
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} cx="0" cy="-5" rx="3" ry="5" fill="#F6C3CF" transform={`rotate(${r})`} />
        ))}
        <circle r="2.2" fill="#E8D3A2" />
      </g>
    ),
    star: <path d="M12 2l2.6 6.4 6.9.6-5.2 4.5 1.6 6.7L12 16.7 6.1 20.2l1.6-6.7L2.5 9l6.9-.6z" fill="#E8D3A2" />,
    cup: <path d="M5 8h12v6a6 6 0 0 1-12 0V8zm12 1h2a2.5 2.5 0 0 1 0 5h-2" fill="#FBF3E2" stroke="#C9A24D" strokeWidth="1.4" />,
    book: <path d="M4 5h7c1 0 1 1 1 1v13s0-1-1-1H4zM20 5h-7c-1 0-1 1-1 1v13s0-1 1-1h7z" fill="#A9BCA0" stroke="#6B8666" strokeWidth="1" />,
    sparkle: <path d="M12 2l1.8 7.2L21 11l-7.2 1.8L12 20l-1.8-7.2L3 11l7.2-1.8z" fill="#FFF1C9" />,
  }
  return (
    <motion.svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="absolute left-0 h-7 w-7"
      style={{ top: `${lane}%` }}
      initial={{ x: 0, opacity: 0, scale: 0.6 }}
      animate={{ x: [0, 40, 80, 120], y: [0, -16, 6, -10], opacity: [0, 1, 1, 0], scale: [0.6, 1, 1, 0.8], rotate: [0, 10, -8, 12] }}
      transition={{ duration: 4.2, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      {shapes[kind]}
    </motion.svg>
  )
}

// Chapter 4 — she talks (gestures, laughs), he listens with a gentle smile.
export default function Chapter4() {
  const stage = (
    <>
      <Bokeh count={9} color="255,205,190" seed={5} />

      {!flags.ch4FullScene && (
        <>
          <motion.div
            className="absolute bottom-[8%] left-[1%] h-[74%] w-[50%]"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <Art name="krishika-talking" alt="Krishika talking and laughing, gesturing as she tells a story" fit="contain" className="h-full w-full">
              <Person who="bride" facing="right" view="bust" gesture laugh className="h-full w-full" />
            </Art>
          </motion.div>

          <motion.div
            className="absolute bottom-[8%] right-[1%] h-[74%] w-[50%]"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            <Art name="mohak-listening" alt="Mohak listening with a gentle smile" fit="contain" className="h-full w-full">
              <Person who="groom" facing="left" view="bust" tilt={4} className="h-full w-full" />
            </Art>
          </motion.div>

          <div aria-hidden="true" className="absolute left-[40%] top-[10%] h-[60%] w-[26%]">
            <StoryBubble kind="heart" delay={0} lane={10} />
            <StoryBubble kind="flower" delay={0.9} lane={32} />
            <StoryBubble kind="star" delay={1.8} lane={18} />
            <StoryBubble kind="cup" delay={2.7} lane={48} />
            <StoryBubble kind="book" delay={3.4} lane={26} />
            <StoryBubble kind="sparkle" delay={1.3} lane={56} />
          </div>
        </>
      )}
    </>
  )

  return (
    <Scene
      id="chapter-4"
      chapter="IV"
      title={story.ch4.tag}
      bgName="ch4-conversation-bg"
      bg={<CafeBG tone="rose" />}
      stage={stage}
    >
      <StoryCard lines={story.ch4.lines} accentLine={1} />
    </Scene>
  )
}
