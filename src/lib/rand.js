// Small deterministic pseudo-random helper so placeholder art and petals look the same on every load.
export const rand = (seed) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}
