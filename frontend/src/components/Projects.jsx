import { useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'
import ProjectCard from './ProjectCard'
import { getProjects } from '../lib/api'
import { fallbackProjects } from '../data/fallback'

export default function Projects() {
  const [projects, setProjects] = useState(fallbackProjects)

  useEffect(() => {
    getProjects()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setProjects(data)
      })
      .catch(() => {
        // keep fallback data
      })
  }, [])

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28 lg:pl-32">
      <SectionHeader
        index={3}
        label="Projects"
        title="Things I've shipped"
        description="Each one is a real, working system -- not a tutorial clone."
      />
      <div className="reveal grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
