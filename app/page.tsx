"use client"

import { useState } from "react"
import { BottomNav, type TabId } from "@/components/bottom-nav"
import { AccueilPage } from "@/components/pages/accueil"
import { ParcoursPage } from "@/components/pages/parcours"
import { DemeurerPage } from "@/components/pages/demeurer"
import { EnseignementPage } from "@/components/pages/enseignement"
import { CarnetPage } from "@/components/pages/carnet"
import { ActionsPage } from "@/components/pages/actions"
import { StudioPage } from "@/components/studio/studio-page"
import { StudioProvider } from "@/lib/studio-store"
import { AnimatedThemeBackground } from "@/components/animated-theme-background"

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("accueil")
  const [showStudio, setShowStudio] = useState(false)

  return (
    <StudioProvider>
      {showStudio ? (
        <StudioPage onBack={() => setShowStudio(false)} />
      ) : (
        <div className="relative min-h-screen overflow-hidden bg-background">
          <AnimatedThemeBackground />

          <main className="relative z-10 pb-24">
            {activeTab === "accueil" && (
              <AccueilPage
                onNavigate={setActiveTab}
                onOpenStudio={() => setShowStudio(true)}
              />
            )}

            {activeTab === "parcours" && <ParcoursPage />}
            {activeTab === "demeurer" && <DemeurerPage />}
            {activeTab === "enseignement" && <EnseignementPage />}
            {activeTab === "carnet" && <CarnetPage />}
            {activeTab === "actions" && <ActionsPage />}
          </main>

          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      )}
    </StudioProvider>
  )
}