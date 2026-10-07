import { useState } from 'react'
import { ArrowLeft, Image, MessageCircle, PackageCheck, ShoppingBag } from 'lucide-react'
import { Badge, Button } from '../components/ui'
import InstrumentArtwork from '../components/ui/InstrumentArtwork.jsx'
import { store } from '../data/site.js'
import { useCart } from '../hooks/useCart.jsx'
import { useCatalogData } from '../contexts/CatalogDataContext.jsx'
import { brl } from '../lib/format.js'

const conditionName = (condition) => ({ novo: 'Novo', seminovo: 'Seminovo', usado: 'Usado' })[condition] || condition

function ProductGallery({ product }) {
  const images = [product.image, ...(product.images || [])].filter(Boolean)
  const [active, setActive] = useState(0)

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-graphite sm:rounded-3xl">
        <InstrumentArtwork kind={product.category} photo={images[active]} alt={product.name} genericFallback className="absolute inset-0" />
        {images.length > 1 && <span className="absolute bottom-4 right-4 rounded-full border border-white/15 bg-ink/65 px-3 py-1.5 text-xs text-bone/70 backdrop-blur">{active + 1} / {images.length}</span>}
      </div>
      {images.length > 1 ? (
        <div aria-label="Galeria de imagens do produto" className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {images.map((image, index) => <button key={`${image}-${index}`} type="button" aria-label={`Ver imagem ${index + 1} de ${product.name}`} aria-pressed={active === index} onClick={() => setActive(index)} className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border transition ${active === index ? 'border-gold' : 'border-white/10 hover:border-white/30'}`}><img src={image} alt="" className="h-full w-full object-cover" /></button>)}
        </div>
      ) : (
        <p className="mt-3 inline-flex items-center gap-2 text-xs text-bone/45"><Image size={14} />{images.length ? 'Imagens adicionais serão incluídas pela loja.' : 'Fotos oficiais e imagens adicionais serão incluídas pela loja.'}</p>
      )}
    </div>
  )
}

function SpecificationList({ specifications }) {
  const entries = Array.isArray(specifications)
    ? specifications.map((item, index) => Array.isArray(item) ? item : [item.label || `Especificação ${index + 1}`, item.value ?? ''])
    : Object.entries(specifications || {})

  if (!entries.length) return <p className="text-sm leading-6 text-bone/55">As especificações deste modelo serão adicionadas pela loja.</p>

  return <dl className="divide-y divide-white/[.07]">{entries.map(([label, value]) => <div key={label} className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between sm:gap-5"><dt className="text-xs text-bone/50">{label}</dt><dd className="text-sm text-bone/85 sm:text-right">{value || '—'}</dd></div>)}</dl>
}

export default function ProductPage({ productId }) {
  const { products, catalogCategories, settings } = useCatalogData()
  const product = products.find((item) => item.id === productId)
  const { add } = useCart()

  if (!product) {
    return (
      <main className="mx-auto grid min-h-[55vh] max-w-7xl place-items-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.22em] text-gold">Produto não encontrado</p>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl">Este instrumento não está no catálogo.</h1>
          <Button href="/instrumentos" className="mt-7"><ArrowLeft size={16} />Voltar aos instrumentos</Button>
        </div>
      </main>
    )
  }

  const categoryName = catalogCategories.find((category) => category.key === product.category)?.name || 'Instrumentos'
  const isUnavailable = !product.available || product.stock === 0
  const availabilityText = isUnavailable
    ? 'Esgotado no momento'
    : product.stock > 0
      ? `${product.stock} unidades disponíveis`
      : 'Consulte disponibilidade com a equipe'
  const availabilityLabel = isUnavailable ? 'Indisponível' : product.stock > 0 ? 'Disponível' : 'Disponibilidade sob consulta'

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-7 sm:px-6 sm:pb-20 sm:pt-9 lg:px-8 lg:pb-24">
      <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-xs text-bone/45 sm:mb-9">
        <a href="/" className="transition-colors hover:text-gold">Início</a><span aria-hidden="true">/</span>
        <a href="/instrumentos" className="transition-colors hover:text-gold">Instrumentos</a><span aria-hidden="true">/</span>
        <a href={`/instrumentos?categoria=${product.category}`} className="transition-colors hover:text-gold">{categoryName}</a><span aria-hidden="true">/</span>
        <span aria-current="page" className="max-w-full truncate text-bone/75">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.02fr_.98fr] lg:items-start lg:gap-12 xl:gap-16">
        <ProductGallery product={product} />

        <section aria-labelledby="product-title" className="lg:sticky lg:top-24">
          <div className="flex flex-wrap items-center gap-2">
            <Badge kind={product.condition} />
            {product.offer && <Badge kind="oferta" />}
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.12em] ${isUnavailable ? 'border-white/10 text-bone/45' : 'border-gold/20 text-gold/85'}`}><span className={`h-1.5 w-1.5 rounded-full ${isUnavailable ? 'bg-bone/35' : 'bg-gold'}`} />{availabilityLabel}</span>
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[.18em] text-gold/80">{product.brand}{product.model ? <span className="text-bone/40"> · {product.model}</span> : null}</p>
          <h1 id="product-title" className="mt-3 font-display text-3xl leading-[1.08] tracking-[-.035em] sm:text-4xl lg:text-[2.8rem]">{product.name}</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-bone/60">{product.description || 'Informações detalhadas deste instrumento serão adicionadas pela Tenor Music.'}</p>

          <div className="mt-7 rounded-2xl border border-white/[.08] bg-graphite/65 p-5 sm:p-6">
            <div className="flex items-center gap-2 text-sm text-bone/65"><PackageCheck size={17} className="text-gold" />{availabilityText}</div>
            {product.price ? (
              <div className="mt-5">
                {product.previousPrice > product.price && <p className="text-sm text-bone/45 line-through">{brl(product.previousPrice)}</p>}
                <p className="mt-0.5 text-3xl font-bold tracking-[-.035em] sm:text-4xl">{brl(product.price)}</p>
                {product.installments?.amount && <p className="mt-2 text-sm text-bone/55">Em {product.installments.count}x de {brl(product.installments.amount)}{product.installments.hasInterest ? ' com juros' : ' sem juros'}</p>}
              </div>
            ) : <p className="mt-5 font-display text-2xl">Consulte o valor</p>}

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {isUnavailable ? (
                <button type="button" disabled className="inline-flex min-h-12 cursor-not-allowed items-center justify-center gap-2 rounded-full bg-white/10 px-5 text-sm font-bold text-bone/45">Produto esgotado</button>
              ) : product.price ? (
                <button type="button" onClick={() => add(product)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-5 text-sm font-bold text-ink transition-colors hover:bg-gold-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"><ShoppingBag size={17} />Adicionar ao carrinho</button>
              ) : (
                <Button href={settings.whatsappUrl || store.whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={17} />Consultar preço</Button>
              )}
              <Button href={settings.whatsappUrl || store.whatsapp} target="_blank" rel="noreferrer" variant="ghost"><MessageCircle size={17} />Falar pelo WhatsApp</Button>
            </div>
            <p className="mt-4 text-[11px] leading-5 text-bone/40">Preço e disponibilidade sujeitos à confirmação da equipe.</p>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 rounded-2xl border border-white/[.07] px-5 py-4 sm:grid-cols-3">
            <div><dt className="text-[9px] font-bold uppercase tracking-[.16em] text-bone/40">Marca</dt><dd className="mt-1 text-sm text-bone/85">{product.brand}</dd></div>
            {product.model && <div><dt className="text-[9px] font-bold uppercase tracking-[.16em] text-bone/40">Modelo</dt><dd className="mt-1 text-sm text-bone/85">{product.model}</dd></div>}
            <div><dt className="text-[9px] font-bold uppercase tracking-[.16em] text-bone/40">Condição</dt><dd className="mt-1 text-sm text-bone/85">{conditionName(product.condition)}</dd></div>
            <div><dt className="text-[9px] font-bold uppercase tracking-[.16em] text-bone/40">Categoria</dt><dd className="mt-1 text-sm text-bone/85">{categoryName}</dd></div>
          </dl>
        </section>
      </div>

      <div className="mt-12 grid gap-8 border-t border-white/[.08] pt-8 sm:mt-16 sm:pt-10 lg:grid-cols-2 lg:gap-16">
        <section aria-labelledby="description-title">
          <p className="text-[10px] font-bold uppercase tracking-[.22em] text-gold">Detalhes</p>
          <h2 id="description-title" className="mt-2 font-display text-2xl sm:text-3xl">Sobre o instrumento</h2>
          <p className="mt-4 text-sm leading-7 text-bone/65">{product.description || 'A descrição completa deste produto será fornecida pela Tenor Music.'}</p>
        </section>
        <section aria-labelledby="specifications-title">
          <p className="text-[10px] font-bold uppercase tracking-[.22em] text-gold">Ficha técnica</p>
          <h2 id="specifications-title" className="mt-2 font-display text-2xl sm:text-3xl">Especificações</h2>
          <div className="mt-3"><SpecificationList specifications={product.specifications} /></div>
        </section>
      </div>

      <a href="/instrumentos" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-bone/60 transition-colors hover:text-gold"><ArrowLeft size={16} />Voltar ao catálogo</a>
    </main>
  )
}
