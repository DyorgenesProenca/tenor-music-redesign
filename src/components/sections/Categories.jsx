import { Reveal, SectionTitle } from '../ui'
import CategoryCard from '../cards/CategoryCard.jsx'
import { useCatalogData } from '../../contexts/CatalogDataContext.jsx'
export default function Categories() {
  const { homepageCategories: categories } = useCatalogData()
  return (
    <section id="categorias" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <Reveal>
        <SectionTitle eyebrow="Um universo de possibilidades" title="Encontre o instrumento que combina com a sua música" />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-4">{categories.map((c) => <CategoryCard key={c.key} c={c} />)}</div>
      </Reveal>
    </section>
  )
}
