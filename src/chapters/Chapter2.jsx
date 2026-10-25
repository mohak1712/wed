import { motion, useTransform } from 'motion/react'
import Scene, { useSceneProgress } from '../components/Scene'
import StoryCard from '../components/StoryCard'
import Art from '../components/Art'
import Person from '../components/Person'
import Petals from '../components/Petals'
import { GardenBG } from '../components/placeholders/scenes'
import { flags, story } from '../config'

// Two walkers who start far apart on separate garden paths and drift together as you scroll.
function Walkers() {
  const progress = useSceneProgress()

  const drawLeft = useTransform(progress, [0.1, 0.6], [0, 1])
  const drawRight = useTransform(progress, [0.12, 0.62], [0, 1])

  const mohakX = useTransform(progress, [0.15, 0.6], ['-42vw', '-8vw'])
  const krishikaX = useTransform(progress, [0.15, 0.6], ['42vw', '8vw'])
  const mohakY = useTransform(progress, [0.15, 0.6], ['-6%', '0%'])
  const krishikaY = useTransform(progress, [0.15, 0.6], ['8%', '0%'])
  const scale = useTransform(progress, [0.15, 0.6], [0.82, 1])
  const glow = useTransform(progress, [0.45, 0.62], [0, 1])

  return (
    <>
      <svg viewBox="0 0 400 480" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        <motion.path d="M-10 250 C80 330 150 400 200 440" stroke="#F5E3B5" strokeWidth="7" strokeLinecap="round" style={{ pathLength: drawLeft }} />
        <motion.path d="M410 330 C320 380 250 420 200 440" stroke="#F5E3B5" strokeWidth="7" strokeLinecap="round" style={{ pathLength: drawRight }} />
      </svg>

      <motion.div
        aria-hidden="true"
        className="absolute bottom-[8%] left-1/2 -ml-16 h-32 w-32 rounded-full"
        style={{ opacity: glow, background: 'radial-gradient(circle, rgba(255,230,160,0.9), rgba(255,230,160,0) 70%)' }}
      />

      {!flags.ch2FullScene && (
        <>
          <motion.div className="absolute bottom-[6%] left-1/2 -ml-[17%] h-[78%] w-[34%]" style={{ x: mohakX, y: mohakY, scale }}>
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut' }} className="h-full w-full">
              <Art name="mohak-walking" alt="Mohak walking through a spring garden" fit="contain" className="h-full w-full">
                <Person who="groom" facing="right" view="full" walking className="h-full w-full" />
              </Art>
            </motion.div>
          </motion.div>

          <motion.div className="absolute bottom-[6%] left-1/2 -ml-[17%] h-[78%] w-[34%]" style={{ x: krishikaX, y: krishikaY, scale }}>
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut', delay: 0.27 }} className="h-full w-full">
              <Art name="krishika-walking" alt="Krishika walking through a spring garden" fit="contain" className="h-full w-full">
                <Person who="bride" facing="left" view="full" walking className="h-full w-full" />
              </Art>
            </motion.div>
          </motion.div>
        </>
      )}
    </>
  )
}

export default function Chapter2() {
  return (
    <Scene
      id="chapter-2"
      chapter="II"
      title={story.ch2.tag}
      bgName="ch2-garden-bg"
      bg={<GardenBG />}
      stage={
        <>
          <Petals count={10} fixed={false} />
          <Walkers />
        </>
      }
      overlay="from-black/0 via-black/0 to-[#3a2a22]/30"
    >
      <StoryCard lines={story.ch2.lines} />
    </Scene>
  )
}
