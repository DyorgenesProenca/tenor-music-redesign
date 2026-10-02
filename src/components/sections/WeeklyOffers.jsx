import { Reveal, SectionTitle } from '../ui'
import ProductCard from '../cards/ProductCard.jsx'
import { useCatalogData } from '../../contexts/CatalogDataContext.jsx'
export default function WeeklyOffers() {
  const { products } = useCatalogData()
  const items = products.filter((p) => p.offer && p.available && p.stock !== 0 && Number(p.price) > 0)
  if (!items.length) return null

  return (
    <section id="ofertas" className="scroll-mt-24 border-y border-gold/15 bg-[radial-gradient(ellipse_at_0%_50%,rgba(255,184,0,.09),transparent_44%),linear-gradient(130deg,#17150f_0%,#151518_54%,#111113_100%)]">
      <Reveal className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SectionTitle eyebrow="Disponibilidade atualizada" title="Ofertas da semana" />
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">{items.map((p) => <ProductCard key={p.id} p={p} className="w-full" />)}</div>
      </Reveal>
    </section>
  )
}
