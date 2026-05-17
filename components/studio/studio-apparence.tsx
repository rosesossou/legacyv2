"use client"

import { useState } from "react"
import { useStudio } from "@/lib/studio-store"
import { visualThemes } from "@/lib/visual-themes"
import { Eye } from "lucide-react"

export function StudioApparence() {
  const { data } = useStudio()
  const [previewThemeId, setPreviewThemeId] = useState<string | null>(null)

  const activeCard = data.cards.find((c) => c.isActive)
  const previewTheme = previewThemeId
    ? visualThemes.find((t) => t.id === previewThemeId)
    : activeCard
      ? visualThemes.find((t) => t.id === activeCard.visualThemeId)
      : visualThemes[0]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-serif text-lg font-bold text-foreground">Themes visuels</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Chaque theme change les couleurs d&apos;arriere-plan, d&apos;accentuation et de texte des cartes.
        </p>
      </div>

      {/* Theme grid */}
      <div className="grid grid-cols-2 gap-3">
        {visualThemes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setPreviewThemeId(theme.id)}
            className={`flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all ${
              previewTheme?.id === theme.id
                ? "border-gold ring-2 ring-gold/30 shadow-md"
                : "border-border hover:shadow-sm"
            }`}
          >
            <div className={`h-16 w-full rounded-xl ${theme.bg}`} />
            <span className="text-xs font-medium text-foreground">{theme.name}</span>
          </button>
        ))}
      </div>

      {/* Preview */}
      {previewTheme && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-serif text-sm font-semibold text-foreground">Apercu - {previewTheme.name}</h3>
          </div>

          {/* Card preview (phone wallpaper style) */}
          <div className={`relative flex flex-col items-center justify-center rounded-3xl px-6 py-10 text-center ${previewTheme.bg} shadow-lg`}>
            <span className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] ${previewTheme.accent}`}>
              {activeCard?.collectionLabel || "Collection"}
            </span>
            <h3 className={`font-serif text-xl font-bold leading-tight ${previewTheme.text}`}>
              {activeCard?.weekTitle || "Semaine de formation"}
            </h3>
            <div className={`my-4 h-px w-12 ${previewTheme.accent} opacity-50`} style={{ backgroundColor: "currentColor" }} />
            <p className={`font-serif text-sm italic leading-relaxed ${previewTheme.text} opacity-90`}>
              &ldquo;{activeCard?.mainDeclaration || "Declaration de la semaine"}&rdquo;
            </p>
            <p className={`mt-4 text-[10px] font-medium tracking-wider ${previewTheme.accent}`}>
              {activeCard?.reference || "Reference biblique"}
            </p>
          </div>

          {/* Identity statement preview */}
          <div className={`rounded-2xl px-5 py-4 ${previewTheme.bg} shadow-sm`}>
            <p className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${previewTheme.accent}`}>
              Mon identite
            </p>
            <p className={`mt-1 font-serif text-sm italic leading-relaxed ${previewTheme.text}`}>
              {activeCard?.identityStatement || "Je suis une femme qui..."}
            </p>
          </div>

          {/* Obedience step preview */}
          <div className={`rounded-2xl px-5 py-4 ${previewTheme.bg} shadow-sm`}>
            <p className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${previewTheme.accent}`}>
              Mon pas d&apos;obeissance
            </p>
            <p className={`mt-1 text-xs leading-relaxed ${previewTheme.text}`}>
              {activeCard?.obedienceStep || "Pas d'obeissance de la semaine"}
            </p>
          </div>
        </div>
      )}

      {!activeCard && (
        <div className="rounded-2xl border border-dashed border-border py-8 text-center">
          <p className="text-xs text-muted-foreground">
            Marque une carte comme active dans l&apos;onglet Cartes pour voir un apercu avec son contenu.
          </p>
        </div>
      )}
    </div>
  )
}
