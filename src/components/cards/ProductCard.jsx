import { ArrowUpRight, ShoppingBag } from 'lucide-react'
import { Badge, Button } from '../ui'
import InstrumentArtwork from '../ui/InstrumentArtwork.jsx'
import { useCatalogData } from '../../contexts/CatalogDataContext.jsx'
import { useCart } from '../../hooks/useCart.jsx'
import { brl } from '../../lib/format.js'

export default function ProductCard({ p, className = 'w-64 shrink-0 snap-start lg:w-auto', catalog = false }) {
  const { add } = useCart()
  const { homepageCategories, catalogCategories } = useCatalogData()
  const legacyCategory = p.category === 'outros' && /bombardino/i.test(p.name) ? 'tubas' : p.category
  const cat = [...homepageCategories, ...catalogCategories].find((c) => c.key === legacyCategory)
  const artworkKind = legacyCategory
  const brand = p.brand
  const out = !p.available || p.stock === 0
  return (
    <article className={`group flex h-full flex-col overflow-hidden rounded-2xl bg-graphite/90 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:ring-gold/40 ${className}`}>
      <div className="relative aspect-[1.08] overflow-hidden bg-[#171719]">
        <InstrumentArtwork kind={artworkKind} photo={p.image} alt={p.name} genericFallback className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.035]" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {p.offer && <Badge kind="oferta" />}
          {out ? <Badge kind="esgotado" /> : <Badge kind={p.condition} />}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[10px] font-bold uppercase tracking-[.16em] text-bone/50">{catalog ? [brand, p.model].filter(Boolean).join(' · ') || cat?.name : <>{brand || cat?.name}{brand && cat?.name ? <span className="px-1.5 text-gold/70">·</span> : null}{brand && cat?.name ? cat.name : null}</>}</p>
        <h3 className="mt-2 min-h-[3.4rem] font-display text-[1.08rem] leading-snug tracking-[-.015em]">{p.name}</h3>
        {catalog && <p className={`mt-1 text-[10px] font-semibold ${out ? 'text-bone/45' : 'text-gold/75'}`}>{out ? 'Esgotado' : p.stock > 0 ? 'Disponível' : 'Disponibilidade sob consulta'}</p>}
        <div className="mt-4 border-t border-white/8 pt-3.5">
          {p.price ? (
            <>
              {p.previousPrice > p.price && <p className="mb-0.5 text-xs text-bone/45 line-through">{brl(p.previousPrice)}</p>}
              <p className="text-2xl font-bold tracking-[-.03em] text-bone">{brl(p.price)}</p>
              {p.installments?.amount
                ? <p className="mt-1 text-[11px] text-bone/55">{p.installments.count}x de {brl(p.installments.amount)}{p.installments.hasInterest ? ' com juros' : ' sem juros'}</p>
                : null}
            </>
          ) : <p className="min-h-12 pt-1 text-sm text-bone/60">{out ? 'Indisponível no momento' : 'Consulte o valor'}</p>}
        </div>
        <div className="mt-auto flex gap-2 pt-5">
          <Button href={`/produto/${encodeURIComponent(p.id)}`} variant="ghost" className="min-w-0 flex-1 px-3">{out ? 'Ver detalhes' : 'Ver produto'}<ArrowUpRight size={15} /></Button>
          {p.price && !out && (
            <button onClick={() => add(p)} aria-label={`Adicionar ${p.name} ao carrinho`} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold text-ink transition duration-200 hover:scale-105 hover:bg-gold-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"><ShoppingBag size={18} /></button>
          )}
        </div>
      </div>
    </article>
  )
}
