import { products as fallbackProducts } from '../data/products.js'
import { toProductRow } from '../data/productSchema.js'
import { databaseRequest, supabaseConfigured } from '../lib/supabaseClient.js'

export { toProductRow }

export function fromProductRow(row) {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    model: row.model || '',
    category: row.category,
    sortOrder: Number(row.sort_order) || 0,
    image: row.image || null,
    images: row.images || [],
    price: row.price == null ? null : Number(row.price),
    previousPrice: row.previous_price == null ? null : Number(row.previous_price),
    condition: row.condition,
    description: row.description || '',
    specifications: row.specifications || [],
    stock: row.stock == null ? null : Number(row.stock),
    installments: row.installments || null,
    highlight: Boolean(row.highlight),
    offer: Boolean(row.offer),
    available: Boolean(row.available),
    createdAt: row.created_at || null,
    updatedAt: row.updated_at || null,
  }
}

export async function listPublicProducts() {
  if (!supabaseConfigured) return fallbackProducts.filter((product) => product.available)
  const rows = await databaseRequest('products', { query: { select: '*', available: 'eq.true', order: 'sort_order.asc,created_at.asc' } })
  return rows.map(fromProductRow)
}

export async function listAdminProducts() {
  const rows = await databaseRequest('products', { query: { select: '*', order: 'updated_at.desc.nullslast' } })
  return rows.map(fromProductRow)
}

export async function getPublicProduct(id) {
  if (!supabaseConfigured) return fallbackProducts.find((product) => product.id === id && product.available) || null
  const rows = await databaseRequest('products', { query: { select: '*', id: `eq.${id}`, available: 'eq.true', limit: 1 } })
  return rows[0] ? fromProductRow(rows[0]) : null
}

export async function getAdminProduct(id) {
  const rows = await databaseRequest('products', { query: { select: '*', id: `eq.${id}`, limit: 1 } })
  return rows[0] ? fromProductRow(rows[0]) : null
}

export async function createProduct(product) {
  const existing = await databaseRequest('products', { query: { select: 'sort_order', order: 'sort_order.desc', limit: 1 } })
  const sortOrder = (Number(existing[0]?.sort_order) || 0) + 10
  const rows = await databaseRequest('products', {
    method: 'POST', query: { select: '*' }, body: toProductRow({ ...product, sortOrder }), prefer: 'return=representation',
  })
  return fromProductRow(rows[0])
}

export async function updateProduct(id, product) {
  const rows = await databaseRequest('products', {
    method: 'PATCH', query: { id: `eq.${id}`, select: '*' }, body: toProductRow({ ...product, id }), prefer: 'return=representation',
  })
  if (!rows[0]) throw new Error('O produto não foi encontrado ou não pode ser atualizado.')
  return fromProductRow(rows[0])
}

export async function deleteProduct(id) {
  const rows = await databaseRequest('products', {
    method: 'DELETE', query: { id: `eq.${id}`, select: '*' }, prefer: 'return=representation',
  })
  if (!rows[0]) throw new Error('O produto não foi encontrado ou não pode ser removido.')
  return fromProductRow(rows[0])
}
