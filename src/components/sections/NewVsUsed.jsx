import { ArrowUpRight } from 'lucide-react'
import { Button, Reveal } from '../ui'
import InstrumentArtwork from '../ui/InstrumentArtwork.jsx'

export default function NewVsUsed() {
  return (
    <section id="novos-seminovos" className="mx-auto grid max-w-7xl scroll-mt-24 gap-4 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-6 lg:px-8">
      <Reveal className="group overflow-hidden rounded-2xl border border-white/10 bg-graphite">
        <div className="relative h-60 overflow-hidden sm:h-72">
          <InstrumentArtwork kind="trompetes" className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.035]" />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-transparent" />
        </div>
        <div className="px-6 pb-7 sm:px-9 sm:pb-9">
          <p className="text-[10px] font-bold uppercase tracking-[.22em] text-gold">01 / Novos</p>
          <h2 className="mt-3 font-display text-3xl tracking-[-.025em] sm:text-4xl">O próximo instrumento da sua jornada</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-bone/65">Explore instrumentos novos de marcas reconhecidas por músicos e escolas.</p>
          <Button href="/instrumentos?condicao=novo" className="mt-7">Ver instrumentos novos<ArrowUpRight size={16} /></Button>
        </div>
      </Reveal>
      <Reveal className="group overflow-hidden rounded-2xl border border-gold/25 bg-bone text-ink">
        <div className="relative h-60 overflow-hidden sm:h-72">
          <InstrumentArtwork kind="cordas" className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.035]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181717]/90 via-transparent to-transparent" />
          <span className="absolute right-5 top-5 rounded-full border border-bone/25 bg-ink/40 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.18em] text-bone backdrop-blur">Escolha com personalidade</span>
        </div>
        <div className="px-6 pb-7 pt-2 sm:px-9 sm:pb-9">
          <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#89620f]">02 / Seminovos</p>
          <h2 className="mt-3 font-display text-3xl tracking-[-.025em] sm:text-4xl">Mais música para novas histórias</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-ink/70">Encontre instrumentos seminovos e descubra outras possibilidades para tocar.</p>
          <Button href="/instrumentos?condicao=seminovo" variant="dark" className="mt-7">Explorar seminovos<ArrowUpRight size={16} /></Button>
        </div>
      </Reveal>
    </section>
  )
}
