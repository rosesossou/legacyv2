"use client"

import { useEffect, useState } from "react"
import { Trophy, Sparkles } from "lucide-react"
import { getSignatureProgress, type SignatureProgress } from "@/lib/progress-store"

export function ProgressCard() {
  const [progress, setProgress] = useState<SignatureProgress>({
    points: 0,
    victories: [],
  })

  useEffect(() => {
    function refresh() {
      setProgress(getSignatureProgress())
    }

    refresh()

    window.addEventListener("signature-progress-updated", refresh)

    return () => {
      window.removeEventListener("signature-progress-updated", refresh)
    }
  }, [])

  const level = Math.floor(progress.points / 50) + 1
  const nextLevelPoints = level * 50
  const currentLevelStart = (level - 1) * 50
  const progressPercent =
    ((progress.points - currentLevelStart) / (nextLevelPoints - currentLevelStart)) *
    100

  const lastVictory = progress.victories[0]

  return (
    <section className="rounded-3xl border bg-card p-5 shadow-sm space-y-5">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Trophy className="h-5 w-5" />
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
            Mes victoires
          </p>

          <h2 className="text-2xl font-serif">
            {progress.points} points
          </h2>
        </div>
      </div>

      <div className="rounded-2xl bg-background p-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Niveau {level}</span>
          <span className="text-muted-foreground">
            {progress.points}/{nextLevelPoints}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          />
        </div>
      </div>

      {lastVictory ? (
        <div className="rounded-2xl border border-gold/30 bg-champagne/40 p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <p className="text-sm font-semibold text-foreground">
              Dernière victoire
            </p>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            {lastVictory.label} · +{lastVictory.points} points
          </p>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground leading-relaxed">
          Tes victoires apparaîtront ici quand tu enregistreras une réflexion,
          un petit pas ou une carte.
        </p>
      )}
    </section>
  )
}