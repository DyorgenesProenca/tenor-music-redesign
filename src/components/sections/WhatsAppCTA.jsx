import { MessageCircle } from 'lucide-react'
import { Button, Reveal } from '../ui'
import { store } from '../../data/site.js'
export default function WhatsAppCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <Reveal className="relative isolate overflow-hidden rounded-2xl bg-graphite px-6 py-14 text-center ring-1 ring-gold/30 sm:px-12">
        <div className="staff absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 opacity-60" />
        <h2 className="font-display text-3xl sm:text-4xl">Não encontrou o instrumento que procura?</h2>
        <p className="mt-3 text-bone/70">Fale com nossa equipe.</p>
        <Button href={store.whatsapp} target="_blank" rel="noreferrer" className="mt-8"><MessageCircle size={18} />Falar pelo WhatsApp</Button>
      </Reveal>
    </section>
  )
}
