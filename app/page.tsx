"use client"

import { useEffect, useState } from "react"
import { BottomNav, type TabId } from "@/components/bottom-nav"
import { AccueilPage } from "@/components/pages/accueil"
import { DemeurerPage } from "@/components/pages/demeurer"
import { CarnetPage } from "@/components/pages/carnet"
import { ActionsPage } from "@/components/pages/actions"
import { StudioProvider } from "@/lib/studio-store"
import { AnimatedThemeBackground } from "@/components/animated-theme-background"
import { SignatureOnboarding } from "@/components/onboarding/signature-onboarding"
import { DailyCheckIn } from "@/components/onboarding/daily-check-in"

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("accueil")
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<
    boolean | null
  >(null)
  const [showDailyCheckIn, setShowDailyCheckIn] = useState(false)

  useEffect(() => {
    const savedOnboarding = localStorage.getItem("signature-onboarding")

    if (savedOnboarding) {
      setHasCompletedOnboarding(true)
      setShowDailyCheckIn(true)
    } else {
      setHasCompletedOnboarding(false)
    }
  }, [])

  if (hasCompletedOnboarding === null) {
    return null
  }

  if (!hasCompletedOnboarding) {
    return (
      <SignatureOnboarding
        onComplete={() => {
          setHasCompletedOnboarding(true)
          setShowDailyCheckIn(false)
          setActiveTab("demeurer")
        }}
      />
    )
  }

  if (showDailyCheckIn) {
    return (
      <DailyCheckIn
        onComplete={() => {
          setShowDailyCheckIn(false)
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