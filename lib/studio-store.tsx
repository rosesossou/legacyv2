"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type {
  StudioData,
  DestinyCard,
  Teaching,
  MonthlyJourney,
  GroupActivity,
  ReflectionPrompt,
} from "./types"
import { createInitialData } from "./mock-data"

function generateId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

interface StudioContextValue {
  data: StudioData

  // Cards
  addCard: (card: Omit<DestinyCard, "id" | "order">) => void
  updateCard: (id: string, updates: Partial<DestinyCard>) => void
  deleteCard: (id: string) => void
  duplicateCard: (id: string) => void
  reorderCards: (fromIndex: number, toIndex: number) => void
  setActiveCard: (id: string) => void

  // Teachings
  addTeaching: (t: Omit<Teaching, "id" | "order">) => void
  updateTeaching: (id: string, updates: Partial<Teaching>) => void
  deleteTeaching: (id: string) => void
  reorderTeachings: (fromIndex: number, toIndex: number) => void

  // Journeys
  addJourney: (j: Omit<MonthlyJourney, "id" | "order">) => void
  updateJourney: (id: string, updates: Partial<MonthlyJourney>) => void
  deleteJourney: (id: string) => void
  reorderJourneys: (fromIndex: number, toIndex: number) => void

  // Activities
  addActivity: (a: Omit<GroupActivity, "id" | "order">) => void
  updateActivity: (id: string, updates: Partial<GroupActivity>) => void
  deleteActivity: (id: string) => void
  reorderActivities: (fromIndex: number, toIndex: number) => void

  // Prompts
  addPrompt: (p: Omit<ReflectionPrompt, "id" | "order">) => void
  updatePrompt: (id: string, updates: Partial<ReflectionPrompt>) => void
  deletePrompt: (id: string) => void
  reorderPrompts: (fromIndex: number, toIndex: number) => void
}

const StudioContext = createContext<StudioContextValue | null>(null)

function reorder<T>(list: T[], from: number, to: number): T[] {
  const result = [...list]
  const [moved] = result.splice(from, 1)
  result.splice(to, 0, moved)
  return result
}

export function StudioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<StudioData>(createInitialData)

  // ── Cards ──
  const addCard = useCallback((card: Omit<DestinyCard, "id" | "order">) => {
    setData((prev) => ({
      ...prev,
      cards: [...prev.cards, { ...card, id: generateId("card"), order: prev.cards.length }],
    }))
  }, [])

  const updateCard = useCallback((id: string, updates: Partial<DestinyCard>) => {
    setData((prev) => ({
      ...prev,
      cards: prev.cards.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    }))
  }, [])

  const deleteCard = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      cards: prev.cards.filter((c) => c.id !== id).map((c, i) => ({ ...c, order: i })),
    }))
  }, [])

  const duplicateCard = useCallback((id: string) => {
    setData((prev) => {
      const source = prev.cards.find((c) => c.id === id)
      if (!source) return prev
      const copy: DestinyCard = {
        ...source,
        id: generateId("card"),
        weekTitle: source.weekTitle + " (copie)",
        isActive: false,
        order: prev.cards.length,
      }
      return { ...prev, cards: [...prev.cards, copy] }
    })
  }, [])

  const reorderCards = useCallback((from: number, to: number) => {
    setData((prev) => ({
      ...prev,
      cards: reorder(prev.cards, from, to).map((c, i) => ({ ...c, order: i })),
    }))
  }, [])

  const setActiveCard = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      cards: prev.cards.map((c) => ({ ...c, isActive: c.id === id })),
    }))
  }, [])

  // ── Teachings ──
  const addTeaching = useCallback((t: Omit<Teaching, "id" | "order">) => {
    setData((prev) => ({
      ...prev,
      teachings: [...prev.teachings, { ...t, id: generateId("teach"), order: prev.teachings.length }],
    }))
  }, [])

  const updateTeaching = useCallback((id: string, updates: Partial<Teaching>) => {
    setData((prev) => ({
      ...prev,
      teachings: prev.teachings.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    }))
  }, [])

  const deleteTeaching = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      teachings: prev.teachings.filter((t) => t.id !== id).map((t, i) => ({ ...t, order: i })),
    }))
  }, [])

  const reorderTeachings = useCallback((from: number, to: number) => {
    setData((prev) => ({
      ...prev,
      teachings: reorder(prev.teachings, from, to).map((t, i) => ({ ...t, order: i })),
    }))
  }, [])

  // ── Journeys ──
  const addJourney = useCallback((j: Omit<MonthlyJourney, "id" | "order">) => {
    setData((prev) => ({
      ...prev,
      journeys: [...prev.journeys, { ...j, id: generateId("journey"), order: prev.journeys.length }],
    }))
  }, [])

  const updateJourney = useCallback((id: string, updates: Partial<MonthlyJourney>) => {
    setData((prev) => ({
      ...prev,
      journeys: prev.journeys.map((j) => (j.id === id ? { ...j, ...updates } : j)),
    }))
  }, [])

  const deleteJourney = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      journeys: prev.journeys.filter((j) => j.id !== id).map((j, i) => ({ ...j, order: i })),
    }))
  }, [])

  const reorderJourneys = useCallback((from: number, to: number) => {
    setData((prev) => ({
      ...prev,
      journeys: reorder(prev.journeys, from, to).map((j, i) => ({ ...j, order: i })),
    }))
  }, [])

  // ── Activities ──
  const addActivity = useCallback((a: Omit<GroupActivity, "id" | "order">) => {
    setData((prev) => ({
      ...prev,
      activities: [...prev.activities, { ...a, id: generateId("activity"), order: prev.activities.length }],
    }))
  }, [])

  const updateActivity = useCallback((id: string, updates: Partial<GroupActivity>) => {
    setData((prev) => ({
      ...prev,
      activities: prev.activities.map((a) => (a.id === id ? { ...a, ...updates } : a)),
    }))
  }, [])

  const deleteActivity = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      activities: prev.activities.filter((a) => a.id !== id).map((a, i) => ({ ...a, order: i })),
    }))
  }, [])

  const reorderActivities = useCallback((from: number, to: number) => {
    setData((prev) => ({
      ...prev,
      activities: reorder(prev.activities, from, to).map((a, i) => ({ ...a, order: i })),
    }))
  }, [])

  // ── Prompts ──
  const addPrompt = useCallback((p: Omit<ReflectionPrompt, "id" | "order">) => {
    setData((prev) => ({
      ...prev,
      prompts: [...prev.prompts, { ...p, id: generateId("p"), order: prev.prompts.length }],
    }))
  }, [])

  const updatePrompt = useCallback((id: string, updates: Partial<ReflectionPrompt>) => {
    setData((prev) => ({
      ...prev,
      prompts: prev.prompts.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }))
  }, [])

  const deletePrompt = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      prompts: prev.prompts.filter((p) => p.id !== id).map((p, i) => ({ ...p, order: i })),
    }))
  }, [])

  const reorderPrompts = useCallback((from: number, to: number) => {
    setData((prev) => ({
      ...prev,
      prompts: reorder(prev.prompts, from, to).map((p, i) => ({ ...p, order: i })),
    }))
  }, [])

  return (
    <StudioContext.Provider
      value={{
        data,
        addCard, updateCard, deleteCard, duplicateCard, reorderCards, setActiveCard,
        addTeaching, updateTeaching, deleteTeaching, reorderTeachings,
        addJourney, updateJourney, deleteJourney, reorderJourneys,
        addActivity, updateActivity, deleteActivity, reorderActivities,
        addPrompt, updatePrompt, deletePrompt, reorderPrompts,
      }}
    >
      {children}
    </StudioContext.Provider>
  )
}

export function useStudio() {
  const ctx = useContext(StudioContext)
  if (!ctx) throw new Error("useStudio must be used within StudioProvider")
  return ctx
}
