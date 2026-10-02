import { storeSettings } from '../data/site.js'
import { databaseRequest, supabaseConfigured } from '../lib/supabaseClient.js'

function fromSettingsRow(row) {
  return { whatsappUrl: row.whatsapp_url, contactEmail: row.contact_email }
}

export async function getSiteSettings() {
  if (!supabaseConfigured) return storeSettings
  const rows = await databaseRequest('site_settings', { query: { select: 'whatsapp_url,contact_email', singleton: 'eq.true', limit: 1 } })
  return rows[0] ? fromSettingsRow(rows[0]) : storeSettings
}

export async function updateSiteSettings(settings) {
  const rows = await databaseRequest('site_settings', {
    method: 'PATCH',
    query: { select: 'whatsapp_url,contact_email', singleton: 'eq.true' },
    body: { whatsapp_url: settings.whatsappUrl.trim(), contact_email: settings.contactEmail.trim() },
    prefer: 'return=representation',
  })
  if (!rows[0]) throw new Error('As configurações não foram encontradas ou o usuário não tem permissão.')
  return fromSettingsRow(rows[0])
}
