import { ArrowDown, ArrowUpRight, ShieldCheck, Truck } from 'lucide-react'
import { Button } from '../ui'
import { store } from '../../data/site.js'
import { useCatalogData } from '../../contexts/CatalogDataContext.jsx'
import InstrumentArtwork from '../ui/InstrumentArtwork.jsx'

export default function Hero() {
  const { settings } = useCatalogData()
  return (
    <section className="relative isolate overflow-hidden border-b border-white/[.06]">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_82%_44%,rgba(255,184,0,.14),transparent_42%),radial-gradient(ellipse_at_15%_95%,rgba(255,255,255,.035),transparent_40%)]" />
      <div aria-hidden="true" className="staff absolute inset-x-0 top-[54%] -z-10 -translate-y-1/2 opacity-50" />
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:min-h-[min(790px,calc(100svh-108px))] lg:grid-cols-[.94fr_1.06fr] lg:gap-12 lg:px-8 lg:py-10 xl:gap-20">
        <div className="relative z-10 max-w-2xl py-3 lg:py-8">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-gold/20 bg-gold/[.06] px-3.5 py-2 text-[9px] font-bold uppercase tracking-[.2em] text-gold sm:text-[10px]">
            <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_10px_rgba(255,184,0,.7)]" />Instrumentos para viver a música
          </p>
          <h1 className="mt-6 max-w-[11ch] font-display text-[clamp(3.15rem,11vw,6.6rem)] font-medium leading-[.94] tracking-[-.055em] sm:mt-8 lg:text-[clamp(4.25rem,6vw,6.25rem)]">Seu próximo <span className="text-gold">som começa aqui.</span></h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-bone/70 sm:mt-7 sm:text-lg sm:leading-8">Instrumentos musicais para acompanhar sua paixão, seus estudos e cada nova apresentação.</p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
            <Button href="#categorias" className="w-full sm:w-auto">Explorar instrumentos<ArrowDown size={16} /></Button>
            <Button href={settings.whatsappUrl || store.whatsapp} target="_blank" rel="noreferrer" variant="ghost" className="w-full sm:w-auto">Falar com um especialista<ArrowUpRight size={15} /></Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-5 text-[11px] font-medium text-bone/65 sm:mt-10 sm:pt-6 sm:text-xs">
            <span className="inline-flex items-center gap-2"><ShieldCheck size={15} className="text-gold" />Compra segura</span>
            <span className="inline-flex items-center gap-2"><Truck size={15} className="text-gold" />Envio para todo Brasil</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[35rem] lg:max-w-none">
          <div aria-hidden="true" className="absolute -inset-2 rounded-[2rem] border border-white/[.06] sm:-inset-4 sm:rounded-[2.5rem]" />
          <div className="relative aspect-[.96] overflow-hidden rounded-[1.65rem] border border-white/10 bg-graphite shadow-[0_36px_90px_rgba(0,0,0,.42)] sm:rounded-[2rem]">
            {/* Passe uma foto em `photo` quando a Tenor Music fornecer o material oficial. */}
            <InstrumentArtwork kind="saxofones" className="absolute inset-0 scale-[1.04]" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-ink/50" />
            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink/50 px-3 py-2 text-[9px] font-bold uppercase tracking-[.18em] text-bone/75 backdrop-blur sm:left-6 sm:top-6 sm:px-4 sm:text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />Universo Tenor Music
            </div>
            <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 sm:inset-x-6 sm:bottom-6">
              <div className="max-w-[17rem] rounded-xl border border-white/10 bg-ink/75 p-3.5 backdrop-blur-md sm:p-5">
                <p className="text-[9px] font-bold uppercase tracking-[.2em] text-gold">Encontre sua voz</p>
                <p className="mt-1.5 font-display text-lg leading-tight sm:text-2xl">Um instrumento para cada caminho musical.</p>
              </div>
              <span aria-hidden="true" className="mb-1 hidden h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 bg-ink/45 text-bone sm:grid"><ArrowUpRight size={18} /></span>
            </div>
          </div>
          <span aria-hidden="true" className="absolute -right-2 top-[20%] hidden h-16 w-16 rounded-full border border-gold/25 bg-gold/[.06] shadow-[0_0_60px_rgba(255,184,0,.12)] sm:block" />
        </div>
      </div>
    </section>
  )
}
