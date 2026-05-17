import { Heart, PenLine, Footprints } from "lucide-react"

export function TodayGuideCard() {
  return (
    <section className="rounded-3xl border border-gold/20 bg-champagne/40 p-5 shadow-sm space-y-5">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.25em] text-gold">
          Aujourd’hui
        </p>

        <h2 className="font-serif text-2xl leading-tight text-foreground">
          Commence simplement.
        </h2>

        <p className="text-sm leading-relaxed text-muted-foreground">
          Tu n’as pas besoin de tout remplir aujourd’hui. Une phrase, une prière,
          un petit pas fidèle suffisent.
        </p>
      </div>

      <div className="grid gap-3">
        <Step
          icon={<Heart className="h-4 w-4" />}
          title="1. Je demeure"
          description="Je prends quelques minutes pour revenir à Dieu."
        />

        <Step
          icon={<PenLine className="h-4 w-4" />}
          title="2. J’écris"
          description="Je dépose une pensée, une charge ou une vérité."
        />

        <Step
          icon={<Footprints className="h-4 w-4" />}
          title="3. Je pose un petit pas"
          description="Je choisis une action simple, réaliste et fidèle."
        />
      </div>
    </section>
  )
}

function Step({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-card/70 p-4">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}