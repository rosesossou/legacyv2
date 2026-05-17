"use client"

import { useEffect, useState, type ReactNode } from "react"
import { CheckCircle2, Heart } from "lucide-react"
import { addVictory } from "@/lib/progress-store"

const STORAGE_KEY = "signature-demeurer-mvp"

export function DemeurerPage() {
  const [depot, setDepot] = useState("")
  const [recevoir, setRecevoir] = useState("")
  const [parole, setParole] = useState("")
  const [priere, setPriere] = useState("")

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)

    if (!savedData) return

    try {
      const parsed = JSON.parse(savedData)

      setDepot(parsed.depot ?? "")
      setRecevoir(parsed.recevoir ?? "")
      setParole(parsed.parole ?? "")
      setPriere(parsed.priere ?? "")
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  function saveDemeurer() {
    const data = {
      depot,
      recevoir,
      parole,
      priere,
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    addVictory("reflection_saved")

    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2200)
  }

  return (
    <div className="flex flex-col pb-8">
      <section className="px-6 pt-12 pb-8 text-center">
        <div className="mb-3 flex items-center justify-center gap-2">
          <span className="h-px w-8 bg-gold" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
            Demeurer
          </span>
          <span className="h-px w-8 bg-gold" />
        </div>

        <h1 className="font-serif text-3xl font-bold text-foreground">
          Revenir doucement à Dieu
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Un espace simple pour respirer, déposer ce qui pèse et revenir à la
          présence de Dieu sans pression.
        </p>
      </section>

      <section className="px-5 pb-6">
        <div className="rounded-3xl border border-gold/20 bg-champagne/40 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Heart className="h-5 w-5" strokeWidth={1.7} />
            </div>

            <div>
              <h2 className="font-serif text-xl text-foreground">
                Tu peux venir comme tu es
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Tu n’as rien à prouver ici. Une phrase, un soupir ou une prière
                simple peuvent déjà être un retour vers Dieu.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-8">
        <div className="space-y-4">
          <FieldGroup
            title="Ce que je viens déposer devant Dieu"
            description="Nommer simplement ce qui pèse ou occupe mon cœur."
          >
            <Textarea
              value={depot}
              onChange={setDepot}
              placeholder="Seigneur, aujourd’hui je viens avec..."
            />
          </FieldGroup>

          <FieldGroup
            title="Ce que je veux recevoir de Lui"
            description="Paix, clarté, courage, repos, direction…"
          >
            <Textarea
              value={recevoir}
              onChange={setRecevoir}
              placeholder="Aujourd’hui, j’aimerais recevoir..."
            />
          </FieldGroup>

          <FieldGroup
            title="Une parole à méditer"
            description="Un verset, une promesse ou une vérité biblique à garder."
          >
            <Textarea
              value={parole}
              onChange={setParole}
              placeholder="La parole que je veux garder..."
            />
          </FieldGroup>

          <FieldGroup
            title="Ma prière simple"
            description="Quelques mots sincères suffisent."
          >
            <Textarea
              value={priere}
              onChange={setPriere}
              placeholder="Seigneur..."
            />
          </FieldGroup>
        </div>
      </section>

      <section className="px-5 pb-8">
        <button
          onClick={saveDemeurer}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
        >
          <CheckCircle2 className="h-4 w-4" />
          {saved ? "Moment gardé" : "Garder ce moment"}
        </button>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          Ce moment reste dans ton espace personnel.
        </p>
      </section>
    </div>
  )
}

function FieldGroup({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-4 shadow-sm">
      <h2 className="font-serif text-base font-semibold text-foreground">
        {title}
      </h2>

      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        {description}
      </p>

      <div className="mt-4">{children}</div>
    </div>
  )
}

function Textarea({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (value: string) => void
  placeholder: string
}) {
  return (
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      rows={3}
      className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/70 focus:border-gold/60 focus:ring-2 focus:ring-gold/10"
    />
  )
}