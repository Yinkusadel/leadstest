import { watchImage } from '../../assets'
import type { Lead } from '../../data/leads'
import { CountryFlag, WhatsAppMark } from '../BrandIcons'
import { Icon } from '../Icon'

function Dot() {
  return <span className="h-1 w-1 shrink-0 rounded-full bg-fg-mute" />
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-[12px]">
      <span className="text-fg-mute">{label}</span>
      <span className="truncate font-medium text-fg">{value}</span>
    </div>
  )
}

export function LeadCard({
  lead,
  onOpen,
  index = 0,
}: {
  lead: Lead
  onOpen: (lead: Lead) => void
  index?: number
}) {
  return (
    <article
      className="card-hover group animate-fade-up flex min-w-0 flex-col overflow-hidden rounded-[24px] border border-line bg-card"
      style={{ animationDelay: `${Math.min(index, 11) * 55}ms` }}
    >
      {/* Header */}
      <div className="p-4 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-[12px] text-fg-mute">{lead.ref}</span>
          <Dot />
          <span className="text-[12px] text-fg-mute">{lead.brand}</span>
          <Dot />
          <span className="text-[12px] text-fg-mute">{lead.releaseYear}</span>
        </div>
        <h3 className="mt-2.5 text-[14px] font-medium text-fg transition-colors group-hover:text-white">
          {lead.title}
        </h3>
      </div>

      {/* Image well — inner card with a radial highlight, top+bottom hairlines */}
      <div className="relative border-y border-line-strong p-1 backdrop-blur-[10px]">
        <div
          className="relative flex h-[188px] items-center justify-center overflow-hidden rounded-[18px]"
          style={{
            background:
              'radial-gradient(120% 60% at 25% 55%, rgba(255,255,255,0.08) 0%, rgba(130,132,136,0.04) 60%, rgba(5,8,16,0) 100%)',
          }}
        >
          <img
            src={watchImage(lead.image)}
            alt={`${lead.brand} ${lead.title}`}
            loading="lazy"
            className="h-[140px] w-auto object-contain transition-transform duration-500 ease-soft group-hover:scale-[1.07]"
          />
          <button
            type="button"
            onClick={() => onOpen(lead)}
            aria-label={`Open ${lead.title} lead`}
            className="absolute top-1 right-1 grid h-8 w-8 place-items-center rounded-full border-[0.5px] border-white/15 bg-card text-fg-dim hover:border-brand/60 hover:bg-brand/25 hover:text-fg"
          >
            <Icon
              name="chevronRight"
              size={12}
              className="transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </div>

      {/* Specs */}
      <div className="flex flex-col gap-5 p-4">
        <SpecRow label="Year:" value={lead.year} />
        <SpecRow label="Condition" value={lead.condition} />
        <SpecRow label="Listing Date" value={lead.listingDate} />
      </div>

      {/* Footer bar */}
      <div className="mt-auto flex items-start justify-between gap-2 rounded-[18px] border-t border-line-strong bg-raised py-2 pr-1 pl-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-[0.5px] border-white/15 bg-card">
            <CountryFlag emoji={lead.sender.flag} size={16} />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="truncate text-[12px] font-medium text-fg">
              {lead.sender.name}
            </span>
            <div className="flex min-w-0 items-center gap-1">
              <Icon name="message" size={12} className="shrink-0 text-fg-mute" />
              <p className="min-w-0 flex-1 truncate text-[12px] text-fg-mute">
                {lead.message}
              </p>
              <button
                type="button"
                onClick={() => onOpen(lead)}
                className="shrink-0 text-[12px] whitespace-nowrap text-fg underline-offset-2 hover:underline"
              >
                Read more ...
              </button>
            </div>
          </div>
        </div>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(lead.title)}`}
          target="_blank"
          rel="noreferrer"
          aria-label={`Message ${lead.sender.name} on WhatsApp`}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-[0.5px] border-white/15 bg-card transition-[transform,box-shadow] duration-300 ease-back hover:scale-105 hover:border-wa/50 hover:shadow-[0_0_16px_-2px_rgba(37,211,102,0.7)] active:scale-95"
        >
          <WhatsAppMark size={16} />
        </a>
      </div>
    </article>
  )
}
