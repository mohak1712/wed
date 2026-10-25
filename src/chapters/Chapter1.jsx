import { motion } from 'motion/react'
import Scene from '../components/Scene'
import StoryCard from '../components/StoryCard'
import Art from '../components/Art'
import Person from '../components/Person'
import Bokeh from '../components/Bokeh'
import { CafeBG, TableFront } from '../components/placeholders/scenes'
import { flags, story } from '../config'

// Chapter 1 — a cosy spring café, golden pendant lights, the two of them seated opposite each other.
export default function Chapter1() {
  const stage = (
    <>
      <Bokeh count={9} color="255,214,140" seed={3} />

      {!flags.ch1FullScene && (
        <>
          <motion.div
            className="absolute bottom-[24%] left-[2%] h-[62%] w-[48%]"
            initial={{ x: -70, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.3, delay: 0.5, ease: 'easeOut' }}
          >
            <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="h-full w-full">
              <Art name="mohak-seated" alt="Mohak in a navy T-shirt and glasses" fit="contain" className="h-full w-full">
                <Person who="groom" facing="right" view="bust" className="h-full w-full" />
              </Art>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-[24%] right-[2%] h-[62%] w-[48%]"
            initial={{ x: 70, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.3, delay: 0.7, ease: 'easeOut' }}
          >
            <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }} className="h-full w-full">
              <Art name="krishika-seated" alt="Krishika in a blue dress and glasses" fit="contain" className="h-full w-full">
                <Person who="bride" facing="left" view="bust" className="h-full w-full" />
              </Art>
            </motion.div>
          </motion.div>

          <Art name="ch1-table-front" className="absolute inset-x-0 bottom-0 h-[34%]">
            <TableFront />
          </Art>
        </>
      )}
    </>
  )

  return (
    <Scene id="chapter-1" chapter="I" title={story.ch1.tag} bgName="ch1-cafe-bg" bg={<CafeBG />} stage={stage}>
      <StoryCard lines={story.ch1.lines}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2.6, duration: 1 }}
          className="mt-5 font-sans text-[10px] uppercase tracking-[0.35em] text-sage-deep"
        >
          Scroll to turn the page
          <motion.span className="mt-1 block text-base" animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            ↓
          </motion.span>
        </motion.p>
      </StoryCard>
    </Scene>
  )
}
