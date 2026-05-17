"use client"

import { useState } from "react"
import { ArrowRight, Heart } from "lucide-react"

const STORAGE_KEY = "signature-daily-check-in"

const moods = [
  {
    label: "Fatiguée",
    emoji: "🥱",
    selected: "border-amber-300 bg-amber-50 text-amber-900",
  },
  {
    label: "Dispersée",
    emoji: "🌫️",
    selected: "border-violet-300 bg-violet-50 text-violet-900",
  },
  {
    label: "En paix",
    emoji: "🕊️",
    selected: "border-emerald-300 bg-emerald-50 text-emerald-900",
  },
  {
    label: "Reconnaissante",
    emoji: "🤍",
    selected: "border-rose-300 bg-rose-50 text-rose-900",
  },
  {
    label: "Chargée",
    emoji: "🪨",
    selected: "border-orange-300 bg-orange-50 text-orange-900",
  },
  {
    label: "Je ne sais pas",
    emoji: "🌙",
    selected: "border-slate-300 bg-slate-50 text-slate-900",
  },
]

interface DailyCheckInProps {
  onComplete: () => void
}

export function DailyCheckIn({ onComplete }: DailyCheckInProps) {
  const [answer, setAnswer] = useState("")

  function enterApp() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        answer,
        createdAt: new Date().toISOString(),
      })
    )

    onComplete()
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[-90px] top-[90px] h-72 w-72 rounded-full blur-3xl"
          style={{ background: "rgba(92, 24, 53, 0.20)" }}
        />

        <div
          className="absolute right-[-100px] top-[280px] h-80 w-80 rounded-full blur-3xl"
          style={{ background: "rgba(185, 130, 75, 0.20)" }}
        />
      </div>

      <main className="relative z-10 flex min-h-screen flex-col justify-center px-6 py-10">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mb-3 flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-gold" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
                Signature
              </span>
              <span className="h-px w-8 bg-gold" />
            </div>

            <h1 className="font-serif text-3xl font-bold text-foreground">
              Avant de commencer
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Prends quelques secondes pour nommer comment tu arrives
              aujourd’hui.
            </p>
          </div>

          <div className="rounded-[2rem] border border-gold/20 bg-card p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Heart className="h-5 w-5" strokeWidth={1.7} />
            </div>

            <p className="mt-5 text-sm uppercase tracking-[0.25em] text-gold">
              Aujourd’hui
            </p>

            <h2 className="mt-3 font-serif text-2xl leading-tight text-foreground">
              Comment arrives-tu devant Dieu aujourd’hui ?
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Choisis un mot ou écris simplement ce qui est là. Il n’y a rien à
              bien formuler.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2">
              {moods.map((mood) => {
                const isSelected = answer === mood.label

                return (
                  <button
                    key={mood.label}
                    onClick={() => setAnswer(mood.label)}
                    className={[
                      "flex flex-col items-center justify-center gap-2 rounded-2xl border px-3 py-4 text-center transition-all duration-200",
                      isSelected
                        ? mood.selected
                        : "border-border bg-background text-muted-foreground hover:border-gold/50 hover:bg-champagne/30",
                    ].join(" ")}
                  >
                    <span className="text-2xl">{mood.emoji}</span>

                    <span className="text-xs font-medium leading-tight">
                      {mood.label}
                    </span>
                  </button>
                )
              })}
            </div>

            <textarea
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder="Ou écris avec tes mots..."
              rows={3}
              className="mt-4 w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-gold/60 focus:ring-2 focus:ring-gold/10"
            />

            <button
              onClick={enterApp}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
            >
              Entrer doucement
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={onComplete}
              className="mt-3 w-full text-center text-xs text-muted-foreground"
            >
              Passer pour aujourd’hui
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}