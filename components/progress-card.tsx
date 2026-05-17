"use client"

import { useEffect, useMemo, useState } from "react"
import { Leaf, Sprout, Flower2, Wheat, Sparkles } from "lucide-react"
import {
  getSignatureProgress,
  type SignatureProgress,
} from "@/lib/progress-store"

const growthStages = [
  {
    min: 0,
    title: "Aucune pression ici",
    symbol: "🤍",
    icon: Sparkles,
    message:
      "Quand tu garderas une prière, une réflexion ou un petit pas, une graine apparaîtra ici.",
    encouragement: "Tu peux commencer petit.",
  },
  {
    min: 1,
    title: "Graine déposée",
    symbol: "🌱",
    icon: Sprout,
    message: "Même ce qui est invisible peut être en train de grandir.",
    encouragement:
      "Chaque retour sincère, chaque phrase gardée, chaque petit pas compte.",
  },
  {
    min: 3,
    title: "Racines discrètes",
    symbol: "🌿",
    icon: Leaf,
    message: "Tes racines se fortifient dans le secret.",
    encouragement:
      "Ce que tu fais avec Dieu construit quelque chose en toi.",
  },
  {
    min: 6,
    title: "Première pousse",
    symbol: "🪴",
    icon: Sprout,
    message: "Quelque chose commence à sortir de terre.",
    encouragement:
      "Dieu travaille aussi dans les petits commencements.",
  },
  {
    min: 10,
    title: "Fleur en formation",
    symbol: "🌸",
    icon: Flower2,
    message: "Ta saison prend forme.",
    encouragement:
      "Tu n’as pas besoin de forcer ce qui est en train de mûrir.",
  },
  {
    min: 15,
    title: "Fruit paisible",
    symbol: "🌾",
    icon: Wheat,
    message: "Un fruit paisible apparaît.",
    encouragement:
      "La fidélité dans les petits pas laisse une trace durable.",
  },
]

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

  const totalMoments = progress.victories.length

  const currentStage = useMemo(() => {
    return [...growthStages]
      .reverse()
      .find((stage) => totalMoments >= stage.min)!
  }, [totalMoments])

  const currentStageIndex = growthStages.findIndex(
    (stage) => stage.title === currentStage.title
  )

  const lastVictory = progress.victories[0]
  const StageIcon = currentStage.icon

  return (
    <section className="rounded-3xl border border-gold/20 bg-card p-5 shadow-sm space-y-5">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-champagne text-2xl">
          {currentStage.symbol}
        </div>

        <div className="flex-1">
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
            Ce qui grandit petit à petit
          </p>

          <h2 className="mt-1 font-serif text-2xl leading-tight text-foreground">
            {currentStage.title}
          </h2>
        </div>
      </div>

      <div className="rounded-2xl bg-champagne/40 p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <StageIcon className="h-4 w-4" strokeWidth={1.7} />
          </div>

          <div>
            <p className="text-sm leading-relaxed text-foreground">
              {currentStage.message}
            </p>

            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {currentStage.encouragement}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 rounded-2xl bg-background p-3">
        {growthStages.slice(1).map((stage, index) => {
          const isActive = index + 1 <= currentStageIndex

          return (
            <div
              key={stage.title}
              className="flex flex-1 flex-col items-center gap-1"
            >
              <div
                className={[
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm transition-all duration-300",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground opacity-50",
                ].join(" ")}
              >
                {stage.symbol}
              </div>

              <span className="text-[9px] leading-tight text-muted-foreground text-center">
                {stage.title.split(" ")[0]}
              </span>
            </div>
          )
        })}
      </div>

      {lastVictory ? (
        <div className="rounded-2xl border border-gold/30 bg-champagne/30 p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />

            <p className="text-sm font-semibold text-foreground">
              Dernier petit pas gardé
            </p>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            {lastVictory.label}
          </p>

          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Ce n’est pas une course. C’est une trace de fidélité.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gold/30 bg-background/60 p-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Tes petits pas apparaîtront ici au fil de ton chemin. Rien à
            prouver, rien à rattraper.
          </p>
        </div>
      )}
    </section>
  )
}