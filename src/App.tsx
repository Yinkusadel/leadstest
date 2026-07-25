import { useState } from 'react'
import { Sidebar, SidebarDrawer } from './components/layout/Sidebar'
import { TopBar } from './components/layout/TopBar'
import { LeadsPage } from './pages/LeadsPage'

export default function App() {
  const [section, setSection] = useState('leads')
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div className="flex min-h-svh bg-canvas">
      <Sidebar active={section} onSelect={setSection} />
      <SidebarDrawer
        open={navOpen}
        onClose={() => setNavOpen(false)}
        active={section}
        onSelect={setSection}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar onOpenNav={() => setNavOpen(true)} />
        <main className="flex-1">
          {section === 'leads' ? (
            <LeadsPage onExit={() => setSection('home')} />
          ) : (
            <div className="grid min-h-[60vh] place-items-center px-6 text-center">
              <div>
                <p className="text-sm text-fg-dim">
                  This section isn't part of the current build.
                </p>
                <button
                  type="button"
                  onClick={() => setSection('leads')}
                  className="mt-3 rounded-full border border-line bg-card px-4 py-1.5 text-[13px] text-fg-dim hover:text-fg"
                >
                  Back to Leads
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
