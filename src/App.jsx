import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'motion/react'
import Envelope from './components/Envelope'
import Petals from './components/Petals'
import MusicToggle from './components/MusicToggle'
import Chapter1 from './chapters/Chapter1'
import Chapter2 from './chapters/Chapter2'
import Chapter3 from './chapters/Chapter3'
import Chapter4 from './chapters/Chapter4'
import Chapter5 from './chapters/Chapter5'
import Chapter6 from './chapters/Chapter6'
import Chapter7 from './chapters/Chapter7'

export default function App() {
  const [opened, setOpened] = useState(false)

  // Keep the page still while the envelope is on screen, then start the story from the top.
  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden'
    if (opened) window.scrollTo({ top: 0 })
    return () => {
      document.body.style.overflow = ''
    }
  }, [opened])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{!opened && <Envelope key="envelope" onOpen={() => setOpened(true)} />}</AnimatePresence>

      {opened && (
        <main>
          <Chapter1 />
          <Chapter2 />
          <Chapter3 />
          <Chapter4 />
          <Chapter5 />
          <Chapter6 />
          <Chapter7 />
        </main>
      )}

      {opened && <Petals count={12} />}
      <MusicToggle />
    </MotionConfig>
  )
}
