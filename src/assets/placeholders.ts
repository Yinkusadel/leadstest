/**
 * Generated stand-ins used until the real artwork lands in `src/assets/`.
 * Nothing outside `src/assets/index.ts` should import from this file — swapping
 * in real files is a one-file change there.
 */

const svg = (markup: string) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`

export type MetalTone = 'steel' | 'gold' | 'rose'

const METALS: Record<MetalTone, [string, string, string]> = {
  steel: ['#e8ebef', '#9aa2ad', '#5d646f'],
  gold: ['#f6dfa4', '#d3ab55', '#8f6f28'],
  rose: ['#f4cdb4', '#d09a78', '#8d5f43'],
}

/**
 * A chronograph-ish wristwatch on a bracelet. Deliberately generic — it reads as
 * "watch photo not loaded yet" without pretending to be a specific reference.
 */
export function watchPlaceholder(
  dial = '#111318',
  metal: MetalTone = 'steel',
  seed = 0,
): string {
  const [light, mid, dark] = METALS[metal]
  const id = `w${seed}`
  const link = (y: number, w: number, h: number) =>
    `<rect x="${100 - w / 2}" y="${y}" width="${w}" height="${h}" rx="5" fill="url(#${id}b)" stroke="${dark}" stroke-width="0.6"/>`

  return svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" fill="none">
  <defs>
    <linearGradient id="${id}b" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${dark}"/><stop offset=".28" stop-color="${light}"/>
      <stop offset=".52" stop-color="${mid}"/><stop offset=".78" stop-color="${light}"/>
      <stop offset="1" stop-color="${dark}"/>
    </linearGradient>
    <linearGradient id="${id}c" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${light}"/><stop offset=".45" stop-color="${mid}"/>
      <stop offset="1" stop-color="${dark}"/>
    </linearGradient>
    <radialGradient id="${id}d" cx=".35" cy=".3" r=".85">
      <stop offset="0" stop-color="${dial}" stop-opacity=".55"/>
      <stop offset="1" stop-color="${dial}"/>
    </radialGradient>
  </defs>
  ${[6, 30, 54].map((y) => link(y, 62 - (54 - y) * 0.12, 20)).join('')}
  ${[200, 224, 248].map((y) => link(y, 62 - (y - 200) * 0.12, 20)).join('')}
  <circle cx="100" cy="140" r="58" fill="url(#${id}c)"/>
  <circle cx="100" cy="140" r="49" fill="${dark}" opacity=".55"/>
  <circle cx="100" cy="140" r="46" fill="url(#${id}d)"/>
  <circle cx="100" cy="140" r="46" fill="none" stroke="${light}" stroke-opacity=".35"/>
  ${Array.from({ length: 12 }, (_, i) => {
    const a = (i * 30 * Math.PI) / 180
    const x1 = 100 + Math.sin(a) * 39
    const y1 = 140 - Math.cos(a) * 39
    const x2 = 100 + Math.sin(a) * 33
    const y2 = 140 - Math.cos(a) * 33
    return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${light}" stroke-width="2.2" stroke-linecap="round" opacity=".9"/>`
  }).join('')}
  <circle cx="82" cy="140" r="11" fill="#000" fill-opacity=".22" stroke="${light}" stroke-opacity=".3"/>
  <circle cx="118" cy="140" r="11" fill="#000" fill-opacity=".22" stroke="${light}" stroke-opacity=".3"/>
  <circle cx="100" cy="166" r="11" fill="#000" fill-opacity=".22" stroke="${light}" stroke-opacity=".3"/>
  <line x1="100" y1="140" x2="100" y2="110" stroke="${light}" stroke-width="3.2" stroke-linecap="round"/>
  <line x1="100" y1="140" x2="122" y2="152" stroke="${light}" stroke-width="3.2" stroke-linecap="round"/>
  <circle cx="100" cy="140" r="3.4" fill="${light}"/>
  <rect x="156" y="132" width="7" height="16" rx="2.5" fill="url(#${id}c)"/>
</svg>`)
}

/** Circular avatar carrying the person's initials. */
export function avatarPlaceholder(name: string): string {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  const hue = [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % 360
  return svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
  <rect width="40" height="40" rx="20" fill="hsl(${hue} 45% 32%)"/>
  <text x="20" y="26" font-family="Inter, system-ui, sans-serif" font-size="15"
    font-weight="600" fill="#fff" text-anchor="middle">${initials}</text>
</svg>`)
}
