"use client"

import { cn } from "@/lib/utils"
import {
  LayoutGrid,
  BookOpen,
  Route,
  Users,
  MessageCircleQuestion,
  Palette,
  ArrowLeft,
} from "lucide-react"

export const studioTabs = [
  { id: "parcours", label: "Parcours", icon: Route },
  { id: "cartes", label: "Cartes", icon: LayoutGrid },
  { id: "enseignements", label: "Enseignements", icon: BookOpen },
  
  { id: "activites", label: "Activites", icon: Users },
  { id: "questions", label: "Questions", icon: MessageCircleQuestion },
  { id: "apparence", label: "Apparence", icon: Palette },
] as const

export type StudioTabId = (typeof studioTabs)[number]["id"]

interface StudioNavProps {
  activeTab: StudioTabId
  onTabChange: (tab: StudioTabId) => void
  onBack: () => void
}

export function StudioNav({ activeTab, onTabChange, onBack }: StudioNavProps) {
  return (
    <div className="flex flex-col">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-5 pt-10 pb-4">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Retour"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex flex-col">
          <h1 className="font-serif text-xl font-bold text-foreground">Studio Signature</h1>
          <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            Espace de creation
          </p>
        </div>
      </div>

      {/* Tab scroll */}
      <div className="no-scrollbar flex gap-1 overflow-x-auto px-5 pb-4">
        {studioTabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className="h-3.5 w-3.5" strokeWidth={1.8} />
              {tab.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
