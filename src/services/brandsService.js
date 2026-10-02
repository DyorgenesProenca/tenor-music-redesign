import { brands as fallbackBrands } from '../data/brands.js'
import { databaseRequest, supabaseConfigured } from '../lib/supabaseClient.js'

export async function listPublicBrands() {
  if (!supabaseConfigured) return fallbackBrands
  const rows = await databaseRequest('brands', { query: { select: 'name', active: 'eq.true', order: 'sort_order.asc,name.asc' } })
  return rows.map((brand) => brand.name)
}

export async function listAdminBrands() {
  const rows = await databaseRequest('brands', { query: { select: 'name,active,sort_order', order: 'sort_order.asc,name.asc' } })
  return rows.map((brand) => ({ name: brand.name, active: brand.active }))
}
