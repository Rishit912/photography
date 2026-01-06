const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

async function apiFetch(path, { method = 'GET', token, body, isFormData = false } = {}) {
  const headers = {}
  let payload = body

  if (token) headers.Authorization = `Bearer ${token}`

  if (!isFormData) {
    headers['Content-Type'] = 'application/json'
    if (body) payload = JSON.stringify(body)
  }

  const res = await fetch(`${API_URL}${path}`, { method, headers, body: payload })
  const data = await res.json().catch(() => null)
  if (!res.ok) {
    const message = data?.message || 'Request failed'
    throw new Error(message)
  }
  return data
}

export { API_URL, apiFetch }
