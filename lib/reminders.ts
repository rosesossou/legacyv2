const reminders = [
  "Une phrase suffit pour revenir à Dieu aujourd’hui.",
  "Tu peux déposer ce qui pèse, sans tout expliquer.",
  "Reviens avec ce qui est là. Tu n’as rien à prouver.",
  "Prends un instant pour clarifier ton esprit avec Dieu.",
  "Avant d’avancer, prends un moment pour demeurer.",
  "Ce que tu portes mérite d’être déposé, pas gardé seule.",
  "Un petit pas fidèle suffit pour aujourd’hui.",
  "Reviens à la vérité, puis pose un petit pas.",
]

export function getDailyReminder() {
  const today = new Date()
  const index =
    today.getFullYear() + today.getMonth() + today.getDate()

  return reminders[index % reminders.length]
}