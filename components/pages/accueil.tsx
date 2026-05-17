"use client"

import {
  ArrowRight,
  Brain,
  Sun,
  Sparkles,
  Building2,
  Settings,
} from "lucide-react"
import { ProgressCard } from "@/components/progress-card"
import { TodayGuideCard } from "@/components/today-guide-card"
type TabId =
  | "accueil"
  | "parcours"
  | "demeurer"
  | "enseignement"
  | "carnet"
  | "actions"

const featureCards = [
  {
    icon: Brain,
    title: "Mes pensées actuelles",
    description: "Explorer et transformer les pensées qui façonnent ma vie.",
  },
  {
    icon: Sun,
    title: "Ma saison avec Dieu",
    description: "Discerner ce que Dieu travaille en moi dans cette saison.",
  },
  {
    icon: Sparkles,
    title: "La femme que je deviens",
    description: "Clarifier la vision de la femme que je suis appelée à devenir.",
  },
  {
    icon: Building2,
    title: "L’héritage que je construis",
    description: "Bâtir ce qui restera au-delà de moi.",
  },
]

interface AccueilPageProps {
  onNavigate: (tab: TabId) => void
  onOpenStudio: () => void
}

export function AccueilPage({ onNavigate, onOpenStudio }: AccueilPageProps) {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center px-6 pt-14 pb-10 text-center">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-px w-8 bg-gold" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
            Croissance avec intention
          </span>
          <span className="h-px w-8 bg-gold" />
        </div>

        <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground">
          Signature
        </h1>

        <p className="mt-2 font-serif text-base italic text-muted-foreground">
          Devenir une femme qui laisse une trace.
        </p>

        <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Un espace pour ralentir, examiner tes pensées, chercher la direction
          de Dieu, t’éduquer, structurer ta vie et poser des actions concrètes
          vers la femme que tu es appelée à devenir.
        </p>

        <button
          onClick={() => onNavigate("demeurer")}
          className="mt-8 flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
        >
          Commencer doucement
          <ArrowRight className="h-4 w-4" />
        </button>
      </section>

      {/* Progress / Victories */}
      <section className="px-5 pb-8">
        <ProgressCard />
      </section>
<section className="px-5 pb-8">
  <TodayGuideCard />
</section>
      {/* Feature Cards */}
      <section className="px-5 pb-8">
        <div className="flex flex-col gap-3">
          {featureCards.map((card) => (
            <div
              key={card.title}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
                <card.icon className="h-5 w-5 text-burgundy" strokeWidth={1.6} />
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="font-serif text-sm font-semibold text-foreground">
                  {card.title}
                </h3>

                <p className="text-xs leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Card */}
      <section className="px-5 pb-8">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-8 text-center shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.38_0.12_20/0.3),_transparent_70%)]" />

          <div className="relative">
            <span className="mb-3 inline-block font-serif text-3xl text-gold">
              &ldquo;
            </span>

            <p className="font-serif text-base font-medium leading-relaxed tracking-wide text-primary-foreground">
              On ne bâtit pas une vie d’excellence par hasard.
              <br />
              Luc 14 : 28 Car, lequel de vous, s'il veut bâtir une tour, ne s'assied d'abord pour calculer la dépense et voir s'il a de quoi la terminer, 29de peur qu'après avoir posé les fondements, il ne puisse l'achever, et que tous ceux qui le verront ne se mettent à le railler,…
            </p>

            <span className="mt-2 inline-block font-serif text-3xl text-gold">
              &rdquo;
            </span>
          </div>
        </div>
      </section>

      {/* Core Message */}
      <section className="px-5 pb-8">
        <div className="rounded-2xl border border-gold/20 bg-champagne/50 px-6 py-6 text-center">
          <p className="font-serif text-sm italic leading-relaxed text-dark-brown">
            Une femme ne devient pas puissante par hasard. Elle se bâtit avec
            Dieu, avec sagesse, avec discipline et avec intention.
          </p>
        </div>
      </section>

      {/* Studio Access */}
      <section className="px-5 pb-8">
        <button
          onClick={onOpenStudio}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3.5 text-sm font-semibold text-foreground shadow-sm transition-all duration-200 hover:border-gold/40 hover:shadow-md active:scale-[0.98]"
        >
          <Settings className="h-4 w-4 text-muted-foreground" strokeWidth={1.6} />
          Gérer le parcours
        </button>
      </section>
    </div>
  )
}