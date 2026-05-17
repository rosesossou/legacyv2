"use client"

import { cn } from "@/lib/utils"
import { ChevronUp, ChevronDown, Trash2, Copy, Pencil, Star } from "lucide-react"

// ── Reusable field for Studio forms ──
interface StudioFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  multiline?: boolean
  placeholder?: string
}

export function StudioField({ label, value, onChange, multiline, placeholder }: StudioFieldProps) {
  const shared =
    "w-full rounded-xl border border-input bg-background px-3 py-2.5 text-xs leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:ring-1 focus:ring-gold/30 focus:outline-none transition-all duration-200"

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-medium text-muted-foreground">{label}</label>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(shared, "resize-none")}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={shared}
        />
      )}
    </div>
  )
}

// ── List item actions bar ──
interface ItemActionsProps {
  index: number
  total: number
  onMoveUp: () => void
  onMoveDown: () => void
  onEdit: () => void
  onDelete: () => void
  onDuplicate?: () => void
  onSetActive?: () => void
  isActive?: boolean
}

export function ItemActions({
  index,
  total,
  onMoveUp,
  onMoveDown,
  onEdit,
  onDelete,
  onDuplicate,
  onSetActive,
  isActive,
}: ItemActionsProps) {
  return (
    <div className="flex items-center gap-1">
      {onSetActive && (
        <button
          onClick={onSetActive}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
            isActive ? "bg-gold/20 text-gold" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          )}
          title={isActive ? "Carte active" : "Activer cette carte"}
        >
          <Star className="h-3.5 w-3.5" fill={isActive ? "currentColor" : "none"} />
        </button>
      )}
      <button
        onClick={onMoveUp}
        disabled={index === 0}
        className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30"
        title="Monter"
      >
        <ChevronUp className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={onMoveDown}
        disabled={index === total - 1}
        className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30"
        title="Descendre"
      >
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={onEdit}
        className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        title="Modifier"
      >
        <Pencil className="h-3.5 w-3.5" />
      </button>
      {onDuplicate && (
        <button
          onClick={onDuplicate}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          title="Dupliquer"
        >
          <Copy className="h-3.5 w-3.5" />
        </button>
      )}
      <button
        onClick={onDelete}
        className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-rose/20 hover:text-destructive"
        title="Supprimer"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

// ── Empty state ──
export function StudioEmpty({ message, onAdd }: { message: string; onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-12 text-center">
      <p className="text-sm text-muted-foreground">{message}</p>
      <button
        onClick={onAdd}
        className="rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
      >
        Ajouter
      </button>
    </div>
  )
}

// ── Section header with add button ──
export function StudioSectionHeader({
  title,
  count,
  onAdd,
}: {
  title: string
  count: number
  onAdd: () => void
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h2 className="font-serif text-lg font-bold text-foreground">{title}</h2>
        <span className="flex h-5 min-w-5 items-center justify-center rounded-md bg-secondary px-1.5 text-[10px] font-bold text-muted-foreground">
          {count}
        </span>
      </div>
      <button
        onClick={onAdd}
        className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
      >
        + Ajouter
      </button>
    </div>
  )
}
