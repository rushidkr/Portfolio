export default function ProjectCard({ project }) {
  return (
    <article className="group flex flex-col rounded-lg border border-hairline bg-panel/50 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:bg-panel hover:shadow-2xl hover:shadow-black/20 hover:border-signal/60">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-paper">{project.title}</h3>
        {project.featured && (
          <span className="shrink-0 rounded-full border border-verify/40 px-2 py-0.5 font-mono text-[10px] text-verify">
            FEATURED
          </span>
        )}
      </div>
      <p className="mt-3 flex-1 text-sm leading-6 text-muted">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack?.map((tech) => (
          <span
            key={tech}
            className="rounded border border-hairline px-2 py-0.5 font-mono text-[11px] text-muted"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-5 flex gap-4 font-mono text-xs">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            className="text-paper transition-colors hover:text-signal"
          >
            Source ↗
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} className="text-paper transition-colors hover:text-signal">
            Live ↗
          </a>
        )}
        {project.title.toLowerCase().includes('durgsetu') && (
          <a
            href="/durgsetu-copyright.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-paper transition-colors hover:text-signal"
          >
            Copyright ↗
          </a>
        )}
      </div>
    </article>
  )
}
