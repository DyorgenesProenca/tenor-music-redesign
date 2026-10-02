import { useEffect, useState } from 'react'
import { ArrowRight, BadgePercent, Boxes, PackageCheck, PackageX } from 'lucide-react'
import { listAdminProducts } from '../../services/productsService.js'

const metric = 'rounded-2xl border border-white/[.08] bg-graphite/65 p-5 sm:p-6'

export default function AdminDashboard() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    listAdminProducts().then(setProducts).catch((failure) => setError(failure.message || 'Falha ao carregar produtos.'))
  }, [])

  const metrics = [
    { label: 'Produtos cadastrados', value: products.length, icon: Boxes },
    { label: 'Com estoque', value: products.filter((product) => product.stock > 0).length, icon: PackageCheck },
    { label: 'Ofertas ativas', value: products.filter((product) => product.offer && product.available).length, icon: BadgePercent },
    { label: 'Esgotados', value: products.filter((product) => product.stock === 0).length, icon: PackageX },
  ]

  return (
    <main>
      <p className="text-[10px] font-bold uppercase tracking-[.22em] text-gold">Painel da loja</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <div><h1 className="font-display text-3xl sm:text-4xl">Visão geral</h1><p className="mt-2 text-sm text-bone/50">Resumo do catálogo conectado ao banco de dados.</p></div>
        <a href="/admin/produtos/novo" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gold px-5 text-sm font-bold text-ink hover:bg-gold-deep">Novo produto<ArrowRight size={16} /></a>
      </div>
      {error && <p role="alert" className="mt-6 rounded-xl border border-red-300/20 bg-red-950/30 p-4 text-sm text-red-200">{error}</p>}
      <section aria-label="Indicadores do catálogo" className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, icon: Icon }) => <article key={label} className={metric}><Icon className="text-gold" size={20} /><p className="mt-5 text-3xl font-semibold">{value}</p><p className="mt-1 text-xs text-bone/50">{label}</p></article>)}
      </section>
      <section className="mt-8 rounded-2xl border border-white/[.08] bg-graphite/45 p-5 sm:p-6">
        <h2 className="font-display text-xl">Atalhos</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <a href="/admin/produtos" className="flex min-h-16 items-center justify-between rounded-xl border border-white/[.08] px-4 text-sm font-semibold text-bone/75 hover:border-gold/35 hover:text-gold">Gerenciar produtos<ArrowRight size={16} /></a>
          <a href="/admin/categorias" className="flex min-h-16 items-center justify-between rounded-xl border border-white/[.08] px-4 text-sm font-semibold text-bone/75 hover:border-gold/35 hover:text-gold">Organizar categorias<ArrowRight size={16} /></a>
        </div>
      </section>
    </main>
  )
}
