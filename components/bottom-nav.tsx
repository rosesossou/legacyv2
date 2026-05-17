"use client"

import { Home, Heart, NotebookPen, Footprints } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "accueil", label: "Accueil", icon: Home },
  { id: "demeurer", label: "Demeurer", icon: Heart },
  { id: "carnet", label: "Vérité", icon: NotebookPen },
  { id: "actions", label: "Actions", icon: Footprints },
] as const

export type TabId = (typeof tabs)[number]["id"]

interface BottomNavProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 transition-all duration-200",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon
                className={cn(
                  "h-5 w-5 transition-all duration-200",
                  isActive && "scale-110"
                )}
                strokeWidth={isActive ? 2.2 : 1.6}
              />

              <span
                className={cn(
                  "text-[10px] leading-tight transition-all duration-200",
                  isActive ? "font-semibold" : "font-medium"
                )}
              >
                {tab.label}
              </span>

              {isActive && (
                <span className="mt-0.5 h-0.5 w-4 rounded-full bg-gold" />
              )}
            </button>
          )
        })}
      </div>

      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  )
}