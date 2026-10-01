import { useState } from 'react'
import { Reveal } from '../ui'
export default function Newsletter() {
  const [done, setDone] = useState(false)
  return (
    <section className="mx-auto max-w-3xl px-4 pb-20">
      <Reveal className="text-center">
        <h2 className="font-display text-2xl sm:text-3xl">Receba novidades do catálogo</h2>
        {done ? <p className="mt-6 text-gold">Cadastro recebido (demonstração).</p> : (
          <form onSubmit={(e) => { e.preventDefault(); setDone(true) }} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="nl">E-mail</label>
            <input id="nl" type="email" required placeholder="Seu e-mail" className="h-12 flex-1 rounded-md bg-graphite px-4 outline-none ring-1 ring-white/15 focus:ring-gold" />
            <button className="h-12 rounded-md bg-gold px-8 text-sm font-semibold text-ink transition-colors hover:bg-gold-deep">Cadastrar</button>
          </form>
        )}
      </Reveal>
    </section>
  )
}
