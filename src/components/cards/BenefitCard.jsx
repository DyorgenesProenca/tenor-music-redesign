export default function BenefitCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-xl border border-white/[.08] bg-ink/35 p-5 transition duration-300 hover:-translate-y-1 hover:border-gold/25 hover:bg-ink/55 sm:p-6">
      <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/20 bg-gold/[.08] text-gold"><Icon aria-hidden="true" size={21} strokeWidth={1.7} /></span>
      <h3 className="mt-5 font-display text-lg leading-snug">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-bone/60">{text}</p>
    </div>
  )
}
