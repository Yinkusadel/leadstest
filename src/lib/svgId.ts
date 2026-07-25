import { useId } from 'react'

/**
 * A DOM-unique id prefix for SVG `url(#…)` references.
 *
 * Hardcoded ids collide when a component renders more than once — the browser
 * resolves the reference to whichever element comes first in document order,
 * so the second instance silently borrows (or loses) the first's clip path,
 * gradient or filter. `useId` output contains colons, which break `url(#…)`
 * parsing, so they're stripped.
 */
export function useSvgId(prefix: string): string {
  return `${prefix}${useId().replace(/:/g, '')}`
}
