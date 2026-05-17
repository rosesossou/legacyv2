"use client"

import { useMemo, useState } from "react"
import { Check, Copy, Heart } from "lucide-react"

interface ShareToSisterCardProps {
  action?: string
  surrender?: string
}

export function ShareToSisterCard({
  action,
  surrender,
}: ShareToSisterCardProps) {
  const [copied, setCopied] = useState(false)

  const message = useMemo(() => {
    const safeAction =
      action?.trim() || "Je veux poser un petit pas fidèle cette semaine."

    const safeSurrender =
      surrender?.trim() ||
      "Je remets à Dieu ce que je ne peux pas porter seule."

    return `Je te partage un petit pas que je veux garder cette semaine.

Petit pas :
${safeAction}

Ce que je remets à Dieu :
${safeSurrender}

Un simple mot d’encouragement me ferait du bien.`
  }, [action, surrender])

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="rounded-3xl border border-gold/20 bg-card p-5 shadow-sm space-y-5">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Heart className="h-5 w-5" strokeWidth={1.7} />
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
            Entre sœurs
          </p>

          <h2 className="mt-1 font-serif text-2xl leading-tight text-foreground">
            Partager un petit pas
          </h2>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        Tu peux envoyer ton petit pas à une sœur de confiance, simplement pour
        être encouragée. Rien n’est obligatoire.
      </p>

      <div className="rounded-2xl bg-champagne/40 p-4">
        <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
          {message}
        </p>
      </div>

      <button
        onClick={copyMessage}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            Message copié
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            Copier le message
          </>
        )}
      </button>

      <p className="text-center text-xs leading-relaxed text-muted-foreground">
        Avancer en secret compte aussi.
      </p>
    </section>
  )
}