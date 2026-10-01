export default function BenefitCard({ icon: Icon, title, text }) {
  return (
    <div className="flex gap-4">
      <Icon className="mt-1 shrink-0 text-gold" size={26} strokeWidth={1.5} />
      <div><h3 className="font-display text-lg">{title}</h3><p className="mt-1 text-sm text-bone/60">{text}</p></div>
    </div>
  )
}
