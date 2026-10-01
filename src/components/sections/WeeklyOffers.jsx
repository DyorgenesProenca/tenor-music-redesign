import { Reveal, SectionTitle } from '../ui'
import ProductCard from '../cards/ProductCard.jsx'
import { products } from '../../data/products.js'
export default function WeeklyOffers() {
  const items = products.filter((p) => p.badge === 'oferta' || p.status === 'esgotado')
  return (
    <section id="ofertas" className="scroll-mt-20 border-y border-gold/20 bg-gradient-to-b from-[#1a1606] to-graphite">
      <Reveal className="mx-auto max-w-7xl px-4 py-16">
        <SectionTitle title="Ofertas da semana" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{items.map((p) => <ProductCard key={p.id} p={p} className="w-full" />)}</div>
      </Reveal>
    </section>
  )
}
