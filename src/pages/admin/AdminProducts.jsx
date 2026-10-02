import { useEffect, useState } from 'react'
import { ArrowUpRight, ImageOff, Pencil, Plus, Trash2 } from 'lucide-react'
import { brl } from '../../lib/format.js'
import { listAdminProducts, deleteProduct } from '../../services/productsService.js'
import { removeProductImages } from '../../services/storageService.js'
import { useCatalogData } from '../../contexts/CatalogDataContext.jsx'

const conditionLabels = { novo: 'Novo', seminovo: 'Seminovo', usado: 'Usado' }

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [removing, setRemoving] = useState('')
  const { refreshCatalog } = useCatalogData()

  const load = () => {
    setLoading(true)
    listAdminProducts().then(setProducts).catch((failure) => setError(failure.message || 'Falha ao carregar produtos.')).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const remove = async (product) => {
    if (!window.confirm(`Remover “${product.name}” do catálogo?`)) return
    setRemoving(product.id)
    setError('')
    setNotice('')
    try {
      const deleted = await deleteProduct(product.id)
      setProducts((current) => current.filter((item) => item.id !== product.id))
      await refreshCatalog()
      try { await removeProductImages([deleted.image, ...(deleted.images || [])].filter(Boolean)) }
      catch { setNotice('Produto removido. Algumas imagens antigas permaneceram no armazenamento e podem ser apagadas depois.') }
    } catch (failure) {
      setError(failure.message || 'Não foi possível remover o produto.')
    } finally {
      setRemoving('')
    }
  }

  const rows = products.map((product) => {
    const state = !product.available ? 'Oculto' : product.stock === 0 ? 'Esgotado' : product.stock == null ? 'Sob consulta' : `${product.stock} em estoque`
    return { ...product, state }
  })

  return (
    <main>
      <p className="text-[10px] font-bold uppercase tracking-[.22em] text-gold">Catálogo</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <div><h1 className="font-display text-3xl sm:text-4xl">Produtos</h1><p className="mt-2 text-sm text-bone/50">{products.length} {products.length === 1 ? 'produto cadastrado' : 'produtos cadastrados'}</p></div>
        <a href="/admin/produtos/novo" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gold px-5 text-sm font-bold text-ink"><Plus size={17} />Adicionar produto</a>
      </div>
      {error && <p role="alert" className="mt-5 rounded-xl border border-red-300/20 bg-red-950/30 p-4 text-sm text-red-200">{error}</p>}
      {notice && <p role="status" className="mt-5 rounded-xl border border-gold/20 bg-gold/[.06] p-4 text-sm text-gold">{notice}</p>}
      <section aria-label="Lista de produtos" className="mt-7 overflow-hidden rounded-2xl border border-white/[.08] bg-graphite/45">
        {loading ? <p className="p-8 text-sm text-bone/50">Carregando produtos…</p> : !rows.length ? <div className="p-8 text-center"><p className="font-display text-xl">Nenhum produto cadastrado</p><a href="/admin/produtos/novo" className="mt-3 inline-block text-sm text-gold">Cadastrar o primeiro produto</a></div> : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="border-b border-white/[.08] text-[10px] uppercase tracking-[.14em] text-bone/40"><tr><th className="px-5 py-4 font-semibold">Produto</th><th className="px-4 py-4 font-semibold">Categoria</th><th className="px-4 py-4 font-semibold">Preço</th><th className="px-4 py-4 font-semibold">Estoque</th><th className="px-4 py-4 font-semibold">Estado</th><th className="px-5 py-4 text-right font-semibold">Ações</th></tr></thead>
                <tbody className="divide-y divide-white/[.06]">{rows.map((product) => <tr key={product.id}>
                  <td className="px-5 py-3"><div className="flex min-w-0 items-center gap-3"><div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-ink text-bone/25">{product.image ? <img src={product.image} alt="" className="h-full w-full object-cover" /> : <ImageOff size={17} />}</div><div className="min-w-0"><p className="truncate font-semibold text-bone/90">{product.name}</p><p className="mt-1 text-xs text-bone/45">{product.brand}{product.model ? ` · ${product.model}` : ''}</p></div></div></td>
                  <td className="px-4 py-3 text-bone/60">{product.category}</td><td className="px-4 py-3 text-bone/80">{product.price ? brl(product.price) : 'Sob consulta'}</td><td className="px-4 py-3 text-bone/60">{product.stock ?? '—'}</td><td className="px-4 py-3"><span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-bone/55">{product.state}</span></td>
                  <td className="px-5 py-3"><div className="flex justify-end gap-2"><a aria-label={`Ver ${product.name}`} href={`/produto/${encodeURIComponent(product.id)}`} className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-bone/55 hover:text-gold"><ArrowUpRight size={15} /></a><a aria-label={`Editar ${product.name}`} href={`/admin/produtos/${encodeURIComponent(product.id)}/editar`} className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-bone/55 hover:text-gold"><Pencil size={15} /></a><button type="button" disabled={removing === product.id} onClick={() => remove(product)} aria-label={`Remover ${product.name}`} className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-bone/55 hover:border-red-300/30 hover:text-red-200 disabled:opacity-40"><Trash2 size={15} /></button></div></td>
                </tr>)}</tbody>
              </table>
            </div>
            <ul className="divide-y divide-white/[.06] md:hidden">{rows.map((product) => <li key={product.id} className="p-4">
              <div className="flex gap-3"><div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl bg-ink text-bone/25">{product.image ? <img src={product.image} alt="" className="h-full w-full object-cover" /> : <ImageOff size={18} />}</div><div className="min-w-0 flex-1"><h2 className="line-clamp-2 font-semibold leading-snug">{product.name}</h2><p className="mt-1 truncate text-xs text-bone/45">{product.brand}{product.model ? ` · ${product.model}` : ''}</p><p className="mt-2 text-sm font-semibold text-gold">{product.price ? brl(product.price) : 'Sob consulta'}</p><p className="mt-1 text-[11px] text-bone/45">{product.state} · {conditionLabels[product.condition] || product.condition}</p></div></div>
              <div className="mt-3 flex justify-end gap-2"><a href={`/produto/${encodeURIComponent(product.id)}`} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-bone/55" aria-label={`Ver ${product.name}`}><ArrowUpRight size={16} /></a><a href={`/admin/produtos/${encodeURIComponent(product.id)}/editar`} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-bone/55" aria-label={`Editar ${product.name}`}><Pencil size={16} /></a><button disabled={removing === product.id} onClick={() => remove(product)} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-bone/55 hover:text-red-200" aria-label={`Remover ${product.name}`}><Trash2 size={16} /></button></div>
            </li>)}</ul>
          </>
        )}
      </section>
    </main>
  )
}
