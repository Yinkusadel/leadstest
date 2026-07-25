import { watchImage } from '../../assets'
import { MATCH_PROMOS, TRENDING, type Lead } from '../../data/leads'
import { Icon } from '../Icon'
import { SparkleHeading } from '../ui'
import { Carousel } from './Carousel'

function PromoCard({
  eyebrow,
  headline,
  image,
  onView,
}: {
  eyebrow: string
  headline: string
  image: string
  onView: () => void
}) {
  return (
    <article className="relative flex w-[248px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-brand via-[#6c4af0] to-brand-deep p-4 sm:w-[268px]">
      <img
        src={watchImage(image)}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute -top-2 -right-6 h-[130%] w-auto opacity-60 mix-blend-luminosity"
      />
      <div className="relative flex h-full flex-col">
        <p className="text-[11px] text-white/70">{eyebrow}</p>
        <p className="mt-1.5 max-w-[70%] text-[15px] leading-snug font-semibold text-white">
          {headline}
        </p>
        <button
          type="button"
          onClick={onView}
          className="mt-5 w-fit rounded-full bg-white/95 px-5 py-1.5 text-[13px] font-medium text-black transition-colors hover:bg-white"
        >
          View
        </button>
      </div>
    </article>
  )
}

export function SmartMatchView({
  leads,
  onOpen,
}: {
  leads: Lead[]
  onOpen: (lead: Lead) => void
}) {
  return (
    <div className="space-y-8">
      <Carousel
        heading={
          <SparkleHeading subtitle="Leads that match your inventory (potential sale) / Auto-matched leads with your inventory.">
            {MATCH_PROMOS.length} Active Matches Found
          </SparkleHeading>
        }
      >
        {MATCH_PROMOS.map((promo, i) => (
          <PromoCard
            key={promo.id}
            eyebrow={promo.eyebrow}
            headline={promo.headline}
            image={promo.image}
            onView={() => onOpen(leads[i % leads.length])}
          />
        ))}
      </Carousel>

      <Carousel
        heading={
          <h2 className="text-base font-semibold tracking-tight text-fg sm:text-lg">
            Most Trending Watch
          </h2>
        }
      >
        {TRENDING.map((w, i) => (
          <article
            key={w.id}
            className="flex w-[210px] shrink-0 snap-start flex-col rounded-2xl border border-line bg-card p-3.5 sm:w-[228px]"
          >
            <p className="truncate text-[11px] text-fg-mute">
              {w.ref} <span className="px-1">•</span> {w.brand}
              <span className="px-1">•</span> {w.releaseYear}
            </p>
            <h3 className="mt-1 truncate text-sm font-semibold text-fg">{w.title}</h3>
            <div className="relative mt-3 grid place-items-center">
              <img
                src={watchImage(w.image)}
                alt={`${w.brand} ${w.title}`}
                loading="lazy"
                className="h-36 w-auto object-contain"
              />
              <button
                type="button"
                onClick={() => onOpen(leads[i % leads.length])}
                aria-label={`Open ${w.title}`}
                className="absolute top-0 right-0 grid h-7 w-7 place-items-center rounded-full border border-line bg-raised text-fg-dim transition-colors hover:border-brand/60 hover:text-fg"
              >
                <Icon name="chevronRight" size={13} />
              </button>
            </div>
          </article>
        ))}
      </Carousel>

      <p className="text-xs text-fg-mute">Details of most listed watches past 30 days</p>
    </div>
  )
}
