import { motion } from 'motion/react'
import Scene from '../components/Scene'
import StoryCard from '../components/StoryCard'
import Bokeh from '../components/Bokeh'
import { RestaurantBG } from '../components/placeholders/scenes'
import { story } from '../config'

// Chapter 3 — a warmly lit contemporary restaurant: greenery, glowing globes, candlelit tables.
// No signage, names or logos anywhere (keep this true for your custom background too).
export default function Chapter3() {
  const stage = (
    <>
      <Bokeh count={14} color="255,225,160" seed={11} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="absolute block h-1.5 w-1.5 rounded-full bg-[#FFE6A0]"
          style={{ left: `${12 + i * 15}%`, bottom: '18%' }}
          animate={{ y: [0, -140 - i * 18], opacity: [0, 0.9, 0], x: [0, i % 2 ? 14 : -14] }}
          transition={{ duration: 5 + i * 0.6, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }}
        />
      ))}
    </>
  )

  return (
    <Scene
      id="chapter-3"
      chapter="III"
      title={story.ch3.tag}
      bgName="ch3-restaurant-bg"
      bg={<RestaurantBG />}
      stage={stage}
      overlay="from-black/10 via-black/0 to-[#1c120c]/45"
    >
      <StoryCard lines={story.ch3.lines} />
    </Scene>
  )
}
