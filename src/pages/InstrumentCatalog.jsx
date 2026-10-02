import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import ProductCard from '../components/cards/ProductCard.jsx'
import { useCatalogData } from '../contexts/CatalogDataContext.jsx'

const initialCategory = (catalogCategories) => {
  const value = new URLSearchParams(window.location.search).get('categoria')
  return catalogCategories.some((category) => category.key === value) || value === 'madeiras' ? value : ''
}

const selectClass = 'h-12 min-w-0 rounded-xl border border-white/10 bg-graphite px-3 text-sm text-bone outline-none transition focus:border-gold/45 focus:ring-2 focus:ring-gold/15'

export default function InstrumentCatalog() {
  const { products, catalogCategories } = useCatalogData()
  const [category, setCategory] = useState(() => initialCategory(catalogCategories))
  const [condition, setCondition] = useState('')
  const [availability, setAvailability] = useState('')
  const [sort, setSort] = useState('featured')
  const [search, setSearch] = useState('')

  const visibleProducts = useMemo(() => {
    const term = search.trim().toLocaleLowerCase('pt-BR')
    const filtered = products.filter((product) => {
      const matchesCategory = !category || (category === 'madeiras'
        ? ['flautas', 'clarinetes'].includes(product.category)
        : product.category === category)
      const matchesCondition = !condition || product.condition === condition
      const productAvailability = !product.available || product.stock === 0 ? 'esgotado' : product.stock == null ? 'sob-consulta' : 'disponivel'
      const matchesAvailability = !availability || productAvailability === availability
      const searchableText = [product.name, product.brand, product.model].filter(Boolean).join(' ').toLocaleLowerCase('pt-BR')
      return matchesCategory && matchesCondition && matchesAvailability && (!term || searchableText.includes(term))
    })

    return filtered.sort((a, b) => {
      if (sort === 'price-asc' || sort === 'price-desc') {
        if (a.price == null) return b.price == null ? 0 : 1
        if (b.price == null) return -1
        return sort === 'price-asc' ? a.price - b.price : b.price - a.price
      }
      if (sort === 'name') return a.name.localeCompare(b.name, 'pt-BR')
      return Number(b.highlight) - Number(a.highlight) || products.indexOf(a) - products.indexOf(b)
    })
  }, [products, category, catalogCategories, condition, availability, search, sort])

  const updateCategory = (value) => {
    setCategory(value)
    const url = new URL(window.location.href)
    if (value) url.searchParams.set('categoria', value)
    else url.searchParams.delete('categoria')
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`)
  }

  const selectedCategoryName = category === 'madeiras'
    ? 'Flautas e clarinetes'
    : catalogCategories.find((item) => item.key === category)?.name

  return (
    <main>
      <section className="relative isolate overflow-hidden border-b border-white/[.07] bg-[radial-gradient(ellipse_at_80%_0%,rgba(255,184,0,.11),transparent_40%),linear-gradient(180deg,#151517,#0b0b0d)]">
        <div className="mx-auto max-w-7xl px-4 pb-9 pt-10 sm:px-6 sm:pb-12 sm:pt-14 lg:px-8 lg:pb-14 lg:pt-16">
          <nav aria-label="Breadcrumb" className="mb-7 flex items-center gap-2 text-xs text-bone/45">
            <a href="/" className="transition-colors hover:text-gold">Início</a><span aria-hidden="true">/</span><span aria-current="page" className="text-bone/75">Instrumentos</span>
          </nav>
          <p className="text-[10px] font-bold uppercase tracking-[.24em] text-gold">Catálogo Tenor Music</p>
          <h1 className="mt-3 font-display text-4xl tracking-[-.04em] sm:text-5xl lg:text-6xl">Instrumentos</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-bone/65 sm:text-base sm:leading-7">Encontre seu próximo instrumento entre as opções do catálogo e filtre por categoria, condição ou disponibilidade.</p>
        </div>
      </section>

      <section aria-label="Catálogo e filtros" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="font-display text-xl sm:text-2xl">Categorias</h2>
          {selectedCategoryName && <span className="rounded-full border border-gold/20 bg-gold/[.06] px-3 py-1.5 text-[10px] font-semibold text-gold">{selectedCategoryName}</span>}
        </div>
        <nav aria-label="Filtrar por categoria" className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-3 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          <a href="/instrumentos" aria-current={!category ? 'true' : undefined} className={`shrink-0 snap-start rounded-full border px-4 py-2.5 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${!category ? 'border-gold bg-gold text-ink' : 'border-white/10 bg-graphite text-bone/70 hover:border-gold/35 hover:text-bone'}`}>Todas</a>
          {catalogCategories.map((item) => {
            const active = category === item.key || (category === 'madeiras' && ['flautas', 'clarinetes'].includes(item.key))
            return <a key={item.key} href={`/instrumentos?categoria=${item.key}`} aria-current={active ? 'true' : undefined} className={`shrink-0 snap-start rounded-full border px-4 py-2.5 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${active ? 'border-gold bg-gold text-ink' : 'border-white/10 bg-graphite text-bone/70 hover:border-gold/35 hover:text-bone'}`}>{item.name}</a>
          })}
        </nav>

        <div className="mt-6 rounded-2xl border border-white/[.08] bg-white/[.02] p-4 sm:mt-8 sm:p-5">
          <div className="relative">
            <Search aria-hidden="true" size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-bone/40" />
            <label className="sr-only" htmlFor="catalog-search">Buscar instrumentos</label>
            <input id="catalog-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por instrumento, marca ou modelo" className="h-12 w-full rounded-xl border border-white/10 bg-ink/70 pl-11 pr-12 text-sm text-bone placeholder:text-bone/40 outline-none transition focus:border-gold/45 focus:ring-2 focus:ring-gold/15" />
            {search && <button type="button" aria-label="Limpar busca" onClick={() => setSearch('')} className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-bone/60 transition hover:bg-white/[.06] hover:text-bone"><X size={16} /></button>}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
            <label className="flex min-w-0 flex-col gap-2 text-[10px] font-semibold uppercase tracking-[.14em] text-bone/50">
              Condição
              <select value={condition} onChange={(event) => setCondition(event.target.value)} className={selectClass}>
                <option value="">Todas</option><option value="novo">Novos</option><option value="seminovo">Seminovos</option><option value="usado">Usados</option>
              </select>
            </label>
            <label className="flex min-w-0 flex-col gap-2 text-[10px] font-semibold uppercase tracking-[.14em] text-bone/50">
              Disponibilidade
              <select value={availability} onChange={(event) => setAvailability(event.target.value)} className={selectClass}>
                <option value="">Todas</option><option value="disponivel">Disponíveis</option><option value="sob-consulta">Sob consulta</option><option value="esgotado">Esgotados</option>
              </select>
            </label>
            <label className="col-span-2 flex min-w-0 flex-col gap-2 text-[10px] font-semibold uppercase tracking-[.14em] text-bone/50 sm:col-span-1">
              Ordenar por
              <select value={sort} onChange={(event) => setSort(event.target.value)} className={selectClass}>
                <option value="featured">Destaques</option><option value="price-asc">Menor preço</option><option value="price-desc">Maior preço</option><option value="name">Nome</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mb-5 mt-8 flex items-end justify-between gap-3 sm:mt-10">
          <h2 className="font-display text-2xl sm:text-3xl">{selectedCategoryName || 'Todos os instrumentos'}</h2>
          <p aria-live="polite" className="shrink-0 text-xs text-bone/50">{visibleProducts.length} {visibleProducts.length === 1 ? 'produto' : 'produtos'}</p>
        </div>
        {visibleProducts.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product) => <ProductCard key={product.id} p={product} className="w-full" catalog />)}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-graphite/60 px-5 py-14 text-center sm:py-20">
            <p className="font-display text-2xl">Nenhum instrumento encontrado</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-bone/60">Experimente outra categoria ou remova os filtros para ver o catálogo completo.</p>
            <button type="button" onClick={() => { updateCategory(''); setCondition(''); setAvailability(''); setSearch('') }} className="mt-6 rounded-full border border-gold/35 px-5 py-2.5 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">Limpar filtros</button>
          </div>
        )}
      </section>
    </main>
  )
}
