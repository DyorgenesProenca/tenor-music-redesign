import { Reveal, SectionTitle } from '../ui'
import BenefitCard from '../cards/BenefitCard.jsx'
import { benefits } from '../../data/benefits.js'
export default function BenefitsStrip() {
  return (
    <section className="border-y border-white/[.08] bg-[linear-gradient(135deg,#19191b_0%,#121214_100%)]">
      <Reveal className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SectionTitle eyebrow="Uma boa experiência acompanha o bom instrumento" title="Por que comprar na Tenor Music?" />
        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">{benefits.map((b) => <BenefitCard key={b.title} {...b} />)}</div>
      </Reveal>
    </section>
  )
}
