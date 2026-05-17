"use client"

import {
  ArrowRight,
  Heart,
  PenLine,
  Footprints,
  Settings,
  Sparkles,
} from "lucide-react"
import { ProgressCard } from "@/components/progress-card"

type TabId =
  | "accueil"
  | "parcours"
  | "demeurer"
  | "enseignement"
  | "carnet"
  | "actions"

interface AccueilPageProps {
  onNavigate: (tab: TabId) => void
  onOpenStudio: () => void
}

export function AccueilPage({ onNavigate, onOpenStudio }: AccueilPageProps) {
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
          Un espace doux pour revenir à Dieu, déposer ce que tu portes et
          avancer par petits pas, sans pression ni comparaison.
        </p>

        <button
          onClick={() => onNavigate("demeurer")}
          className="mt-8 flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
        >
          Commencer doucement
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
            Commence simplement.
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Tu n’as pas besoin de tout remplir. Une phrase, une prière ou un
            petit pas fidèle suffisent.
          </p>

          <div className="mt-5 grid gap-3">
            <SimpleStep
              icon={<Heart className="h-4 w-4" />}
              title="1. Je demeure"
              description="Je prends quelques minutes pour revenir à Dieu."
            />

            <SimpleStep
              icon={<PenLine className="h-4 w-4" />}
              title="2. Je dépose"
              description="J’écris ce que je porte, sans me juger."
            />

            <SimpleStep
              icon={<Footprints className="h-4 w-4" />}
              title="3. J’avance"
              description="Je choisis un petit pas simple et réaliste."
            />
          </div>
        </div>
      </section>

      {/* Chemin Signature */}
      <section className="px-5 pb-8">
        <div className="mb-5">
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
            Chemin
          </p>

          <h2 className="mt-2 font-serif text-2xl font-bold text-foreground">
            Mon chemin Signature
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Trois espaces pour avancer avec douceur, selon ta saison.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <PathCard
            title="Demeurer"
            description="Revenir à Dieu, respirer, écouter ce qu’Il travaille en moi."
            buttonLabel="Entrer dans ce moment"
            onClick={() => onNavigate("demeurer")}
          />

          <PathCard
            title="Carnet"
            description="Déposer mes pensées, clarifier ma saison et nommer ce que je porte."
            buttonLabel="Écrire une phrase"
            onClick={() => onNavigate("carnet")}
          />

          <PathCard
            title="Actions"
            description="Choisir un petit pas fidèle et célébrer ma progression."
            buttonLabel="Choisir un petit pas"
            onClick={() => onNavigate("actions")}
          />
        </div>
      </section>

      {/* Petits pas célébrés */}
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

      {/* Construire mon chemin */}
<section className="px-5 pb-8">
  <div
    className="relative overflow-hidden rounded-[2rem] p-6 shadow-lg"
    style={{
      background:
        "radial-gradient(circle at 85% 0%, rgba(239, 229, 142, 0.28), transparent 32%), linear-gradient(145deg, #2b0b35 0%, #4b143b 48%, #8a4f55 100%)",
    }}
  >
    <div className="absolute right-[-40px] top-[-40px] h-32 w-32 rounded-full bg-gold/20 blur-3xl" />

    <div className="relative">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">
        Mon parcours
      </p>

      <h2 className="mt-3 font-serif text-3xl leading-tight text-white">
        Construire mon chemin
      </h2>

      <p className="mt-4 text-sm leading-relaxed text-white/75">
        Prépare ton parcours de croissance avec des questions, des enseignements,
        des activités et des petits pas pour chaque semaine.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <div className="rounded-2xl border border-white/15 bg-white/10 p-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gold">
            Mois
          </p>
          <p className="mt-1 text-sm font-semibold text-white">
            Parcours mensuels
          </p>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/10 p-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gold">
            Semaine
          </p>
          <p className="mt-1 text-sm font-semibold text-white">
            Question + activité
          </p>
        </div>
      </div>

      <button
        onClick={onOpenStudio}
        className="mt-6 flex w-full items-center justify-center rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-[#4b143b] shadow-lg transition-all duration-200 hover:shadow-xl active:scale-[0.98]"
      >
        Ouvrir mon parcours
      </button>
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