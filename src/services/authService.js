import { authRequest, databaseRequest, getValidSession, onAuthChange, signIn, signOut } from '../lib/supabaseClient.js'

export async function getCurrentSession() {
  return getValidSession()
}

export function onAuthStateChange(callback) {
  return onAuthChange(callback)
}

export async function signInWithPassword(email, password) {
  return signIn(email, password)
}

export async function signOutAdmin() {
  return signOut()
}

export async function currentUserIsAdmin() {
  const rows = await databaseRequest('admin_users', { query: { select: 'user_id', limit: 1 } })
  return rows.length > 0
}

export async function requestPasswordReset(email) {
  await authRequest('recover', { body: { email } })
}
