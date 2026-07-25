/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE SWAP POINT FOR ARTWORK
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every image in the app resolves through this file. To drop in the real
 *  assets: save them under `src/assets/`, import them at the top, and replace
 *  the matching placeholder call below. No other file needs to change.
 *
 *    import logoSrc from './logo.svg'
 *    export const logo = logoSrc
 *
 *    import daytonaBlack from './watches/daytona-black.png'
 *    const WATCHES = { 'daytona-black': daytonaBlack, ... }
 */
import { watchPlaceholder, type MetalTone } from './placeholders'

/** Keys referenced by `src/data/leads.ts` via `Lead.image`. */
const WATCHES: Record<string, string> = {
  'daydate-green-rose': watchPlaceholder('#2f5d43', 'rose', 1),
  'datejust-blue-steel': watchPlaceholder('#16294d', 'steel', 2),
  'datejust-choc-rose': watchPlaceholder('#3a2a1e', 'rose', 3),
  'daytona-black': watchPlaceholder('#14161b', 'steel', 4),
  'daytona-blue': watchPlaceholder('#173154', 'steel', 5),
  'daytona-white': watchPlaceholder('#dfe2e6', 'steel', 6),
  'daytona-green': watchPlaceholder('#2f5d43', 'rose', 7),
  'submariner-black': watchPlaceholder('#0f1114', 'steel', 8),
}

/** Falls back to a neutral steel watch so an unknown key never renders broken. */
export function watchImage(key: string): string {
  return WATCHES[key] ?? watchPlaceholder('#14161b', 'steel', 0)
}

export function customWatch(dial: string, metal: MetalTone = 'steel'): string {
  return watchPlaceholder(dial, metal, 99)
}
