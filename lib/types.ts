// ── Signature App Data Types ──
// Structured for future Firebase/Supabase migration

export interface VisualTheme {
  id: string
  name: string
  bg: string
  accent: string
  text: string
  badge: string
}

export interface DestinyCard {
  id: string
  weekTitle: string
  collectionLabel: string
  bibleVerse: string
  reference: string
  mainDeclaration: string
  identityStatement: string
  formingInMe: string
  leavingBehind: string
  obedienceStep: string
  prayer: string
  visualThemeId: string
  isActive: boolean
  order: number
}

export type TeachingFormat = "text" | "audio" | "video" | "book" | "sermon" | "discussion"

export interface Teaching {
  id: string
  title: string
  theme: string
  sourceInspiration: string
  format: TeachingFormat
  duration: string
  keyIdea: string
  bibleVerse: string
  reflectionQuestions: string[]
  actionToApply: string
  leaderNotes: string
  weekId: string | null
  order: number
}

export interface MonthlyJourney {
  id: string
  monthTitle: string
  mainTheme: string
  spiritualObjective: string
  weeklySteps: string[]
  linkedCardIds: string[]
  linkedTeachingIds: string[]
  linkedActivityId: string | null
  finalReflectionPrompts: string[]
  order: number
}

export interface GroupActivity {
  id: string
  title: string
  objective: string
  duration: string
  instructions: string
  whatToPrepare: string
  journalPrompts: string[]
  groupSharingQuestions: string[]
  prayerFocus: string
  weekId: string | null
  monthId: string | null
  order: number
}

export type PromptCategory =
  | "Intimite avec Dieu"
  | "Coeur et pensees"
  | "Identite"
  | "Dessein"
  | "Obeissance"
  | "Formation"
  | "Heritage"
  | "Finances"
  | "Relations"
  | "Education"
  | "Excellence"

export interface ReflectionPrompt {
  id: string
  text: string
  category: PromptCategory
  order: number
}

export interface StudioData {
  cards: DestinyCard[]
  teachings: Teaching[]
  journeys: MonthlyJourney[]
  activities: GroupActivity[]
  prompts: ReflectionPrompt[]
  themes: VisualTheme[]
}
