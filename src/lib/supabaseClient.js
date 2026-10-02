const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim().replace(/\/$/, '')
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim()
const SESSION_KEY = 'tenor-admin-session'
const AUTH_EVENT = 'tenor:auth-change'

export const supabaseConfigured = Boolean(supabaseUrl && publishableKey)
export const supabaseBaseUrl = supabaseUrl || ''

function configurationError() {
  return new Error('O Supabase ainda não foi configurado. Consulte docs/admin-setup.md.')
}

function getStoredSession() {
  try {
    const value = sessionStorage.getItem(SESSION_KEY)
    return value ? JSON.parse(value) : null
  } catch {
    return null
  }
}

function storeSession(session) {
  try {
    if (session) sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
    else sessionStorage.removeItem(SESSION_KEY)
  } catch {
    throw new Error('Não foi possível manter a sessão administrativa nesta aba.')
  }
  window.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail: session }))
}

async function parseResponse(response) {
  const text = await response.text()
  let data = null
  if (text) {
    try { data = JSON.parse(text) } catch { data = text }
  }
  if (!response.ok) {
    const message = data?.msg || data?.message || data?.error_description || data?.error || `Falha na API (${response.status}).`
    const error = new Error(message)
    error.status = response.status
    error.details = data
    throw error
  }
  return data
}

function apiHeaders(token, extra = {}) {
  if (!supabaseConfigured) throw configurationError()
  return {
    apikey: publishableKey,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  }
}

let refreshPromise = null
export async function getValidSession() {
  const session = getStoredSession()
  if (!session) return null
  if (Number(session.expires_at) > Math.floor(Date.now() / 1000) + 45) return session
  if (!session.refresh_token) {
    storeSession(null)
    return null
  }
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=refresh_token`, {
          method: 'POST',
          headers: apiHeaders(null, { 'Content-Type': 'application/json' }),
          body: JSON.stringify({ refresh_token: session.refresh_token }),
        })
        const refreshed = await parseResponse(response)
        return saveSession(refreshed)
      } catch (error) {
        storeSession(null)
        throw error
      } finally {
        refreshPromise = null
      }
    })()
  }
  return refreshPromise
}

function saveSession(data) {
  const session = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: data.expires_at || Math.floor(Date.now() / 1000) + Number(data.expires_in || 3600),
    token_type: data.token_type,
    user: data.user,
  }
  storeSession(session)
  return session
}

export async function databaseRequest(table, { method = 'GET', query = {}, body, prefer } = {}) {
  const session = await getValidSession()
  const params = new URLSearchParams()
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) params.set(key, String(value))
  })
  const queryString = params.toString()
  const suffix = queryString ? `?${queryString}` : ''
  const headers = apiHeaders(session?.access_token, {
    ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
    ...(prefer ? { Prefer: prefer } : {}),
  })
  const response = await fetch(`${supabaseUrl}/rest/v1/${encodeURIComponent(table)}${suffix}`, {
    method,
    headers,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  })
  return parseResponse(response)
}

export async function authRequest(path, { method = 'POST', body, token } = {}) {
  const session = token ? null : await getValidSession().catch(() => null)
  const response = await fetch(`${supabaseUrl}/auth/v1/${path}`, {
    method,
    headers: apiHeaders(token || session?.access_token, { 'Content-Type': 'application/json' }),
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  })
  return parseResponse(response)
}

export async function storageRequest(path, { method = 'POST', body, contentType, token } = {}) {
  const session = token ? null : await getValidSession()
  const response = await fetch(`${supabaseUrl}/storage/v1/${path}`, {
    method,
    headers: apiHeaders(token || session?.access_token, {
      ...(contentType ? { 'Content-Type': contentType } : {}),
    }),
    ...(body !== undefined ? { body } : {}),
  })
  return parseResponse(response)
}

export function publicStorageUrl(bucket, path) {
  if (!supabaseConfigured) throw configurationError()
  return `${supabaseUrl}/storage/v1/object/public/${encodeURIComponent(bucket)}/${path.split('/').map(encodeURIComponent).join('/')}`
}

export function onAuthChange(callback) {
  const listener = (event) => callback(event.detail || null)
  window.addEventListener(AUTH_EVENT, listener)
  return () => window.removeEventListener(AUTH_EVENT, listener)
}

export async function signIn(email, password) {
  const data = await authRequest('token?grant_type=password', { body: { email, password } })
  return saveSession(data)
}

export async function signOut() {
  const session = await getValidSession()
  try {
    if (session?.access_token) await authRequest('logout', { token: session.access_token })
  } finally {
    storeSession(null)
  }
}

export function clearSession() {
  storeSession(null)
}
