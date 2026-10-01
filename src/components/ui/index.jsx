import useReveal from '../../hooks/useReveal.js'

export function Reveal({ children, className = '' }) {
  const ref = useReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

const variants = {
  primary: 'bg-gold text-ink hover:bg-gold-deep',
  ghost: 'border border-white/25 text-bone hover:border-gold hover:text-gold',
  dark: 'bg-ink text-bone hover:bg-graphite',
}
export function Button({ variant = 'primary', className = '', ...props }) {
  return <a {...props} className={`inline-flex h-12 items-center justify-center gap-2 rounded-md px-6 text-sm font-semibold transition-colors duration-200 ${variants[variant]} ${className}`} />
}

const badges = {
  oferta: 'bg-gold text-ink', novo: 'border border-gold/70 bg-ink/70 text-gold',
  seminovo: 'border border-bone/40 bg-ink/70 text-bone', esgotado: 'bg-bone/15 text-bone/70',
}
export const Badge = ({ kind }) => (
  <span className={`rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur ${badges[kind]}`}>{kind}</span>
)

export function SectionTitle({ title, href, linkText = 'Ver todos' }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <h2 className="font-display text-3xl leading-tight sm:text-4xl">{title}</h2>
      {href && <a href={href} className="shrink-0 text-sm text-gold underline-offset-4 hover:underline">{linkText}</a>}
    </div>
  )
}

// Placeholder até haver foto real (campo `image`)
export const Placeholder = ({ icon: Icon, className = '' }) => (
  <div className={`grid h-full w-full place-items-center bg-[radial-gradient(circle_at_30%_20%,#2b2410,#151518_65%)] ${className}`}>
    <Icon className="h-1/3 w-1/3 text-gold/50" strokeWidth={1} />
  </div>
)
