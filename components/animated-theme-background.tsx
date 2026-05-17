export function AnimatedThemeBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute left-[-90px] top-[90px] h-72 w-72 rounded-full blur-3xl animate-float-slow"
        style={{ background: "rgba(92, 24, 53, 0.22)" }}
      />

      <div
        className="absolute right-[-100px] top-[280px] h-80 w-80 rounded-full blur-3xl animate-float-medium"
        style={{ background: "rgba(185, 130, 75, 0.22)" }}
      />

      <div
        className="absolute bottom-[80px] left-[20%] h-64 w-64 rounded-full blur-3xl animate-float-fast"
        style={{ background: "rgba(244, 217, 148, 0.18)" }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top, rgba(255,255,255,0.08), transparent 45%)",
        }}
      />
    </div>
  )
}