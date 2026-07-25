import { useState } from 'react'
import { Icon } from '../Icon'
import { SearchField } from '../ui'

export function TopBar({ onOpenNav }: { onOpenNav: () => void }) {
  const [query, setQuery] = useState('')

  return (
    <header className="layout-anim sticky top-0 z-30 flex items-center gap-3 border-b border-line-soft bg-canvas/85 px-4 py-3 backdrop-blur-md sm:px-6">
      <button
        type="button"
        onClick={onOpenNav}
        aria-label="Open navigation"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-card text-fg-dim lg:hidden"
      >
        <Icon name="menu" size={18} />
      </button>

      <SearchField
        value={query}
        onChange={setQuery}
        placeholder="Search..."
        className="min-w-0 flex-1"
      />

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          aria-label="Account"
          className="grid h-9 w-9 place-items-center rounded-full border border-line bg-card text-fg-dim transition-colors hover:text-fg"
        >
          <Icon name="users" size={17} />
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className="relative grid h-9 w-9 place-items-center rounded-full border border-line bg-card text-fg-dim transition-colors hover:text-fg"
        >
          <Icon name="bell" size={17} />
          <span className="absolute top-1.5 right-2 h-1.5 w-1.5 rounded-full bg-brand" />
        </button>
      </div>
    </header>
  )
}
