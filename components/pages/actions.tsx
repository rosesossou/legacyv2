"use client"

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react"
import { addVictory } from "@/lib/progress-store"
import {
  ChevronDown,
  CheckCircle2,
  ImageDown,
  Heart,
  Sparkles,
  Brain,
  Sun,
  Compass,
  Footprints,
  Building2,
} from "lucide-react"
import { toPng } from "html-to-image"

const domaines = [
  "Pensées",
  "Foi",
  "Discipline",
  "Finances",
  "Relations",
  "Santé",
  "Organisation",
  "Éducation",
  "Projet",
  "Héritage",
]

const fields = [
  {
    key: "intention",
    label: "Ce que je veux vivre avec Dieu dans ce domaine",
    placeholder: "Ex: avancer avec moins de peur, plus de paix, plus de fidélité...",
  },
  {
    key: "femme",
    label: "La femme que je sens que Dieu forme en moi",
    placeholder: "Ex: une femme stable, fidèle, paisible, courageuse...",
  },
  {
    key: "action",
    label: "Mon petit pas fidèle",
    placeholder: "Ex: écrire une vérité chaque matin, ranger un espace, appeler une personne...",
  },
  {
    key: "declencheur",
    label: "Je vais le faire après...",
    placeholder: "Ex: ma prière du matin, le dîner, ma douche, avant de dormir...",
  },
  {
    key: "blocage",
    label: "Ce qui pourrait me ralentir",
    placeholder: "Ex: fatigue, peur, oubli, perfectionnisme...",
  },
  {
    key: "simplifier",
    label: "Comment je peux rendre ce pas plus simple",
    placeholder: "Ex: le réduire à 5 minutes, préparer la veille, commencer petit...",
  },
  {
    key: "remise",
    label: "Ce que je remets à Dieu",
    placeholder: "Ex: mon besoin de contrôle, ma peur d’échouer, mon impatience...",
  },
  {
    key: "avant",
    label: "Avant, j’étais / je faisais...",
    placeholder: "Ex: je repoussais souvent ce petit pas...",
  },
  {
    key: "maintenant",
    label: "Maintenant, je remarque que...",
    placeholder: "Ex: j’arrive à avancer même doucement...",
  },
  {
    key: "victoire",
    label: "Ma victoire à célébrer",
    placeholder: "Ex: j’ai été fidèle à mon engagement cette semaine...",
  },
]

const examples = [
  {
    domaine: "Pensées",
    intention: "Sortir d’une pensée de peur",
    action: "Écrire une vérité chaque matin",
    declencheur: "Après ma prière",
  },
  {
    domaine: "Finances",
    intention: "Gérer mes ressources avec sagesse",
    action: "Noter une dépense par jour",
    declencheur: "Après le dîner",
  },
  {
    domaine: "Éducation",
    intention: "Apprendre avec discipline",
    action: "Lire 2 pages par jour",
    declencheur: "Avant de dormir",
  },
]

const signatureItems = [
  {
    icon: Brain,
    label: "Mes pensées à transformer",
    value: "Identifier et remplacer les pensées limitantes",
  },
  {
    icon: Sun,
    label: "Ma saison avec Dieu",
    value: "Saison de construction et de patience",
  },
  {
    icon: Sparkles,
    label: "La femme que je deviens",
    value: "Intentionnelle, disciplinée, bâtisseuse",
  },
  {
    icon: Compass,
    label: "Mon pilier prioritaire",
    value: "Discipline & petits pas",
  },
  {
    icon: Footprints,
    label: "Mon petit pas de la semaine",
    value: "Écrire une vérité chaque matin",
  },
  {
    icon: Building2,
    label: "L’héritage que je veux construire",
    value: "Transmettre la sagesse et la foi",
  },
]

export function ActionsPage() {
  const cardRef = useRef<HTMLDivElement>(null)

  const [selectedDomaine, setSelectedDomaine] = useState("")
  const [showDomaines, setShowDomaines] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showExamples, setShowExamples] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    const savedActions = localStorage.getItem("signature-actions-image")

    if (!savedActions) return

    try {
      const parsed = JSON.parse(savedActions)
      setSelectedDomaine(parsed.selectedDomaine || "")
      setAnswers(parsed.answers || {})
    } catch {
      localStorage.removeItem("signature-actions-image")
    }
  }, [])

  function updateAnswer(key: string, value: string) {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  function handleSaveAction() {
    localStorage.setItem(
      "signature-actions-image",
      JSON.stringify({
        selectedDomaine,
        answers,
        createdAt: new Date().toISOString(),
      })
    )

    addVictory("action_saved")

    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2200)
  }

  async function handleExportImage() {
    if (!cardRef.current) return

    try {
      setExporting(true)

      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#2b102f",
      })

      const link = document.createElement("a")
      link.download = "mes-actions-signature.png"
      link.href = dataUrl
      link.click()

      addVictory("image_exported")
    } catch (error) {
      console.error(error)
      alert("Impossible d’exporter les actions en image.")
    } finally {
      setExporting(false)
    }
  }

  const intention =
    answers.intention || "Avancer avec sagesse dans le domaine que Dieu me confie."

  const action =
    answers.action || "Poser un petit pas simple, concret et fidèle cette semaine."

  const declencheur = answers.declencheur || "Après mon temps avec Dieu."

  const simplifier =
    answers.simplifier || "Je rends ce petit pas plus simple pour pouvoir le tenir."

  const remise =
    answers.remise || "Je remets au Seigneur mon besoin de tout contrôler."

  const avant =
    answers.avant || "Avant, j’avançais parfois sans voir mes progrès."

  const maintenant =
    answers.maintenant ||
    "Maintenant, je remarque que Dieu m’apprend à avancer doucement."

  const victoire =
    answers.victoire || "Je célèbre un petit pas posé avec fidélité."

  return (
    <div className="flex flex-col px-5 pt-12 pb-8">
      <div className="mb-1 flex items-center gap-2">
        <span className="h-px w-6 bg-gold" />

        <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
          Actions
        </span>
      </div>

      <h1 className="font-serif text-2xl font-bold text-foreground">
        Poser un petit pas
      </h1>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Tu n’as pas besoin de tout changer aujourd’hui. Choisis un pas simple,
        réaliste, fidèle. Dieu travaille aussi dans les petites obéissances.
      </p>

      <div className="mt-6 rounded-3xl border border-gold/20 bg-champagne/40 p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Heart className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">
              Petit rappel
            </p>

            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Ce n’est pas la taille du pas qui compte, c’est la fidélité avec
              laquelle tu avances.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-foreground">
            Domaine où je veux avancer doucement
          </label>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDomaines(!showDomaines)}
              className="flex w-full items-center justify-between rounded-xl border border-input bg-background px-3 py-2.5 text-xs text-foreground transition-all duration-200 focus:border-gold focus:ring-1 focus:ring-gold/30 focus:outline-none"
            >
              <span
                className={
                  selectedDomaine
                    ? "text-foreground"
                    : "text-muted-foreground/50"
                }
              >
                {selectedDomaine || "Choisir un domaine"}
              </span>

              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </button>

            {showDomaines && (
              <div className="absolute top-full left-0 z-10 mt-1 w-full rounded-xl border border-border bg-card p-1.5 shadow-lg">
                {domaines.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => {
                      setSelectedDomaine(d)
                      setShowDomaines(false)
                    }}
                    className={`w-full rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                      selectedDomaine === d
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {fields.map((field) => (
          <div key={field.key} className="flex flex-col gap-2">
            <label className="text-xs font-medium text-foreground">
              {field.label}
            </label>

            <textarea
              rows={2}
              value={answers[field.key] || ""}
              onChange={(event) => updateAnswer(field.key, event.target.value)}
              placeholder={field.placeholder}
              className="resize-none rounded-xl border border-input bg-background px-3 py-2.5 text-xs leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:ring-1 focus:ring-gold/30 focus:outline-none transition-all duration-200"
            />
          </div>
        ))}

        <button
          onClick={handleSaveAction}
          className={`mt-2 flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all duration-300 ${
            submitted
              ? "border border-emerald/30 bg-emerald/15 text-emerald"
              : "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
          }`}
        >
          {submitted ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Petit pas gardé · +15 points
            </>
          ) : (
            "Garder mon petit pas"
          )}
        </button>

        {submitted && (
          <p className="text-center text-sm text-muted-foreground">
            Victoire célébrée. Tu avances, même doucement.
          </p>
        )}
      </div>

      <div className="mt-10">
        <button
          onClick={() => setShowExamples(!showExamples)}
          className="flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${
              showExamples ? "rotate-180" : ""
            }`}
          />
          Voir des exemples doux
        </button>

        {showExamples && (
          <div className="mt-4 flex flex-col gap-3">
            {examples.map((ex) => (
              <div
                key={ex.domaine}
                className="rounded-xl border border-border bg-card p-4 shadow-sm"
              >
                <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-plum">
                  {ex.domaine}
                </span>

                <p className="mt-2 text-xs font-medium text-foreground">
                  {ex.intention}
                </p>

                <p className="mt-1 text-[11px] text-muted-foreground">
                  Action : {ex.action}
                </p>

                <p className="text-[11px] text-muted-foreground">
                  Déclencheur : {ex.declencheur}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10">
        <div className="mb-1 flex items-center gap-2">
          <span className="h-px w-6 bg-gold" />

          <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
            Synthèse
          </span>
        </div>

        <h2 className="font-serif text-xl font-bold text-foreground">
          Ma Signature
        </h2>

        <div className="mt-5 overflow-hidden rounded-2xl border border-gold/20 bg-card shadow-sm">
          {signatureItems.map((item, i) => (
            <div
              key={item.label}
              className={`flex items-start gap-3 px-5 py-4 ${
                i < signatureItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-champagne/60">
                <item.icon
                  className="h-4 w-4 text-burgundy"
                  strokeWidth={1.6}
                />
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </span>

                <p className="text-xs leading-relaxed text-foreground">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 space-y-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Carte
          </p>

          <h2 className="mt-2 font-serif text-2xl font-bold text-foreground">
            Ma carte Actions
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Une image pour célébrer ton petit pas et voir ton avant/après.
          </p>
        </div>

        <div className="flex justify-center">
          <SignatureCard refElement={cardRef}>
            <CardHeader
              eyebrow="Actions Signature"
              title="Mon petit pas fidèle"
              verse="Celui qui est fidèle dans les moindres choses l’est aussi dans les grandes."
              reference="Luc 16:10"
            />

            <CardBlock
              title="Domaine prioritaire"
              text={selectedDomaine || "Discipline"}
            />

            <CardBlock title="Mon intention" text={intention} />
            <CardBlock title="Mon petit pas" text={action} />
            <CardBlock title="Mon déclencheur" text={declencheur} />
            <CardBlock title="Avant" text={avant} />
            <CardBlock title="Maintenant" text={maintenant} />
            <CardBlock title="Ma victoire" text={victoire} />
            <CardBlock title="Je simplifie en..." text={simplifier} />
            <CardBlock title="Ce que je remets à Dieu" text={remise} />
          </SignatureCard>
        </div>

        <button
          onClick={handleExportImage}
          disabled={exporting}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card py-3.5 text-sm font-semibold text-foreground shadow-sm transition-all duration-200 hover:border-gold/40 hover:shadow-md active:scale-[0.98] disabled:opacity-60"
        >
          <ImageDown className="h-4 w-4" />
          {exporting ? "Exportation..." : "Exporter ma carte Actions · +5 points"}
        </button>
      </div>
    </div>
  )
}

function SignatureCard({
  refElement,
  children,
}: {
  refElement: RefObject<HTMLDivElement | null>
  children: ReactNode
}) {
  return (
    <div
      ref={refElement}
      style={{
        width: "360px",
        minHeight: "740px",
        background:
          "linear-gradient(145deg, #2b102f 0%, #5c1835 48%, #b9824b 100%)",
        color: "white",
        borderRadius: "32px",
        padding: "22px",
        boxShadow: "0 30px 80px rgba(43, 16, 47, 0.35)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "220px",
          height: "220px",
          borderRadius: "999px",
          background: "rgba(244, 217, 148, 0.22)",
          filter: "blur(10px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "-80px",
          width: "240px",
          height: "240px",
          borderRadius: "999px",
          background: "rgba(255, 255, 255, 0.12)",
          filter: "blur(14px)",
        }}
      />

      <div
        style={{
          minHeight: "696px",
          border: "1px solid rgba(255,255,255,0.22)",
          borderRadius: "26px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          position: "relative",
          zIndex: 2,
          background: "rgba(0,0,0,0.14)",
        }}
      >
        {children}
      </div>
    </div>
  )
}

function CardHeader({
  eyebrow,
  title,
  verse,
  reference,
}: {
  eyebrow: string
  title: string
  verse: string
  reference: string
}) {
  return (
    <div>
      <p
        style={{
          fontSize: "11px",
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.72)",
          margin: 0,
        }}
      >
        Signature
      </p>

      <p
        style={{
          fontSize: "11px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#f4d994",
          marginTop: "14px",
          marginBottom: 0,
        }}
      >
        {eyebrow}
      </p>

      <h2
        style={{
          fontFamily: "serif",
          fontSize: "32px",
          lineHeight: "1.05",
          marginTop: "26px",
          marginBottom: 0,
          color: "#fff7e6",
        }}
      >
        {title}
      </h2>

      <div
        style={{
          width: "56px",
          height: "2px",
          background: "#f4d994",
          marginTop: "22px",
          marginBottom: "22px",
        }}
      />

      <p
        style={{
          fontSize: "15px",
          lineHeight: "1.55",
          fontStyle: "italic",
          color: "rgba(255,255,255,0.92)",
          margin: 0,
        }}
      >
        “{verse}”
        <br />

        <span style={{ color: "#f4d994", fontStyle: "normal" }}>
          {reference}
        </span>
      </p>
    </div>
  )
}

function CardBlock({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <p
        style={{
          fontSize: "10px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#f4d994",
          marginBottom: "6px",
        }}
      >
        {title}
      </p>

      <p
        style={{
          fontSize: "13px",
          lineHeight: "1.45",
          color: "rgba(255,255,255,0.9)",
          margin: 0,
          whiteSpace: "pre-wrap",
        }}
      >
        {text}
      </p>
    </div>
  )
}