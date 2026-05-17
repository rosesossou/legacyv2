"use client"

import { useState } from "react"
import {
  Clock,
  BookOpen,
  Lightbulb,
  MessageCircleQuestion,
  Zap,
  CheckCircle2,
} from "lucide-react"

const teaching = {
  theme: "Pensees & forteresses",
  title: "Ce que je crois finit par construire ma vie",
  source: "Renouvellement de la pensee, identite en Christ, sortie des forteresses interieures",
  format: "Audio",
  duration: "12 min",
  keyIdea: "Avant de changer ce que je fais, je dois identifier ce que je crois.",
  reflectionQuestion: "Quelle pensee me limite encore aujourd'hui ?",
  action: "Remplacer une pensee limitante par une verite a repeter cette semaine.",
}

const inspirationCategories = [
  "Foi & identite",
  "Destinee & appel",
  "Discipline & habitudes",
  "Productivite & organisation",
  "Finances & gestion",
  "Excellence feminine",
  "Leadership africain",
  "Femmes batisseuses",
  "Heritage & impact",
]

export function EnseignementPage() {
  const [followed, setFollowed] = useState(false)

  return (
    <div className="flex flex-col px-5 pt-12 pb-8">
      {/* Header */}
      <div className="mb-1 flex items-center gap-2">
        <span className="h-px w-6 bg-gold" />
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
          Semaine en cours
        </span>
      </div>
      <h1 className="font-serif text-2xl font-bold text-foreground">
        {"L'enseignement de la semaine"}
      </h1>

      {/* Weekly Teaching Card */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {/* Theme badge */}
        <div className="flex items-center gap-2 border-b border-border px-5 py-3">
          <span className="rounded-lg bg-rose/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-burgundy">
            {teaching.theme}
          </span>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span className="text-[10px]">{teaching.duration}</span>
          </div>
        </div>

        <div className="flex flex-col gap-5 p-5">
          {/* Title */}
          <h2 className="font-serif text-lg font-bold leading-snug text-foreground">
            {teaching.title}
          </h2>

          {/* Source */}
          <div className="flex items-start gap-3">
            <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.6} />
            <div>
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Source d&apos;inspiration
              </span>
              <p className="mt-0.5 text-xs leading-relaxed text-foreground">
                {teaching.source}
              </p>
            </div>
          </div>

          {/* Key Idea */}
          <div className="flex items-start gap-3">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.6} />
            <div>
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Idee cle
              </span>
              <p className="mt-1 rounded-xl bg-champagne/60 px-3 py-2 font-serif text-xs italic leading-relaxed text-dark-brown">
                &ldquo;{teaching.keyIdea}&rdquo;
              </p>
            </div>
          </div>

          {/* Reflection Question */}
          <div className="flex items-start gap-3">
            <MessageCircleQuestion className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.6} />
            <div>
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Question de reflexion
              </span>
              <p className="mt-0.5 text-xs leading-relaxed text-foreground">
                {teaching.reflectionQuestion}
              </p>
            </div>
          </div>

          {/* Action */}
          <div className="flex items-start gap-3">
            <Zap className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.6} />
            <div>
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Action de la semaine
              </span>
              <p className="mt-0.5 text-xs leading-relaxed text-foreground">
                {teaching.action}
              </p>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => setFollowed(!followed)}
            className={`mt-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${
              followed
                ? "border border-emerald/30 bg-emerald/10 text-emerald"
                : "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
            }`}
          >
            {followed ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Enseignement suivi
              </>
            ) : (
              "J'ai suivi l'enseignement"
            )}
          </button>
        </div>
      </div>

      {/* Bibliothèque d'inspirations */}
      <div className="mt-10">
        <div className="mb-1 flex items-center gap-2">
          <span className="h-px w-6 bg-gold" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
            Explorer
          </span>
        </div>
        <h2 className="font-serif text-xl font-bold text-foreground">
          {"Bibliotheque d'inspirations"}
        </h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {inspirationCategories.map((cat) => (
            <button
              key={cat}
              className="rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground shadow-sm transition-all duration-200 hover:border-gold/40 hover:bg-champagne/50 hover:shadow-md active:scale-[0.97]"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
