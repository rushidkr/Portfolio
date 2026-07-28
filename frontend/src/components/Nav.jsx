import { useEffect, useState } from 'react'
import { profile } from '../data/profile'

export default function Nav() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === 'light') {
      root.classList.add('light')
    } else {
      root.classList.remove('light')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = (event) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    
    if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTheme(nextTheme)
      return
    }

    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const transition = document.startViewTransition(() => {
      setTheme(nextTheme)
    })

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ]
      document.documentElement.animate(
        {
          clipPath: theme === 'dark' ? clipPath : [...clipPath].reverse(),
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          pseudoElement: theme === 'dark' ? '::view-transition-new(root)' : '::view-transition-old(root)',
        }
      )
    })
  }

  const handleResumeDownload = () => {
    const apiBase = import.meta.env.VITE_API_URL || ''
    fetch(`${apiBase}/api/analytics/track?isResume=true`, {
      method: 'POST'
    }).catch(() => {
      // fail silently
    })
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b border-hairline bg-panel/85 shadow-md shadow-ink/10 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-sm font-semibold tracking-wide text-paper">
          {profile.name.toUpperCase()}<span className="text-signal">.</span>
          <span className="ml-2 hidden font-mono text-[11px] font-normal text-muted sm:inline">
            /{profile.role.toLowerCase().replace(/\s+/g, '-')}
          </span>
        </a>
        <nav className="flex items-center gap-6 font-mono text-xs text-muted">
          <a href="#projects" className="hidden transition-colors hover:text-paper sm:inline">
            Projects
          </a>
          <a href="#contact" className="hidden transition-colors hover:text-paper sm:inline">
            Contact
          </a>
          <a
            href={profile.resumeUrl}
            download="Rushiprasad_Daitkar_Resume.pdf"
            onClick={handleResumeDownload}
            className="rounded border border-hairline px-3 py-1.5 text-paper transition-colors hover:border-signal hover:text-signal"
          >
            Resume
          </a>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex items-center justify-center rounded-full p-1.5 text-muted transition-all duration-500 hover:text-paper hover:rotate-90 hover:scale-110 active:scale-95 cursor-pointer"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m8.966-8.966h-2.25m-13.5 0h-2.25m15.034-7.034-1.591 1.591M4.929 19.071l1.591-1.591m0-12.728L4.93 4.93m12.727 12.727 1.591 1.591M12 18.75a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}
