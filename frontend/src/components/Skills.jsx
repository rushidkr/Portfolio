import { useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'
import { getSkillsGrouped } from '../lib/api'
import { fallbackSkills } from '../data/fallback'

function ProficiencyDots({ level }) {
  return (
    <span className="flex gap-1 group/dots">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`h-1.5 w-1.5 rounded-full transition-transform duration-300 group-hover/dots:scale-125 ${n <= level ? 'bg-signal' : 'bg-hairline'}`}
          style={{ transitionDelay: `${(n - 1) * 40}ms` }}
        />
      ))}
    </span>
  )
}

export default function Skills() {
  const [groups, setGroups] = useState(fallbackSkills)

  useEffect(() => {
    getSkillsGrouped()
      .then((data) => {
        if (data && Object.keys(data).length > 0) setGroups(data)
      })
      .catch(() => {
        // keep fallback data -- the site should never look broken
      })
  }, [])

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-28 lg:pl-32">
      <SectionHeader
        index={2}
        label="Skills"
        title="What I build with"
        description="Pulled live from the same Spring Boot API that powers the rest of this site."
      />
      <div className="reveal grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(groups).map(([category, skills]) => (
          <div key={category} className="rounded-lg border border-hairline bg-panel/50 p-5">
            <h3 className="font-mono text-xs tracking-widest text-signal">
              {category.toUpperCase()}
            </h3>
            <ul className="mt-4 space-y-3">
              {skills.map((skill) => (
                <li key={skill.id} className="flex items-center justify-between gap-3 group/item p-1 -m-1 rounded hover:bg-panel-2/20 transition-colors duration-200">
                  <span className="text-sm text-paper group-hover/item:text-signal transition-colors duration-200">{skill.name}</span>
                  <ProficiencyDots level={skill.proficiency} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
