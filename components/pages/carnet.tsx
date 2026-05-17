"use client"

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react"
import {
  Save,
  ChevronDown,
  ChevronUp,
  ImageDown,
  Heart,
} from "lucide-react"
import { toPng } from "html-to-image"
import { addVictory } from "@/lib/progress-store"

const wordChips = [
  "Sage",
  "Disciplinee",
  "Paisible",
  "Puissante",
  "Eduquee",
  "Structuree",
  "Excellente",
  "Fidele",
  "Courageuse",
  "Elegante",
  "Stable",
  "Intentionnelle",
  "Visionnaire",
  "Batisseuse",
]

const sections = [
  {
    id: "pensees",
    number: "01",
    title: "Ce que je porte",
    subtitle: "Déposer mes pensées sans me juger.",
    defaultOpen: true,
    fields: [
      "Quelles pensées reviennent souvent en moi en ce moment ?",
      "Qu’est-ce qui me pèse ?",
      "Quelle peur influence mes décisions ?",
      "Quelle croyance ai-je besoin de déposer ?",
      "Quelle vérité ai-je besoin de recevoir ?",
    ],
  },
  {
    id: "saison",
    number: "02",
    title: "Ma saison avec Dieu",
    subtitle: "Comprendre ce que Dieu travaille doucement en moi.",
    fields: [
      "Dans quelle saison spirituelle je me trouve ?",
      "Qu’est-ce que Dieu travaille dans mon caractère ?",
      "Qu’est-ce que Dieu m’invite à déposer ?",
      "Qu’est-ce que Dieu m’invite à construire ?",
      "Quelle obéissance simple puis-je poser cette semaine ?",
      "Ce que je remets à Dieu :",
    ],
  },
  {
    id: "femme",
    number: "03",
    title: "La femme que je deviens",
    subtitle: "Nommer ce que Dieu forme en moi.",
    fields: [
      "Je deviens une femme qui...",
      "Je veux grandir en...",
      "Je veux arrêter de...",
      "Je veux apprendre à...",
      "Je veux mieux gérer...",
    ],
  },
  {
    id: "heritage",
    number: "04",
    title: "Ce que je construis",
    subtitle: "Regarder plus loin que le moment présent.",
    fields: [
      "Quelle trace je veux laisser ?",
      "Qu’est-ce que je veux transmettre ?",
      "Quelle génération je veux contribuer à bâtir ?",
      "Quelles valeurs je veux incarner ?",
      "Si ma vie avait une signature, qu’est-ce qu’elle dirait ?",
    ],
  },
]

export function CarnetPage() {
  const cardRef = useRef<HTMLDivElement>(null)

  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [saved, setSaved] = useState(false)
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    const savedCarnet = localStorage.getItem("signature-carnet-image")

    if (!savedCarnet) return

    try {
      const parsed = JSON.parse(savedCarnet)

      setAnswers(parsed.answers || {})
      setSelectedWords(parsed.selectedWords || [])
    } catch {
      localStorage.removeItem("signature-carnet-image")
    }
  }, [])

  function updateAnswer(question: string, value: string) {
    setAnswers((prev) => ({
      ...prev,
      [question]: value,
    }))
  }

  function toggleWord(word: string) {
    setSelectedWords((prev) =>
      prev.includes(word)
        ? prev.filter((w) => w !== word)
        : prev.length < 3
          ? [...prev, word]
          : prev
    )
  }

  function handleSave() {
    localStorage.setItem(
      "signature-carnet-image",
      JSON.stringify({
        answers,
        selectedWords,
        createdAt: new Date().toISOString(),
      })
    )

    addVictory("reflection_saved")

    setSaved(true)
    setTimeout(() => setSaved(false), 2200)
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
      link.download = "mon-carnet-signature.png"
      link.href = dataUrl
      link.click()

      addVictory("image_exported")
    } catch (error) {
      console.error(error)
      alert("Impossible d’exporter le carnet en image.")
    } finally {
      setExporting(false)
    }
  }

  const mainThought =
    answers["Quelle vérité ai-je besoin de recevoir ?"] ||
    answers["Quelles pensées reviennent souvent en moi en ce moment ?"] ||
    "Je peux déposer mes pensées devant Dieu, sans peur et sans honte."

  const season =
    answers["Dans quelle saison spirituelle je me trouve ?"] ||
    answers["Qu’est-ce que Dieu travaille dans mon caractère ?"] ||
    "Une saison où Dieu construit doucement mon cœur."

  const becoming =
    answers["Je deviens une femme qui..."] ||
    "Je deviens une femme enracinée, paisible et intentionnelle."

  const legacy =
    answers["Si ma vie avait une signature, qu’est-ce qu’elle dirait ?"] ||
    answers["Quelle trace je veux laisser ?"] ||
    "Une vie qui laisse une trace de foi, de sagesse et d’amour."

  return (
    <div className="flex flex-col px-5 pt-12 pb-8">
      <div className="mb-1 flex items-center gap-2">
        <span className="h-px w-6 bg-gold" />

        <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
          Carnet
        </span>
      </div>

      <h1 className="font-serif text-2xl font-bold text-foreground">
        Déposer ce que je porte
      </h1>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Ce carnet n’est pas là pour te juger. Il est là pour t’aider à voir
        clair, une phrase à la fois.
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
              Tu n’as pas besoin de tout remplir aujourd’hui. Écris seulement ce
              qui te parle maintenant.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {sections.map((section) => (
          <Section
            key={section.id}
            title={section.title}
            subtitle={section.subtitle}
            number={section.number}
            defaultOpen={section.defaultOpen}
          >
            <div className="flex flex-col gap-4">
              {section.fields.map((question) => (
                <QuestionField
                  key={question}
                  question={question}
                  value={answers[question] || ""}
                  onChange={(value) => updateAnswer(question, value)}
                />
              ))}

              {section.id === "femme" && (
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-foreground">
                    Trois mots pour la femme que Dieu forme en moi
                  </label>

                  <p className="text-[10px] text-muted-foreground">
                    {selectedWords.length}/3 sélectionnés
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {wordChips.map((word) => {
                      const isSelected = selectedWords.includes(word)

                      return (
                        <button
                          key={word}
                          type="button"
                          onClick={() => toggleWord(word)}
                          className={`rounded-lg px-3 py-1.5 text-[11px] font-medium transition-all duration-200 ${
                            isSelected
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "border border-border bg-card text-muted-foreground hover:border-gold/40 hover:text-foreground"
                          }`}
                        >
                          {word}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </Section>
        ))}
      </div>

      <button
        onClick={handleSave}
        className={`mt-8 flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all duration-300 ${
          saved
            ? "bg-emerald/15 text-emerald border border-emerald/30"
            : "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
        }`}
      >
        <Save className="h-4 w-4" />
        {saved ? "Carnet gardé · +10 points" : "Garder mon carnet"}
      </button>

      {saved && (
        <p className="mt-3 text-center text-sm text-muted-foreground">
          C’est gardé. Un petit pas de clarté compte aussi.
        </p>
      )}

      <div className="mt-10 space-y-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Carte
          </p>

          <h2 className="mt-2 font-serif text-2xl font-bold text-foreground">
            Ma carte Carnet
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Une image douce pour relire ce que Dieu forme en toi.
          </p>
        </div>

        <div className="flex justify-center">
          <SignatureCard refElement={cardRef}>
            <CardHeader
              eyebrow="Carnet Signature"
              title="Ce que Dieu forme en moi"
              verse="Garde ton cœur plus que toute autre chose."
              reference="Proverbes 4:23"
            />

            <CardBlock title="Ce que je dépose" text={mainThought} />
            <CardBlock title="Ma saison avec Dieu" text={season} />
            <CardBlock title="La femme que je deviens" text={becoming} />

            <CardBlock
              title="Trois mots"
              text={
                selectedWords.length > 0
                  ? selectedWords.join(" · ")
                  : "Paisible · Stable · Intentionnelle"
              }
            />

            <CardBlock title="Ce que je construis" text={legacy} />
          </SignatureCard>
        </div>

        <button
          onClick={handleExportImage}
          disabled={exporting}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card py-3.5 text-sm font-semibold text-foreground shadow-sm transition-all duration-200 hover:border-gold/40 hover:shadow-md active:scale-[0.98] disabled:opacity-60"
        >
          <ImageDown className="h-4 w-4" />
          {exporting ? "Exportation..." : "Exporter mon carnet · +5 points"}
        </button>
      </div>
    </div>
  )
}

function Section({
  title,
  subtitle,
  number,
  defaultOpen = false,
  children,
}: {
  title: string
  subtitle: string
  number: string
  defaultOpen?: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm transition-all duration-200">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-5"
        aria-expanded={open}
      >
        <div className="flex items-start gap-3 text-left">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary text-[10px] font-bold text-plum">
            {number}
          </span>

          <div>
            <h3 className="font-serif text-sm font-semibold text-foreground">
              {title}
            </h3>

            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          </div>
        </div>

        {open ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        )}
      </button>

      {open && <div className="border-t border-border px-5 py-5">{children}</div>}
    </div>
  )
}

function QuestionField({
  question,
  value,
  onChange,
}: {
  question: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium leading-relaxed text-foreground">
        {question}
      </label>

      <textarea
        rows={2}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Écris une phrase, même courte..."
        className="resize-none rounded-xl border border-input bg-background px-3 py-2.5 text-xs leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:ring-1 focus:ring-gold/30 focus:outline-none transition-all duration-200"
      />
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
        minHeight: "660px",
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
          minHeight: "616px",
          border: "1px solid rgba(255,255,255,0.22)",
          borderRadius: "26px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "22px",
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