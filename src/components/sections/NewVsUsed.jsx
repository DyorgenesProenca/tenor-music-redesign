import { Music4, Music2 } from 'lucide-react'
import { Button, Reveal } from '../ui'
import { store } from '../../data/site.js'
export default function NewVsUsed() {
  return (
    <section id="novos-seminovos" className="grid scroll-mt-20 md:grid-cols-2">
      <Reveal className="relative flex min-h-[420px] flex-col justify-end bg-graphite p-8 sm:p-14">
        <Music4 className="absolute right-8 top-8 h-40 w-40 text-gold/15" strokeWidth={0.75} />
        <h2 className="font-display text-4xl">Instrumentos novos</h2>
        <p className="mt-3 max-w-sm text-bone/65">Das marcas que músicos e escolas já conhecem.</p>
        <Button href={store.url} className="mt-8 self-start">Ver instrumentos novos</Button>
      </Reveal>
      <Reveal className="relative flex min-h-[420px] flex-col justify-end bg-bone p-8 text-ink sm:p-14">
        <Music2 className="absolute right-8 top-8 h-40 w-40 text-ink/10" strokeWidth={0.75} />
        <h2 className="font-display text-4xl">Seminovos selecionados</h2>
        <p className="mt-3 max-w-sm text-ink/70">Instrumentos usados e seminovos do catálogo.</p>
        <Button href={store.url} variant="dark" className="mt-8 self-start">Ver seminovos</Button>
      </Reveal>
    </section>
  )
}
