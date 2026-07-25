import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { IconButton } from '../ui'

/**
 * Horizontally scrollable track. Arrows page by ~90% of the visible width and
 * disable at each end; the track stays swipeable on touch either way.
 */
export function Carousel({
  heading,
  children,
  className = '',
}: {
  heading?: ReactNode
  children: ReactNode
  className?: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const sync = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 2)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    sync()
    el.addEventListener('scroll', sync, { passive: true })
    const ro = new ResizeObserver(sync)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', sync)
      ro.disconnect()
    }
  }, [sync])

  const page = (dir: -1 | 1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: 'smooth' })
  }

  return (
    <section className={className}>
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="min-w-0">{heading}</div>
        <div className="flex shrink-0 items-center gap-2">
          <IconButton
            icon="chevronLeft"
            label="Scroll left"
            size={14}
            disabled={atStart}
            onClick={() => page(-1)}
          />
          <IconButton
            icon="chevronRight"
            label="Scroll right"
            size={14}
            disabled={atEnd}
            onClick={() => page(1)}
          />
        </div>
      </div>
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1"
      >
        {children}
      </div>
    </section>
  )
}
