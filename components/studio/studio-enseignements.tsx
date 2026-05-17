"use client"

import { useState } from "react"
import { useStudio } from "@/lib/studio-store"
import type { Teaching, TeachingFormat } from "@/lib/types"
import { StudioField, ItemActions, StudioEmpty, StudioSectionHeader } from "./studio-ui"
import { ArrowLeft } from "lucide-react"

const formats: { value: TeachingFormat; label: string }[] = [
  { value: "text", label: "Texte" },
  { value: "audio", label: "Audio" },
  { value: "video", label: "Video" },
  { value: "book", label: "Livre" },
  { value: "sermon", label: "Sermon" },
  { value: "discussion", label: "Discussion" },
]

function emptyTeaching(): Omit<Teaching, "id" | "order"> {
  return {
    title: "",
    theme: "",
    sourceInspiration: "",
    format: "text",
    duration: "",
    keyIdea: "",
    bibleVerse: "",
    reflectionQuestions: [""],
    actionToApply: "",
    leaderNotes: "",
    weekId: null,
  }
}

function TeachingForm({
  teaching,
  onChange,
  onSave,
  onCancel,
  isNew,
  cards,
}: {
  teaching: Omit<Teaching, "id" | "order"> | Teaching
  onChange: (updates: Partial<Teaching>) => void
  onSave: () => void
  onCancel: () => void
  isNew: boolean
  cards: { id: string; weekTitle: string }[]
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
          {isNew ? "Nouvel enseignement" : "Modifier l'enseignement"}
        </h2>
      </div>

      <StudioField label="Titre" value={teaching.title} onChange={(v) => onChange({ title: v })} placeholder="Titre de l'enseignement" />
      <StudioField label="Theme" value={teaching.theme} onChange={(v) => onChange({ theme: v })} placeholder="Ex: Pensees & forteresses" />
      <StudioField label="Source d'inspiration" value={teaching.sourceInspiration} onChange={(v) => onChange({ sourceInspiration: v })} multiline />
      <StudioField label="Verset biblique" value={teaching.bibleVerse} onChange={(v) => onChange({ bibleVerse: v })} placeholder="Ex: 2 Corinthiens 10:5" />
      <StudioField label="Idee cle" value={teaching.keyIdea} onChange={(v) => onChange({ keyIdea: v })} multiline />
      <StudioField label="Action a appliquer" value={teaching.actionToApply} onChange={(v) => onChange({ actionToApply: v })} multiline />
      <StudioField label="Duree" value={teaching.duration} onChange={(v) => onChange({ duration: v })} placeholder="Ex: 12 min" />
      <StudioField label="Notes pour la responsable" value={teaching.leaderNotes} onChange={(v) => onChange({ leaderNotes: v })} multiline />

      {/* Format picker */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-medium text-muted-foreground">Format</label>
        <div className="flex flex-wrap gap-2">
          {formats.map((f) => (
            <button
              key={f.value}
              onClick={() => onChange({ format: f.value })}
              className={`rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                teaching.format === f.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Link to a week */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-medium text-muted-foreground">Attacher a une semaine</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onChange({ weekId: null })}
            className={`rounded-xl px-3 py-2 text-xs font-medium transition-all ${
              !teaching.weekId
                ? "bg-primary text-primary-foreground shadow-sm"
                : "border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            Aucune
          </button>
          {cards.map((c) => (
            <button
              key={c.id}
              onClick={() => onChange({ weekId: c.id })}
              className={`rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                teaching.weekId === c.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {c.weekTitle || "Sans titre"}
            </button>
          ))}
        </div>
      </div>

      {/* Reflection questions */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-medium text-muted-foreground">Questions de reflexion</label>
        {teaching.reflectionQuestions.map((q, qi) => (
          <div key={qi} className="flex items-center gap-2">
            <input
              type="text"
              value={q}
              onChange={(e) => {
                const updated = [...teaching.reflectionQuestions]
                updated[qi] = e.target.value
                onChange({ reflectionQuestions: updated })
              }}
              placeholder={`Question ${qi + 1}`}
              className="flex-1 rounded-xl border border-input bg-background px-3 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:ring-1 focus:ring-gold/30 focus:outline-none transition-all"
            />
            {teaching.reflectionQuestions.length > 1 && (
              <button
                onClick={() => {
                  const updated = teaching.reflectionQuestions.filter((_, i) => i !== qi)
                  onChange({ reflectionQuestions: updated })
                }}
                className="text-xs text-muted-foreground hover:text-destructive"
              >
                Retirer
              </button>
            )}
          </div>
        ))}
        <button
          onClick={() => onChange({ reflectionQuestions: [...teaching.reflectionQuestions, ""] })}
          className="self-start text-xs font-medium text-primary hover:underline"
        >
          + Ajouter une question
        </button>
      </div>

      <button
        onClick={onSave}
        disabled={!teaching.title.trim()}
        className="mt-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md active:scale-[0.98] disabled:opacity-40"
      >
        {isNew ? "Creer l'enseignement" : "Enregistrer"}
      </button>
    </div>
  )
}

export function StudioEnseignements() {
  const { data, addTeaching, updateTeaching, deleteTeaching, reorderTeachings } = useStudio()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [draft, setDraft] = useState<Omit<Teaching, "id" | "order">>(emptyTeaching)

  const sorted = [...data.teachings].sort((a, b) => a.order - b.order)
  const cardList = data.cards.map((c) => ({ id: c.id, weekTitle: c.weekTitle }))

  if (isCreating) {
    return (
      <TeachingForm
        teaching={draft}
        onChange={(u) => setDraft((p) => ({ ...p, ...u }))}
        onSave={() => { addTeaching(draft); setDraft(emptyTeaching()); setIsCreating(false) }}
        onCancel={() => { setDraft(emptyTeaching()); setIsCreating(false) }}
        isNew
        cards={cardList}
      />
    )
  }

  if (editingId) {
    const t = data.teachings.find((t) => t.id === editingId)
    if (!t) return null
    return (
      <TeachingForm
        teaching={t}
        onChange={(u) => updateTeaching(editingId, u)}
        onSave={() => setEditingId(null)}
        onCancel={() => setEditingId(null)}
        isNew={false}
        cards={cardList}
      />
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <StudioSectionHeader title="Enseignements" count={sorted.length} onAdd={() => setIsCreating(true)} />

      {sorted.length === 0 ? (
        <StudioEmpty message="Aucun enseignement" onAdd={() => setIsCreating(true)} />
      ) : (
        <div className="flex flex-col gap-3">
          {sorted.map((t, i) => {
            const linkedCard = data.cards.find((c) => c.id === t.weekId)
            return (
              <div key={t.id} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col gap-1 flex-1">
                    <h3 className="text-sm font-semibold text-foreground">{t.title || "Sans titre"}</h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-plum">
                        {t.format}
                      </span>
                      {t.duration && (
                        <span className="text-[10px] text-muted-foreground">{t.duration}</span>
                      )}
                      {linkedCard && (
                        <span className="rounded-md bg-gold/15 px-2 py-0.5 text-[10px] font-medium text-dark-brown">
                          {linkedCard.weekTitle}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-xs italic text-muted-foreground line-clamp-2">{t.keyIdea || "Pas d'idee cle"}</p>
                <div className="flex items-center justify-end border-t border-border pt-3">
                  <ItemActions
                    index={i}
                    total={sorted.length}
                    onMoveUp={() => reorderTeachings(i, i - 1)}
                    onMoveDown={() => reorderTeachings(i, i + 1)}
                    onEdit={() => setEditingId(t.id)}
                    onDelete={() => deleteTeaching(t.id)}
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
