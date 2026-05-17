export type VictoryType =
  | "reflection_saved"
  | "action_saved"
  | "image_exported"

const STORAGE_KEY = "signature-progress"

const pointsByVictory: Record<VictoryType, number> = {
  reflection_saved: 10,
  action_saved: 15,
  image_exported: 5,
}

const labelsByVictory: Record<VictoryType, string> = {
  reflection_saved: "Réflexion enregistrée",
  action_saved: "Petit pas enregistré",
  image_exported: "Carte exportée",
}

export interface SignatureProgress {
  points: number
  victories: {
    type: VictoryType
    label: string
    points: number
    createdAt: string
  }[]
}

export function getSignatureProgress(): SignatureProgress {
  if (typeof window === "undefined") {
    return {
      points: 0,
      victories: [],
    }
  }

  const saved = localStorage.getItem(STORAGE_KEY)

  if (!saved) {
    return {
      points: 0,
      victories: [],
    }
  }

  try {
    return JSON.parse(saved)
  } catch {
    localStorage.removeItem(STORAGE_KEY)

    return {
      points: 0,
      victories: [],
    }
  }
}

export function addVictory(type: VictoryType) {
  const current = getSignatureProgress()
  const points = pointsByVictory[type]

  const next: SignatureProgress = {
    points: current.points + points,
    victories: [
      {
        type,
        label: labelsByVictory[type],
        points,
        createdAt: new Date().toISOString(),
      },
      ...current.victories,
    ].slice(0, 10),
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))

  window.dispatchEvent(new Event("signature-progress-updated"))

  return next
}