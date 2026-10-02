import { products } from '../src/data/products.js'
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
const productRows = products.map((product) => ({
  id: product.id,
  name: product.name,
  brand: product.brand,
  model: product.model,
  category: product.category,
  sort_order: product.sortOrder,
  image: product.image,
  images: product.images,
  price: product.price,
  previous_price: product.previousPrice,
  condition: product.condition,
  description: product.description,
  specifications: product.specifications,
  stock: product.stock,
  installments: product.installments,
  highlight: product.highlight,
  offer: product.offer,
  available: product.available,
}))

try {
  await upsert('categories', categoryRows, 'slug')
  await upsert('brands', brandRows, 'name')
  await upsert('products', productRows, 'id')
  console.log(`Carga inicial concluída: ${categoryRows.length} categorias, ${brandRows.length} marcas e ${productRows.length} produtos.`)
  console.log('IDs já cadastrados foram preservados para não sobrescrever alterações feitas no painel.')
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
