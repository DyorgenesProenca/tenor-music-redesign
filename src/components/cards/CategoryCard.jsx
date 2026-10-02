import { ArrowUpRight } from 'lucide-react'
import { Placeholder } from '../ui'
export default function CategoryCard({ c }) {
  return (
    <a href={c.href} aria-label={`${c.name}: ${c.desc}`} className="group relative block aspect-[.84] overflow-hidden rounded-xl bg-graphite ring-1 ring-white/10 transition duration-500 hover:-translate-y-1 hover:ring-gold/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:aspect-[.9]">
      <Placeholder icon={c.icon} kind={c.key} className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.06]" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/5 transition-colors duration-500 group-hover:via-ink/15" />
      <ArrowUpRight aria-hidden="true" className="absolute right-4 top-4 h-9 w-9 rounded-full border border-white/20 bg-ink/45 p-2 text-bone transition duration-300 group-hover:rotate-45 group-hover:border-gold/60 group-hover:text-gold" />
      <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-5">
        <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[.19em] text-gold/85">Explorar categoria</p>
        <h3 className="font-display text-lg leading-tight sm:text-2xl">{c.name}</h3>
        <p className="mt-2 hidden text-xs leading-relaxed text-bone/70 sm:block">{c.desc}</p>
      </div>
    </a>
  )
}
