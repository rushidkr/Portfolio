import { useState } from 'react'
import SectionHeader from './SectionHeader'
import { submitContactMessage } from '../lib/api'
import { profile } from '../data/profile'

const initialForm = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    try {
      await submitContactMessage(form)
      setStatus('success')
      setForm(initialForm)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Try again in a moment.')
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28 lg:pl-32">
      <SectionHeader
        index={5}
        label="Contact"
        title="Let's talk"
        description="This form writes straight into the backend's database -- it's not a mailto link in disguise."
      />

      <div className="reveal grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4 font-mono text-sm">
          <a
            href={`mailto:${profile.email}`}
            className="block text-paper transition-colors hover:text-signal"
          >
            {profile.email}
          </a>
          <a
            href={profile.github}
            className="block text-muted transition-colors hover:text-signal"
          >
            {profile.github.replace('https://', '')}
          </a>
          <a
            href={profile.linkedin}
            className="block text-muted transition-colors hover:text-signal"
          >
            {profile.linkedin.replace('https://', '')}
          </a>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1.5 block font-mono text-xs text-muted">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full rounded border border-hairline bg-panel/50 px-4 py-2.5 text-paper outline-none transition-colors focus:border-signal"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block font-mono text-xs text-muted">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full rounded border border-hairline bg-panel/50 px-4 py-2.5 text-paper outline-none transition-colors focus:border-signal"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block font-mono text-xs text-muted">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              minLength={10}
              value={form.message}
              onChange={handleChange}
              className="w-full resize-none rounded border border-hairline bg-panel/50 px-4 py-2.5 text-paper outline-none transition-colors focus:border-signal"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="rounded bg-signal px-5 py-3 font-mono text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 hover:bg-signal-soft disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>

          {status === 'success' && (
            <p className="font-mono text-sm text-verify">
              Message received. I'll get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p className="font-mono text-sm text-red-400">{errorMsg}</p>
          )}
        </form>
      </div>
    </section>
  )
}
