"use client"

import { useState } from "react"
import { useStudio } from "@/lib/studio-store"
import type { MonthlyJourney } from "@/lib/types"
import { StudioField, ItemActions, StudioEmpty, StudioSectionHeader } from "./studio-ui"
import { ArrowLeft } from "lucide-react"

function emptyJourney(): Omit<MonthlyJourney, "id" | "order"> {
  return {
    monthTitle: "",
    mainTheme: "",
    spiritualObjective: "",
    weeklySteps: ["", "", "", ""],
    linkedCardIds: [],
    linkedTeachingIds: [],
    linkedActivityId: null,
    finalReflectionPrompts: [""],
  }
}

function JourneyForm({
  journey,
  onChange,
  onSave,
  onCancel,
  isNew,
  cards,
  teachings,
  activities,
}: {
  journey: Omit<MonthlyJourney, "id" | "order"> | MonthlyJourney
  onChange: (updates: Partial<MonthlyJourney>) => void
  onSave: () => void
  onCancel: () => void
  isNew: boolean
  cards: { id: string; weekTitle: string }[]
  teachings: { id: string; title: string }[]
  activities: { id: string; title: string }[]
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <button onClick={onCancel} className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h2 className="font-serif text-lg font-bold text-foreground">
          {isNew ? "Nouveau parcours mensuel" : "Modifier le parcours"}
        </h2>
      </div>

      <StudioField label="Titre du mois" value={journey.monthTitle} onChange={(v) => onChange({ monthTitle: v })} placeholder="Ex: Mois 1 - Fondations interieures" />
      <StudioField label="Theme principal" value={journey.mainTheme} onChange={(v) => onChange({ mainTheme: v })} multiline />
      <StudioField label="Objectif spirituel" value={journey.spiritualObjective} onChange={(v) => onChange({ spiritualObjective: v })} multiline />

      {/* Weekly Steps */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-medium text-muted-foreground">4 etapes hebdomadaires</label>
        {journey.weeklySteps.map((step, si) => (
          <input
            key={si}
            type="text"
            value={step}
            onChange={(e) => {
              const updated = [...journey.weeklySteps]
              updated[si] = e.target.value
              onChange({ weeklySteps: updated })
            }}
            placeholder={`Semaine ${si + 1}`}
            className="rounded-xl border border-input bg-background px-3 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:ring-1 focus:ring-gold/30 focus:outline-none transition-all"
          />
        ))}
      </div>

      {/* Linked cards */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-medium text-muted-foreground">Cartes liees</label>
        <div className="flex flex-wrap gap-2">
          {cards.map((c) => {
            const isLinked = journey.linkedCardIds.includes(c.id)
            return (
              <button
                key={c.id}
                onClick={() => {
                  const updated = isLinked
                    ? journey.linkedCardIds.filter((id) => id !== c.id)
                    : [...journey.linkedCardIds, c.id]
                  onChange({ linkedCardIds: updated })
                }}
                className={`rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                  isLinked ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"
                }`}
              >
                {c.weekTitle || "Sans titre"}
              </button>
            )
          })}
        </div>
      </div>

      {/* Linked teachings */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-medium text-muted-foreground">Enseignements lies</label>
        <div className="flex flex-wrap gap-2">
          {teachings.map((t) => {
            const isLinked = journey.linkedTeachingIds.includes(t.id)
            return (
              <button
                key={t.id}
                onClick={() => {
                  const updated = isLinked
                    ? journey.linkedTeachingIds.filter((id) => id !== t.id)
                    : [...journey.linkedTeachingIds, t.id]
                  onChange({ linkedTeachingIds: updated })
                }}
                className={`rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                  isLinked ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"
                }`}
              >
                {t.title || "Sans titre"}
              </button>
            )
          })}
        </div>
      </div>

      {/* Linked activity */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-medium text-muted-foreground">Activite liee</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onChange({ linkedActivityId: null })}
            className={`rounded-xl px-3 py-2 text-xs font-medium transition-all ${
              !journey.linkedActivityId ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"
            }`}
          >
            Aucune
          </button>
          {activities.map((a) => (
            <button
              key={a.id}
              onClick={() => onChange({ linkedActivityId: a.id })}
              className={`rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                journey.linkedActivityId === a.id ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"
              }`}
            >
              {a.title || "Sans titre"}
            </button>
          ))}
        </div>
      </div>

      {/* Final reflection prompts */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-medium text-muted-foreground">Questions de reflexion finales</label>
        {journey.finalReflectionPrompts.map((p, pi) => (
          <div key={pi} className="flex items-center gap-2">
            <input
              type="text"
              value={p}
              onChange={(e) => {
                const updated = [...journey.finalReflectionPrompts]
                updated[pi] = e.target.value
                onChange({ finalReflectionPrompts: updated })
              }}
              placeholder={`Question ${pi + 1}`}
              className="flex-1 rounded-xl border border-input bg-background px-3 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:ring-1 focus:ring-gold/30 focus:outline-none transition-all"
            />
            {journey.finalReflectionPrompts.length > 1 && (
              <button onClick={() => onChange({ finalReflectionPrompts: journey.finalReflectionPrompts.filter((_, i) => i !== pi) })} className="text-xs text-muted-foreground hover:text-destructive">
                Retirer
              </button>
            )}
          </div>
        ))}
        <button onClick={() => onChange({ finalReflectionPrompts: [...journey.finalReflectionPrompts, ""] })} className="self-start text-xs font-medium text-primary hover:underline">
          + Ajouter une question
        </button>
      </div>

      <button onClick={onSave} disabled={!journey.monthTitle.trim()} className="mt-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md active:scale-[0.98] disabled:opacity-40">
        {isNew ? "Creer le parcours" : "Enregistrer"}
      </button>
    </div>
  )
}

export function StudioParcours() {
  const { data, addJourney, updateJourney, deleteJourney, reorderJourneys } = useStudio()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [draft, setDraft] = useState<Omit<MonthlyJourney, "id" | "order">>(emptyJourney)

  const sorted = [...data.journeys].sort((a, b) => a.order - b.order)
  const cardList = data.cards.map((c) => ({ id: c.id, weekTitle: c.weekTitle }))
  const teachList = data.teachings.map((t) => ({ id: t.id, title: t.title }))
  const actList = data.activities.map((a) => ({ id: a.id, title: a.title }))

  if (isCreating) {
    return (
      <JourneyForm journey={draft} onChange={(u) => setDraft((p) => ({ ...p, ...u }))} onSave={() => { addJourney(draft); setDraft(emptyJourney()); setIsCreating(false) }} onCancel={() => { setDraft(emptyJourney()); setIsCreating(false) }} isNew cards={cardList} teachings={teachList} activities={actList} />
    )
  }

  if (editingId) {
    const j = data.journeys.find((j) => j.id === editingId)
    if (!j) return null
    return (
      <JourneyForm journey={j} onChange={(u) => updateJourney(editingId, u)} onSave={() => setEditingId(null)} onCancel={() => setEditingId(null)} isNew={false} cards={cardList} teachings={teachList} activities={actList} />
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <StudioSectionHeader title="Parcours mensuels" count={sorted.length} onAdd={() => setIsCreating(true)} />
      {sorted.length === 0 ? (
        <StudioEmpty message="Aucun parcours mensuel" onAdd={() => setIsCreating(true)} />
      ) : (
        <div className="flex flex-col gap-3">
          {sorted.map((j, i) => (
            <div key={j.id} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md">
              <h3 className="text-sm font-semibold text-foreground">{j.monthTitle || "Sans titre"}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{j.mainTheme || "Pas de theme"}</p>
              <div className="flex flex-wrap gap-1">
                <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">{j.linkedCardIds.length} cartes</span>
                <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">{j.linkedTeachingIds.length} enseign.</span>
              </div>
              <div className="flex items-center justify-end border-t border-border pt-3">
                <ItemActions index={i} total={sorted.length} onMoveUp={() => reorderJourneys(i, i - 1)} onMoveDown={() => reorderJourneys(i, i + 1)} onEdit={() => setEditingId(j.id)} onDelete={() => deleteJourney(j.id)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
