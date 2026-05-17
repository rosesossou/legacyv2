"use client"

import { useRef, useState } from "react"
import { toPng } from "html-to-image"
import { Download } from "lucide-react"

interface DownloadLine {
  label: string
  value: string
}

interface SignatureDownloadCardProps {
  title: string
  subtitle: string
  verse: string
  reference: string
  lines: DownloadLine[]
  fileName: string
  buttonLabel?: string
}

export function SignatureDownloadCard({
  title,
  subtitle,
  verse,
  reference,
  lines,
  fileName,
  buttonLabel = "Voir / télécharger ma carte",
}: SignatureDownloadCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  async function downloadCard() {
    if (!cardRef.current) return

    try {
      setIsDownloading(true)

      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#2b0b35",
      })

      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

      if (isMobile) {
        const imageWindow = window.open()

        if (imageWindow) {
          imageWindow.document.write(`
            <html>
              <head>
                <title>Ma carte Signature</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <style>
                  body {
                    margin: 0;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #2b0b35;
                    padding: 16px;
                    box-sizing: border-box;
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                  }

                  .wrap {
                    width: 100%;
                    max-width: 430px;
                    text-align: center;
                  }

                  img {
                    width: 100%;
                    height: auto;
                    border-radius: 24px;
                    box-shadow: 0 24px 80px rgba(0,0,0,0.35);
                  }

                  p {
                    color: rgba(255,255,255,0.82);
                    font-size: 14px;
                    line-height: 1.5;
                    margin: 16px 0 0;
                  }
                </style>
              </head>
              <body>
                <div class="wrap">
                  <img src="${dataUrl}" alt="Ma carte Signature" />
                  <p>Appuie longtemps sur la carte pour l’enregistrer dans tes photos.</p>
                </div>
              </body>
            </html>
          `)

          imageWindow.document.close()
        } else {
          alert(
            "La carte est prête, mais ton navigateur a bloqué l’ouverture. Autorise les pop-ups pour l’enregistrer."
          )
        }

        setIsDownloading(false)
        return
      }

      const link = document.createElement("a")
      link.href = dataUrl
      link.download = `${fileName}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setIsDownloading(false)
    } catch (error) {
      console.error("Erreur téléchargement carte :", error)
      setIsDownloading(false)

      alert(
        "La carte n’a pas pu être préparée. Essaie de recharger la page, ou teste depuis Chrome."
      )
    }
  }

  const visibleLines = lines.filter((line) => line.value.trim().length > 0)

  return (
    <>
      <button
        onClick={downloadCard}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-gold/30 bg-card px-5 py-3.5 text-sm font-semibold text-primary shadow-sm transition-all duration-200 hover:bg-champagne/40 active:scale-[0.98]"
      >
        <Download className="h-4 w-4" />
        {isDownloading ? "Préparation de la carte..." : buttonLabel}
      </button>

      <div className="pointer-events-none fixed -left-[9999px] top-0">
        <div
          ref={cardRef}
          style={{
            width: "900px",
            minHeight: "1350px",
            padding: "56px",
            color: "#fff7ed",
            background:
              "radial-gradient(circle at 85% 85%, rgba(204, 145, 74, 0.85), transparent 36%), linear-gradient(140deg, #2b0b35 0%, #3c0f3a 38%, #6f334d 72%, #a56945 100%)",
            fontFamily:
              'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          }}
        >
          <div
            style={{
              minHeight: "1238px",
              border: "2px solid rgba(255, 255, 255, 0.22)",
              borderRadius: "64px",
              padding: "72px",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "rgba(255, 255, 255, 0.68)",
                fontSize: "28px",
                letterSpacing: "0.42em",
                textTransform: "uppercase",
              }}
            >
              Signature
            </p>

            <p
              style={{
                marginTop: "54px",
                marginBottom: 0,
                color: "#f6e58d",
                fontSize: "27px",
                letterSpacing: "0.42em",
                textTransform: "uppercase",
              }}
            >
              {title}
            </p>

            <h1
              style={{
                marginTop: "72px",
                marginBottom: 0,
                maxWidth: "640px",
                color: "#fffaf0",
                fontFamily: "Georgia, Cambria, serif",
                fontSize: "76px",
                fontWeight: 400,
                lineHeight: 1.08,
                letterSpacing: "0.01em",
              }}
            >
              {subtitle}
            </h1>

            <div
              style={{
                marginTop: "72px",
                width: "150px",
                height: "5px",
                background: "#f6e58d",
              }}
            />

            <div style={{ marginTop: "72px" }}>
              <p
                style={{
                  margin: 0,
                  maxWidth: "680px",
                  color: "rgba(255, 255, 255, 0.88)",
                  fontSize: "34px",
                  fontStyle: "italic",
                  lineHeight: 1.65,
                }}
              >
                “{verse}”
              </p>

              <p
                style={{
                  marginTop: "18px",
                  marginBottom: 0,
                  color: "#f6e58d",
                  fontSize: "31px",
                  lineHeight: 1.2,
                }}
              >
                {reference}
              </p>
            </div>

            <div style={{ marginTop: "72px" }}>
              {visibleLines.length > 0 ? (
                visibleLines.map((line) => (
                  <div key={line.label} style={{ marginBottom: "54px" }}>
                    <p
                      style={{
                        margin: 0,
                        color: "#f6e58d",
                        fontSize: "25px",
                        letterSpacing: "0.36em",
                        textTransform: "uppercase",
                        lineHeight: 1.4,
                      }}
                    >
                      {line.label}
                    </p>

                    <p
                      style={{
                        marginTop: "20px",
                        marginBottom: 0,
                        color: "rgba(255, 255, 255, 0.86)",
                        fontSize: "33px",
                        lineHeight: 1.55,
                      }}
                    >
                      {line.value}
                    </p>
                  </div>
                ))
              ) : (
                <p
                  style={{
                    marginTop: "20px",
                    color: "rgba(255, 255, 255, 0.86)",
                    fontSize: "33px",
                    lineHeight: 1.55,
                  }}
                >
                  Une phrase sincère suffit pour aujourd’hui.
                </p>
              )}
            </div>

            <div
              style={{
                marginTop: "48px",
                paddingTop: "36px",
                borderTop: "1px solid rgba(246, 229, 141, 0.35)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: "rgba(255, 255, 255, 0.72)",
                  fontFamily: "Georgia, Cambria, serif",
                  fontSize: "28px",
                  fontStyle: "italic",
                  lineHeight: 1.45,
                }}
              >
                Tu n’as rien à prouver ici.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}