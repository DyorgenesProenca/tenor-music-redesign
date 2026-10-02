import { categories as fallbackHomepageCategories, catalogCategories as fallbackCatalogCategories, categoryRegistry } from '../data/categories.js'
import { databaseRequest, supabaseConfigured } from '../lib/supabaseClient.js'

const homepageUrl = (slug) => `/instrumentos?categoria=${slug === 'tubas' || slug === 'acessorios' ? 'outros' : slug}`
const categoryFields = 'slug,name,description,sort_order,catalog_sort_order,active,catalog_visible,homepage_visible'

export function fromCategoryRow(row) {
  const fallback = categoryRegistry.find((category) => category.slug === row.slug)
  return {
    slug: row.slug,
    name: row.name,
    description: row.description || '',
    sortOrder: row.sort_order ?? 0,
    catalogSortOrder: row.catalog_sort_order ?? 0,
    active: Boolean(row.active),
    catalogVisible: Boolean(row.catalog_visible),
    homepageVisible: Boolean(row.homepage_visible),
    icon: fallback?.icon,
    key: row.slug,
    desc: row.description || '',
    href: homepageUrl(row.slug),
  }
}

async function listCategories(query, order = 'sort_order.asc') {
  const rows = await databaseRequest('categories', { query: { select: categoryFields, order, ...query } })
  return rows.map(fromCategoryRow)
}

export async function listHomepageCategories() {
  if (!supabaseConfigured) return fallbackHomepageCategories
  return listCategories({ active: 'eq.true', homepage_visible: 'eq.true' })
}

export async function listCatalogCategories() {
  if (!supabaseConfigured) return fallbackCatalogCategories
  return (await listCategories({ active: 'eq.true', catalog_visible: 'eq.true' }, 'catalog_sort_order.asc')).map(({ slug, name }) => ({ key: slug, name }))
}

export async function listAdminCategories() {
  return listCategories({})
}

function toCategoryRow(category) {
  return {
    slug: category.slug.trim().toLowerCase(),
    name: category.name.trim(),
    description: category.description?.trim() || '',
    sort_order: Number(category.sortOrder) || 0,
    catalog_sort_order: Number(category.catalogSortOrder) || 0,
    active: Boolean(category.active),
    catalog_visible: Boolean(category.catalogVisible),
    homepage_visible: Boolean(category.homepageVisible),
  }
}

export async function createCategory(category) {
  const rows = await databaseRequest('categories', {
    method: 'POST', query: { select: categoryFields }, body: toCategoryRow(category), prefer: 'return=representation',
  })
  return fromCategoryRow(rows[0])
}

export async function updateCategory(originalSlug, category) {
  const rows = await databaseRequest('categories', {
    method: 'PATCH', query: { slug: `eq.${originalSlug}`, select: categoryFields }, body: toCategoryRow(category), prefer: 'return=representation',
  })
  if (!rows[0]) throw new Error('A categoria não foi encontrada ou não pode ser atualizada.')
  return fromCategoryRow(rows[0])
}
