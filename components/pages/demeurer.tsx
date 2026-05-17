"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, Save, ImageDown } from "lucide-react"
import { toPng } from "html-to-image"
import { addVictory } from "@/lib/progress-store"

export function DemeurerPage() {
  const cardRef = useRef<HTMLDivElement>(null)

  const [relation, setRelation] = useState("")
  const [coeur, setCoeur] = useState("")
  const [revelation, setRevelation] = useState("")
  const [verite, setVerite] = useState("")
  const [obeissance, setObeissance] = useState("")
  const [priere, setPriere] = useState("")
  const [saved, setSaved] = useState(false)
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    const savedReflection = localStorage.getItem("signature-demeurer-reflection")

    if (!savedReflection) return

    try {
      const reflection = JSON.parse(savedReflection)

      setRelation(reflection.relation || "")
      setCoeur(reflection.coeur || "")
      setRevelation(reflection.revelation || "")
      setVerite(reflection.verite || "")
      setObeissance(reflection.obeissance || "")
      setPriere(reflection.priere || "")
    } catch {
      localStorage.removeItem("signature-demeurer-reflection")
    }
  }, [])

  function saveReflection() {
    const reflection = {
      relation,
      coeur,
      revelation,
      verite,
      obeissance,
      priere,
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem(
      "signature-demeurer-reflection",
      JSON.stringify(reflection)
    )

    addVictory("reflection_saved")

    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  async function exportImage() {
    if (!cardRef.current) return

    try {
      setExporting(true)

      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#2b102f",
      })

      const link = document.createElement("a")
      link.download = "ma-carte-demeurer.png"
      link.href = dataUrl
      link.click()

      addVictory("image_exported")
    } catch (error) {
      console.error(error)
      alert("Impossible d’exporter l’image pour le moment.")
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="min-h-screen px-5 py-8 space-y-8">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Demeurer
        </p>

        <h1 className="text-4xl font-serif leading-tight">
          Revenir à la Source
        </h1>

        <p className="text-muted-foreground leading-relaxed">
          Un espace pour revenir à la présence du Seigneur, examiner ton cœur,
          écouter ce que Dieu travaille en toi et poser un petit pas
          d’obéissance.
        </p>
      </section>

      <section className="rounded-3xl bg-primary/10 p-5 space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-primary">
              Pensée centrale
            </p>

            <h2 className="text-2xl font-serif leading-relaxed">
              Je ne peux pas porter du fruit loin de la présence du Seigneur.
            </h2>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border bg-card p-5 shadow-sm space-y-6">
        <ReflectionField
          label="Où en est ma relation avec le Seigneur en ce moment ?"
          value={relation}
          onChange={setRelation}
        />

        <ReflectionField
          label="Qu’est-ce qui occupe mon cœur et mes pensées actuellement ?"
          value={coeur}
          onChange={setCoeur}
        />

        <ReflectionField
          label="Qu’est-ce que Dieu forme, révèle ou renouvelle en moi ?"
          value={revelation}
          onChange={setRevelation}
        />

        <ReflectionField
          label="Quelle vérité biblique dois-je garder cette semaine ?"
          value={verite}
          onChange={setVerite}
        />

        <ReflectionField
          label="Quel petit pas d’obéissance puis-je poser cette semaine ?"
          value={obeissance}
          onChange={setObeissance}
        />

        <ReflectionField
          label="Ma prière"
          value={priere}
          onChange={setPriere}
        />

        <button
          onClick={saveReflection}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 font-medium text-primary-foreground"
        >
          <Save className="h-4 w-4" />
          {saved ? "Réflexion enregistrée · +10 points" : "Enregistrer ma réflexion"}
        </button>
      </section>

      <section className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Carte
          </p>

          <h2 className="text-3xl font-serif leading-tight">
            Ma carte Demeurer
          </h2>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Cette carte reprend ta réflexion et peut être exportée comme image.
          </p>
        </div>

        <div className="flex justify-center">
          <div
            ref={cardRef}
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
                minHeight: "596px",
                border: "1px solid rgba(255,255,255,0.22)",
                borderRadius: "26px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                position: "relative",
                zIndex: 2,
                background: "rgba(0,0,0,0.14)",
              }}
            >
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
                  Demeurer
                </p>

                <h2
                  style={{
                    fontFamily: "serif",
                    fontSize: "34px",
                    lineHeight: "1.05",
                    marginTop: "26px",
                    marginBottom: 0,
                    color: "#fff7e6",
                  }}
                >
                  Revenir à la Source
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
                  “Demeurez en moi,
                  <br />
                  et je demeurerai en vous.”
                  <br />
                  <span style={{ color: "#f4d994", fontStyle: "normal" }}>
                    Jean 15:4
                  </span>
                </p>
              </div>

              <CardBlock
                title="Ce que Dieu forme en moi"
                text={
                  revelation ||
                  "Une intimité sincère, une écoute plus profonde et un cœur disponible."
                }
              />

              <CardBlock
                title="Mon cœur en ce moment"
                text={coeur || "Je dépose mes pensées devant le Seigneur."}
              />

              <CardBlock
                title="La vérité que je garde"
                text={
                  verite ||
                  "Je ne peux pas porter du fruit loin de la présence du Seigneur."
                }
              />

              <CardBlock
                title="Mon pas d’obéissance"
                text={obeissance || "Chaque matin : Seigneur, me voici."}
              />

              <CardBlock
                title="Prière"
                text={
                  priere ||
                  "Seigneur, apprends-moi à demeurer avant d’agir et à briller uniquement pour révéler Ta lumière."
                }
              />
            </div>
          </div>
        </div>

        <button
          onClick={exportImage}
          disabled={exporting}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card px-5 py-4 font-medium text-foreground disabled:opacity-60"
        >
          <ImageDown className="h-4 w-4" />
          {exporting
            ? "Exportation..."
            : "Exporter ma carte en image · +5 points"}
        </button>
      </section>
    </div>
  )
}

function ReflectionField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium leading-relaxed">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-28 w-full rounded-2xl border bg-background p-4 text-sm outline-none focus:ring-2 focus:ring-primary/30"
        placeholder="Écris ici..."
      />
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