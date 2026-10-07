import { CalendarDays, UserRound } from 'lucide-react'

export default function AboutStore() {
  return (
    <section id="sobre-a-loja" className="scroll-mt-24 border-y border-white/[.07] bg-[radial-gradient(ellipse_at_82%_40%,rgba(255,184,0,.08),transparent_38%),#101012]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.24em] text-gold">Sobre a loja</p>
          <h2 className="mt-4 max-w-xl font-display text-4xl leading-[1.05] tracking-[-.04em] sm:text-5xl">Música que aproxima pessoas e instrumentos.</h2>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-bone/65 sm:text-base sm:leading-8">
            Esta história é apenas ilustrativa. Em 2014, o músico Rafael Martins abriu as portas da Tenor Music com uma ideia simples: ajudar cada pessoa a encontrar o instrumento certo e criar um espaço de confiança para aprender, tocar e compartilhar música.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-bone/65 sm:text-base sm:leading-8">
            O pequeno projeto cresceu com a comunidade de músicos da região. Cada conversa, primeira aula e apresentação passou a fazer parte de uma história construída com dedicação à música.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-graphite/70 p-6 shadow-[0_28px_80px_rgba(0,0,0,.3)] sm:p-8">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,184,0,.12),transparent_60%)]" />
          <div className="relative flex flex-col items-center text-center">
            <img src="/tenor-music-logo.png" alt="Logo Tenor Music" className="h-32 w-32 rounded-2xl bg-white p-1 shadow-[0_12px_36px_rgba(0,0,0,.35)] sm:h-40 sm:w-40" />
            <p className="mt-5 text-[9px] font-bold uppercase tracking-[.2em] text-gold">Conteúdo ilustrativo · dados fictícios</p>
            <div className="mt-6 grid w-full gap-3 text-left sm:grid-cols-2">
              <div className="rounded-xl border border-white/[.08] bg-ink/50 p-4">
                <CalendarDays size={17} className="text-gold" />
                <p className="mt-3 text-[9px] font-bold uppercase tracking-[.17em] text-bone/45">Fundação</p>
                <p className="mt-1 text-sm font-semibold">2014 · exemplo</p>
              </div>
              <div className="rounded-xl border border-white/[.08] bg-ink/50 p-4">
                <UserRound size={17} className="text-gold" />
                <p className="mt-3 text-[9px] font-bold uppercase tracking-[.17em] text-bone/45">Proprietário</p>
                <p className="mt-1 text-sm font-semibold">Rafael Martins · fictício</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
