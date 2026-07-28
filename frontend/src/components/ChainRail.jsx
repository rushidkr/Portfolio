const BLOCKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export default function ChainRail({ activeId }) {
  const activeIndex = BLOCKS.findIndex((b) => b.id === activeId)

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      aria-label="Section navigation"
      className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-40 flex-col items-start gap-0"
    >
      {BLOCKS.map((block, i) => {
        const verified = i <= activeIndex
        return (
          <div key={block.id} className="flex flex-col items-center">
            <button
              onClick={() => scrollTo(block.id)}
              className="group flex items-center gap-3 py-2 focus:outline-none"
              aria-current={i === activeIndex ? 'true' : undefined}
            >
              <span
                className={`flex h-3 w-3 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                  verified
                    ? 'bg-verify border-verify'
                    : 'bg-transparent border-hairline group-hover:border-muted'
                }`}
              />
              <span
                className={`font-mono text-[11px] tracking-wide whitespace-nowrap transition-colors duration-300 ${
                  i === activeIndex ? 'text-paper' : 'text-muted group-hover:text-paper'
                }`}
              >
                BLOCK {String(i + 1).padStart(2, '0')} · {block.label.toUpperCase()}
              </span>
            </button>
            {i < BLOCKS.length - 1 && (
              <span
                className={`h-6 w-px transition-colors duration-300 ${
                  i < activeIndex ? 'bg-verify' : 'bg-hairline'
                }`}
              />
            )}
          </div>
        )
      })}
    </nav>
  )
}

export { BLOCKS }
