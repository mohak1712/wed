// Everything you are likely to edit lives here: names, story text, and event details.

export const couple = {
  groom: 'Mohak',
  bride: 'Krishika',
  hashtag: '#MohgyiKrish',
}

// Set a flag to true once you upload ONE finished painting that already contains the couple
// (so the animated placeholder/cut-out characters are hidden for that chapter).
export const flags = {
  ch1FullScene: false,
  ch2FullScene: false,
  ch4FullScene: false,
}

export const story = {
  ch1: {
    tag: 'One spring evening',
    lines: ['Some stories begin unexpectedly…', 'Ours began one spring evening.'],
  },
  ch2: {
    tag: 'Two different worlds',
    lines: ['Two different worlds.', 'One beautifully unexpected story.'],
  },
  ch3: {
    tag: 'Little moments',
    lines: ['Some places become memories.', 'And some memories become forever.'],
  },
  ch4: {
    tag: 'She talks, he listens',
    lines: [
      'She had a thousand stories to tell.',
      'And he found his favourite place to be — listening.',
    ],
  },
  ch5: {
    tag: 'Falling in love',
    lines: [
      'Somewhere between little moments and endless conversations,',
      'love quietly found its way.',
    ],
  },
  ch6: {
    tag: 'Written in the stars',
    lines: ['Arranged by our families.', 'Destined by God.'],
  },
}

export const polaroids = [
  { id: 'dessert', art: 'polaroid-dessert', caption: 'Sharing dessert', tilt: -4 },
  { id: 'smiling', art: 'polaroid-smiling', caption: 'Smiling together', tilt: 3 },
  { id: 'delhi', art: 'polaroid-delhi', caption: 'Exploring Delhi', tilt: 4 },
  { id: 'sunset', art: 'polaroid-sunset', caption: 'Watching sunsets', tilt: -3 },
]

const mapsLink = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`

// A Google Maps button appears automatically for any event that has a `venue.address`.
// For the others, fill in `venue`, `time` and (optionally) `timeNote` when they are confirmed.
export const events = [
  {
    id: 'sundarkand',
    icon: 'diya',
    title: 'Sundarkand Path',
    iso: '2026-10-31',
    time: '2 PM onwards',
    venue: {
      address: 'A-112/1, Lane No. 5, Paryavaran Complex, New Delhi',
    },
    hostedBy: 'Suman and Shivendra Mehra',
    accent: '#E9A23B',
  },
  {
    id: 'engagement',
    icon: 'rings',
    title: 'Engagement',
    iso: '2026-11-18',
    time: null, // placeholder — e.g. '6 PM onwards'
    venue: null, // placeholder — e.g. { name: 'Venue name', address: 'Full address' }
    accent: '#E39AAB',
  },
  {
    id: 'mehendi',
    icon: 'paisley',
    title: 'Mehendi',
    iso: '2026-11-19',
    time: null,
    venue: null,
    accent: '#6B8666',
  },
  {
    id: 'haldi',
    icon: 'marigold',
    title: 'Haldi & Chooda Ceremony',
    iso: '2026-11-20',
    time: 'Morning',
    timeNote: 'Exact time to be announced',
    venue: null,
    accent: '#E8B230',
  },
  {
    id: 'wedding',
    icon: 'heart',
    title: 'Wedding',
    iso: '2026-11-20',
    time: '7 PM onwards',
    venue: null,
    accent: '#C9A24D',
  },
]

export const weddingIso = '2026-11-20'

// ---- helpers ---------------------------------------------------------------
const fmt = (iso, opts) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', { timeZone: 'UTC', ...opts })

export const dateParts = (iso) => ({
  day: fmt(iso, { day: 'numeric' }),
  month: fmt(iso, { month: 'long' }),
  year: fmt(iso, { year: 'numeric' }),
  weekday: fmt(iso, { weekday: 'long' }),
})

export const mapsUrlFor = (event) =>
  event.venue && event.venue.address ? mapsLink(`${event.venue.name ? event.venue.name + ', ' : ''}${event.venue.address}`) : null
