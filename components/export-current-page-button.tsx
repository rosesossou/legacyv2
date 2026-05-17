"use client"

import { Download } from "lucide-react"

interface ExportCurrentPageButtonProps {
  title: string
  fileName: string
}

export function ExportCurrentPageButton({
  title,
  fileName,
}: ExportCurrentPageButtonProps) {
  function exportCurrentPage() {
    const lines: string[] = []

    lines.push(title)
    lines.push("")
    lines.push(`Date : ${new Date().toLocaleDateString("fr-FR")}`)
    lines.push("")

    const headings = document.querySelectorAll("h1, h2, h3")
    headings.forEach((heading) => {
      const text = heading.textContent?.trim()
      if (text) {
        lines.push(text.toUpperCase())
        lines.push("")
      }
    })

    const fields = document.querySelectorAll("textarea, input")

    fields.forEach((field) => {
      const element = field as HTMLInputElement | HTMLTextAreaElement

      if (element.type === "hidden") return

      const label =
        element
          .closest("div")
          ?.querySelector("label")
          ?.textContent?.trim() || element.placeholder || "Champ"

      if (element instanceof HTMLInputElement) {
        if (element.type === "checkbox") {
          lines.push(`${label} : ${element.checked ? "Oui" : "Non"}`)
          lines.push("")
          return
        }

        if (element.type === "radio") {
          if (element.checked) {
            lines.push(`${label} : ${element.value}`)
            lines.push("")
          }
          return
        }
      }

      lines.push(`${label}`)
      lines.push(element.value || "Non renseigné")
      lines.push("")
    })

    const content = lines.join("\n").trim()

    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    link.href = url
    link.download = fileName
    link.click()

    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={exportCurrentPage}
      className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-background px-5 py-4 font-medium text-foreground"
    >
      <Download className="h-4 w-4" />
      Exporter
    </button>
  )
}