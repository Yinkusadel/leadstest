import { useState } from 'react'
import { DETAIL_FIELDS, type Lead, type LeadDetails } from '../../data/leads'
import { Icon } from '../Icon'
import { SegmentedTabs, Select } from '../ui'

type Tab = 'original' | 'reply'

/** Option lists for the editable detail grid on the Original Message tab. */
const FIELD_OPTIONS: Record<keyof LeadDetails, string[]> = {
  deliverySet: ['Available Now', 'On Request', 'Pre-order', '2 – 3 weeks'],
  currency: ['GBP (£)', 'EUR (€)', 'USD ($)', 'CHF'],
  year: ['2025', '2024', '2023', '2022'],
  price: [],
  month: ['January', 'February', 'March', 'April', 'May', 'June'],
  paymentType: ['Bank Transfer', 'Escrow', 'Cash on Collection', 'Crypto'],
  condition: ['New', 'Unworn', 'Mint', 'Excellent', 'Pre-owned'],
  country: ['United Kingdom', 'Germany', 'Italy', 'Switzerland', 'UAE'],
}

function Party({
  icon,
  name,
  role,
}: {
  icon: 'group' | 'users'
  name: string
  role: string
}) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl border border-line-soft bg-raised px-3 py-2.5">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/5 text-fg-dim">
        <Icon name={icon} size={15} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[13px] text-fg">{name}</span>
        <span className="block text-[11px] text-fg-mute">{role}</span>
      </span>
    </div>
  )
}

/** Callers must pass `key={lead.id}` — every field below is seeded from the
 *  lead, so a new lead needs a fresh mount rather than a reset effect. */
export function MessagePanel({
  lead,
  onSend,
}: {
  lead: Lead
  onSend: (message: string) => void
}) {
  const [tab, setTab] = useState<Tab>('original')
  const [details, setDetails] = useState<LeadDetails>(lead.details)
  const [notes, setNotes] = useState(lead.rawMessage)
  const [draft, setDraft] = useState(lead.autoReply)
  const [prompt, setPrompt] = useState('')

  const regenerate = () => {
    if (!prompt.trim()) return
    setDraft(
      `${lead.autoReply}\n\n— Rewritten with: "${prompt.trim()}"`,
    )
    setPrompt('')
  }

  return (
    <div
      className="animate-fade-up flex flex-col gap-4 rounded-2xl border border-line bg-card p-4"
      style={{ animationDelay: '100ms' }}
    >
      <SegmentedTabs
        label="Message view"
        value={tab}
        onChange={setTab}
        segments={[
          { value: 'original', label: 'Original Message', icon: 'message' },
          { value: 'reply', label: 'Auto Reply', icon: 'reply' },
        ]}
      />

      <div className="flex flex-col gap-2 sm:flex-row">
        <Party icon="group" name={lead.sender.group} role="Group" />
        <Party icon="users" name={lead.sender.company} role="Sender" />
      </div>

      {/* Keyed so each tab switch replays the fade */}
      <div key={tab} className="animate-fade-in flex flex-col gap-4">
      {tab === 'original' ? (
        <>
          <div>
            <p className="mb-2 text-[13px] text-fg-dim">Additional Details</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              aria-label="Additional details"
              className="thin-scrollbar w-full resize-y rounded-xl border border-line-soft bg-raised p-3 text-[13px] leading-relaxed text-fg-dim outline-none focus:border-line"
            />
          </div>

          <div className="layout-anim grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
            {DETAIL_FIELDS.map(({ key, label }) => (
              <div key={key} className="min-w-0">
                <p className="mb-1 text-[11px] text-fg-mute">{label}</p>
                {FIELD_OPTIONS[key].length > 0 ? (
                  <div className="rounded-lg border border-line-soft bg-raised">
                    <Select
                      value={details[key]}
                      options={FIELD_OPTIONS[key]}
                      onChange={(v) => setDetails((d) => ({ ...d, [key]: v }))}
                    />
                  </div>
                ) : (
                  <input
                    value={details[key]}
                    onChange={(e) =>
                      setDetails((d) => ({ ...d, [key]: e.target.value }))
                    }
                    aria-label={label}
                    className="w-full rounded-lg border border-line-soft bg-raised px-2 py-1.75 text-[13px] text-fg outline-none focus:border-line"
                  />
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2.5 rounded-full border border-line-soft bg-raised px-3.5 py-2.5">
            <Icon name="wand" size={16} className="shrink-0 text-brand-soft" />
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && regenerate()}
              placeholder="Ask AI to generate different message..."
              aria-label="Ask AI to generate different message"
              className="min-w-0 flex-1 bg-transparent text-[13px] text-fg outline-none placeholder:text-fg-mute"
            />
            {prompt.trim() && (
              <button
                type="button"
                onClick={regenerate}
                className="shrink-0 text-[12px] font-medium text-brand-soft hover:text-fg"
              >
                Generate
              </button>
            )}
          </div>

          <div>
            <p className="mb-2 text-[13px] text-fg-dim">Additional Details</p>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={14}
              aria-label="Auto reply message"
              className="thin-scrollbar w-full resize-y rounded-xl border border-line-soft bg-raised p-3 text-[13px] leading-relaxed whitespace-pre-wrap text-fg-dim outline-none focus:border-line"
            />
          </div>

          <button
            type="button"
            onClick={() => onSend(draft)}
            className="group flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-black hover:shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)]"
          >
            <Icon
              name="whatsapp"
              size={16}
              className="text-wa transition-transform duration-300 ease-back group-hover:scale-125"
            />
            Send
          </button>
        </>
      )}
      </div>
    </div>
  )
}
