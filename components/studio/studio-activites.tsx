"use client"

import { useState } from "react"
import { useStudio } from "@/lib/studio-store"
import type { GroupActivity } from "@/lib/types"
import { StudioField, ItemActions, StudioEmpty, StudioSectionHeader } from "./studio-ui"
import { ArrowLeft } from "lucide-react"

function emptyActivity(): Omit<GroupActivity, "id" | "order"> {
  return {
    title: "",
    objective: "",
    duration: "",
    instructions: "",
    whatToPrepare: "",
    journalPrompts: [""],
    groupSharingQuestions: [""],
    prayerFocus: "",
    weekId: null,
    monthId: null,
  }
}

function ActivityForm({
  activity,
  onChange,
  onSave,
  onCancel,
  isNew,
  cards,
  journeys,
}: {
  activity: Omit<GroupActivity, "id" | "order"> | GroupActivity
  onChange: (u: Partial<GroupActivity>) => void
  onSave: () => void
  onCancel: () => void
  isNew: boolean
  cards: { id: string; weekTitle: string }[]
  journeys: { id: string; monthTitle: string }[]
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <button onClick={onCancel} className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h2 className="font-serif text-lg font-bold text-foreground">{isNew ? "Nouvelle activite" : "Modifier l'activite"}</h2>
      </div>

      <StudioField label="Titre" value={activity.title} onChange={(v) => onChange({ title: v })} placeholder="Ex: Cercle de verite" />
      <StudioField label="Objectif" value={activity.objective} onChange={(v) => onChange({ objective: v })} multiline />
      <StudioField label="Duree" value={activity.duration} onChange={(v) => onChange({ duration: v })} placeholder="Ex: 45 min" />
      <StudioField label="Instructions" value={activity.instructions} onChange={(v) => onChange({ instructions: v })} multiline />
      <StudioField label="Quoi preparer" value={activity.whatToPrepare} onChange={(v) => onChange({ whatToPrepare: v })} multiline />
      <StudioField label="Focus de priere" value={activity.prayerFocus} onChange={(v) => onChange({ prayerFocus: v })} multiline />

      {/* Journal prompts */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-medium text-muted-foreground">Questions de journal</label>
        {activity.journalPrompts.map((p, pi) => (
          <div key={pi} className="flex items-center gap-2">
            <input type="text" value={p} onChange={(e) => { const u = [...activity.journalPrompts]; u[pi] = e.target.value; onChange({ journalPrompts: u }) }} placeholder={`Prompt ${pi + 1}`} className="flex-1 rounded-xl border border-input bg-background px-3 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:ring-1 focus:ring-gold/30 focus:outline-none transition-all" />
            {activity.journalPrompts.length > 1 && <button onClick={() => onChange({ journalPrompts: activity.journalPrompts.filter((_, i) => i !== pi) })} className="text-xs text-muted-foreground hover:text-destructive">Retirer</button>}
          </div>
        ))}
        <button onClick={() => onChange({ journalPrompts: [...activity.journalPrompts, ""] })} className="self-start text-xs font-medium text-primary hover:underline">+ Ajouter</button>
      </div>

      {/* Group sharing questions */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-medium text-muted-foreground">Questions de partage en groupe</label>
        {activity.groupSharingQuestions.map((q, qi) => (
          <div key={qi} className="flex items-center gap-2">
            <input type="text" value={q} onChange={(e) => { const u = [...activity.groupSharingQuestions]; u[qi] = e.target.value; onChange({ groupSharingQuestions: u }) }} placeholder={`Question ${qi + 1}`} className="flex-1 rounded-xl border border-input bg-background px-3 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:ring-1 focus:ring-gold/30 focus:outline-none transition-all" />
            {activity.groupSharingQuestions.length > 1 && <button onClick={() => onChange({ groupSharingQuestions: activity.groupSharingQuestions.filter((_, i) => i !== qi) })} className="text-xs text-muted-foreground hover:text-destructive">Retirer</button>}
          </div>
        ))}
        <button onClick={() => onChange({ groupSharingQuestions: [...activity.groupSharingQuestions, ""] })} className="self-start text-xs font-medium text-primary hover:underline">+ Ajouter</button>
      </div>

      {/* Link to week */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-medium text-muted-foreground">Attacher a une semaine</label>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => onChange({ weekId: null })} className={`rounded-xl px-3 py-2 text-xs font-medium transition-all ${!activity.weekId ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"}`}>Aucune</button>
          {cards.map((c) => (
            <button key={c.id} onClick={() => onChange({ weekId: c.id })} className={`rounded-xl px-3 py-2 text-xs font-medium transition-all ${activity.weekId === c.id ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"}`}>{c.weekTitle || "Sans titre"}</button>
          ))}
        </div>
      </div>

      {/* Link to month */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-medium text-muted-foreground">Attacher a un mois</label>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => onChange({ monthId: null })} className={`rounded-xl px-3 py-2 text-xs font-medium transition-all ${!activity.monthId ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"}`}>Aucun</button>
          {journeys.map((j) => (
            <button key={j.id} onClick={() => onChange({ monthId: j.id })} className={`rounded-xl px-3 py-2 text-xs font-medium transition-all ${activity.monthId === j.id ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"}`}>{j.monthTitle || "Sans titre"}</button>
          ))}
        </div>
      </div>

      <button onClick={onSave} disabled={!activity.title.trim()} className="mt-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md active:scale-[0.98] disabled:opacity-40">
        {isNew ? "Creer l'activite" : "Enregistrer"}
      </button>
    </div>
  )
}

export function StudioActivites() {
  const { data, addActivity, updateActivity, deleteActivity, reorderActivities } = useStudio()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [draft, setDraft] = useState<Omit<GroupActivity, "id" | "order">>(emptyActivity)

  const sorted = [...data.activities].sort((a, b) => a.order - b.order)
  const cardList = data.cards.map((c) => ({ id: c.id, weekTitle: c.weekTitle }))
  const journeyList = data.journeys.map((j) => ({ id: j.id, monthTitle: j.monthTitle }))

  if (isCreating) {
    return <ActivityForm activity={draft} onChange={(u) => setDraft((p) => ({ ...p, ...u }))} onSave={() => { addActivity(draft); setDraft(emptyActivity()); setIsCreating(false) }} onCancel={() => { setDraft(emptyActivity()); setIsCreating(false) }} isNew cards={cardList} journeys={journeyList} />
  }

  if (editingId) {
    const a = data.activities.find((a) => a.id === editingId)
    if (!a) return null
    return <ActivityForm activity={a} onChange={(u) => updateActivity(editingId, u)} onSave={() => setEditingId(null)} onCancel={() => setEditingId(null)} isNew={false} cards={cardList} journeys={journeyList} />
  }

  return (
    <div className="flex flex-col gap-5">
      <StudioSectionHeader title="Activites de groupe" count={sorted.length} onAdd={() => setIsCreating(true)} />
      {sorted.length === 0 ? (
        <StudioEmpty message="Aucune activite" onAdd={() => setIsCreating(true)} />
      ) : (
        <div className="flex flex-col gap-3">
          {sorted.map((a, i) => (
            <div key={a.id} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md">
              <h3 className="text-sm font-semibold text-foreground">{a.title || "Sans titre"}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{a.objective || "Pas d'objectif"}</p>
              <div className="flex items-center gap-2">
                {a.duration && <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">{a.duration}</span>}
              </div>
              <div className="flex items-center justify-end border-t border-border pt-3">
                <ItemActions index={i} total={sorted.length} onMoveUp={() => reorderActivities(i, i - 1)} onMoveDown={() => reorderActivities(i, i + 1)} onEdit={() => setEditingId(a.id)} onDelete={() => deleteActivity(a.id)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
