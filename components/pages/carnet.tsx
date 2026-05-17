"use client"

import { useEffect, useState, type ReactNode } from "react"
import { CheckCircle2, Heart } from "lucide-react"
import { addVictory } from "@/lib/progress-store"

const STORAGE_KEY = "signature-carnet-mvp"

export function CarnetPage() {
  const [ceQueJePorte, setCeQueJePorte] = useState("")
  const [ceQueDieuEnDit, setCeQueDieuEnDit] = useState("")
  const [ceQueJeGarde, setCeQueJeGarde] = useState("")
  const [petitPas, setPetitPas] = useState("")

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)

    if (!savedData) return

    try {
      const parsed = JSON.parse(savedData)

      setCeQueJePorte(parsed.ceQueJePorte ?? "")
      setCeQueDieuEnDit(parsed.ceQueDieuEnDit ?? "")
      setCeQueJeGarde(parsed.ceQueJeGarde ?? "")
      setPetitPas(parsed.petitPas ?? "")
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  function saveCarnet() {
    const data = {
      ceQueJePorte,
      ceQueDieuEnDit,
      ceQueJeGarde,
      petitPas,
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
            Carnet
          </span>
          <span className="h-px w-8 bg-gold" />
        </div>

        <h1 className="font-serif text-3xl font-bold text-foreground">
          Déposer ce que je porte
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Un espace pour écrire ce qui est là, revenir à la Parole et garder une
          vérité simple pour avancer.
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
                Revenir à la vérité
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Tu peux venir avec ce que tu ressens, puis regarder doucement ce
                que Dieu en dit dans Sa Parole.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-8">
        <div className="space-y-4">
          <FieldGroup
            title="Ce que je porte"
            description="Déposer ce qui occupe mon cœur ou mes pensées."
          >
            <Textarea
              value={ceQueJePorte}
              onChange={setCeQueJePorte}
              placeholder="Aujourd’hui, je porte..."
            />
          </FieldGroup>

          <FieldGroup
            title="Ce que Dieu en dit dans Sa Parole"
            description="Chercher une vérité biblique qui répond à ce que je porte."
          >
            <Textarea
              value={ceQueDieuEnDit}
              onChange={setCeQueDieuEnDit}
              placeholder="Un verset, une vérité ou une promesse que je veux garder..."
            />
          </FieldGroup>

          <FieldGroup
            title="Ce que je veux garder"
            description="Retenir une vérité, une promesse ou une direction."
          >
            <Textarea
              value={ceQueJeGarde}
              onChange={setCeQueJeGarde}
              placeholder="La vérité que je veux garder aujourd’hui..."
            />
          </FieldGroup>

          <FieldGroup
            title="Le petit pas que je peux poser"
            description="Transformer ce que j’ai reçu en une action simple."
          >
            <Textarea
              value={petitPas}
              onChange={setPetitPas}
              placeholder="Le petit pas que je peux poser..."
            />
          </FieldGroup>
        </div>
      </section>

      <section className="px-5 pb-8">
        <button
          onClick={saveCarnet}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
        >
          <CheckCircle2 className="h-4 w-4" />
          {saved ? "Carnet gardé" : "Garder mon carnet"}
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