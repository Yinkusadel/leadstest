/** Circular percentage ring used on the "Detected from group" panel. */
export function MatchGauge({ value, size = 62 }: { value: number; size?: number }) {
  const stroke = 3
  const r = (size - stroke) / 2
  const circumference = 2 * Math.PI * r
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${clamped}% match`}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-line"
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
          strokeDashoffset={circumference * (1 - clamped / 100)}
          className="text-gold transition-[stroke-dashoffset] duration-700"
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-[13px] font-semibold text-gold">
        {clamped.toFixed(1)}%
      </span>
    </div>
  )
}
