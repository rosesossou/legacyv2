"use client"

import { useState } from "react"
import {
  Brain,
  Fingerprint,
  Footprints,
  GraduationCap,
  Coins,
  Heart,
  Building2,
  ChevronRight,
  ArrowLeft,
} from "lucide-react"

const pillars = [
  {
    id: 1,
    icon: Brain,
    title: "Pensees & forteresses",
    description: "Identifier les pensees, peurs et croyances qui limitent ma croissance.",
    color: "bg-rose/20 text-burgundy",
  },
  {
    id: 2,
    icon: Fingerprint,
    title: "Destinee & identite",
    description: "Clarifier la femme que je deviens et ce que Dieu a place en moi.",
    color: "bg-gold/20 text-dark-brown",
  },
  {
    id: 3,
    icon: Footprints,
    title: "Discipline & petits pas",
    description: "Transformer mes intentions en comportements simples et repetes.",
    color: "bg-champagne text-dark-brown",
  },
  {
    id: 4,
    icon: GraduationCap,
    title: "Education & excellence",
    description: "Apprendre, me former, elever ma pensee et ma maniere de vivre.",
    color: "bg-secondary text-plum",
  },
  {
    id: 5,
    icon: Coins,
    title: "Finances & sagesse",
    description: "Gerer mes ressources avec responsabilite, vision et maturite.",
    color: "bg-gold/15 text-dark-brown",
  },
  {
    id: 6,
    icon: Heart,
    title: "Relations & posture",
    description: "Construire des relations saines et devenir une presence qui eleve.",
    color: "bg-rose/15 text-burgundy",
  },
  {
    id: 7,
    icon: Building2,
    title: "Heritage & impact",
    description: "Penser au-dela de moi et batir ce que je veux transmettre.",
    color: "bg-emerald/15 text-emerald",
  },
]

interface PillarDetailProps {
  pillar: (typeof pillars)[number]
  onBack: () => void
}

function PillarDetail({ pillar, onBack }: PillarDetailProps) {
  return (
    <div className="flex flex-col px-5 pt-12 pb-8">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux piliers
      </button>
      <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${pillar.color}`}>
        <pillar.icon className="h-7 w-7" strokeWidth={1.5} />
      </div>
      <h2 className="font-serif text-2xl font-bold text-foreground">{pillar.title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
      <div className="mt-8 rounded-2xl border border-border bg-card p-5">
        <h3 className="font-serif text-sm font-semibold text-foreground">Questions de reflexion</h3>
        <ul className="mt-4 flex flex-col gap-3">
          <li className="text-sm leading-relaxed text-muted-foreground">
            {"Ou en suis-je dans ce domaine de ma vie ?"}
          </li>
          <li className="text-sm leading-relaxed text-muted-foreground">
            {"Qu'est-ce que je veux changer ou developper ?"}
          </li>
          <li className="text-sm leading-relaxed text-muted-foreground">
            {"Quel petit pas puis-je poser cette semaine ?"}
          </li>
        </ul>
      </div>
      <div className="mt-4 rounded-2xl border border-gold/20 bg-champagne/50 p-5">
        <p className="font-serif text-sm italic leading-relaxed text-dark-brown">
          {"Chaque pilier est une invitation a grandir avec intention, pas a courir apres la perfection."}
        </p>
      </div>
    </div>
  )
}

export function ParcoursPage() {
  const [selectedPillar, setSelectedPillar] = useState<number | null>(null)

  if (selectedPillar !== null) {
    const pillar = pillars.find((p) => p.id === selectedPillar)
    if (pillar) {
      return <PillarDetail pillar={pillar} onBack={() => setSelectedPillar(null)} />
    }
  }

  return (
    <div className="flex flex-col px-5 pt-12 pb-8">
      {/* Header */}
      <div className="mb-1 flex items-center gap-2">
        <span className="h-px w-6 bg-gold" />
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
          7 piliers
        </span>
      </div>
      <h1 className="font-serif text-2xl font-bold text-foreground">
        Mon parcours de formation
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Sept piliers pour batir une vie de foi, d&apos;excellence et d&apos;heritage.
      </p>

      {/* Pillar Cards */}
      <div className="mt-8 flex flex-col gap-3">
        {pillars.map((pillar) => (
          <div
            key={pillar.id}
            className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${pillar.color}`}>
                <pillar.icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-medium text-gold">
                    {String(pillar.id).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-sm font-semibold text-foreground">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedPillar(pillar.id)}
              className="flex items-center gap-1.5 self-end text-xs font-medium text-burgundy transition-colors hover:text-plum"
            >
              Explorer ce pilier
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
