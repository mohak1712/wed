import { useState } from 'react'
import { assetUrl } from '../lib/assets'

// Tries /assets/<name>.webp, then .png, then .jpg. If none exist, renders the placeholder (children).
// To hide a placeholder layer on purpose, upload a fully transparent PNG with that name.
const EXTENSIONS = ['webp', 'png', 'jpg']

export default function Art({ name, alt = '', fit = 'cover', className = '', children }) {
  const [attempt, setAttempt] = useState(0)

  if (attempt >= EXTENSIONS.length) {
    return (
      <div className={className} role={alt ? 'img' : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : true}>
        {children}
      </div>
    )
  }

  const fitClass = fit === 'contain' ? 'object-contain object-bottom' : 'object-cover'

  return (
    <div className={className}>
      <img
        src={assetUrl(`assets/${name}.${EXTENSIONS[attempt]}`)}
        alt={alt}
        draggable={false}
        decoding="async"
        className={`h-full w-full select-none ${fitClass}`}
        onError={() => setAttempt((n) => n + 1)}
      />
    </div>
  )
}
