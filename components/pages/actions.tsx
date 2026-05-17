"use client"

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react"
import { addVictory } from "@/lib/progress-store"
import { ShareToSisterCard } from "@/components/share-to-sister-card"
import {
  CheckCircle2,
  ImageDown,
  Heart,
  Sparkles,
  Footprints,
  Compass,
  ChevronDown,
} from "lucide-react"
import { toPng } from "html-to-image"

const STORAGE_KEY = "signature-actions-image"

const domaines = [
  "Foi",
  "Discipline",
  "Pensées",
  "Organisation",
  "Projet",
  "Relations",
  "Finances",
  "Santé",
  "Héritage",
]

export function ActionsPage() {
  const cardRef = useRef<HTMLDivElement>(null)

  const [domaine, setDomaine] = useState("Foi")
  const [intention, setIntention] = useState("")
  const [action, setAction] = useState("")
  const [aide, setAide] = useState("")
  const [remise, setRemise] = useState("")
  const [victoire, setVictoire] = useState("")

  const [saved, setSaved] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)

    if (!savedData) return

    try {
      const parsed = JSON.parse(savedData)

      setDomaine(parsed.domaine ?? "Foi")
      setIntention(parsed.intention ?? "")
      setAction(parsed.action ?? "")
      setAide(parsed.aide ?? "")
      setRemise(parsed.remise ?? "")
      setVictoire(parsed.victoire ?? "")
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  function saveActions() {
    const data = {
      domaine,
      intention,
      action,
      aide,
      remise,
      victoire,
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    addVictory("action_saved")

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
        backgroundColor: "#fdf8f2",
      })

      const link = document.createElement("a")
      link.download = "mon-petit-pas-signature.png"
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
            Actions
          </span>
          <span className="h-px w-8 bg-gold" />
        </div>

        <h1 className="font-serif text-3xl font-bold text-foreground">
          Poser un petit pas
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Choisis une action simple, réaliste et fidèle. Pas pour tout changer
          d’un coup, mais pour avancer avec intention.
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
                Un pas suffit
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Ce n’est pas la quantité qui compte. C’est la fidélité avec
                laquelle tu choisis de répondre à ce que Dieu travaille en toi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="px-5 pb-8">
        <div className="space-y-4">
          <FieldGroup title="Domaine">
            <div className="relative">
              <select
                value={domaine}
                onChange={(event) => setDomaine(event.target.value)}
                className="w-full appearance-none rounded-2xl border border-border bg-background px-4 py-3 pr-10 text-sm text-foreground outline-none transition-all duration-200 focus:border-gold/60 focus:ring-2 focus:ring-gold/10"
              >
                {domaines.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </FieldGroup>

          <FieldGroup title="Mon intention">
            <Textarea
              value={intention}
              onChange={setIntention}
              placeholder="Cette semaine, j’aimerais avancer dans..."
            />
          </FieldGroup>

          <FieldGroup title="Mon petit pas">
            <Textarea
              value={action}
              onChange={setAction}
              placeholder="Le petit pas que je choisis de poser..."
            />
          </FieldGroup>

          <FieldGroup title="Ce qui peut m’aider">
            <Textarea
              value={aide}
              onChange={setAide}
              placeholder="Pour rendre ce pas plus simple, je peux..."
            />
          </FieldGroup>

          <FieldGroup title="Ce que je remets à Dieu">
            <Textarea
              value={remise}
              onChange={setRemise}
              placeholder="Seigneur, je te remets..."
            />
          </FieldGroup>

          <FieldGroup title="Ma petite victoire">
            <Textarea
              value={victoire}
              onChange={setVictoire}
              placeholder="Même petite, ma victoire est..."
            />
          </FieldGroup>
        </div>
      </section>

      {/* Save */}
      <section className="px-5 pb-6">
        <button
          onClick={saveActions}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
        >
          <CheckCircle2 className="h-4 w-4" />
          {saved ? "Petit pas gardé" : "Garder mon petit pas"}
        </button>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          Ce petit pas reste dans ton espace personnel.
        </p>
      </section>

      {/* Export Card */}
      <section className="px-5 pb-6">
        <ActionImageCard
          refElement={cardRef}
          domaine={domaine}
          intention={intention}
          action={action}
          aide={aide}
          remise={remise}
          victoire={victoire}
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

      {/* Share to sister */}
      <section className="px-5 pb-8">
        <ShareToSisterCard action={action} surrender={remise} />
      </section>
    </div>
  )
}

function FieldGroup({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-4 shadow-sm">
      <h2 className="font-serif text-base font-semibold text-foreground">
        {title}
      </h2>

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

function ActionImageCard({
  refElement,
  domaine,
  intention,
  action,
  aide,
  remise,
  victoire,
}: {
  refElement: RefObject<HTMLDivElement>
  domaine: string
  intention: string
  action: string
  aide: string
  remise: string
  victoire: string
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
          {/* Header */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.55em] text-white/70">
              Signature
            </p>

            <p className="mt-9 text-[12px] uppercase tracking-[0.45em] text-[#efe58e]">
              Actions
            </p>

            <h2 className="mt-10 max-w-[420px] font-serif text-5xl leading-[1.08] text-[#fff8ee]">
              Poser un petit pas
            </h2>

            <div className="mt-8 h-[3px] w-28 rounded-full bg-[#efe58e]" />

            <div className="mt-10">
              <p className="font-serif text-[21px] italic leading-relaxed text-white/85">
                “Celui qui est fidèle dans les moindres choses l’est aussi dans
                les grandes.”
              </p>

              <p className="mt-2 text-[20px] text-[#efe58e]">Luc 16:10</p>
            </div>
          </div>

          {/* Content */}
          <div className="mt-12 space-y-9">
            <CardLine
              title="Domaine"
              content={domaine || "Foi"}
            />

            <CardLine
              title="Mon intention"
              content={
                intention || "Avancer avec douceur et constance dans cette saison."
              }
            />

            <CardLine
              title="Mon petit pas"
              content={
                action ||
                "Prendre un moment simple pour revenir à Dieu et poser mon intention."
              }
            />

            <CardLine
              title="Ce qui peut m’aider"
              content={
                aide || "Préparer un endroit calme et garder ce moment simple."
              }
            />

            <CardLine
              title="Ce que je remets à Dieu"
              content={
                remise ||
                "Mon besoin de tout contrôler et ma peur de ne pas être à la hauteur."
              }
            />

            <CardLine
              title="Ma petite victoire"
              content={
                victoire || "J’ai recommencé doucement, sans me juger."
              }
            />

            <CardLine
              title="Prière"
              content="Seigneur, apprends-moi à avancer avec fidélité, un petit pas à la fois."
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