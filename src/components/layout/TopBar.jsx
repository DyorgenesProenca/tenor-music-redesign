import { benefits } from '../../data/benefits.js'
export default function TopBar() {
  const items = [benefits[0], benefits[2], benefits[1]]
  return (
    <div className="bg-graphite text-xs text-bone/70">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-8 px-4">
        {items.map(({ icon: Icon, title }, i) => (
          <span key={title} className={`items-center gap-2 ${i ? 'hidden sm:flex' : 'flex'}`}><Icon size={14} className="text-gold" />{title}</span>
        ))}
      </div>
    </div>
  )
}
