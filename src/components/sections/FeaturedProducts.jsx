import { Reveal, SectionTitle } from '../ui'
import ProductCard from '../cards/ProductCard.jsx'
import { products } from '../../data/products.js'
import { store } from '../../data/site.js'
export default function FeaturedProducts() {
  return (
    <section id="destaques" className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-16">
      <Reveal>
        <SectionTitle title="Instrumentos em destaque" href={store.url} />
        <div className="-mx-4 mt-8 flex snap-x gap-4 overflow-x-auto px-4 pb-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
          {products.slice(0, 8).map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </Reveal>
    </section>
  )
}
