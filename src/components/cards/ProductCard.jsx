import { ShoppingBag } from 'lucide-react'
import { Badge, Button, Placeholder } from '../ui'
import { categories } from '../../data/categories.js'
import { useCart } from '../../hooks/useCart.jsx'
import { brl } from '../../lib/format.js'

export default function ProductCard({ p, className = 'w-64 shrink-0 snap-start lg:w-auto' }) {
  const { add } = useCart()
  const cat = categories.find((c) => c.key === p.cat)
  const out = p.status === 'esgotado'
  return (
    <article className={`group flex flex-col overflow-hidden rounded-lg bg-graphite ring-1 ring-white/10 transition hover:ring-gold/50 ${className}`}>
      <div className="relative aspect-square overflow-hidden">
        {p.image
          ? <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          : <Placeholder icon={cat.icon} className="transition-transform duration-700 group-hover:scale-105" />}
        <div className="absolute left-3 top-3 flex gap-1.5">
          {p.badge && <Badge kind={p.badge} />}
          <Badge kind={out ? 'esgotado' : p.condition} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-bone/50">{cat.name}</p>
        <h3 className="mt-1 min-h-[3rem] font-display text-lg leading-snug">{p.name}</h3>
        <div className="mt-3">
          {p.price ? (
            <>
              <p className="text-xl font-semibold text-gold">{brl(p.price)}</p>
              <p className="text-xs text-bone/60">12x de {brl(p.inst)} com juros</p>
            </>
          ) : <p className="text-sm text-bone/60">{out ? 'Indisponível no momento' : 'Consulte o valor'}</p>}
        </div>
        <div className="mt-auto flex gap-2 pt-4">
          <Button href={p.url} target="_blank" rel="noreferrer" variant="ghost" className="h-11 flex-1 px-3">Ver produto</Button>
          {p.price && !out && (
            <button onClick={() => add(p)} aria-label={`Adicionar ${p.name} ao carrinho`} className="grid h-11 w-11 place-items-center rounded-md bg-gold text-ink transition-colors hover:bg-gold-deep"><ShoppingBag size={18} /></button>
          )}
        </div>
      </div>
    </article>
  )
}
