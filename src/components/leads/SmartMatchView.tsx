import { watchImage } from '../../assets'
import { MATCH_PROMOS, TRENDING, type Lead } from '../../data/leads'
import { Icon } from '../Icon'
import { SparkleHeading } from '../ui'
import { Carousel } from './Carousel'

function PromoCard({
  eyebrow,
  headline,
  image,
  index,
  onView,
}: {
  eyebrow: string
  headline: string
  image: string
  index: number
  onView: () => void
}) {
  return (
    <article
      className="card-hover group animate-fade-up relative flex h-[185px] w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-[24px] p-6 sm:w-[359px]"
      style={{
        animationDelay: `${index * 70}ms`,
        backgroundImage:
          'linear-gradient(69deg, rgb(109, 63, 211) 3%, rgb(147, 131, 183) 96%)',
      }}
    >
      {/* Light sweep on hover */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-soft group-hover:translate-x-full" />
      <img
        src={watchImage(image)}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute -top-1.5 right-0 h-[207px] w-auto object-contain drop-shadow-lg transition-transform duration-500 ease-soft group-hover:scale-105"
      />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex flex-col gap-2.5">
          <p className="text-[14px] text-white/90">{eyebrow}</p>
          <p className="max-w-[221px] text-[18px] leading-tight font-medium text-white">
            {headline}
          </p>
        </div>
        <button
          type="button"
          onClick={onView}
          className="w-fit rounded-full bg-white px-6 py-3 text-[12px] font-medium text-[#212121] hover:shadow-[0_6px_20px_-6px_rgba(255,255,255,0.8)]"
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
            index={i}
            eyebrow={promo.eyebrow}
            headline={promo.headline}
            image={promo.image}
            onView={() => onOpen(leads[i % leads.length])}
          />
        ))}
      </Carousel>

      <Carousel
        heading={
          <h2 className="text-[18px] font-medium tracking-tight text-fg">
            Most Trending Watch
          </h2>
        }
      >
        {TRENDING.map((w, i) => (
          <article
            key={w.id}
            className="card-hover group animate-fade-up flex w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-[24px] border border-line bg-card sm:w-[320px]"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="p-4 pb-2">
              <div className="flex items-center gap-1.5 text-[12px] text-fg-mute">
                <span>{w.ref}</span>
                <span className="h-1 w-1 rounded-full bg-fg-mute" />
                <span>{w.brand}</span>
                <span className="h-1 w-1 rounded-full bg-fg-mute" />
                <span>{w.releaseYear}</span>
              </div>
              <h3 className="mt-2.5 truncate text-[14px] font-medium text-fg transition-colors group-hover:text-white">
                {w.title}
              </h3>
            </div>
            <div className="relative border-y border-line-strong p-1 backdrop-blur-[10px]">
              <div
                className="relative flex h-[188px] items-center justify-center overflow-hidden rounded-[18px]"
                style={{
                  background:
                    'radial-gradient(120% 60% at 25% 55%, rgba(255,255,255,0.08) 0%, rgba(130,132,136,0.04) 60%, rgba(5,8,16,0) 100%)',
                }}
              >
                <img
                  src={watchImage(w.image)}
                  alt={`${w.brand} ${w.title}`}
                  loading="lazy"
                  className="h-[140px] w-auto object-contain transition-transform duration-500 ease-soft group-hover:scale-110"
                />
                <button
                  type="button"
                  onClick={() => onOpen(leads[i % leads.length])}
                  aria-label={`Open ${w.title}`}
                  className="absolute top-1 right-1 grid h-8 w-8 place-items-center rounded-full border-[0.5px] border-white/15 bg-card text-fg-dim hover:border-brand/60 hover:bg-brand/20 hover:text-fg"
                >
                  <Icon
                    name="chevronRight"
                    size={12}
                    className="transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
                  />
                </button>
              </div>
            </div>
          </article>
        ))}
      </Carousel>

      <p className="text-[18px] font-medium text-fg">
        Details of most listed watches past 30 days
      </p>
    </div>
  )
}
