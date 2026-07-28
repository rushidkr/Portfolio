import { useEffect, useState } from 'react'

const LINES = [
  { text: '$ verify --engineer rushi', delay: 0 },
  { text: 'loading credentials...', delay: 500, dim: true },
  { text: 'checking signature ......... OK', delay: 1300 },
  { text: 'checking chain integrity ... OK', delay: 1300 },
  { text: 'role   : Java Full-Stack Developer', delay: 900 },
  { text: 'status : READY FOR PLACEMENT', delay: 700, highlight: true },
]

export default function TerminalBoot() {
  const [visibleLines, setVisibleLines] = useState(0)
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleLines(LINES.length)
      return
    }

    let cancelled = false
    let cumulativeDelay = 300

    LINES.forEach((line, i) => {
      cumulativeDelay += line.delay
      const timer = setTimeout(() => {
        if (!cancelled) setVisibleLines(i + 1)
      }, cumulativeDelay)
      return () => clearTimeout(timer)
    })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="rounded-lg border border-hairline bg-panel/80 shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-hairline" />
        <span className="h-2.5 w-2.5 rounded-full bg-hairline" />
        <span className="h-2.5 w-2.5 rounded-full bg-hairline" />
        <span className="ml-2 font-mono text-xs text-muted">verichain-cli</span>
      </div>
      <div className="min-h-[220px] px-5 py-4 font-mono text-sm leading-7">
        {LINES.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className={
              line.highlight
                ? 'text-verify'
                : line.dim
                ? 'text-muted'
                : 'text-paper'
            }
          >
            {line.text}
          </div>
        ))}
        {visibleLines < LINES.length && (
          <span className="blink text-signal">▍</span>
        )}
        {visibleLines === LINES.length && (
          <span className="blink text-verify">▍</span>
        )}
      </div>
    </div>
  )
}
