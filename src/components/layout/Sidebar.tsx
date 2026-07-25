import { Icon } from '../Icon'
import { Logo } from '../Logo'
import {
  HomeIcon,
  ListingsIcon,
  LeadsIcon,
  OrdersIcon,
  SellIcon,
  SettingsIcon,
  ShopIcon,
  StockIcon,
  WishlistIcon,
} from '../NavIcons'

type Glyph = (props: { size?: number; active?: boolean }) => React.ReactElement

type NavItem = { id: string; label: string; Glyph: Glyph }

const NAV: NavItem[] = [
  { id: 'home', label: 'Home', Glyph: HomeIcon },
  { id: 'sell', label: 'Sell', Glyph: SellIcon },
  { id: 'shop', label: 'Shop', Glyph: ShopIcon },
  { id: 'wishlist', label: 'Wishlist', Glyph: WishlistIcon },
  { id: 'orders', label: 'Orders', Glyph: OrdersIcon },
  { id: 'leads', label: 'Leads', Glyph: LeadsIcon },
  { id: 'stock', label: 'Stock', Glyph: StockIcon },
  { id: 'listings', label: 'Listings', Glyph: ListingsIcon },
  { id: 'users', label: 'Users', Glyph: SettingsIcon },
]

function NavButton({
  item,
  active,
  onSelect,
  row,
}: {
  item: NavItem
  active: boolean
  onSelect: (id: string) => void
  /** Horizontal layout for the mobile drawer. */
  row?: boolean
}) {
  const { Glyph } = item

  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      aria-current={active ? 'page' : undefined}
      className={`group flex w-full items-center transition-colors ${
        row
          ? 'gap-3 rounded-xl px-3 py-2'
          : 'flex-col justify-center gap-3 rounded-xl px-1 py-1.5'
      } ${active ? 'text-fg' : 'text-fg-dim hover:text-fg'}`}
    >
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-[12px] transition-all duration-300 ease-back group-hover:scale-110 ${
          active
            ? 'nav-tile-active scale-105'
            : 'opacity-70 group-hover:bg-white/5 group-hover:opacity-100'
        }`}
      >
        <Glyph size={20} active={active} />
      </span>
      <span
        className={
          row
            ? 'text-[14px] font-medium'
            : 'text-[14px] leading-none font-medium'
        }
      >
        {item.label}
      </span>
    </button>
  )
}

export function Sidebar({
  active,
  onSelect,
}: {
  active: string
  onSelect: (id: string) => void
}) {
  return (
    <nav
      aria-label="Main"
      className="no-scrollbar sticky top-0 hidden h-svh shrink-0 flex-col items-center gap-4 overflow-y-auto bg-panel px-3 pt-4 lg:flex lg:w-[84px]"
    >
      <div className="transition-transform duration-300 ease-back hover:scale-110">
        <Logo size={36} />
      </div>
      <div className="flex w-full flex-col items-center gap-4 rounded-3xl p-2.5">
        {NAV.map((item) => (
          <NavButton
            key={item.id}
            item={item}
            active={item.id === active}
            onSelect={onSelect}
          />
        ))}
      </div>
    </nav>
  )
}

/** Slide-over version of the same nav, used below the `lg` breakpoint. */
export function SidebarDrawer({
  open,
  onClose,
  active,
  onSelect,
}: {
  open: boolean
  onClose: () => void
  active: string
  onSelect: (id: string) => void
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        className="animate-fade-in absolute inset-0 bg-black/70 backdrop-blur-sm active:scale-100"
      />
      <nav
        aria-label="Main"
        className="animate-slide-in-left thin-scrollbar absolute inset-y-0 left-0 flex w-64 max-w-[80vw] flex-col gap-1 overflow-y-auto border-r border-line bg-panel p-3"
      >
        <div className="mb-3 flex items-center justify-between">
          <Logo size={40} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="grid h-9 w-9 place-items-center rounded-full text-fg-mute hover:text-fg"
          >
            <Icon name="close" size={18} />
          </button>
        </div>
        {NAV.map((item) => (
          <NavButton
            key={item.id}
            item={item}
            row
            active={item.id === active}
            onSelect={(id) => {
              onSelect(id)
              onClose()
            }}
          />
        ))}
      </nav>
    </div>
  )
}
