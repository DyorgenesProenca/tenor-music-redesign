import { MessageCircle } from 'lucide-react'
import { Button, Reveal } from '../ui'
import { store } from '../../data/site.js'
import { useCatalogData } from '../../contexts/CatalogDataContext.jsx'
export default function WhatsAppCTA() {
  const { settings } = useCatalogData()
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <Reveal className="relative isolate overflow-hidden rounded-2xl border border-gold/20 bg-[radial-gradient(ellipse_at_85%_45%,rgba(255,184,0,.15),transparent_40%),linear-gradient(120deg,#1c1b18,#151518_64%)] px-6 py-12 sm:px-12 sm:py-16">
        <div aria-hidden="true" className="staff absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 opacity-45" />
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold/25 bg-gold/[.08] text-gold"><MessageCircle size={24} strokeWidth={1.6} /></span>
          <p className="mt-5 text-[10px] font-bold uppercase tracking-[.23em] text-gold">Atendimento especializado</p>
          <h2 className="mt-3 font-display text-3xl leading-tight tracking-[-.025em] sm:text-4xl lg:text-5xl">A gente ajuda você a encontrar o seu som</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-bone/70 sm:text-base">Está procurando um instrumento ou quer conversar antes de escolher? Nossa equipe pode orientar você.</p>
          <Button href={settings.whatsappUrl || store.whatsapp} target="_blank" rel="noreferrer" className="mt-7"><MessageCircle size={18} />Conversar pelo WhatsApp</Button>
        </div>
      </Reveal>
    </section>
  )
}
