// In dev, this defaults to your local Spring Boot server.
// In production, set VITE_API_URL in your hosting provider's env vars
// (see DEPLOYMENT.md) to your deployed backend's URL, no trailing slash.
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080'

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  let data = null
  try {
    data = await res.json()
  } catch {
    // no JSON body (e.g. 204) -- that's fine
  }

  if (!res.ok) {
    const message = data?.message || `Request failed with status ${res.status}`
    throw new Error(message)
  }

  return data
}

export function getProjects() {
  return request('/api/projects')
}

export function getSkillsGrouped() {
  return request('/api/skills/grouped')
}

export function submitContactMessage(payload) {
  return request('/api/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
