import { useEffect, useMemo, useState } from 'react'
import { Icon } from '../components/Icon'
import { LeadCard } from '../components/leads/LeadCard'
import { LeadDetail } from '../components/leads/LeadDetail'
import { SmartMatchView } from '../components/leads/SmartMatchView'
import {
  FilterMenu,
  SearchField,
  SegmentedTabs,
  Toggle,
  type Segment,
} from '../components/ui'
import { InStockIcon } from '../components/TabIcons'
import { FILTER_GROUPS, LEADS, type Lead } from '../data/leads'

type BucketTab = 'in-stock' | 'consignment' | 'all'

const TABS: Segment<BucketTab>[] = [
  { value: 'in-stock', label: 'In Stock', icon: InStockIcon },
  { value: 'consignment', label: 'In Consignment', icon: 'orders' },
  { value: 'all', label: 'All Leads', icon: 'listings' },
]

const TAB_TITLES: Record<BucketTab, string> = {
  'in-stock': 'In Stock',
  consignment: 'In Consignment',
  all: 'All Leads',
}

const MATCH_RANGES: Record<string, (p: number) => boolean> = {
  'Above 90%': (p) => p > 90,
  '70 – 90%': (p) => p >= 70 && p <= 90,
  'Below 70%': (p) => p < 70,
}

const BRANDS = FILTER_GROUPS[0].options
const CONDITIONS = FILTER_GROUPS[1].options

export function LeadsPage({
  /** Called when Back is pressed with no lead open — leaves the Leads section. */
  onExit,
}: {
  onExit?: () => void
}) {
  const [tab, setTab] = useState<BucketTab>('in-stock')
  const [query, setQuery] = useState('')
  const [smartMatch, setSmartMatch] = useState(true)
  const [filters, setFilters] = useState<string[]>([])
  const [selected, setSelected] = useState<Lead | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(t)
  }, [toast])

  const leads = useMemo(() => {
    const q = query.trim().toLowerCase()
    const brands = filters.filter((f) => BRANDS.includes(f))
    const conditions = filters.filter((f) => CONDITIONS.includes(f))
    const ranges = filters.filter((f) => f in MATCH_RANGES)

    return LEADS.filter((l) => {
      if (tab !== 'all' && l.bucket !== tab) return false
      if (q && !`${l.title} ${l.brand} ${l.ref} ${l.message}`.toLowerCase().includes(q))
        return false
      if (brands.length && !brands.includes(l.brand)) return false
      if (conditions.length && !conditions.includes(l.condition)) return false
      if (ranges.length && !ranges.some((r) => MATCH_RANGES[r](l.matchPercent)))
        return false
      return true
    })
  }, [tab, query, filters])

  const open = (lead: Lead) => {
    setSelected(lead)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const decide = (lead: Lead, decision: 'match' | 'reject') => {
    setToast(
      decision === 'match'
        ? `Matched ${lead.title} with your stock — reply drafted.`
        : `Dismissed ${lead.title}. We'll stop surfacing this lead.`,
    )
    setSelected(null)
  }

  return (
    <div className="mx-auto w-full max-w-375 px-4 py-5 sm:px-6 lg:py-6">
      {/* Page header */}
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => (selected ? setSelected(null) : onExit?.())}
          aria-label={selected ? 'Back to leads list' : 'Back'}
          className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-raised text-fg hover:border-brand/50 hover:bg-brand/15"
        >
          <Icon name="chevronLeft" size={16} />
        </button>
        <div className="min-w-0">
          <h1 className="text-lg font-semibold tracking-tight text-fg sm:text-xl">
            {TAB_TITLES[tab]}
          </h1>
          <p className="mt-0.5 text-[11px] text-fg-mute sm:text-xs">
            Leads that match your inventory (potential sale) / Auto-matched leads with
            your inventory.
          </p>
        </div>
      </div>

      {/* Bucket tabs — hidden in the detail view, which is scoped to one lead */}
      {!selected && (
        <div className="mt-5">
          <SegmentedTabs
            label="Lead source"
            segments={TABS}
            value={tab}
            onChange={setTab}
          />
        </div>
      )}

      {/* Search + controls */}
      <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center">
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Quick search for products..."
          icon="wand"
          className="min-w-0 flex-1"
        />
        <div className="flex items-center justify-end gap-2.5">
          <FilterMenu
            groups={FILTER_GROUPS}
            selected={filters}
            onToggle={(o) =>
              setFilters((f) => (f.includes(o) ? f.filter((x) => x !== o) : [...f, o]))
            }
            onClear={() => setFilters([])}
          />
          <Toggle checked={smartMatch} onChange={setSmartMatch} label="Smart Match" />
        </div>
      </div>

      {/* Keyed so switching view replays the entrance animation */}
      <div
        key={selected ? `detail-${selected.id}` : smartMatch ? 'smart' : 'list'}
        className="animate-fade-up mt-6"
      >
        {selected ? (
          <LeadDetail
            key={selected.id}
            lead={selected}
            leads={LEADS}
            onOpen={open}
            onDecision={decide}
            onSend={() => setToast(`Reply sent to ${selected.sender.company}.`)}
          />
        ) : smartMatch ? (
          <SmartMatchView leads={leads.length ? leads : LEADS} onOpen={open} />
        ) : (
          <>
            <p className="mb-4 text-xs text-fg-mute">
              {leads.length} {leads.length === 1 ? 'Listing' : 'Listings'} found
            </p>
            {leads.length ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {leads.map((lead, i) => (
                  <LeadCard key={lead.id} index={i} lead={lead} onOpen={open} />
                ))}
              </div>
            ) : (
              <div className="animate-pop rounded-2xl border border-dashed border-line py-16 text-center">
                <p className="text-sm text-fg-dim">No leads match those filters.</p>
                <button
                  type="button"
                  onClick={() => {
                    setFilters([])
                    setQuery('')
                  }}
                  className="mt-3 rounded-full border border-line px-4 py-1.5 text-[13px] text-fg-dim hover:text-fg"
                >
                  Reset filters
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {toast && (
        <div
          role="status"
          className="animate-rise fixed inset-x-4 bottom-5 z-50 mx-auto w-fit max-w-[92vw] rounded-full border border-brand/40 bg-raised px-5 py-2.5 text-center text-[13px] text-fg shadow-[0_10px_40px_-10px_rgba(124,92,255,0.6)]"
        >
          {toast}
        </div>
      )}
    </div>
  )
}
