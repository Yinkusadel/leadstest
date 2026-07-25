/** Small arc that fills clockwise to the match percentage. */
function ArcGlyph({ value, size = 15 }: { value: number; size?: number }) {
  const stroke = 2
  const r = (size - stroke) / 2
  const circumference = 2 * Math.PI * r

  return (
    <svg width={size} height={size} className="-rotate-90 shrink-0" aria-hidden>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeOpacity={0.22}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - value / 100)}
        className="transition-[stroke-dashoffset] duration-700 ease-soft"
      />
    </svg>
  )
}

/**
 * Match confidence, shown as a glowing amber pill — a radial gradient bloom
 * behind a dark capsule holding the arc and the figure.
 */
export function MatchGauge({ value }: { value: number }) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className="relative inline-flex" role="img" aria-label={`${clamped}% match`}>
      {/* Amber bloom */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -inset-y-6"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(224,161,68,0.38) 0%, rgba(224,161,68,0.12) 45%, rgba(224,161,68,0) 72%)',
        }}
      />
      <div className="relative flex items-center gap-2 rounded-full border border-gold/35 bg-[#17120a] px-3.5 py-1.5 text-gold shadow-[0_0_18px_-2px_rgba(224,161,68,0.55),inset_0_1px_0_rgba(255,255,255,0.06)]">
        <ArcGlyph value={clamped} />
        <span className="text-[13px] font-semibold tabular-nums">
          {clamped.toFixed(1)}%
        </span>
      </div>
    </div>
  )
}
