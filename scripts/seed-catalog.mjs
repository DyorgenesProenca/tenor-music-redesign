import { products } from '../src/data/products.js'
import { toProductRow } from '../src/data/productSchema.js'
import { categoryRegistry } from '../src/data/categories.js'
import { brands } from '../src/data/brands.js'

const baseUrl = process.env.SUPABASE_URL?.trim().replace(/\/$/, '')
const secretKey = process.env.SUPABASE_SECRET_KEY?.trim()

if (!baseUrl || !secretKey) {
  console.error('Defina SUPABASE_URL e SUPABASE_SECRET_KEY no .env local antes de carregar o catálogo.')
  process.exit(1)
}

async function upsert(table, rows, conflictColumn) {
  const url = new URL(`/rest/v1/${table}`, baseUrl)
  url.searchParams.set('on_conflict', conflictColumn)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      apikey: secretKey,
      'Content-Type': 'application/json',
      Prefer: 'resolution=ignore-duplicates,return=minimal',
    },
    body: JSON.stringify(rows),
  })
  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Falha ao carregar ${table} (${response.status}): ${body}`)
  }
}

const categoryRows = categoryRegistry.map((category) => ({
  slug: category.slug,
  name: category.name,
  description: category.description,
  sort_order: category.sortOrder,
  catalog_sort_order: category.catalogSortOrder,
  active: true,
  catalog_visible: category.catalogVisible,
  homepage_visible: category.homepageVisible,
}))
const brandRows = brands.map((name, index) => ({ name, sort_order: (index + 1) * 10, active: true }))
const productRows = products.map(toProductRow)

function assertUniformPayload(table, rows) {
  if (rows.length < 2) return
  const keysOf = (row) => Object.keys(JSON.parse(JSON.stringify(row))).sort().join('\u0000')
  const expectedKeys = keysOf(rows[0])
  const mismatch = rows.find((row) => keysOf(row) !== expectedKeys)
  if (mismatch) {
    const recordId = mismatch.id ?? mismatch.slug ?? mismatch.name ?? '(sem identificador)'
    throw new Error(`Payload de ${table} tem chaves diferentes no registro ${recordId}.`)
  }
}

try {
  assertUniformPayload('categories', categoryRows)
  assertUniformPayload('brands', brandRows)
  assertUniformPayload('products', productRows)
  await upsert('categories', categoryRows, 'slug')
  await upsert('brands', brandRows, 'name')
  await upsert('products', productRows, 'id')
  console.log(`Carga inicial concluída: ${categoryRows.length} categorias, ${brandRows.length} marcas e ${productRows.length} produtos.`)
  console.log('IDs já cadastrados foram preservados para não sobrescrever alterações feitas no painel.')
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
