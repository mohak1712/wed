import { motion } from 'motion/react'

// One shared placeholder figure for both characters, so likeness stays consistent across every chapter:
//   Mohak    — navy T-shirt, glasses, short dark hair
//   Krishika — blue dress, glasses, long dark hair
// Replace with real portraits via ASSET_GUIDE.md; this only fills the gap until then.

const C = {
  skin: '#EBBF9F',
  ink: '#2B2220',
  navy: '#1F2F55',
  navyDark: '#15213F',
  dress: '#4D7BBF',
  dressDark: '#3A62A0',
  dressLight: '#86A8DC',
  trouser: '#3D4560',
  shoe: '#5A382B',
  blush: '#F2A9A0',
  lip: '#A8474B',
  frame: '#3B2F2F',
}

const SMILE = 'M52.5 63 Q60 69 67.5 63 Q60 65.2 52.5 63 Z'

export default function Person({
  who = 'groom',
  facing = 'right',
  view = 'bust',
  walking = false,
  gesture = false,
  laugh = false,
  tilt = 0,
  silhouette = null,
  className = '',
}) {
  const groom = who === 'groom'
  const f = (color) => silhouette || color
  const full = view === 'full'
  const flip = facing === 'left'

  const sleeve = groom ? C.navy : C.dressDark
  const armPaths = groom
    ? { sleeve: 'M28 100 L16 138 L30 144 L40 108Z', fore: 'M16 138 L12 174 L25 178 L30 144Z', hand: [18.5, 181] }
    : { sleeve: 'M30 102 L20 128 L32 134 L40 108Z', fore: 'M20 128 L15 168 L28 172 L32 134Z', hand: [21.5, 175] }

  const arm = (
    <>
      <path d={armPaths.sleeve} fill={f(sleeve)} />
      <path d={armPaths.fore} fill={f(C.skin)} />
      <circle cx={armPaths.hand[0]} cy={armPaths.hand[1]} r="6" fill={f(C.skin)} />
    </>
  )

  return (
    <svg
      viewBox={full ? '0 0 120 260' : '0 0 120 185'}
      preserveAspectRatio="xMidYMax meet"
      className={className}
      aria-hidden="true"
    >
      <g transform={flip ? 'translate(120 0) scale(-1 1)' : undefined}>
        {/* ---------- legs / skirt (behind torso) ---------- */}
        {full && groom && (
          <>
            <motion.g
              animate={walking ? { rotate: [-8, 8, -8] } : undefined}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
              style={{ originX: 0.5, originY: 0 }}
            >
              <path d="M28 164 L60 164 L55 240 L32 240Z" fill={f(C.trouser)} />
              <path d="M30 240 L56 240 L59 250 L26 250Z" fill={f(C.shoe)} />
            </motion.g>
            <motion.g
              animate={walking ? { rotate: [8, -8, 8] } : undefined}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
              style={{ originX: 0.5, originY: 0 }}
            >
              <path d="M60 164 L92 164 L88 240 L65 240Z" fill={f(C.trouser)} />
              <path d="M64 240 L90 240 L94 250 L62 250Z" fill={f(C.shoe)} />
            </motion.g>
          </>
        )}
        {full && !groom && (
          <motion.g
            animate={walking ? { rotate: [-1.5, 1.5, -1.5] } : undefined}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originX: 0.5, originY: 0 }}
          >
            <ellipse cx="44" cy="248" rx="9" ry="4" fill={f(C.shoe)} />
            <ellipse cx="76" cy="248" rx="9" ry="4" fill={f(C.shoe)} />
            <path d="M28 131 C20 170 8 215 4 240 Q60 254 116 240 C112 215 100 170 92 131Z" fill={f(C.dress)} />
            <path d="M44 150 C40 185 34 215 30 240 M60 150 L60 246 M76 150 C80 185 86 215 90 240" stroke={f(C.dressLight)} strokeWidth="1.2" fill="none" opacity="0.6" />
          </motion.g>
        )}

        {/* ---------- long hair behind (Krishika) ---------- */}
        {!groom && <path d="M38 44 C32 14 88 10 82 44 L92 122 C80 136 40 136 28 122Z" fill={f(C.ink)} />}

        {/* ---------- torso ---------- */}
        {groom ? (
          <>
            <path d="M28 100 C28 86 40 80 54 78 L66 78 C80 80 92 86 92 100 L98 170 L22 170Z" fill={f(C.navy)} />
            <path d="M52 78 Q60 90 68 78" stroke={f(C.navyDark)} strokeWidth="2.2" fill={f(C.skin)} />
          </>
        ) : (
          <>
            <path d="M30 102 C30 88 42 82 54 80 L66 80 C78 82 90 88 90 102 L92 132 L28 132Z" fill={f(C.dress)} />
            <path d="M50 80 Q60 98 70 80Z" fill={f(C.skin)} />
            {!full && <path d="M28 131 L22 178 L98 178 L92 131Z" fill={f(C.dress)} />}
            <rect x="28" y="128" width="64" height="5" fill={f(C.dressDark)} />
          </>
        )}

        {/* ---------- arms ---------- */}
        <g>{arm}</g>
        <g transform="translate(120 0) scale(-1 1)">
          {gesture ? (
            <motion.g
              animate={{ rotate: [8, 92, 55, 112, 8] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{ originX: 0.8, originY: 0 }}
            >
              {arm}
            </motion.g>
          ) : (
            arm
          )}
        </g>

        {/* ---------- neck ---------- */}
        <rect x="54" y="66" width="12" height="16" fill={f(C.skin)} />

        {/* long hair falling in front of the shoulders (Krishika) */}
        {!groom && (
          <>
            <path d="M38 46 C33 72 31 104 36 128 L47 120 C44 98 45 72 45 52Z" fill={f(C.ink)} />
            <path d="M82 46 C87 72 89 104 84 128 L73 120 C76 98 75 72 75 52Z" fill={f(C.ink)} />
          </>
        )}

        {/* ---------- head ---------- */}
        <motion.g
          animate={{ rotate: tilt ? [tilt - 1, tilt + 1.5, tilt - 1] : [-0.6, 0.8, -0.6] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originX: 0.5, originY: 1 }}
        >
          <ellipse cx="60" cy="47" rx="18.5" ry="22" fill={f(C.skin)} />
          {groom ? (
            <path d="M41.5 46 C38 20 82 16 78.5 46 C76 36 70 31 60 31 C51 31 44 36 41.5 46Z" fill={f(C.ink)} />
          ) : (
            <path d="M41 46 C42 29 54 25 60 26 C66 25 78 29 79 46 C74 37 66 33 60 33 C54 33 46 37 41 46Z" fill={f(C.ink)} />
          )}
          {!silhouette && (
            <>
              <circle cx="46" cy="60" r="4" fill={C.blush} opacity="0.35" />
              <circle cx="74" cy="60" r="4" fill={C.blush} opacity="0.35" />
              <circle cx="51.5" cy="51.5" r="1.5" fill={C.ink} />
              <circle cx="68.5" cy="51.5" r="1.5" fill={C.ink} />
              <path d="M46 42.5 Q51.5 40 57 42.5 M63 42.5 Q68.5 40 74 42.5" stroke={C.ink} strokeWidth="1.3" fill="none" strokeLinecap="round" />
              <motion.path
                d={SMILE}
                fill={C.lip}
                stroke={C.lip}
                strokeWidth="1.4"
                strokeLinejoin="round"
                style={{ originX: '60px', originY: '63px' }}
                animate={laugh ? { scaleY: [1, 2.4, 1, 2.1, 1] } : undefined}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </>
          )}
          <g fill="rgba(255,255,255,0.16)" stroke={silhouette ? 'rgba(255,255,255,0.6)' : C.frame} strokeWidth="1.5">
            <circle cx="51.5" cy="51" r="7.2" />
            <circle cx="68.5" cy="51" r="7.2" />
            <path d="M58.7 50.5 Q60 49.3 61.3 50.5" fill="none" />
            <path d="M44.3 50 L40.5 48.8 M75.7 50 L79.5 48.8" fill="none" />
          </g>
        </motion.g>
      </g>
    </svg>
  )
}
