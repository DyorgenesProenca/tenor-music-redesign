import { benefits } from '../../data/benefits.js'
export default function TopBar() {
  const items = [benefits[0], benefits[2], benefits[1]]
  return (
    <div className="border-b border-white/[.04] bg-[#131315] text-xs text-bone/65">
      <div className="mx-auto flex h-8 max-w-7xl items-center justify-center gap-5 px-4 sm:gap-8">
        {items.map(({ icon: Icon, title }, i) => (
          <span key={title} className={`items-center gap-2 ${i ? 'hidden sm:flex' : 'flex'}`}><Icon size={13} className="text-gold" />{title}</span>
        ))}
      </div>
    </div>
  )
}
