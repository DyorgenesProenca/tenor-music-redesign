import useReveal from '../../hooks/useReveal.js'
import InstrumentArtwork from './InstrumentArtwork.jsx'

export function Reveal({ children, className = '' }) {
  const ref = useReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

const variants = {
  primary: 'bg-gold text-ink shadow-[0_8px_24px_rgba(255,184,0,.16)] hover:-translate-y-0.5 hover:bg-gold-deep hover:shadow-[0_10px_28px_rgba(255,184,0,.22)]',
  ghost: 'border border-white/20 bg-white/[.025] text-bone hover:-translate-y-0.5 hover:border-gold/70 hover:bg-white/[.06] hover:text-gold',
  dark: 'bg-ink text-bone hover:-translate-y-0.5 hover:bg-graphite',
}
export function Button({ variant = 'primary', className = '', ...props }) {
  return <a {...props} className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-center text-sm font-bold transition-[color,background-color,border-color,box-shadow,transform] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${variants[variant]} ${className}`} />
}

const badges = {
  oferta: 'bg-gold text-ink', novo: 'border border-gold/70 bg-ink/70 text-gold',
  seminovo: 'border border-bone/40 bg-ink/70 text-bone', usado: 'border border-bone/40 bg-ink/70 text-bone', esgotado: 'bg-bone/15 text-bone/70',
}
export const Badge = ({ kind }) => (
  <span className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.14em] backdrop-blur ${badges[kind]}`}>{kind}</span>
)

export function SectionTitle({ title, href, linkText = 'Ver todos', eyebrow }) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        {eyebrow && <p className="mb-3 text-[10px] font-bold uppercase tracking-[.24em] text-gold/80">{eyebrow}</p>}
        <h2 className="max-w-3xl font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.08] tracking-[-.035em]">{title}</h2>
      </div>
      {href && <a href={href} className="group inline-flex min-h-10 shrink-0 items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">{linkText}<span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></a>}
    </div>
  )
}

// Placeholder até haver foto real (campo `image`)
export const Placeholder = ({ icon: _Icon, kind, className = '' }) => <InstrumentArtwork kind={kind} className={className} />
