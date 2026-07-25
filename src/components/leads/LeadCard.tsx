import { avatar, watchImage } from '../../assets'
import type { Lead } from '../../data/leads'
import { Icon } from '../Icon'

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-line-soft py-2.5 text-[13px] first:border-t-0">
      <span className="text-fg-mute">{label}</span>
      <span className="truncate text-fg">{value}</span>
    </div>
  )
}

export function LeadCard({
  lead,
  onOpen,
  /** Position in the grid, used to stagger the entrance. */
  index = 0,
}: {
  lead: Lead
  onOpen: (lead: Lead) => void
  index?: number
}) {
  return (
    <article
      className="card-hover group animate-fade-up flex flex-col rounded-2xl border border-line bg-card p-4"
      style={{ animationDelay: `${Math.min(index, 11) * 55}ms` }}
    >
      <p className="text-[11px] tracking-wide text-fg-mute">
        {lead.ref} <span className="px-1">•</span> {lead.brand}
        <span className="px-1">•</span> {lead.releaseYear}
      </p>
      <h3 className="mt-1 text-[17px] font-semibold tracking-tight text-fg transition-colors group-hover:text-white">
        {lead.title}
      </h3>

      <div className="relative mt-3 grid place-items-center overflow-hidden rounded-xl bg-linear-to-b from-white/[0.03] to-transparent py-3">
        <img
          src={watchImage(lead.image)}
          alt={`${lead.brand} ${lead.title}`}
          loading="lazy"
          className="h-40 w-auto object-contain transition-transform duration-500 ease-soft group-hover:scale-[1.07] sm:h-44"
        />
        <button
          type="button"
          onClick={() => onOpen(lead)}
          aria-label={`Open ${lead.title} lead`}
          className="absolute top-1 right-1 grid h-8 w-8 place-items-center rounded-full border border-line bg-raised text-fg-dim hover:border-brand/60 hover:bg-brand/20 hover:text-fg"
        >
          <Icon
            name="chevronRight"
            size={15}
            className="transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
          />
        </button>
      </div>

      <div className="mt-3">
        <SpecRow label="Year" value={lead.year} />
        <SpecRow label="Condition" value={lead.condition} />
        <SpecRow label="Listing Date" value={lead.listingDate} />
      </div>

      <div className="mt-3 flex items-center gap-2 border-t border-line-soft pt-3">
        <img
          src={avatar(lead.sender.name)}
          alt=""
          className="h-6 w-6 shrink-0 rounded-full transition-transform duration-300 ease-soft group-hover:scale-110"
        />
        <span className="truncate text-[13px] text-fg-dim">{lead.sender.name}</span>
      </div>

      <div className="mt-2.5 flex items-center gap-2 rounded-xl border border-line-soft bg-raised px-2.5 py-2 transition-colors duration-300 group-hover:border-line">
        <span aria-hidden className="shrink-0 text-xs">
          {lead.sender.flag}
        </span>
        <p className="min-w-0 flex-1 truncate text-[11px] text-fg-mute">
          {lead.message}
        </p>
        <button
          type="button"
          onClick={() => onOpen(lead)}
          className="shrink-0 text-[11px] text-fg-dim underline-offset-2 hover:text-fg hover:underline"
        >
          Read more...
        </button>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(lead.title)}`}
          target="_blank"
          rel="noreferrer"
          aria-label={`Message ${lead.sender.name} on WhatsApp`}
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-wa text-black/85 transition-[transform,box-shadow] duration-300 ease-back hover:scale-110 hover:shadow-[0_0_16px_-2px_rgba(37,211,102,0.7)] active:scale-95"
        >
          <Icon name="whatsapp" size={16} />
        </a>
      </div>
    </article>
  )
}
