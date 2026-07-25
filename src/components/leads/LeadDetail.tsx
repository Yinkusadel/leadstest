import { useMemo, useState } from 'react'
import { watchImage } from '../../assets'
import {
  SPEC_LABELS,
  SPEC_OPTIONS,
  type Lead,
  type WatchSpec,
} from '../../data/leads'
import { Icon } from '../Icon'
import { IconButton, SparkleHeading } from '../ui'
import { Select } from '../ui'
import { Carousel } from './Carousel'
import { MatchGauge } from './MatchGauge'
import { MessagePanel } from './MessagePanel'

function CardHead({ lead }: { lead: Lead }) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-3 text-[11px] text-fg-mute">
        <span className="truncate">
          {lead.brand} <span className="px-1">•</span> {lead.ref}
        </span>
        <span>{lead.releaseYear}</span>
      </div>
      <h3 className="mt-1 text-[17px] font-semibold tracking-tight text-fg">
        {lead.title}
      </h3>
    </>
  )
}

/** Editable specs parsed out of the group message. */
function DetectedSpecs({
  lead,
  spec,
  onChange,
}: {
  lead: Lead
  spec: WatchSpec
  onChange: (next: WatchSpec) => void
}) {
  return (
    <div className="animate-fade-up rounded-2xl border border-line bg-card p-4">
      <CardHead lead={lead} />
      <div className="mt-2">
        {SPEC_LABELS.map(({ key, label }) => {
          const detected = spec[key]
          const dot =
            detected === 'N/A'
              ? 'neutral'
              : detected === lead.yours[key]
                ? 'match'
                : 'mismatch'
          return (
            <div
              key={key}
              className="flex items-center justify-between gap-2 border-t border-line-soft py-1.5 first:border-t-0"
            >
              <span className="flex items-center gap-2 truncate text-[13px] text-fg-mute">
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                    dot === 'match'
                      ? 'bg-emerald-400'
                      : dot === 'mismatch'
                        ? 'bg-gold'
                        : 'bg-fg-mute'
                  }`}
                />
                {label}
              </span>
              <Select
                className="w-[52%] max-w-44"
                value={detected}
                options={
                  SPEC_OPTIONS[key].includes(detected)
                    ? SPEC_OPTIONS[key]
                    : [detected, ...SPEC_OPTIONS[key]]
                }
                onChange={(v) => onChange({ ...spec, [key]: v })}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

/** Read-only mirror of the same fields, taken from your own stock record. */
function YourSpecs({ lead }: { lead: Lead }) {
  return (
    <div
      className="animate-fade-up rounded-2xl border border-line bg-card p-4"
      style={{ animationDelay: '80ms' }}
    >
      <CardHead lead={lead} />
      <div className="mt-2">
        {SPEC_LABELS.map(({ key, label }) => (
          <div
            key={key}
            className="flex items-center justify-between gap-3 border-t border-line-soft py-2 first:border-t-0"
          >
            <span className="truncate text-[13px] text-fg-mute">{label}</span>
            <span className="truncate text-[13px] text-fg">{lead.yours[key]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Callers must pass `key={lead.id}` — the spec edits and carousel position are
 *  seeded from the lead, so a new lead needs a fresh mount. */
export function LeadDetail({
  lead,
  leads,
  onOpen,
  onDecision,
  onSend,
}: {
  lead: Lead
  leads: Lead[]
  onOpen: (lead: Lead) => void
  onDecision: (lead: Lead, decision: 'match' | 'reject') => void
  onSend: (message: string) => void
}) {
  const [spec, setSpec] = useState<WatchSpec>(lead.detected)
  const [slide, setSlide] = useState(0)

  const similar = useMemo(
    () => leads.filter((l) => l.id !== lead.id).slice(0, 4),
    [leads, lead.id],
  )

  const total = lead.gallery.length
  const step = (dir: -1 | 1) => setSlide((s) => (s + dir + total) % total)

  return (
    <div className="space-y-8">
      <div className="grid gap-4 xl:grid-cols-[1.9fr_1.1fr]">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <DetectedSpecs lead={lead} spec={spec} onChange={setSpec} />
              <YourSpecs lead={lead} />
            </div>

            <div className="space-y-4">
              <div
                className="group animate-fade-up flex flex-col items-center overflow-hidden rounded-2xl border border-line bg-card p-4"
                style={{ animationDelay: '40ms' }}
              >
                <span className="rounded-full border border-line bg-raised px-3 py-1 text-[12px] text-fg-dim">
                  Detected from group
                </span>
                <img
                  src={watchImage(lead.image)}
                  alt={`${lead.title} as detected in the group message`}
                  className="my-3 h-48 w-auto object-contain transition-transform duration-500 ease-soft group-hover:scale-105 sm:h-56"
                />
                <MatchGauge value={lead.matchPercent} />
              </div>

              <div
                className="group animate-fade-up flex flex-col items-center rounded-2xl border border-line bg-card p-4"
                style={{ animationDelay: '120ms' }}
              >
                <span className="rounded-full border border-line bg-raised px-3 py-1 text-[12px] text-fg-dim">
                  Your watch
                </span>
                <img
                  key={slide}
                  src={watchImage(lead.gallery[slide])}
                  alt={`Your ${lead.title}, image ${slide + 1} of ${total}`}
                  className="animate-pop my-3 h-48 w-auto object-contain transition-transform duration-500 ease-soft group-hover:scale-105 sm:h-56"
                />
                <div className="flex items-center gap-4">
                  <IconButton
                    icon="chevronLeft"
                    label="Previous image"
                    size={13}
                    onClick={() => step(-1)}
                    className="h-7 w-7"
                  />
                  <span className="text-[12px] tabular-nums text-fg-dim">
                    {slide + 1}/{total}
                  </span>
                  <IconButton
                    icon="chevronRight"
                    label="Next image"
                    size={13}
                    onClick={() => step(1)}
                    className="h-7 w-7"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className="animate-fade-up flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: '180ms' }}
          >
            <button
              type="button"
              onClick={() => onDecision(lead, 'reject')}
              className="rounded-full border border-line bg-card px-6 py-3 text-[13px] font-medium text-fg-dim hover:border-fg-mute hover:text-fg sm:w-[38%]"
            >
              Not this time...
            </button>
            <button
              type="button"
              onClick={() => onDecision(lead, 'match')}
              className="flex-1 rounded-full bg-white px-6 py-3 text-[13px] font-semibold text-black hover:shadow-[0_10px_30px_-8px_rgba(255,255,255,0.55)]"
            >
              It's a Match
            </button>
          </div>
        </div>

        <MessagePanel key={lead.id} lead={lead} onSend={onSend} />
      </div>

      <Carousel
        heading={
          <SparkleHeading subtitle="Leads that match your inventory (potential sale) / Auto-matched leads with your inventory.">
            {similar.length} Similar Models Found
          </SparkleHeading>
        }
      >
        {similar.map((s, i) => (
          <article
            key={s.id}
            className="card-hover group animate-fade-up flex w-52.5 shrink-0 snap-start flex-col rounded-2xl border border-line bg-card p-3.5 sm:w-60"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-baseline justify-between gap-2 text-[11px] text-fg-mute">
              <span className="truncate">
                {s.brand} <span className="px-1">•</span> {s.ref}
              </span>
              <span>{s.releaseYear}</span>
            </div>
            <h3 className="mt-1 truncate text-sm font-semibold text-fg transition-colors group-hover:text-white">
              {s.title}
            </h3>
            <div className="relative mt-3 grid place-items-center overflow-hidden rounded-xl">
              <img
                src={watchImage(s.image)}
                alt={`${s.brand} ${s.title}`}
                loading="lazy"
                className="h-36 w-auto object-contain transition-transform duration-500 ease-soft group-hover:scale-110"
              />
              <button
                type="button"
                onClick={() => onOpen(s)}
                aria-label={`Open ${s.title}`}
                className="absolute top-0 right-0 grid h-7 w-7 place-items-center rounded-full border border-line bg-raised text-fg-dim hover:border-brand/60 hover:bg-brand/20 hover:text-fg"
              >
                <Icon
                  name="chevronRight"
                  size={13}
                  className="transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
                />
              </button>
            </div>
          </article>
        ))}
      </Carousel>
    </div>
  )
}
