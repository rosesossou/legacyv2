"use client"

import { useState } from "react"
import { BottomNav, type TabId } from "@/components/bottom-nav"
import { AccueilPage } from "@/components/pages/accueil"
import { DemeurerPage } from "@/components/pages/demeurer"
import { CarnetPage } from "@/components/pages/carnet"
import { ActionsPage } from "@/components/pages/actions"
import { StudioProvider } from "@/lib/studio-store"
import { AnimatedThemeBackground } from "@/components/animated-theme-background"
import { SignatureOnboarding } from "@/components/onboarding/signature-onboarding"

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("accueil")
  const [showOnboarding, setShowOnboarding] = useState(true)

  if (showOnboarding) {
    return (
      <SignatureOnboarding
        onComplete={() => {
          setShowOnboarding(false)
          setActiveTab("demeurer")
        }}
      />
    )
  }

  return (
    <StudioProvider>
      <div className="relative min-h-screen overflow-hidden bg-background">
        <AnimatedThemeBackground />

        <main className="relative z-10 pb-24">
          {activeTab === "accueil" && <AccueilPage onNavigate={setActiveTab} />}
          {activeTab === "demeurer" && <DemeurerPage />}
          {activeTab === "carnet" && <CarnetPage />}
          {activeTab === "actions" && <ActionsPage />}
        </main>

        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </StudioProvider>
  )
}