import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-hairline/60 px-6 py-8 lg:pl-32">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 font-mono text-xs text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Spring Boot + React.
        </p>
        <p>Chain verified · all sections signed off</p>
      </div>
    </footer>
  )
}
