import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { Icon, type IconName } from './Icon'

/* ─────────────────────────── Segmented tabs ─────────────────────────── */

export type Segment<T extends string> = {
  value: T
  label: string
  icon?: IconName
}

export function SegmentedTabs<T extends string>({
  segments,
  value,
  onChange,
  label,
}: {
  segments: Segment<T>[]
  value: T
  onChange: (v: T) => void
  label: string
}) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className="no-scrollbar flex items-center gap-1.5 overflow-x-auto"
    >
      {segments.map((s) => {
        const active = s.value === value
        return (
          <button
            key={s.value}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(s.value)}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors ${
              active
                ? 'border-line bg-raised text-fg'
                : 'border-transparent text-fg-mute hover:bg-card hover:text-fg-dim'
            }`}
          >
            {s.icon && <Icon name={s.icon} size={15} />}
            {s.label}
          </button>
        )
      })}
    </div>
  )
}

/* ───────────────────────────── Toggle ───────────────────────────────── */

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`flex shrink-0 items-center gap-2.5 rounded-full border py-1.5 pr-3.5 pl-1.5 text-[13px] font-medium transition-colors ${
        checked
          ? 'border-brand/50 bg-brand/15 text-fg'
          : 'border-line bg-card text-fg-mute hover:text-fg-dim'
      }`}
    >
      <span
        className={`relative h-[18px] w-[18px] rounded-full transition-colors ${
          checked ? 'bg-brand' : 'bg-line'
        }`}
      >
        <span
          className={`absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors ${
            checked ? 'bg-white' : 'bg-fg-mute'
          }`}
        />
      </span>
      {label}
    </button>
  )
}

/* ───────────────────────────── Select ───────────────────────────────── */

/** Closes the popover on outside pointer-down and on Escape. */
function useDismiss(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) close()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close])

  return ref
}

export function Select({
  value,
  options,
  onChange,
  align = 'right',
  dot,
  className = '',
}: {
  value: string
  options: string[]
  onChange: (v: string) => void
  align?: 'left' | 'right'
  /** Optional status pip rendered before the value. */
  dot?: 'match' | 'mismatch' | 'neutral'
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useDismiss(open, () => setOpen(false))
  const id = useId()

  const dotColor =
    dot === 'match'
      ? 'bg-emerald-400'
      : dot === 'mismatch'
        ? 'bg-gold'
        : 'bg-fg-mute'

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-[13px] text-fg transition-colors hover:bg-white/5"
      >
        <span className="flex min-w-0 items-center gap-2">
          {dot && <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotColor}`} />}
          <span className="truncate">{value}</span>
        </span>
        <Icon
          name="chevronDown"
          size={13}
          className={`shrink-0 text-fg-mute transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          id={id}
          role="listbox"
          className={`absolute top-[calc(100%+4px)] z-30 max-h-56 min-w-[10rem] overflow-y-auto rounded-xl border border-line bg-raised p-1 shadow-2xl shadow-black/60 thin-scrollbar ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {options.map((o) => (
            <li key={o}>
              <button
                type="button"
                role="option"
                aria-selected={o === value}
                onClick={() => {
                  onChange(o)
                  setOpen(false)
                }}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-1.5 text-left text-[13px] transition-colors ${
                  o === value ? 'bg-brand/15 text-fg' : 'text-fg-dim hover:bg-white/5'
                }`}
              >
                <span className="truncate">{o}</span>
                {o === value && <Icon name="check" size={13} className="text-brand-soft" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/* ─────────────────────────── Search field ───────────────────────────── */

export function SearchField({
  value,
  onChange,
  placeholder,
  icon = 'search',
  className = '',
  children,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  icon?: IconName
  className?: string
  /** Trailing controls rendered inside the field. */
  children?: ReactNode
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-full border border-line bg-card px-4 py-2.5 focus-within:border-line/80 ${className}`}
    >
      <Icon name={icon} size={17} className="shrink-0 text-fg-mute" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="min-w-0 flex-1 bg-transparent text-[13px] text-fg outline-none placeholder:text-fg-mute"
      />
      {children}
    </div>
  )
}

/* ────────────────────────── Icon button ─────────────────────────────── */

export function IconButton({
  icon,
  label,
  onClick,
  size = 18,
  disabled,
  className = '',
}: {
  icon: IconName
  label: string
  onClick?: () => void
  size?: number
  disabled?: boolean
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-card text-fg-dim transition-colors hover:text-fg disabled:opacity-35 disabled:hover:text-fg-dim ${className}`}
    >
      <Icon name={icon} size={size} />
    </button>
  )
}

/* ─────────────────────────── Filter menu ───────────────────────────── */

export function FilterMenu({
  groups,
  selected,
  onToggle,
  onClear,
}: {
  groups: Array<{ label: string; options: string[] }>
  selected: string[]
  onToggle: (option: string) => void
  onClear: () => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useDismiss(open, () => setOpen(false))

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors ${
          selected.length
            ? 'border-brand/50 bg-brand/15 text-fg'
            : 'border-line bg-card text-fg-mute hover:text-fg-dim'
        }`}
      >
        <Icon name="filter" size={15} />
        Filter By
        {selected.length > 0 && (
          <span className="rounded-full bg-brand px-1.5 text-[11px] text-white">
            {selected.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute top-[calc(100%+8px)] right-0 z-40 w-64 rounded-2xl border border-line bg-raised p-3 shadow-2xl shadow-black/60">
          {groups.map((g) => (
            <div key={g.label} className="mb-3 last:mb-0">
              <p className="mb-1.5 text-[11px] tracking-wide text-fg-mute uppercase">
                {g.label}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {g.options.map((o) => {
                  const on = selected.includes(o)
                  return (
                    <button
                      key={o}
                      type="button"
                      aria-pressed={on}
                      onClick={() => onToggle(o)}
                      className={`rounded-full border px-2.5 py-1 text-[12px] transition-colors ${
                        on
                          ? 'border-brand/50 bg-brand/20 text-fg'
                          : 'border-line bg-card text-fg-dim hover:text-fg'
                      }`}
                    >
                      {o}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={onClear}
            disabled={!selected.length}
            className="mt-1 w-full rounded-lg border border-line py-1.5 text-[12px] text-fg-dim transition-colors hover:text-fg disabled:opacity-40"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}

/* ───────────────────────── Section heading ──────────────────────────── */

export function SparkleHeading({
  children,
  subtitle,
}: {
  children: ReactNode
  subtitle?: string
}) {
  return (
    <div className="space-y-1">
      <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight text-fg sm:text-2xl">
        <Icon name="sparkle" size={20} className="text-brand-soft" />
        {children}
      </h2>
      {subtitle && <p className="text-xs text-fg-mute">{subtitle}</p>}
    </div>
  )
}
