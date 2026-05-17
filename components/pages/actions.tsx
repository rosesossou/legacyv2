"use client"

import { useEffect, useState, type ReactNode } from "react"
import { addVictory } from "@/lib/progress-store"
import { CheckCircle2, Heart } from "lucide-react"
import { SignatureDownloadCard } from "@/components/signature-download-card"
const STORAGE_KEY = "signature-actions-mvp"

export function ActionsPage() {
  const [action, setAction] = useState("")
  const [aide, setAide] = useState("")
  const [remise, setRemise] = useState("")
  const [victoire, setVictoire] = useState("")

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)

    if (!savedData) return

    try {
      const parsed = JSON.parse(savedData)

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

  return (
    <div className="flex flex-col pb-8">
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
          Une action simple suffit. L’objectif n’est pas de tout changer, mais
          de répondre fidèlement à ce que Dieu travaille en toi.
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
                Un pas suffit
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Choisis un pas si petit qu’il devient possible aujourd’hui.
              </p>
              <div className="mt-4 rounded-2xl bg-background/70 px-4 py-3">
  <p className="font-serif text-sm leading-relaxed text-foreground">
    “Qui méprise le jour des faibles commencements ?”
  </p>
  <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-gold">
    Zacharie 4:10
  </p>
</div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-8">
        <div className="space-y-4">
          <FieldGroup
            title="Mon petit pas"
            description="Une action simple, réaliste et fidèle."
          >
            <Textarea
              value={action}
              onChange={setAction}
              placeholder="Aujourd’hui, je peux..."
            />
          </FieldGroup>

          <FieldGroup
            title="Ce qui peut m’aider"
            description="Rendre ce pas plus léger et plus accessible."
          >
            <Textarea
              value={aide}
              onChange={setAide}
              placeholder="Pour m’aider, je peux..."
            />
          </FieldGroup>

          <FieldGroup
            title="Ce que je remets à Dieu"
            description="Ce que je ne veux pas porter seule."
          >
            <Textarea
              value={remise}
              onChange={setRemise}
              placeholder="Seigneur, je te remets..."
            />
          </FieldGroup>

          <FieldGroup
            title="Ma petite victoire"
            description="Même un recommencement peut être une victoire."
          >
            <Textarea
              value={victoire}
              onChange={setVictoire}
              placeholder="Ma petite victoire aujourd’hui..."
            />
          </FieldGroup>
        </div>
      </section>

      <section className="px-5 pb-8">
        <button
          onClick={saveActions}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
        >
          <CheckCircle2 className="h-4 w-4" />
          {saved ? "Petit pas gardé" : "Garder mon petit pas"}
        </button>
        <SignatureDownloadCard
  title="Mon petit pas"
  subtitle="Une action simple, fidèle et possible aujourd’hui."
  verse="Qui méprise le jour des faibles commencements ?"
  reference="Zacharie 4:10"
  fileName="signature-actions"
  lines={[
    { label: "Mon petit pas", value: action },
    { label: "Ce qui peut m’aider", value: aide },
    { label: "Ce que je remets à Dieu", value: remise },
    { label: "Ma petite victoire", value: victoire },
  ]}
/>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Ce petit pas reste dans ton espace personnel.
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