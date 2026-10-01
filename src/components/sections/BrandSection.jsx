import { Reveal, SectionTitle } from '../ui'
import { brands } from '../../data/brands.js'
export default function BrandSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <Reveal>
        <SectionTitle title="Grandes marcas. Grandes instrumentos." />
        <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-6">
          {brands.map((b) => <li key={b} className="font-display text-2xl text-bone/40 transition-colors hover:text-gold sm:text-3xl">{b}</li>)}
        </ul>
      </Reveal>
    </section>
  )
}
