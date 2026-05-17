"use client"

import { useState } from "react"
import { StudioNav, type StudioTabId } from "./studio-nav"
import { StudioCartes } from "./studio-cartes"
import { StudioEnseignements } from "./studio-enseignements"
import { StudioParcours } from "./studio-parcours"
import { StudioActivites } from "./studio-activites"
import { StudioQuestions } from "./studio-questions"
import { StudioApparence } from "./studio-apparence"

interface StudioPageProps {
  onBack: () => void
}

export function StudioPage({ onBack }: StudioPageProps) {
  const [activeTab, setActiveTab] = useState<StudioTabId>("cartes")

  return (
    <div className="min-h-screen bg-background">
      <StudioNav activeTab={activeTab} onTabChange={setActiveTab} onBack={onBack} />
      <div className="px-5 pb-12">
        {activeTab === "cartes" && <StudioCartes />}
        {activeTab === "enseignements" && <StudioEnseignements />}
        {activeTab === "parcours" && <StudioParcours />}
        {activeTab === "activites" && <StudioActivites />}
        {activeTab === "questions" && <StudioQuestions />}
        {activeTab === "apparence" && <StudioApparence />}
      </div>
    </div>
  )
}
