import SectionHeader from './SectionHeader'
import { profile } from '../data/profile'

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28 lg:pl-32">
      <SectionHeader index={1} label="About" title="Who's building this" />
      <div className="reveal grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <p className="font-mono text-sm leading-7 text-verify">
          &gt; role: {profile.role}
          <br />
          &gt; stack: Java · Spring Boot · React
          <br />
          &gt; focus: Scalable & Secure Backends
          <br />
          &gt; status: graduate, industry-ready
        </p>
        <div className="space-y-4 text-muted">
          <p>
            I'm {profile.name}, a Computer Engineering graduate with a strong interest in building scalable and secure backend applications. I enjoy developing systems that are reliable, maintainable, and designed to solve real-world problems—not just demonstrate functionality.
          </p>
          <p>
            My primary expertise is in Java and Spring Boot, where I've built RESTful APIs, implemented authentication and authorization using Spring Security and JWT, managed database transactions, and designed modular backend architectures. On the frontend, I use React.js to create responsive user interfaces that integrate seamlessly with Spring Boot applications.
          </p>
          <p>
            I'm continuously expanding my knowledge by exploring Spring's internal architecture, backend design patterns, DevOps practices, and modern software engineering principles to build efficient, production-ready applications.
          </p>
        </div>
      </div>
    </section>
  )
}
