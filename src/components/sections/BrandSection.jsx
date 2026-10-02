import { Reveal, SectionTitle } from '../ui'
import { useCatalogData } from '../../contexts/CatalogDataContext.jsx'
export default function BrandSection() {
  const { brands } = useCatalogData()
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <Reveal>
        <SectionTitle eyebrow="Marcas que fazem parte do som" title="Tradição e confiança em cada escolha" />
        <p className="mt-3 max-w-xl text-sm leading-6 text-bone/60">Uma seleção de fabricantes que acompanha músicos em diferentes momentos da trajetória.</p>
        <ul className="mt-9 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 lg:mt-12">
          {brands.map((b) => <li key={b} className="grid min-h-20 place-items-center rounded-xl border border-white/[.08] bg-white/[.025] px-3 text-center font-display text-lg text-bone/65 transition duration-300 hover:border-gold/30 hover:bg-white/[.055] hover:text-bone sm:min-h-24 sm:text-xl">{b}</li>)}
        </ul>
      </Reveal>
    </section>
  )
}
