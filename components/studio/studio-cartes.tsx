"use client"

import { useState } from "react"
import { useStudio } from "@/lib/studio-store"
import { visualThemes } from "@/lib/visual-themes"
import type { DestinyCard } from "@/lib/types"
import { StudioField, ItemActions, StudioEmpty, StudioSectionHeader } from "./studio-ui"
import { ArrowLeft } from "lucide-react"

function emptyCard(): Omit<DestinyCard, "id" | "order"> {
  return {
    weekTitle: "",
    collectionLabel: "",
    bibleVerse: "",
    reference: "",
    mainDeclaration: "",
    identityStatement: "",
    formingInMe: "",
    leavingBehind: "",
    obedienceStep: "",
    prayer: "",
    visualThemeId: "deep-plum",
    isActive: false,
  }
}

function CardForm({
  card,
  onChange,
  onSave,
  onCancel,
  isNew,
}: {
  card: Omit<DestinyCard, "id" | "order"> | DestinyCard
  onChange: (updates: Partial<DestinyCard>) => void
  onSave: () => void
  onCancel: () => void
  isNew: boolean
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <button
          onClick={onCancel}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h2 className="font-serif text-lg font-bold text-foreground">
          {isNew ? "Nouvelle carte" : "Modifier la carte"}
        </h2>
      </div>

      <StudioField label="Titre de la semaine" value={card.weekTitle} onChange={(v) => onChange({ weekTitle: v })} placeholder="Ex: Semaine 1 - Sortir des forteresses" />
      <StudioField label="Collection" value={card.collectionLabel} onChange={(v) => onChange({ collectionLabel: v })} placeholder="Ex: Collection Pensees" />
      <StudioField label="Verset biblique" value={card.bibleVerse} onChange={(v) => onChange({ bibleVerse: v })} multiline placeholder="Le verset complet" />
      <StudioField label="Reference" value={card.reference} onChange={(v) => onChange({ reference: v })} placeholder="Ex: 2 Corinthiens 10:5" />
      <StudioField label="Declaration principale" value={card.mainDeclaration} onChange={(v) => onChange({ mainDeclaration: v })} multiline placeholder="La declaration de la semaine" />
      <StudioField label="Declaration d'identite" value={card.identityStatement} onChange={(v) => onChange({ identityStatement: v })} multiline placeholder="Je suis une femme qui..." />
      <StudioField label="Ce que le Seigneur forme en moi" value={card.formingInMe} onChange={(v) => onChange({ formingInMe: v })} multiline />
      <StudioField label="Ce que je laisse derriere" value={card.leavingBehind} onChange={(v) => onChange({ leavingBehind: v })} multiline />
      <StudioField label="Pas d'obeissance" value={card.obedienceStep} onChange={(v) => onChange({ obedienceStep: v })} multiline />
      <StudioField label="Priere" value={card.prayer} onChange={(v) => onChange({ prayer: v })} multiline />

      {/* Visual theme picker */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-medium text-muted-foreground">Theme visuel</label>
        <div className="flex flex-wrap gap-2">
          {visualThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onChange({ visualThemeId: theme.id })}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                card.visualThemeId === theme.id
                  ? "ring-2 ring-gold ring-offset-2 ring-offset-background"
                  : "border border-border"
              }`}
            >
              <span className={`h-4 w-4 rounded-full ${theme.bg}`} />
              {theme.name}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onSave}
        disabled={!card.weekTitle.trim()}
        className="mt-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md active:scale-[0.98] disabled:opacity-40"
      >
        {isNew ? "Creer la carte" : "Enregistrer"}
      </button>
    </div>
  )
}

export function StudioCartes() {
  const { data, addCard, updateCard, deleteCard, duplicateCard, reorderCards, setActiveCard } = useStudio()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [draft, setDraft] = useState<Omit<DestinyCard, "id" | "order">>(emptyCard)

  const sorted = [...data.cards].sort((a, b) => a.order - b.order)

  if (isCreating) {
    return (
      <CardForm
        card={draft}
        onChange={(updates) => setDraft((prev) => ({ ...prev, ...updates }))}
        onSave={() => {
          addCard(draft)
          setDraft(emptyCard())
          setIsCreating(false)
        }}
        onCancel={() => {
          setDraft(emptyCard())
          setIsCreating(false)
        }}
        isNew
      />
    )
  }

  if (editingId) {
    const card = data.cards.find((c) => c.id === editingId)
    if (!card) return null
    return (
      <CardForm
        card={card}
        onChange={(updates) => updateCard(editingId, updates)}
        onSave={() => setEditingId(null)}
        onCancel={() => setEditingId(null)}
        isNew={false}
      />
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <StudioSectionHeader
        title="Cartes de destinee"
        count={sorted.length}
        onAdd={() => setIsCreating(true)}
      />

      {sorted.length === 0 ? (
        <StudioEmpty message="Aucune carte de destinee" onAdd={() => setIsCreating(true)} />
      ) : (
        <div className="flex flex-col gap-3">
          {sorted.map((card, i) => {
            const theme = visualThemes.find((t) => t.id === card.visualThemeId)
            return (
              <div
                key={card.id}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className={`mt-0.5 h-4 w-4 shrink-0 rounded-full ${theme?.bg ?? "bg-plum"}`} />
                    <div className="flex flex-col gap-0.5">
                      <h3 className="text-sm font-semibold text-foreground">{card.weekTitle || "Sans titre"}</h3>
                      <p className="text-[10px] text-muted-foreground">{card.collectionLabel}</p>
                    </div>
                  </div>
                  {card.isActive && (
                    <span className="shrink-0 rounded-md bg-gold/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs italic leading-relaxed text-muted-foreground line-clamp-2">
                  {card.mainDeclaration || "Pas de declaration"}
                </p>
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <span className="text-[10px] text-muted-foreground">{card.reference}</span>
                  <ItemActions
                    index={i}
                    total={sorted.length}
                    onMoveUp={() => reorderCards(i, i - 1)}
                    onMoveDown={() => reorderCards(i, i + 1)}
                    onEdit={() => setEditingId(card.id)}
                    onDelete={() => deleteCard(card.id)}
                    onDuplicate={() => duplicateCard(card.id)}
                    onSetActive={() => setActiveCard(card.id)}
                    isActive={card.isActive}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
