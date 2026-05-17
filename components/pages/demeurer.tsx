"use client"

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react"
import { CheckCircle2, Heart, ImageDown } from "lucide-react"
import { toPng } from "html-to-image"
import { addVictory } from "@/lib/progress-store"

const STORAGE_KEY = "signature-demeurer-refuge"

export function DemeurerPage() {
  const cardRef = useRef<HTMLDivElement>(null)

  const [depot, setDepot] = useState("")
  const [recevoir, setRecevoir] = useState("")
  const [parole, setParole] = useState("")
  const [priere, setPriere] = useState("")

  const [saved, setSaved] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

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
      link.download = "ma-carte-demeurer.png"
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

      {/* Reminder */}
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

      {/* Form */}
      <section className="px-5 pb-8">
        <div className="space-y-4">
          <FieldGroup
            title="Ce que je viens déposer devant Dieu"
            description="Nommer simplement ce qui pèse, ce qui fatigue ou ce qui occupe mon cœur."
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

      {/* Save */}
      <section className="px-5 pb-6">
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

      {/* Export Card */}
      <section className="px-5 pb-6">
        <DemeurerImageCard
          refElement={cardRef}
          depot={depot}
          recevoir={recevoir}
          parole={parole}
          priere={priere}
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

function DemeurerImageCard({
  refElement,
  depot,
  recevoir,
  parole,
  priere,
}: {
  refElement: RefObject<HTMLDivElement>
  depot: string
  recevoir: string
  parole: string
  priere: string
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
              Demeurer
            </p>

            <h2 className="mt-10 max-w-[420px] font-serif text-5xl leading-[1.08] text-[#fff8ee]">
              Revenir doucement à Dieu
            </h2>

            <div className="mt-8 h-[3px] w-28 rounded-full bg-[#efe58e]" />

            <div className="mt-10">
              <p className="font-serif text-[21px] italic leading-relaxed text-white/85">
                “Approchez-vous de Dieu, et il s’approchera de vous.”
              </p>

              <p className="mt-2 text-[20px] text-[#efe58e]">Jacques 4:8</p>
            </div>
          </div>

          <div className="mt-12 space-y-9">
            <CardLine
              title="Ce que je dépose"
              content={
                depot ||
                "Je viens déposer ce qui pèse sur mon cœur, sans me cacher."
              }
            />

            <CardLine
              title="Ce que je veux recevoir"
              content={
                recevoir ||
                "Je veux recevoir la paix, la clarté et le repos que Dieu donne."
              }
            />

            <CardLine
              title="Une parole à méditer"
              content={
                parole ||
                "Je garde une parole de Dieu comme point d’ancrage pour cette journée."
              }
            />

            <CardLine
              title="Ma prière"
              content={
                priere ||
                "Seigneur, aide-moi à revenir à toi avec confiance, simplement."
              }
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