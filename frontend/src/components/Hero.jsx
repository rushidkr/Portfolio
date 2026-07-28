import { useEffect, useState } from 'react'
import TerminalBoot from './TerminalBoot'
import { profile } from '../data/profile'

const ROLES = [
  "Java Full-Stack Developer",
  "Spring Boot Backend Engineer",
  "React Frontend Developer",
  "Database & API Specialist"
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [speed, setSpeed] = useState(100)

  useEffect(() => {
    let timer
    const tick = () => {
      const fullWord = ROLES[roleIndex]
      if (!isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length + 1))
        setSpeed(80)
        if (currentText === fullWord) {
          timer = setTimeout(() => setIsDeleting(true), 2000)
          return
        }
      } else {
        setCurrentText(fullWord.substring(0, currentText.length - 1))
        setSpeed(40)
        if (currentText === '') {
          setIsDeleting(false)
          setRoleIndex((prev) => (prev + 1) % ROLES.length)
        }
      }
      timer = setTimeout(tick, speed)
    }
    timer = setTimeout(tick, speed)
    return () => clearTimeout(timer)
  }, [currentText, isDeleting, roleIndex, speed])

  return (
    <section id="top" className="relative flex min-h-screen items-center pt-24">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <p className="font-mono text-xs tracking-widest text-muted">
            {profile.location.toUpperCase()} · OPEN TO OPPORTUNITIES
          </p>
          <div className="mt-5 min-h-[90px] sm:min-h-[120px] lg:min-h-[140px]">
            <h1 className="font-display text-4xl font-semibold leading-[1.1] text-paper sm:text-5xl lg:text-6xl">
              {profile.tagline}
            </h1>
          </div>
          <div className="mt-2 flex items-center font-mono text-sm sm:text-base text-signal">
            <span>&gt;&nbsp;</span>
            <span className="text-paper">{currentText}</span>
            <span className="blink text-signal font-bold">▍</span>
          </div>
          <p className="mt-6 max-w-lg text-lg text-muted">{profile.summary}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="rounded bg-signal px-5 py-3 font-mono text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 hover:bg-signal-soft"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="rounded border border-hairline px-5 py-3 font-mono text-sm text-paper transition-colors hover:border-signal hover:text-signal"
            >
              Get in touch
            </a>
          </div>

          <div className="mt-8 flex items-center gap-5 font-mono text-xs text-muted">
            <a href={profile.github} className="transition-colors hover:text-paper">
              GitHub ↗
            </a>
            <a href={profile.linkedin} className="transition-colors hover:text-paper">
              LinkedIn ↗
            </a>
            <a href={`mailto:${profile.email}`} className="transition-colors hover:text-paper">
              Email ↗
            </a>
          </div>
        </div>

        <div className="reveal">
          <TerminalBoot />
        </div>
      </div>
    </section>
  )
}
