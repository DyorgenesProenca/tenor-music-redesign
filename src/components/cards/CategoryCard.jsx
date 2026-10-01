import { ArrowUpRight } from 'lucide-react'
import { Placeholder } from '../ui'
export default function CategoryCard({ c }) {
  return (
    <a href={c.href} className="group relative block aspect-[4/5] overflow-hidden rounded-lg ring-1 ring-white/10 transition hover:ring-gold/60">
      <Placeholder icon={c.icon} className="transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
      <ArrowUpRight className="absolute right-4 top-4 text-gold opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="font-display text-xl">{c.name}</h3>
        <p className="mt-1 text-xs leading-relaxed text-bone/65">{c.desc}</p>
      </div>
    </a>
  )
}
