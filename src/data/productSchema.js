// Shared PostgREST row shape for seed and product CRUD requests.
// Keep nullable columns present: PostgREST requires matching keys in JSON arrays.
export function toProductRow(product) {
  return {
    id: product.id ?? null,
    name: String(product.name ?? '').trim(),
    brand: String(product.brand ?? '').trim(),
    model: String(product.model ?? '').trim(),
    category: product.category ?? null,
    sort_order: Number(product.sortOrder) || 0,
    image: product.image ?? null,
    images: Array.isArray(product.images) ? product.images : [],
    price: product.price == null || product.price === '' ? null : Number(product.price),
    previous_price: product.previousPrice == null || product.previousPrice === '' ? null : Number(product.previousPrice),
    condition: product.condition ?? 'novo',
    description: product.description ?? '',
    specifications: Array.isArray(product.specifications) ? product.specifications : [],
    stock: product.stock == null || product.stock === '' ? null : Number(product.stock),
    installments: product.installments ?? null,
    highlight: Boolean(product.highlight),
    offer: Boolean(product.offer),
    available: product.available ?? true,
  }
}
