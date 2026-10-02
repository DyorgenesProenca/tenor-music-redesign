import { Reveal, SectionTitle } from '../ui'
import ProductCard from '../cards/ProductCard.jsx'
import { products } from '../../data/products.js'
import { store } from '../../data/site.js'
export default function FeaturedProducts() {
  return (
    <section id="destaques" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
      <Reveal>
        <SectionTitle eyebrow="Escolhas para inspirar" title="Instrumentos em destaque" href={store.url} />
        <div className="-mx-4 mt-8 flex snap-x gap-3 overflow-x-auto px-4 pb-5 [scrollbar-color:rgba(255,184,0,.35)_transparent] sm:gap-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:mt-10 lg:grid-cols-4">
          {products.slice(0, 8).map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </Reveal>
    </section>
  )
}
