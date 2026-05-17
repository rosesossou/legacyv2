"use client"
import { addVictory } from "@/lib/progress-store"
import { useEffect, useRef, useState } from "react"
import {
  Save,
  ChevronDown,
  ChevronUp,
  ImageDown,
  Sparkles,
} from "lucide-react"
import { toPng } from "html-to-image"

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

const questions = [
  {
    id: "pensees",
    number: "01",
    title: "Mes pensees actuelles",
    defaultOpen: true,
    fields: [
      "Quelles pensees reviennent souvent en moi en ce moment ?",
      "Qu'est-ce qui me pese ?",
      "Quelle peur influence mes decisions ?",
      "Quelle croyance dois-je deconstruire ?",
      "Quelle verite dois-je commencer a croire ?",
    ],
  },
  {
    id: "saison",
    number: "02",
    title: "Ma saison avec Dieu",
    fields: [
      "Dans quelle saison spirituelle je me trouve ?",
      "Qu'est-ce que Dieu travaille dans mon caractere ?",
      "Qu'est-ce que Dieu m'invite a deposer ?",
      "Qu'est-ce que Dieu m'invite a construire ?",
      "Quelle obeissance simple puis-je poser cette semaine ?",
      "Ce que je remets a Dieu :",
    ],
  },
  {
    id: "femme",
    number: "03",
    title: "La femme que je deviens",
    fields: [
      "Je deviens une femme qui...",
      "Je veux grandir en...",
      "Je veux arreter de...",
      "Je veux apprendre a...",
      "Je veux mieux gerer...",
    ],
  },
  {
    id: "heritage",
    number: "04",
    title: "Mon heritage",
    fields: [
      "Quelle trace je veux laisser ?",
      "Qu'est-ce que je veux transmettre ?",
      "Quelle generation je veux contribuer a batir ?",
      "Quelles valeurs je veux incarner ?",
      "Si ma vie avait une signature, qu'est-ce qu'elle dirait ?",
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
    setTimeout(() => setSaved(false), 2000)
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
    answers["Quelle verite dois-je commencer a croire ?"] ||
    answers["Quelles pensees reviennent souvent en moi en ce moment ?"] ||
    "Je choisis de déposer mes pensées devant Dieu."

  const season =
    answers["Dans quelle saison spirituelle je me trouve ?"] ||
    answers["Qu'est-ce que Dieu travaille dans mon caractere ?"] ||
    "Une saison de construction intérieure."

  const becoming =
    answers["Je deviens une femme qui..."] ||
    "Je deviens une femme bâtie avec Dieu, sagesse et intention."

  const legacy =
    answers["Si ma vie avait une signature, qu'est-ce qu'elle dirait ?"] ||
    answers["Quelle trace je veux laisser ?"] ||
    "Une vie qui laisse une trace de foi, de sagesse et d’amour."

  return (
    <div className="flex flex-col px-5 pt-12 pb-8">
      <div className="mb-1 flex items-center gap-2">
        <span className="h-px w-6 bg-gold" />
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
          Reflexion guidee
        </span>
      </div>

      <h1 className="font-serif text-2xl font-bold text-foreground">
        Mon carnet Signature
      </h1>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Un espace pour ralentir, examiner et ecrire ce qui compte.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {questions.map((section) => (
          <Section
            key={section.id}
            title={section.title}
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
                    Trois mots qui decrivent la femme que je veux devenir
                  </label>

                  <p className="text-[10px] text-muted-foreground">
                    {selectedWords.length}/3 selectionnes
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
        {saved ? "Reflexion enregistree" : "Enregistrer ma reflexion"}
      </button>

      <div className="mt-10 space-y-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Carte
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold text-foreground">
            Ma carte Carnet
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Cette image reprend la synthese de ton carnet.
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

            <CardBlock title="Mes pensées actuelles" text={mainThought} />
            <CardBlock title="Ma saison avec Dieu" text={season} />
            <CardBlock title="La femme que je deviens" text={becoming} />
            <CardBlock
              title="Trois mots"
              text={
                selectedWords.length > 0
                  ? selectedWords.join(" · ")
                  : "Sage · Stable · Intentionnelle"
              }
            />
            <CardBlock title="Mon héritage" text={legacy} />
          </SignatureCard>
        </div>

        <button
          onClick={handleExportImage}
          disabled={exporting}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card py-3.5 text-sm font-semibold text-foreground shadow-sm transition-all duration-200 hover:border-gold/40 hover:shadow-md active:scale-[0.98] disabled:opacity-60"
        >
          <ImageDown className="h-4 w-4" />
          {exporting ? "Exportation..." : "Exporter mon carnet en image"}
        </button>
      </div>
    </div>
  )
}

function Section({
  title,
  number,
  defaultOpen = false,
  children,
}: {
  title: string
  number: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm transition-all duration-200">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-5"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary text-[10px] font-bold text-plum">
            {number}
          </span>

          <h3 className="font-serif text-sm font-semibold text-foreground text-left">
            {title}
          </h3>
        </div>

        {open ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
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
        placeholder="Ecris ici..."
        className="resize-none rounded-xl border border-input bg-background px-3 py-2.5 text-xs leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:ring-1 focus:ring-gold/30 focus:outline-none transition-all duration-200"
      />
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
        minHeight: "640px",
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
          minHeight: "596px",
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