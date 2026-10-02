import { publicStorageUrl, storageRequest, supabaseBaseUrl } from '../lib/supabaseClient.js'

export const PRODUCT_IMAGE_BUCKET = 'product-images'
export const MAX_PRODUCT_IMAGE_SIZE = 5 * 1024 * 1024
const supportedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])

export function validateProductImage(file) {
  if (!supportedImageTypes.has(file.type)) throw new Error('Use uma imagem JPEG, PNG ou WebP.')
  if (file.size > MAX_PRODUCT_IMAGE_SIZE) throw new Error('Cada imagem deve ter no máximo 5 MB.')
}

export async function uploadProductImage(productId, file) {
  validateProductImage(file)
  const safeName = file.name.normalize('NFKD').replace(/[^a-zA-Z0-9.-]+/g, '-').replace(/^-+|-+$/g, '').slice(-90) || 'produto'
  const path = `${productId}/${crypto.randomUUID()}-${safeName}`
  await storageRequest(`object/${PRODUCT_IMAGE_BUCKET}/${path.split('/').map(encodeURIComponent).join('/')}`, {
    method: 'POST', body: file, contentType: file.type,
  })
  return publicStorageUrl(PRODUCT_IMAGE_BUCKET, path)
}

function pathFromProductImageUrl(value) {
  try {
    const imageUrl = new URL(value)
    const configuredUrl = new URL(supabaseBaseUrl)
    if (imageUrl.origin !== configuredUrl.origin) return null
    const prefix = `/storage/v1/object/public/${PRODUCT_IMAGE_BUCKET}/`
    if (!imageUrl.pathname.startsWith(prefix)) return null
    return imageUrl.pathname.slice(prefix.length).split('/').map(decodeURIComponent).join('/')
  } catch {
    return null
  }
}

export async function removeProductImages(urls = []) {
  const paths = [...new Set(urls.map(pathFromProductImageUrl).filter(Boolean))]
  if (!paths.length) return
  await storageRequest(`object/${PRODUCT_IMAGE_BUCKET}`, {
    method: 'DELETE', body: JSON.stringify({ prefixes: paths }), contentType: 'application/json',
  })
}
