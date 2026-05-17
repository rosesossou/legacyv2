"use client"

import { useEffect, useRef, useState } from "react"
import { addVictory } from "@/lib/progress-store"
import {
  ChevronDown,
  CheckCircle2,
  ImageDown,
  Sparkles,
  Brain,
  Sun,
  Compass,
  Footprints,
  Building2,
} from "lucide-react"
import { toPng } from "html-to-image"

const domaines = [
  "Pensees",
  "Foi",
  "Discipline",
  "Finances",
  "Relations",
  "Sante",
  "Organisation",
  "Education",
  "Projet",
  "Heritage",
]

const fields = [
  {
    key: "intention",
    label: "Mon intention du mois",
    placeholder: "Ex: Sortir d'une pensee de peur",
  },
  {
    key: "femme",
    label: "La femme que je veux devenir dans ce domaine",
    placeholder: "Ex: Une femme libre et ancree dans la verite",
  },
  {
    key: "action",
    label: "Ma petite action de la semaine",
    placeholder: "Ex: Ecrire une verite chaque matin",
  },
  {
    key: "declencheur",
    label: "Je vais le faire apres...",
    placeholder: "Ex: Apres ma priere du matin",
  },
  {
    key: "blocage",
    label: "Ce qui pourrait me bloquer",
    placeholder: "Ex: La fatigue, le manque de temps",
  },
  {
    key: "simplifier",
    label: "Comment je peux simplifier",
    placeholder: "Ex: Preparer mon carnet la veille",
  },
  {
    key: "remise",
    label: "Ce que je remets a Dieu",
    placeholder: "Ex: Mon besoin de controle",
  },
  {
    key: "avant",
    label: "Avant, j’étais / je faisais...",
    placeholder: "Ex: Je repoussais toujours ce petit pas",
  },
  {
    key: "maintenant",
    label: "Maintenant, je remarque que...",
    placeholder:
      "Ex: J’arrive à poser une action simple sans attendre d’être prête",
  },
  {
    key: "victoire",
    label: "Ma victoire à célébrer",
    placeholder: "Ex: J’ai été fidèle à mon engagement cette semaine",
  },
]

const examples = [
  {
    domaine: "Pensees",
    intention: "Sortir d'une pensee de peur",
    action: "Ecrire une verite chaque matin",
    declencheur: "Apres ma priere",
  },
  {
    domaine: "Finances",
    intention: "Gerer mes ressources avec sagesse",
    action: "Noter une depense par jour",
    declencheur: "Apres le diner",
  },
  {
    domaine: "Education",
    intention: "Devenir une femme qui apprend avec discipline",
    action: "Lire 2 pages par jour",
    declencheur: "Avant de dormir",
  },
]

const signatureItems = [
  {
    icon: Brain,
    label: "Mes pensees a transformer",
    value: "Identifier et remplacer les pensees limitantes",
  },
  {
    icon: Sun,
    label: "Ma saison avec Dieu",
    value: "Saison de construction et de patience",
  },
  {
    icon: Sparkles,
    label: "La femme que je deviens",
    value: "Intentionnelle, disciplinee, batisseuse",
  },
  {
    icon: Compass,
    label: "Mon pilier prioritaire",
    value: "Discipline & petits pas",
  },
  {
    icon: Footprints,
    label: "Mon petit pas de la semaine",
    value: "Ecrire une verite chaque matin",
  },
  {
    icon: Building2,
    label: "L'heritage que je veux construire",
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
    setTimeout(() => setSubmitted(false), 2000)
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

  const remise =
    answers.remise || "Je remets au Seigneur mon besoin de tout contrôler."

  const avant =
    answers.avant || "Je partais souvent dans l’élan, sans mesurer ma progression."

  const maintenant =
    answers.maintenant || "Je vois que Dieu m’apprend à avancer avec fidélité."

  const victoire =
    answers.victoire || "Je célèbre un petit pas posé avec intention."

  return (
    <div className="flex flex-col px-5 pt-12 pb-8">
      <div className="mb-1 flex items-center gap-2">
        <span className="h-px w-6 bg-gold" />

        <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
          Passer a l&apos;action
        </span>
      </div>

      <h1 className="font-serif text-2xl font-bold text-foreground">
        Mes petits pas
      </h1>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Transformer l&apos;inspiration et la reflexion en comportement.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-foreground">
            Domaine prioritaire
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
              Petit pas enregistré · +15 points
            </>
          ) : (
            "Choisir mon petit pas"
          )}
        </button>
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
          Voir des exemples
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
                  Declencheur : {ex.declencheur}
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
            Synthese
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
            Cette image reprend ton petit pas, ton avant/après et ta victoire.
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
            <CardBlock title="Ce que je remets à Dieu" text={remise} />
          </SignatureCard>
        </div>

        <button
          onClick={handleExportImage}
          disabled={exporting}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card py-3.5 text-sm font-semibold text-foreground shadow-sm transition-all duration-200 hover:border-gold/40 hover:shadow-md active:scale-[0.98] disabled:opacity-60"
        >
          <ImageDown className="h-4 w-4" />
          {exporting
            ? "Exportation..."
            : "Exporter mes actions en image · +5 points"}
        </button>
      </div>
    </div>
  )
}

function SignatureCard({
  refElement,
  children,
}: {
  refElement: React.RefObject<HTMLDivElement | null>
  children: React.ReactNode
}) {
  return (
    <div
      ref={refElement}
      style={{
        width: "360px",
        minHeight: "720px",
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
          minHeight: "676px",
          border: "1px solid rgba(255,255,255,0.22)",
          borderRadius: "26px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
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