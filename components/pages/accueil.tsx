"use client"

import {
  ArrowRight,
  Heart,
  PenLine,
  Footprints,
  Sparkles,
} from "lucide-react"
import { ProgressCard } from "@/components/progress-card"

type TabId = "accueil" | "demeurer" | "carnet" | "actions"

interface AccueilPageProps {
  onNavigate: (tab: TabId) => void
  onOpenStudio?: () => void
}

export function AccueilPage({ onNavigate }: AccueilPageProps) {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative flex flex-col items-center px-6 pt-14 pb-10 text-center">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-px w-8 bg-gold" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
            Signature
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
          Revenir à Dieu. Déposer ce que tu portes. Avancer par petits pas,
          sans pression ni comparaison.
        </p>

        <button
          onClick={() => onNavigate("demeurer")}
          className="mt-8 flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
        >
          Commencer avec douceur
          <ArrowRight className="h-4 w-4" />
        </button>
      </section>

      {/* Aujourd'hui */}
      <section className="px-5 pb-8">
        <div className="rounded-3xl border border-gold/20 bg-champagne/40 p-5 shadow-sm">
          <p className="text-sm uppercase tracking-[0.25em] text-gold">
            Aujourd’hui
          </p>

          <h2 className="mt-2 font-serif text-2xl leading-tight text-foreground">
            Une phrase suffit.
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Tu n’as pas besoin de tout remplir. Viens comme tu es, écris ce qui
            est là, puis choisis un petit pas fidèle.
          </p>

          <div className="mt-5 grid gap-3">
            <SimpleStep
              icon={<Heart className="h-4 w-4" />}
              title="1. Je demeure"
              description="Je prends un moment pour revenir à Dieu."
            />

            <SimpleStep
              icon={<PenLine className="h-4 w-4" />}
              title="2. Je dépose"
              description="J’écris ce que je porte, sans me juger."
            />

            <SimpleStep
              icon={<Footprints className="h-4 w-4" />}
              title="3. J’avance"
              description="Je choisis un petit pas simple pour aujourd’hui."
            />
          </div>
        </div>
      </section>

      {/* Rituel principal */}
      <section className="px-5 pb-8">
        <div className="mb-5">
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
            Rituel
          </p>

          <h2 className="mt-2 font-serif text-2xl font-bold text-foreground">
            Ton chemin aujourd’hui
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Trois espaces simples pour revenir à l’essentiel.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <PathCard
  title="1. Demeurer"
  description="Revenir à Dieu, respirer et lui apporter ce qui est là."
  buttonLabel="Commencer ici"
  onClick={() => onNavigate("demeurer")}
/>

<PathCard
  title="2. Mon carnet de vérité"
  description="Regarder ce que je ressens et revenir à la vérité de Dieu."
  buttonLabel="Continuer avec la vérité"
  onClick={() => onNavigate("carnet")}
/>

<PathCard
  title="3. Actions"
  description="Choisir un petit pas concret, simple et fidèle."
  buttonLabel="Terminer par un petit pas"
  onClick={() => onNavigate("actions")}
/>
        </div>
      </section>

      {/* Progression douce */}
      <section className="px-5 pb-8">
        <ProgressCard />
      </section>

      {/* Citation */}
      <section className="px-5 pb-8">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-8 text-center shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.38_0.12_20/0.3),_transparent_70%)]" />

          <div className="relative">
            <span className="mb-3 inline-block font-serif text-3xl text-gold">
              &ldquo;
            </span>

            <p className="font-serif text-base font-medium leading-relaxed tracking-wide text-primary-foreground">
              Garde ton cœur plus que toute autre chose, car de lui viennent les
              sources de la vie.
            </p>

            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gold">
              Proverbes 4:23
            </p>

            <span className="mt-2 inline-block font-serif text-3xl text-gold">
              &rdquo;
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}

function SimpleStep({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-card/80 p-4">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>

        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}

function PathCard({
  title,
  description,
  buttonLabel,
  onClick,
}: {
  title: string
  description: string
  buttonLabel: string
  onClick: () => void
}) {
  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-burgundy">
          <Sparkles className="h-5 w-5" strokeWidth={1.6} />
        </div>

        <div className="flex-1">
          <h3 className="font-serif text-base font-semibold text-foreground">
            {title}
          </h3>

          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>

          <button
            onClick={onClick}
            className="mt-4 flex items-center gap-2 text-xs font-semibold text-primary"
          >
            {buttonLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </article>
  )
}