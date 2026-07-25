import { watchImage } from '../../assets'
import type { Lead } from '../../data/leads'
import { CountryFlag, WhatsAppMark } from '../BrandIcons'
import { Icon } from '../Icon'

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line-soft py-2 text-[11px]">
      <span className="text-fg-mute">{label}</span>
      <span className="truncate font-medium text-fg">{value}</span>
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
      className="card-hover group animate-fade-up flex flex-col rounded-2xl border border-line bg-card p-3"
      style={{ animationDelay: `${Math.min(index, 11) * 55}ms` }}
    >
      <p className="text-[10px] text-fg-mute">
        {lead.ref} <span className="px-0.5">•</span> {lead.brand}
        <span className="px-0.5">•</span> {lead.releaseYear}
      </p>
      <h3 className="mt-0.5 text-[13px] font-medium text-fg transition-colors group-hover:text-white">
        {lead.title}
      </h3>

      <div className="relative mt-2.5 grid place-items-center overflow-hidden rounded-xl bg-raised py-3">
        <img
          src={watchImage(lead.image)}
          alt={`${lead.brand} ${lead.title}`}
          loading="lazy"
          className="h-32 w-auto object-contain transition-transform duration-500 ease-soft group-hover:scale-[1.07]"
        />
        <button
          type="button"
          onClick={() => onOpen(lead)}
          aria-label={`Open ${lead.title} lead`}
          className="absolute top-2 right-2 grid h-7 w-7 place-items-center rounded-full border border-line bg-card/90 text-fg-dim hover:border-brand/60 hover:bg-brand/25 hover:text-fg"
        >
          <Icon
            name="chevronRight"
            size={13}
            className="transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
          />
        </button>
      </div>

      <div className="mt-2.5">
        <SpecRow label="Year" value={lead.year} />
        <SpecRow label="Condition" value={lead.condition} />
        <SpecRow label="Listing Date" value={lead.listingDate} />
      </div>

      <div className="mt-2.5 flex items-center gap-2">
        <CountryFlag emoji={lead.sender.flag} size={15} />
        <span className="truncate text-[12px] text-fg">{lead.sender.name}</span>
      </div>

      <div className="mt-2 flex items-center gap-1.5">
        <Icon name="message" size={13} className="shrink-0 text-fg-mute" />
        <p className="min-w-0 flex-1 truncate text-[10px] text-fg-mute">
          {lead.message}
        </p>
        <button
          type="button"
          onClick={() => onOpen(lead)}
          className="shrink-0 text-[10px] whitespace-nowrap text-fg-dim underline-offset-2 hover:text-fg hover:underline"
        >
          Read more ..
        </button>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(lead.title)}`}
          target="_blank"
          rel="noreferrer"
          aria-label={`Message ${lead.sender.name} on WhatsApp`}
          className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-wa transition-[transform,box-shadow] duration-300 ease-back hover:scale-110 hover:shadow-[0_0_16px_-2px_rgba(37,211,102,0.7)] active:scale-95"
        >
          <WhatsAppMark size={13} />
        </a>
      </div>
    </article>
  )
}
