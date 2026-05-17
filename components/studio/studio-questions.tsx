"use client"

import { useState } from "react"
import { useStudio } from "@/lib/studio-store"
import type { ReflectionPrompt, PromptCategory } from "@/lib/types"
import { ItemActions, StudioEmpty, StudioSectionHeader } from "./studio-ui"
import { ArrowLeft } from "lucide-react"

const categories: PromptCategory[] = [
  "Intimite avec Dieu",
  "Coeur et pensees",
  "Identite",
  "Dessein",
  "Obeissance",
  "Formation",
  "Heritage",
  "Finances",
  "Relations",
  "Education",
  "Excellence",
]

export function StudioQuestions() {
  const { data, addPrompt, updatePrompt, deletePrompt, reorderPrompts } = useStudio()
  const [activeCategory, setActiveCategory] = useState<PromptCategory | "all">("all")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [draftText, setDraftText] = useState("")
  const [draftCategory, setDraftCategory] = useState<PromptCategory>("Intimite avec Dieu")

  const sorted = [...data.prompts].sort((a, b) => a.order - b.order)
  const filtered = activeCategory === "all" ? sorted : sorted.filter((p) => p.category === activeCategory)

  // Group by category for display
  const grouped = new Map<PromptCategory, ReflectionPrompt[]>()
  for (const p of filtered) {
    const list = grouped.get(p.category) || []
    list.push(p)
    grouped.set(p.category, list)
  }

  if (isCreating || editingId) {
    const editing = editingId ? data.prompts.find((p) => p.id === editingId) : null
    return (
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <button onClick={() => { setIsCreating(false); setEditingId(null) }} className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h2 className="font-serif text-lg font-bold text-foreground">
            {editing ? "Modifier la question" : "Nouvelle question"}
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-medium text-muted-foreground">Question</label>
          <textarea
            rows={3}
            value={editing ? (editingId ? data.prompts.find((p) => p.id === editingId)?.text ?? "" : "") : draftText}
            onChange={(e) => {
              if (editing && editingId) {
                updatePrompt(editingId, { text: e.target.value })
              } else {
                setDraftText(e.target.value)
              }
            }}
            placeholder="Ecris ta question de reflexion..."
            className="resize-none rounded-xl border border-input bg-background px-3 py-2.5 text-xs leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:ring-1 focus:ring-gold/30 focus:outline-none transition-all"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-medium text-muted-foreground">Categorie</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const currentCat = editing ? data.prompts.find((p) => p.id === editingId)?.category : draftCategory
              return (
                <button
                  key={cat}
                  onClick={() => {
                    if (editing && editingId) {
                      updatePrompt(editingId, { category: cat })
                    } else {
                      setDraftCategory(cat)
                    }
                  }}
                  className={`rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                    currentCat === cat ? "bg-primary text-primary-foreground shadow-sm" : "border border-border text-muted-foreground"
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        <button
          onClick={() => {
            if (editing) {
              setEditingId(null)
            } else {
              if (draftText.trim()) {
                addPrompt({ text: draftText, category: draftCategory })
                setDraftText("")
                setIsCreating(false)
              }
            }
          }}
          className="mt-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
        >
          {editing ? "Enregistrer" : "Ajouter la question"}
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <StudioSectionHeader title="Questions de reflexion" count={data.prompts.length} onAdd={() => setIsCreating(true)} />

      {/* Category filter */}
      <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
        <button
          onClick={() => setActiveCategory("all")}
          className={`shrink-0 rounded-xl px-3 py-2 text-xs font-medium transition-all ${
            activeCategory === "all" ? "bg-primary text-primary-foreground shadow-sm" : "bg-secondary text-muted-foreground"
          }`}
        >
          Toutes
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 rounded-xl px-3 py-2 text-xs font-medium transition-all ${
              activeCategory === cat ? "bg-primary text-primary-foreground shadow-sm" : "bg-secondary text-muted-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <StudioEmpty message="Aucune question dans cette categorie" onAdd={() => setIsCreating(true)} />
      ) : (
        <div className="flex flex-col gap-4">
          {Array.from(grouped.entries()).map(([category, prompts]) => (
            <div key={category} className="flex flex-col gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{category}</h3>
              {prompts.map((p) => {
                const globalIndex = sorted.findIndex((s) => s.id === p.id)
                return (
                  <div key={p.id} className="flex items-start justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
                    <p className="flex-1 text-xs leading-relaxed text-foreground">{p.text}</p>
                    <ItemActions
                      index={globalIndex}
                      total={sorted.length}
                      onMoveUp={() => reorderPrompts(globalIndex, globalIndex - 1)}
                      onMoveDown={() => reorderPrompts(globalIndex, globalIndex + 1)}
                      onEdit={() => setEditingId(p.id)}
                      onDelete={() => deletePrompt(p.id)}
                    />
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
