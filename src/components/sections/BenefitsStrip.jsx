import { Reveal, SectionTitle } from '../ui'
import BenefitCard from '../cards/BenefitCard.jsx'
import { benefits } from '../../data/benefits.js'
export default function BenefitsStrip() {
  return (
    <section className="border-y border-white/10 bg-graphite">
      <Reveal className="mx-auto max-w-7xl px-4 py-14">
        <SectionTitle title="Por que comprar na Tenor Music?" />
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{benefits.map((b) => <BenefitCard key={b.title} {...b} />)}</div>
      </Reveal>
    </section>
  )
}
