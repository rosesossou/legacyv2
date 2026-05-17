"use client"

import { useState } from "react"
import { useStudio } from "@/lib/studio-store"
import type { MonthlyJourney } from "@/lib/types"
import {
  StudioField,
  ItemActions,
  StudioEmpty,
  StudioSectionHeader,
} from "./studio-ui"
import { ArrowLeft, CalendarDays, CheckCircle2 } from "lucide-react"

type WeeklyPlan = {
  title: string
  mainQuestion: string
  cardId: string | null
  teachingId: string | null
  activityId: string | null
  smallStep: string
}

type JourneyValue = (Omit<MonthlyJourney, "id" | "order"> | MonthlyJourney) & {
  weeklyPlans?: WeeklyPlan[]
}

type JourneyDraft = Omit<MonthlyJourney, "id" | "order"> & {
  weeklyPlans?: WeeklyPlan[]
}

const DEFAULT_WEEKLY_PLANS: WeeklyPlan[] = [
  {
    title: "",
    mainQuestion: "",
    cardId: null,
    teachingId: null,
    activityId: null,
    smallStep: "",
  },
  {
    title: "",
    mainQuestion: "",
    cardId: null,
    teachingId: null,
    activityId: null,
    smallStep: "",
  },
  {
    title: "",
    mainQuestion: "",
    cardId: null,
    teachingId: null,
    activityId: null,
    smallStep: "",
  },
  {
    title: "",
    mainQuestion: "",
    cardId: null,
    teachingId: null,
    activityId: null,
    smallStep: "",
  },
]

function emptyJourney(): JourneyDraft {
  return {
    monthTitle: "",
    mainTheme: "",
    spiritualObjective: "",
    weeklySteps: ["", "", "", ""],
    linkedCardIds: [],
    linkedTeachingIds: [],
    linkedActivityId: null,
    finalReflectionPrompts: ["", "", "", ""],
    weeklyPlans: DEFAULT_WEEKLY_PLANS,
  }
}

function getWeeklyPlans(journey: JourneyValue): WeeklyPlan[] {
  const existing = journey.weeklyPlans ?? []

  return DEFAULT_WEEKLY_PLANS.map((defaultWeek, index) => {
    const current = existing[index]

    return {
      title:
        current?.title ??
        journey.weeklySteps?.[index] ??
        defaultWeek.title,
      mainQuestion:
        current?.mainQuestion ??
        journey.finalReflectionPrompts?.[index] ??
        defaultWeek.mainQuestion,
      cardId:
        current?.cardId ??
        journey.linkedCardIds?.[index] ??
        defaultWeek.cardId,
      teachingId:
        current?.teachingId ??
        journey.linkedTeachingIds?.[index] ??
        defaultWeek.teachingId,
      activityId:
        current?.activityId ??
        (index === 0 ? journey.linkedActivityId : null) ??
        defaultWeek.activityId,
      smallStep: current?.smallStep ?? defaultWeek.smallStep,
    }
  })
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
  journey: JourneyValue
  onChange: (updates: Partial<MonthlyJourney> & { weeklyPlans?: WeeklyPlan[] }) => void
  onSave: () => void
  onCancel: () => void
  isNew: boolean
  cards: { id: string; weekTitle: string }[]
  teachings: { id: string; title: string }[]
  activities: { id: string; title: string }[]
}) {
  const weeklyPlans = getWeeklyPlans(journey)

  function updateWeek(index: number, updates: Partial<WeeklyPlan>) {
    const updatedWeeklyPlans = weeklyPlans.map((week, weekIndex) =>
      weekIndex === index ? { ...week, ...updates } : week
    )

    onChange({
      weeklyPlans: updatedWeeklyPlans,
      weeklySteps: updatedWeeklyPlans.map((week) => week.title),
      finalReflectionPrompts: updatedWeeklyPlans.map(
        (week) => week.mainQuestion
      ),
      linkedCardIds: updatedWeeklyPlans
        .map((week) => week.cardId)
        .filter(Boolean) as string[],
      linkedTeachingIds: updatedWeeklyPlans
        .map((week) => week.teachingId)
        .filter(Boolean) as string[],
      linkedActivityId:
        updatedWeeklyPlans.find((week) => week.activityId)?.activityId ?? null,
    })
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <button
          onClick={onCancel}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <div>
          <h2 className="font-serif text-lg font-bold text-foreground">
            {isNew ? "Nouveau parcours mensuel" : "Modifier le parcours"}
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Structure le mois en 4 semaines simples.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-gold/20 bg-champagne/40 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CalendarDays className="h-5 w-5" strokeWidth={1.7} />
          </div>

          <div>
            <h3 className="font-serif text-base font-semibold text-foreground">
              Logique recommandée
            </h3>

            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Un mois = 4 semaines. Chaque semaine contient une question, un
              enseignement, une activité et un petit pas. Simple à animer,
              simple à suivre.
            </p>
          </div>
        </div>
      </div>

      <StudioField
        label="Titre du mois"
        value={journey.monthTitle}
        onChange={(value) => onChange({ monthTitle: value })}
        placeholder="Ex: Mois 1 - Fondations intérieures"
      />

      <StudioField
        label="Thème principal"
        value={journey.mainTheme}
        onChange={(value) => onChange({ mainTheme: value })}
        placeholder="Ex: Renouveler mes pensées et connaître mon identité"
        multiline
      />

      <StudioField
        label="Objectif spirituel"
        value={journey.spiritualObjective}
        onChange={(value) => onChange({ spiritualObjective: value })}
        placeholder="Ex: Apprendre à revenir à la vérité de Dieu avec douceur"
        multiline
      />

      <div className="flex flex-col gap-4">
        <div>
          <h3 className="font-serif text-base font-semibold text-foreground">
            Semaines du parcours
          </h3>

          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Prépare le rythme du mois. Tu peux laisser certains champs vides au
            début et compléter plus tard.
          </p>
        </div>

        {weeklyPlans.map((week, index) => (
          <div
            key={index}
            className="rounded-3xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
                  Semaine {index + 1}
                </p>

                <h4 className="mt-1 font-serif text-base font-semibold text-foreground">
                  {week.title || "Nouvelle semaine"}
                </h4>
              </div>

              {(week.title ||
                week.mainQuestion ||
                week.cardId ||
                week.teachingId ||
                week.activityId ||
                week.smallStep) && (
                <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
                  <CheckCircle2 className="h-3 w-3" />
                  préparée
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <SimpleField
                label="Thème de la semaine"
                value={week.title}
                onChange={(value) => updateWeek(index, { title: value })}
                placeholder="Ex: Observer mes pensées"
              />

              <SimpleField
                label="Question principale"
                value={week.mainQuestion}
                onChange={(value) =>
                  updateWeek(index, { mainQuestion: value })
                }
                placeholder="Ex: Quelle pensée revient souvent en moi ces derniers jours ?"
              />

              <SimpleSelect
                label="Carte associée"
                value={week.cardId ?? ""}
                onChange={(value) =>
                  updateWeek(index, { cardId: value || null })
                }
                emptyLabel="Aucune carte"
                options={cards.map((card) => ({
                  value: card.id,
                  label: card.weekTitle || "Carte sans titre",
                }))}
              />

              <SimpleSelect
                label="Enseignement associé"
                value={week.teachingId ?? ""}
                onChange={(value) =>
                  updateWeek(index, { teachingId: value || null })
                }
                emptyLabel="Aucun enseignement"
                options={teachings.map((teaching) => ({
                  value: teaching.id,
                  label: teaching.title || "Enseignement sans titre",
                }))}
              />

              <SimpleSelect
                label="Activité associée"
                value={week.activityId ?? ""}
                onChange={(value) =>
                  updateWeek(index, { activityId: value || null })
                }
                emptyLabel="Aucune activité"
                options={activities.map((activity) => ({
                  value: activity.id,
                  label: activity.title || "Activité sans titre",
                }))}
              />

              <SimpleField
                label="Petit pas proposé"
                value={week.smallStep}
                onChange={(value) => updateWeek(index, { smallStep: value })}
                placeholder="Ex: Écrire une pensée récurrente et chercher un verset qui y répond."
                multiline
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onSave}
        disabled={!journey.monthTitle.trim()}
        className="mt-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md active:scale-[0.98] disabled:opacity-40"
      >
        {isNew ? "Créer le parcours" : "Enregistrer"}
      </button>
    </div>
  )
}

function SimpleField({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  multiline?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[11px] font-medium text-muted-foreground">
        {label}
      </label>

      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={3}
          className="resize-none rounded-xl border border-input bg-background px-3 py-2.5 text-xs leading-relaxed text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30"
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="rounded-xl border border-input bg-background px-3 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30"
        />
      )}
    </div>
  )
}

function SimpleSelect({
  label,
  value,
  onChange,
  emptyLabel,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  emptyLabel: string
  options: { value: string; label: string }[]
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[11px] font-medium text-muted-foreground">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-input bg-background px-3 py-2.5 text-xs text-foreground transition-all focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30"
      >
        <option value="">{emptyLabel}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export function StudioParcours() {
  const { data, addJourney, updateJourney, deleteJourney, reorderJourneys } =
    useStudio()

  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [draft, setDraft] = useState<JourneyDraft>(emptyJourney())

  const sorted = [...data.journeys].sort((a, b) => a.order - b.order)
  const cardList = data.cards.map((card) => ({
    id: card.id,
    weekTitle: card.weekTitle,
  }))
  const teachList = data.teachings.map((teaching) => ({
    id: teaching.id,
    title: teaching.title,
  }))
  const actList = data.activities.map((activity) => ({
    id: activity.id,
    title: activity.title,
  }))

  if (isCreating) {
    return (
      <JourneyForm
        journey={draft}
        onChange={(updates) =>
          setDraft((previous) => ({ ...previous, ...updates }))
        }
        onSave={() => {
          addJourney(draft)
          setDraft(emptyJourney())
          setIsCreating(false)
        }}
        onCancel={() => {
          setDraft(emptyJourney())
          setIsCreating(false)
        }}
        isNew
        cards={cardList}
        teachings={teachList}
        activities={actList}
      />
    )
  }

  if (editingId) {
    const journey = data.journeys.find((item) => item.id === editingId)

    if (!journey) return null

    return (
      <JourneyForm
        journey={journey as JourneyValue}
        onChange={(updates) => updateJourney(editingId, updates)}
        onSave={() => setEditingId(null)}
        onCancel={() => setEditingId(null)}
        isNew={false}
        cards={cardList}
        teachings={teachList}
        activities={actList}
      />
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <StudioSectionHeader
        title="Parcours mensuels"
        count={sorted.length}
        onAdd={() => setIsCreating(true)}
      />

      <div className="rounded-3xl border border-gold/20 bg-champagne/40 p-5">
        <h2 className="font-serif text-lg font-semibold text-foreground">
          Comment utiliser cet espace
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Crée un mois, puis prépare 4 semaines. Pour chaque semaine, choisis une
          question, un enseignement, une activité et un petit pas. Les onglets
          Cartes, Enseignements et Activités servent de bibliothèque.
        </p>
      </div>

      {sorted.length === 0 ? (
        <StudioEmpty
          message="Aucun parcours mensuel"
          onAdd={() => setIsCreating(true)}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {sorted.map((journey, index) => {
            const weeklyPlans = getWeeklyPlans(journey as JourneyValue)
            const completedWeeks = weeklyPlans.filter(
              (week) =>
                week.title ||
                week.mainQuestion ||
                week.cardId ||
                week.teachingId ||
                week.activityId ||
                week.smallStep
            ).length

            return (
              <div
                key={journey.id}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md"
              >
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {journey.monthTitle || "Sans titre"}
                  </h3>

                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {journey.mainTheme || "Aucun thème principal"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-secondary px-3 py-2">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      Semaines
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {completedWeeks}/4 préparées
                    </p>
                  </div>

                  <div className="rounded-xl bg-secondary px-3 py-2">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      Format
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      Question + contenu
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-background p-3">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
                    Aperçu des semaines
                  </p>

                  <div className="mt-3 flex flex-col gap-2">
                    {weeklyPlans.map((week, weekIndex) => (
                      <div
                        key={weekIndex}
                        className="flex items-start gap-2 text-xs"
                      >
                        <span className="mt-0.5 shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                          S{weekIndex + 1}
                        </span>

                        <div>
                          <p className="font-medium text-foreground">
                            {week.title || "Semaine non définie"}
                          </p>

                          <p className="mt-0.5 line-clamp-1 text-muted-foreground">
                            {week.mainQuestion || "Question à ajouter"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end border-t border-border pt-3">
                  <ItemActions
                    index={index}
                    total={sorted.length}
                    onMoveUp={() => reorderJourneys(index, index - 1)}
                    onMoveDown={() => reorderJourneys(index, index + 1)}
                    onEdit={() => setEditingId(journey.id)}
                    onDelete={() => deleteJourney(journey.id)}
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