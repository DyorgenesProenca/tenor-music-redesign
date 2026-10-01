import { Reveal, SectionTitle } from '../ui'
import CategoryCard from '../cards/CategoryCard.jsx'
import { categories } from '../../data/categories.js'
export default function Categories() {
  return (
    <section id="categorias" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16">
      <Reveal>
        <SectionTitle title="Encontre seu instrumento" />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">{categories.map((c) => <CategoryCard key={c.key} c={c} />)}</div>
      </Reveal>
    </section>
  )
}
