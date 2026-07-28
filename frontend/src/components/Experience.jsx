import SectionHeader from './SectionHeader'
import { education, milestones } from '../data/profile'

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-28 lg:pl-32">
      <SectionHeader index={4} label="Experience" title="Education & milestones" />

      <div className="reveal grid gap-12 lg:grid-cols-2">
        <div>
          <h3 className="font-mono text-xs tracking-widest text-signal">EDUCATION</h3>
          <div className="mt-5 space-y-6">
            {education.map((item) => (
              <div key={item.title} className="border-l-2 border-hairline pl-5 transition-all duration-300 hover:border-signal hover:pl-7 group/timeline">
                <p className="font-mono text-xs text-muted">{item.period}</p>
                <p className="mt-1 font-display font-semibold text-paper group-hover/timeline:text-signal transition-colors duration-300">{item.title}</p>
                <p className="text-sm text-muted">{item.place}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-mono text-xs tracking-widest text-signal">PROJECT TIMELINE</h3>
          <div className="mt-5 space-y-6">
            {milestones.map((item) => (
              <div key={item.title} className="border-l-2 border-hairline pl-5 transition-all duration-300 hover:border-signal hover:pl-7 group/timeline">
                <p className="font-mono text-xs text-muted">{item.period}</p>
                <p className="mt-1 font-display font-semibold text-paper group-hover/timeline:text-signal transition-colors duration-300">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
