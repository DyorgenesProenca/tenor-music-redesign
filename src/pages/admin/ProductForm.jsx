import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ImagePlus, X } from 'lucide-react'
import { getAdminProduct, createProduct, updateProduct } from '../../services/productsService.js'
import { listAdminCategories } from '../../services/categoriesService.js'
import { listAdminBrands } from '../../services/brandsService.js'
import { MAX_PRODUCT_IMAGE_SIZE, removeProductImages, uploadProductImage, validateProductImage } from '../../services/storageService.js'
import { useCatalogData } from '../../contexts/CatalogDataContext.jsx'

const inputClass = 'mt-2 h-12 w-full rounded-xl border border-white/10 bg-ink px-4 text-sm text-bone outline-none transition placeholder:text-bone/30 focus:border-gold/50'
const textAreaClass = 'mt-2 min-h-32 w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-sm leading-6 text-bone outline-none transition placeholder:text-bone/30 focus:border-gold/50'
const labelClass = 'block min-w-0 text-xs font-semibold text-bone/65'

const emptyProduct = {
  id: '', name: '', brand: '', model: '', category: '', image: null, images: [], price: '', previousPrice: '',
  condition: 'novo', description: '', specifications: [], stock: '', installments: { count: 12, amount: '', hasInterest: true },
  highlight: false, offer: false, available: true,
}

function usePreviews(mainFile, galleryFiles) {
  const [previews, setPreviews] = useState({ main: '', gallery: [] })
  useEffect(() => {
    const main = mainFile ? URL.createObjectURL(mainFile) : ''
    const gallery = galleryFiles.map((file) => URL.createObjectURL(file))
    setPreviews({ main, gallery })
    return () => [main, ...gallery].filter(Boolean).forEach((url) => URL.revokeObjectURL(url))
  }, [mainFile, galleryFiles])
  return previews
}

function specificationText(items) {
  return (items || []).map((item) => Array.isArray(item) ? item.join(': ') : `${item.label || ''}: ${item.value || ''}`).join('\n')
}

function parseSpecifications(value) {
  return value.split('\n').map((line) => line.trim()).filter(Boolean).map((line) => {
    const position = line.indexOf(':')
    return position < 0 ? { label: line, value: '' } : { label: line.slice(0, position).trim(), value: line.slice(position + 1).trim() }
  }).filter((item) => item.label)
}

export default function ProductForm({ productId }) {
  const editing = Boolean(productId)
  const [product, setProduct] = useState(emptyProduct)
  const [specs, setSpecs] = useState('')
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [mainFile, setMainFile] = useState(null)
  const [galleryFiles, setGalleryFiles] = useState([])
  const [removedImages, setRemovedImages] = useState([])
  const [loading, setLoading] = useState(editing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const { refreshCatalog } = useCatalogData()
  const previews = usePreviews(mainFile, galleryFiles)

  useEffect(() => {
    let active = true
    Promise.all([listAdminCategories(), listAdminBrands(), editing ? getAdminProduct(productId) : Promise.resolve(null)])
      .then(([categoryRows, brandRows, existing]) => {
        if (!active) return
        setCategories(categoryRows)
        setBrands(brandRows.filter((brand) => brand.active).map((brand) => brand.name))
        if (existing) {
          setProduct({ ...emptyProduct, ...existing, price: existing.price ?? '', previousPrice: existing.previousPrice ?? '', stock: existing.stock ?? '', installments: { ...emptyProduct.installments, ...(existing.installments || {}), amount: existing.installments?.amount ?? '' } })
          setSpecs(specificationText(existing.specifications))
        } else if (!editing && categoryRows[0]) {
          setProduct((current) => ({ ...current, category: categoryRows[0].slug }))
        }
      })
      .catch((failure) => { if (active) setError(failure.message || 'Não foi possível carregar o formulário.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [editing, productId])

  const allBrands = useMemo(() => product.brand && !brands.includes(product.brand) ? [product.brand, ...brands] : brands, [brands, product.brand])

  const setField = (key, value) => setProduct((current) => ({ ...current, [key]: value }))
  const setInstallments = (key, value) => setProduct((current) => ({ ...current, installments: { ...current.installments, [key]: value } }))
  const addGalleryFiles = (files) => setGalleryFiles((current) => [...current, ...Array.from(files)])
  const removeExistingImage = (url) => setRemovedImages((current) => current.includes(url) ? current : [...current, url])

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    if (!product.name.trim() || !product.brand || !product.category) { setError('Preencha nome, marca e categoria.'); return }
    if (!product.price && product.price !== 0) { setError('Informe um preço ou use 0 para mostrar “sob consulta”.'); return }
    if (!Number.isFinite(Number(product.price)) || Number(product.price) < 0) { setError('Informe um preço válido.'); return }
    try {
      if (mainFile) validateProductImage(mainFile)
      galleryFiles.forEach(validateProductImage)
    } catch (failure) { setError(failure.message); return }

    setSaving(true)
    const id = product.id || crypto.randomUUID()
    const uploaded = []
    try {
      const image = mainFile ? await uploadProductImage(id, mainFile) : removedImages.includes(product.image) ? null : product.image
      if (mainFile) uploaded.push(image)
      const newGallery = []
      for (const file of galleryFiles) {
        const url = await uploadProductImage(id, file)
        uploaded.push(url)
        newGallery.push(url)
      }
      const payload = {
        ...product,
        id,
        price: Number(product.price),
        previousPrice: product.previousPrice === '' ? null : Number(product.previousPrice),
        stock: product.stock === '' ? null : Number(product.stock),
        image,
        images: [...(product.images || []).filter((url) => !removedImages.includes(url)), ...newGallery],
        specifications: parseSpecifications(specs),
        installments: product.installments?.amount === '' ? null : {
          count: Number(product.installments.count) || 1,
          amount: Number(product.installments.amount),
          hasInterest: Boolean(product.installments.hasInterest),
        },
      }
      if (editing) await updateProduct(id, payload)
      else await createProduct(payload)
      const oldImagesToDelete = [...removedImages, ...(mainFile && product.image ? [product.image] : [])]
      const deletedImages = [...new Set(oldImagesToDelete)].filter((url) => url !== image && !payload.images.includes(url))
      let cleanupWarning = ''
      try { await removeProductImages(deletedImages) } catch { cleanupWarning = 'Produto salvo, mas algumas imagens removidas permaneceram no armazenamento.' }
      await refreshCatalog()
      if (cleanupWarning) {
        setProduct(payload)
        setRemovedImages([])
        setMainFile(null)
        setGalleryFiles([])
        setError(cleanupWarning)
        setSaving(false)
        return
      }
      window.location.assign('/admin/produtos')
    } catch (failure) {
      await removeProductImages(uploaded).catch(() => {})
      setError(failure.message || 'Não foi possível salvar o produto.')
      setSaving(false)
    }
  }

  if (loading) return <p className="py-10 text-sm text-bone/50">Carregando formulário…</p>
  if (editing && !product.name && !error) return <p className="py-10 text-sm text-bone/50">Produto não encontrado.</p>

  return (
    <main>
      <a href="/admin/produtos" className="inline-flex items-center gap-2 text-sm font-semibold text-bone/50 hover:text-gold"><ArrowLeft size={16} />Produtos</a>
      <p className="mt-6 text-[10px] font-bold uppercase tracking-[.22em] text-gold">Catálogo</p>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl">{editing ? 'Editar produto' : 'Novo produto'}</h1>
      {error && <p role="alert" className="mt-5 rounded-xl border border-red-300/20 bg-red-950/30 p-4 text-sm leading-5 text-red-200">{error}</p>}

      <form onSubmit={submit} className="mt-7 space-y-5">
        <section className="rounded-2xl border border-white/[.08] bg-graphite/45 p-4 sm:p-6">
          <h2 className="font-display text-xl">Informações do produto</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className={`${labelClass} sm:col-span-2`}>Nome<input required value={product.name} onChange={(event) => setField('name', event.target.value)} className={inputClass} /></label>
            <label className={labelClass}>Marca<select required value={product.brand} onChange={(event) => setField('brand', event.target.value)} className={inputClass}><option value="">Selecione uma marca</option>{allBrands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}</select></label>
            <label className={labelClass}>Modelo<input value={product.model || ''} onChange={(event) => setField('model', event.target.value)} className={inputClass} /></label>
            <label className={labelClass}>Categoria<select required value={product.category} onChange={(event) => setField('category', event.target.value)} className={inputClass}><option value="">Selecione uma categoria</option>{categories.map((category) => <option key={category.slug} value={category.slug}>{category.name}{!category.active ? ' (inativa)' : ''}</option>)}</select></label>
            <label className={labelClass}>Condição<select value={product.condition} onChange={(event) => setField('condition', event.target.value)} className={inputClass}><option value="novo">Novo</option><option value="seminovo">Seminovo</option><option value="usado">Usado</option></select></label>
            <label className={labelClass}>Preço (R$)<input required min="0" step="0.01" type="number" value={product.price} onChange={(event) => setField('price', event.target.value)} placeholder="0,00" className={inputClass} /></label>
            <label className={labelClass}>Preço anterior (opcional)<input min="0" step="0.01" type="number" value={product.previousPrice} onChange={(event) => setField('previousPrice', event.target.value)} className={inputClass} /></label>
            <label className={labelClass}>Estoque (vazio = sob consulta)<input min="0" step="1" type="number" value={product.stock} onChange={(event) => setField('stock', event.target.value)} className={inputClass} /></label>
            <label className={labelClass}>Parcelas<input min="1" step="1" type="number" value={product.installments?.count ?? ''} onChange={(event) => setInstallments('count', event.target.value)} className={inputClass} /></label>
            <label className={labelClass}>Valor da parcela<input min="0" step="0.01" type="number" value={product.installments?.amount ?? ''} onChange={(event) => setInstallments('amount', event.target.value)} className={inputClass} /></label>
          </div>
          <label className="mt-5 block text-xs font-semibold text-bone/65">Descrição<textarea value={product.description || ''} onChange={(event) => setField('description', event.target.value)} className={textAreaClass} /></label>
          <label className="mt-5 block text-xs font-semibold text-bone/65">Especificações <span className="font-normal text-bone/35">(uma por linha, no formato “Campo: valor”)</span><textarea value={specs} onChange={(event) => setSpecs(event.target.value)} placeholder={'Material: Latão\nAcabamento: Laqueado'} className={`${textAreaClass} min-h-28`} /></label>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            <label className="flex items-center gap-2 text-sm text-bone/70"><input type="checkbox" checked={product.highlight} onChange={(event) => setField('highlight', event.target.checked)} className="accent-[#ffb800]" />Destaque na homepage</label>
            <label className="flex items-center gap-2 text-sm text-bone/70"><input type="checkbox" checked={product.offer} onChange={(event) => setField('offer', event.target.checked)} className="accent-[#ffb800]" />Oferta</label>
            <label className="flex items-center gap-2 text-sm text-bone/70"><input type="checkbox" checked={product.available} onChange={(event) => setField('available', event.target.checked)} className="accent-[#ffb800]" />Visível no catálogo</label>
            <label className="flex items-center gap-2 text-sm text-bone/70"><input type="checkbox" checked={Boolean(product.installments?.hasInterest)} onChange={(event) => setInstallments('hasInterest', event.target.checked)} className="accent-[#ffb800]" />Parcelas com juros</label>
          </div>
        </section>

        <section className="rounded-2xl border border-white/[.08] bg-graphite/45 p-4 sm:p-6">
          <div><h2 className="font-display text-xl">Imagens</h2><p className="mt-1 text-xs leading-5 text-bone/40">JPEG, PNG ou WebP · até {MAX_PRODUCT_IMAGE_SIZE / (1024 * 1024)} MB por arquivo</p></div>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold text-bone/65">Imagem principal</p>
              <div className="mt-2 flex min-h-44 items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/15 bg-ink">
                {(previews.main || (product.image && !removedImages.includes(product.image))) ? <img src={previews.main || product.image} alt="Prévia da imagem principal" className="max-h-64 w-full object-contain" /> : <div className="text-center text-bone/35"><ImagePlus className="mx-auto" size={24} /><span className="mt-2 block text-xs">Nenhuma imagem selecionada</span></div>}
              </div>
              <label className="mt-3 inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border border-white/15 px-4 text-xs font-semibold text-bone/70 hover:border-gold/40 hover:text-gold"><ImagePlus size={15} />{mainFile ? 'Trocar imagem' : 'Selecionar imagem'}<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => setMainFile(event.target.files?.[0] || null)} className="sr-only" /></label>
              {product.image && !mainFile && !removedImages.includes(product.image) && <button type="button" onClick={() => removeExistingImage(product.image)} className="ml-2 text-xs text-red-200/70 hover:text-red-200">Remover imagem atual</button>}
            </div>
            <div>
              <p className="text-xs font-semibold text-bone/65">Galeria</p>
              <label className="mt-2 flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-ink px-4 text-center text-bone/45 hover:border-gold/35"><ImagePlus size={22} className="text-gold/70" /><span className="mt-2 text-xs">Selecionar uma ou mais imagens</span><input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(event) => { addGalleryFiles(event.target.files || []); event.target.value = '' }} className="sr-only" /></label>
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {(product.images || []).filter((url) => !removedImages.includes(url)).map((url) => <div key={url} className="relative aspect-square overflow-hidden rounded-lg border border-white/10"><img src={url} alt="Imagem da galeria" className="h-full w-full object-cover" /><button type="button" onClick={() => removeExistingImage(url)} aria-label="Remover imagem da galeria" className="absolute right-1 top-1 grid h-7 w-7 place-items-center rounded-full bg-ink/80 text-white"><X size={14} /></button></div>)}
                {previews.gallery.map((url, index) => <div key={`${url}-${index}`} className="relative aspect-square overflow-hidden rounded-lg border border-gold/30"><img src={url} alt={`Prévia de nova imagem ${index + 1}`} className="h-full w-full object-cover" /><button type="button" onClick={() => setGalleryFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))} aria-label="Remover nova imagem" className="absolute right-1 top-1 grid h-7 w-7 place-items-center rounded-full bg-ink/80 text-white"><X size={14} /></button></div>)}
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><a href="/admin/produtos" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-bone/65">Cancelar</a><button disabled={saving} className="min-h-12 rounded-full bg-gold px-7 text-sm font-bold text-ink hover:bg-gold-deep disabled:opacity-60">{saving ? 'Salvando…' : editing ? 'Salvar alterações' : 'Cadastrar produto'}</button></div>
      </form>
    </main>
  )
}
