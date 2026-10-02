import { useState } from 'react'
import { Reveal } from '../ui'
export default function Newsletter() {
  const [done, setDone] = useState(false)
  return (
    <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
      <Reveal className="rounded-2xl border border-white/[.08] bg-graphite/70 px-5 py-9 text-center sm:px-10 sm:py-12">
        <p className="text-[10px] font-bold uppercase tracking-[.22em] text-gold">Novidades Tenor Music</p>
        <h2 className="mt-3 font-display text-2xl tracking-[-.02em] sm:text-3xl">Receba novidades do catálogo</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-bone/60">Acompanhe instrumentos e novidades selecionadas para quem vive música.</p>
        {done ? <p role="status" className="mt-6 text-sm font-semibold text-gold">Cadastro recebido (demonstração).</p> : (
          <form onSubmit={(e) => { e.preventDefault(); setDone(true) }} className="mx-auto mt-6 flex max-w-2xl flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="nl">E-mail</label>
            <input id="nl" type="email" required placeholder="Seu e-mail" className="h-12 min-w-0 flex-1 rounded-full border border-white/10 bg-ink/70 px-5 text-sm text-bone placeholder:text-bone/40 outline-none transition focus:border-gold/45 focus:ring-2 focus:ring-gold/20" />
            <button className="min-h-12 rounded-full bg-gold px-7 text-sm font-bold text-ink transition duration-200 hover:-translate-y-0.5 hover:bg-gold-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">Cadastrar</button>
          </form>
        )}
      </Reveal>
    </section>
  )
}
