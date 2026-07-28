export default function SectionHeader({ index, label, title, description }) {
  return (
    <div className="reveal mb-12 max-w-2xl">
      <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-signal">
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-signal/50 text-[10px]">
          {String(index).padStart(2, '0')}
        </span>
        BLOCK {String(index).padStart(2, '0')} · {label.toUpperCase()}
      </div>
      <h2 className="mt-4 font-display text-3xl font-semibold text-paper sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-3 text-muted">{description}</p>}
    </div>
  )
}
