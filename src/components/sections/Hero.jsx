import { Music2 } from 'lucide-react'
import { Button } from '../ui'
import { store } from '../../data/site.js'

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(55%_65%_at_75%_45%,rgba(255,184,0,.2),transparent_70%)]" />
      <div className="staff absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2" />
      <div className="mx-auto grid min-h-[calc(100svh-108px)] max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">SEU SOM.<br />SEU INSTRUMENTO.</h1>
          <p className="mt-6 max-w-md text-lg text-bone/70">Instrumentos musicais para quem leva música a sério.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#categorias">EXPLORAR INSTRUMENTOS</Button>
            <Button href={store.whatsapp} variant="ghost">FALAR COM UM ESPECIALISTA</Button>
          </div>
        </div>
        {/* A "nota" sobre a pauta: troque por public/images/hero.jpg */}
        <div className="relative mx-auto aspect-square w-full max-w-sm lg:max-w-md">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#FFD76A,#D99400_45%,#2e2200_82%)] shadow-[0_0_120px_rgba(255,184,0,.25)]" />
          <Music2 className="absolute inset-0 m-auto h-1/2 w-1/2 text-ink/80" strokeWidth={1} />
          <img src="/images/hero.jpg" alt="" onError={(e) => e.currentTarget.remove()} className="absolute inset-0 h-full w-full rounded-full object-cover" />
        </div>
      </div>
    </section>
  )
}
