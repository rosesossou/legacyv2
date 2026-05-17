 "use client"

import { useEffect, useState } from "react"
import {
  ArrowLeft,
  Check,
  Heart,
  Leaf,
  Sparkles,
  Target,
} from "lucide-react"

const STORAGE_KEY = "signature-mon-chemin"

const domaines = [
  "Ma relation avec Dieu",
  "Mes pensées",
  "Ma discipline",
  "Mes projets",
  "Mes relations",
  "Mes finances",
  "Mon organisation",
  "Mon héritage",
]

const rythmes = [
  {
    id: "doux",
    title: "Doux",
    description: "Un petit pas par semaine.",
  },
  {
    id: "stable",
    title: "Stable",
    description: "Deux à trois petits pas par semaine.",
  },
  {
    id: "intentionnel",
    title: "Intentionnel",
    description: "Un petit pas simple chaque jour.",
  },
]

interface MonCheminPageProps {
  onBack: () => void
}

export function MonCheminPage({ onBack }: MonCheminPageProps) {
  const [selectedDomaines, setSelectedDomaines] = useState<string[]>([])
  const [rythme, setRythme] = useState("doux")
  const [intention, setIntention] = useState("")
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)

    if (!savedData) return

    try {
      const parsed = JSON.parse(savedData)

      setSelectedDomaines(parsed.selectedDomaines ?? [])
      setRythme(parsed.rythme ?? "doux")
      setIntention(parsed.intention ?? "")
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  function toggleDomaine(domaine: string) {
    setSelectedDomaines((current) => {
      if (current.includes(domaine)) {
        return current.filter((item) => item !== domaine)
      }

      if (current.length >= 3) {
        return current
      }

      return [...current, domaine]
    })
  }

  function savePath() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        selectedDomaines,
        rythme,
        intention,
        updatedAt: new Date().toISOString(),
      })
    )

    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2200)
  }

  return (
    <div className="min-h-screen bg-background pb-10">
      <section className="px-5 pt-10 pb-8">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à l’accueil
        </button>

        <div className="text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-gold" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Mon chemin
            </span>
            <span className="h-px w-8 bg-gold" />
          </div>

          <h1 className="font-serif text-3xl font-bold text-foreground">
            Personnaliser mon chemin
          </h1>

          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Choisis ce que tu veux cultiver dans cette saison. Pas pour tout
            porter, mais pour avancer avec clarté et douceur.
          </p>
        </div>
      </section>

      <section className="px-5 pb-6">
        <div className="rounded-3xl border border-gold/20 bg-champagne/40 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Leaf className="h-5 w-5" strokeWidth={1.7} />
            </div>

            <div>
              <h2 className="font-serif text-xl text-foreground">
                Une saison à la fois
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Tu n’as pas besoin de tout travailler maintenant. Trois domaines
                suffisent pour garder ton chemin léger.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-6">
        <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Target className="h-5 w-5" strokeWidth={1.7} />
            </div>

            <div>
              <h2 className="font-serif text-xl text-foreground">
                Mes domaines de croissance
              </h2>

              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Choisis jusqu’à 3 domaines pour cette saison.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-2">
            {domaines.map((domaine) => {
              const isSelected = selectedDomaines.includes(domaine)

              return (
                <button
                  key={domaine}
                  onClick={() => toggleDomaine(domaine)}
                  className={[
                    "flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition-all duration-200",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:border-gold/50",
                  ].join(" ")}
                >
                  <span>{domaine}</span>

                  {isSelected && <Check className="h-4 w-4" />}
                </button>
              )
            })}
          </div>

          {selectedDomaines.length >= 3 && (
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Trois domaines suffisent. Tu pourras ajuster plus tard.
            </p>
          )}
        </div>
      </section>

      <section className="px-5 pb-6">
        <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" strokeWidth={1.7} />
            </div>

            <div>
              <h2 className="font-serif text-xl text-foreground">
                Mon rythme doux
              </h2>

              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Choisis un rythme réaliste, pas impressionnant.
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {rythmes.map((item) => {
              const isSelected = rythme === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => setRythme(item.id)}
                  className={[
                    "w-full rounded-2xl border p-4 text-left transition-all duration-200",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:border-gold/50",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-serif text-base font-semibold">
                      {item.title}
                    </p>

                    {isSelected && <Check className="h-4 w-4" />}
                  </div>

                  <p
                    className={[
                      "mt-1 text-xs leading-relaxed",
                      isSelected
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground",
                    ].join(" ")}
                  >
                    {item.description}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pb-6">
        <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Heart className="h-5 w-5" strokeWidth={1.7} />
            </div>

            <div>
              <h2 className="font-serif text-xl text-foreground">
                Mon intention de saison
              </h2>

              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Une phrase simple pour donner une direction à ton chemin.
              </p>
            </div>
          </div>

          <textarea
            value={intention}
            onChange={(event) => setIntention(event.target.value)}
            placeholder="Dans cette saison, je veux apprendre à..."
            rows={4}
            className="mt-5 w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/70 focus:border-gold/60 focus:ring-2 focus:ring-gold/10"
          />
        </div>
      </section>

      <section className="px-5 pb-8">
        <button
          onClick={savePath}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
        >
          <Check className="h-4 w-4" />
          {saved ? "Chemin gardé" : "Garder mon chemin"}
        </button>

        <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
          Tu pourras revenir ajuster ton chemin quand ta saison changera.
        </p>
      </section>
    </div>
  )
}