"use client"

import { useState } from "react"
import { ArrowRight, Heart, Sparkles } from "lucide-react"

const STORAGE_KEY = "signature-onboarding"

const needs = [
  "Paix",
  "Clarté",
  "Repos",
  "Courage",
  "Direction",
  "Constance",
  "Foi",
  "Guérison",
]

const anchorSuggestions = [
  "Je peux avancer doucement.",
  "Dieu travaille aussi dans les petits commencements.",
  "Je n’ai rien à prouver.",
  "Une phrase suffit.",
  "Je reviens à Dieu, un pas à la fois.",
]

interface SignatureOnboardingProps {
  onComplete: () => void
}

export function SignatureOnboarding({ onComplete }: SignatureOnboardingProps) {
  const [step, setStep] = useState(0)

  const [burden, setBurden] = useState("")
  const [need, setNeed] = useState("")
  const [anchor, setAnchor] = useState("")

  const isLastQuestion = step === 2
  const isBeautyStep = step === 3

  function nextStep() {
    if (isLastQuestion) {
      setStep(3)
      return
    }

    setStep((current) => current + 1)
  }

  function completeOnboarding() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        burden,
        need,
        anchor,
        completedAt: new Date().toISOString(),
      })
    )

    onComplete()
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[-90px] top-[90px] h-72 w-72 rounded-full blur-3xl"
          style={{ background: "rgba(92, 24, 53, 0.20)" }}
        />

        <div
          className="absolute right-[-100px] top-[260px] h-80 w-80 rounded-full blur-3xl"
          style={{ background: "rgba(185, 130, 75, 0.20)" }}
        />
      </div>

      <main className="relative z-10 flex min-h-screen flex-col px-6 py-10">
        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-gold" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Signature
            </span>
            <span className="h-px w-8 bg-gold" />
          </div>

          <h1 className="font-serif text-3xl font-bold text-foreground">
            Avant de commencer
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Prends un instant pour te rencontrer avec douceur. Une phrase suffit.
          </p>
        </div>

        <div className="flex flex-1 items-center">
          {!isBeautyStep && (
            <div className="w-full rounded-[2rem] border border-gold/20 bg-card p-5 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                {[0, 1, 2].map((item) => (
                  <div
                    key={item}
                    className={[
                      "h-1.5 flex-1 rounded-full transition-all",
                      item <= step ? "bg-primary" : "bg-muted",
                    ].join(" ")}
                  />
                ))}
              </div>

              {step === 0 && (
                <OnboardingStep
                  icon={<Heart className="h-5 w-5" />}
                  title="Ce que je porte"
                  question="Qu’est-ce que tu portes en ce moment que tu n’as pas besoin de porter seule ?"
                  helper="Tu peux répondre en une phrase. Pas besoin d’expliquer toute ton histoire."
                >
                  <textarea
                    value={burden}
                    onChange={(event) => setBurden(event.target.value)}
                    placeholder="Aujourd’hui, je porte..."
                    rows={4}
                    className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground/70 focus:border-gold/60 focus:ring-2 focus:ring-gold/10"
                  />
                </OnboardingStep>
              )}

              {step === 1 && (
                <OnboardingStep
                  icon={<Sparkles className="h-5 w-5" />}
                  title="Ce que mon cœur cherche"
                  question="De quoi ton cœur a-t-il le plus besoin dans cette saison ?"
                  helper="Choisis ce qui résonne le plus aujourd’hui. Ta réponse pourra changer avec le temps."
                >
                  <div className="grid grid-cols-2 gap-2">
                    {needs.map((item) => {
                      const isSelected = need === item

                      return (
                        <button
                          key={item}
                          onClick={() => setNeed(item)}
                          className={[
                            "rounded-2xl border px-3 py-3 text-sm transition-all",
                            isSelected
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background text-muted-foreground hover:border-gold/50",
                          ].join(" ")}
                        >
                          {item}
                        </button>
                      )
                    })}
                  </div>
                </OnboardingStep>
              )}

              {step === 2 && (
                <OnboardingStep
                  icon={<Heart className="h-5 w-5" />}
                  title="Ma phrase d’ancrage"
                  question="Quelle phrase veux-tu garder pour commencer ce chemin ?"
                  helper="Cette phrase pourra t’accompagner quand tu te sentiras dispersée ou fatiguée."
                >
                  <div className="space-y-2">
                    {anchorSuggestions.map((item) => {
                      const isSelected = anchor === item

                      return (
                        <button
                          key={item}
                          onClick={() => setAnchor(item)}
                          className={[
                            "w-full rounded-2xl border px-4 py-3 text-left text-sm leading-relaxed transition-all",
                            isSelected
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background text-muted-foreground hover:border-gold/50",
                          ].join(" ")}
                        >
                          {item}
                        </button>
                      )
                    })}
                  </div>
                </OnboardingStep>
              )}

              <button
                onClick={nextStep}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
              >
                Continuer doucement
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={completeOnboarding}
                className="mt-3 w-full text-center text-xs text-muted-foreground"
              >
                Passer pour l’instant
              </button>
            </div>
          )}

          {isBeautyStep && (
            <div
              className="w-full overflow-hidden rounded-[2rem] p-6 shadow-lg"
              style={{
                background:
                  "radial-gradient(circle at 85% 0%, rgba(239, 229, 142, 0.28), transparent 32%), linear-gradient(145deg, #2b0b35 0%, #4b143b 48%, #8a4f55 100%)",
              }}
            >
              <div className="rounded-[1.5rem] border border-white/20 px-6 py-8 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-gold">
                  Ton chemin commence
                </p>

                <h2 className="mt-4 font-serif text-3xl leading-tight text-white">
                  Doucement.
                </h2>

                <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-white/75">
                  Tu n’as rien à prouver ici. Tu peux revenir à Dieu, déposer ce
                  que tu portes et avancer par petits pas.
                </p>

                <div className="mt-7 space-y-4 rounded-2xl bg-white/10 p-5 text-left">
                  <BeautyLine
                    title="Aujourd’hui, je viens avec"
                    content={burden || "ce qui est là dans mon cœur."}
                  />

                  <BeautyLine
                    title="Mon cœur cherche"
                    content={need || "la paix de Dieu."}
                  />

                  <BeautyLine
                    title="Ma phrase d’ancrage"
                    content={anchor || "Je reviens à Dieu, un pas à la fois."}
                  />
                </div>

                <button
                  onClick={completeOnboarding}
                  className="mt-7 flex w-full items-center justify-center rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-[#4b143b] shadow-lg transition-all duration-200 hover:shadow-xl active:scale-[0.98]"
                >
                  Entrer doucement
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function OnboardingStep({
  icon,
  title,
  question,
  helper,
  children,
}: {
  icon: React.ReactNode
  title: string
  question: string
  helper: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>

      <p className="mt-5 text-sm uppercase tracking-[0.25em] text-gold">
        {title}
      </p>

      <h2 className="mt-3 font-serif text-2xl leading-tight text-foreground">
        {question}
      </h2>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {helper}
      </p>

      <div className="mt-5">{children}</div>
    </div>
  )
}

function BeautyLine({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.25em] text-gold">
        {title}
      </p>

      <p className="mt-1 text-sm leading-relaxed text-white/85">{content}</p>
    </div>
  )
}