"use client"

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react"
import { CheckCircle2, Heart, ImageDown, PenLine, Sparkles } from "lucide-react"
import { toPng } from "html-to-image"
import { addVictory } from "@/lib/progress-store"

const STORAGE_KEY = "signature-carnet-epure"

export function CarnetPage() {
  const cardRef = useRef<HTMLDivElement>(null)

  const [ceQueJePorte, setCeQueJePorte] = useState("")
  const [ceQueDieuEclaire, setCeQueDieuEclaire] = useState("")
  const [ceQueJeGarde, setCeQueJeGarde] = useState("")
  const [trace, setTrace] = useState("")

  const [saved, setSaved] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)

    if (!savedData) return

    try {
      const parsed = JSON.parse(savedData)

      setCeQueJePorte(parsed.ceQueJePorte ?? "")
      setCeQueDieuEclaire(parsed.ceQueDieuEclaire ?? "")
      setCeQueJeGarde(parsed.ceQueJeGarde ?? "")
      setTrace(parsed.trace ?? "")
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  function saveCarnet() {
    const data = {
      ceQueJePorte,
      ceQueDieuEclaire,
      ceQueJeGarde,
      trace,
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    addVictory("reflection_saved")

    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2200)
  }

  async function exportCard() {
    if (!cardRef.current) return

    try {
      setIsExporting(true)

      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#2b0b35",
      })

      const link = document.createElement("a")
      link.download = "mon-carnet-signature.png"
      link.href = dataUrl
      link.click()

      addVictory("image_exported")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="flex flex-col pb-8">
      {/* Header */}
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
          Un espace pour écrire simplement, voir plus clair et laisser Dieu
          remettre de la paix là où tout semble mélangé.
        </p>
      </section>

      {/* Reminder */}
      <section className="px-5 pb-6">
        <div className="rounded-3xl border border-gold/20 bg-champagne/40 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Heart className="h-5 w-5" strokeWidth={1.7} />
            </div>

            <div>
              <h2 className="font-serif text-xl text-foreground">
                Une phrase suffit
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Tu n’as pas besoin de tout expliquer. Écris ce qui est là,
                avec honnêteté, sans te juger.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
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
            description="Nommer ce que je commence à voir plus clairement."
          >
            <Textarea
              value={ceQueDieuEclaire}
              onChange={setCeQueDieuEclaire}
              placeholder="Je sens que Dieu met en lumière..."
            />
          </FieldGroup>

          <FieldGroup
            title="Ce que je veux garder"
            description="Retenir une vérité, une parole ou une direction."
          >
            <Textarea
              value={ceQueJeGarde}
              onChange={setCeQueJeGarde}
              placeholder="La vérité que je veux garder..."
            />
          </FieldGroup>

          <FieldGroup
            title="La trace que je veux laisser"
            description="Relier ce moment à la femme que je deviens."
          >
            <Textarea
              value={trace}
              onChange={setTrace}
              placeholder="Je veux laisser une trace de..."
            />
          </FieldGroup>
        </div>
      </section>

      {/* Save */}
      <section className="px-5 pb-6">
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

      {/* Export Card */}
      <section className="px-5 pb-6">
        <CarnetImageCard
          refElement={cardRef}
          ceQueJePorte={ceQueJePorte}
          ceQueDieuEclaire={ceQueDieuEclaire}
          ceQueJeGarde={ceQueJeGarde}
          trace={trace}
        />

        <button
          onClick={exportCard}
          disabled={isExporting}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-gold/30 bg-card px-5 py-3.5 text-sm font-semibold text-foreground shadow-sm transition-all duration-200 hover:border-gold/50 hover:shadow-md active:scale-[0.98] disabled:opacity-60"
        >
          <ImageDown className="h-4 w-4 text-primary" />
          {isExporting ? "Création de la carte..." : "Exporter ma carte"}
        </button>
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

function CarnetImageCard({
  refElement,
  ceQueJePorte,
  ceQueDieuEclaire,
  ceQueJeGarde,
  trace,
}: {
  refElement: RefObject<HTMLDivElement>
  ceQueJePorte: string
  ceQueDieuEclaire: string
  ceQueJeGarde: string
  trace: string
}) {
  return (
    <div
      ref={refElement}
      className="overflow-hidden rounded-[2rem] bg-[#2b0b35] p-0 shadow-sm"
      style={{
        background:
          "radial-gradient(circle at 82% 10%, rgba(166, 103, 111, 0.55), transparent 34%), linear-gradient(145deg, #2b0b35 0%, #4b143b 42%, #8a4f55 72%, #c58a45 100%)",
      }}
    >
      <div className="p-7">
        <div className="min-h-[780px] rounded-[1.7rem] border border-white/20 px-8 py-9">
          <div>
            <p className="text-[11px] uppercase tracking-[0.55em] text-white/70">
              Signature
            </p>

            <p className="mt-9 text-[12px] uppercase tracking-[0.45em] text-[#efe58e]">
              Carnet
            </p>

            <h2 className="mt-10 max-w-[420px] font-serif text-5xl leading-[1.08] text-[#fff8ee]">
              Ce que je dépose
            </h2>

            <div className="mt-8 h-[3px] w-28 rounded-full bg-[#efe58e]" />

            <div className="mt-10">
              <p className="font-serif text-[21px] italic leading-relaxed text-white/85">
                “Garde ton cœur plus que toute autre chose, car de lui viennent
                les sources de la vie.”
              </p>

              <p className="mt-2 text-[20px] text-[#efe58e]">
                Proverbes 4:23
              </p>
            </div>
          </div>

          <div className="mt-12 space-y-9">
            <CardLine
              title="Ce que je porte"
              content={
                ceQueJePorte ||
                "Je dépose ce qui occupe mon cœur, sans me juger."
              }
            />

            <CardLine
              title="Ce que Dieu éclaire"
              content={
                ceQueDieuEclaire ||
                "Je laisse Dieu remettre de la clarté dans ce que je traverse."
              }
            />

            <CardLine
              title="Ce que je veux garder"
              content={
                ceQueJeGarde ||
                "Je choisis de garder une vérité simple pour cette saison."
              }
            />

            <CardLine
              title="La trace que je veux laisser"
              content={
                trace ||
                "Je veux avancer avec foi, douceur et intention."
              }
            />

            <CardLine
              title="Prière"
              content="Seigneur, aide-moi à déposer ce que je porte et à recevoir ta paix, un pas à la fois."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function CardLine({
  title,
  content,
}: {
  title: string
  content: string
}) {
  return (
    <div>
      <p className="text-[12px] uppercase tracking-[0.38em] text-[#efe58e]">
        {title}
      </p>

      <p className="mt-3 text-[21px] leading-relaxed text-white/85">
        {content}
      </p>
    </div>
  )
}