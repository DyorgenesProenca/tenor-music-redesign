import { useEffect, useState } from 'react'
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react'
import { nav, url } from '../../data/site.js'
import { useCart } from '../../hooks/useCart.jsx'

export default function Header() {
  const [menu, setMenu] = useState(false), [search, setSearch] = useState(false), [searchTerm, setSearchTerm] = useState(() => new URLSearchParams(window.location.search).get('q') || ''), [scrolled, setScrolled] = useState(false)
  const { count } = useCart()
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  const icon = 'grid h-10 w-10 place-items-center rounded-full text-bone/80 transition-colors hover:bg-white/[.05] hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:h-11 sm:w-11'
  return (
    <header className={`sticky top-0 z-50 border-b border-white/[.08] backdrop-blur-xl transition-colors ${scrolled ? 'bg-ink/95 shadow-[0_10px_32px_rgba(0,0,0,.16)]' : 'bg-ink/80'}`}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-[height] duration-300 sm:px-6 lg:px-8 ${scrolled ? 'h-14' : 'h-[68px] sm:h-[76px]'}`}>
        <button className={`${icon} -ml-2 lg:hidden`} aria-label={menu ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
        <a href="/" aria-label="Tenor Music, página inicial" className="block shrink-0 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
          <img src="/tenor-music-logo.png" alt="Tenor Music" className="h-11 w-11 rounded-xl bg-white object-contain p-0.5 shadow-[0_3px_16px_rgba(0,0,0,.24)]" />
        </a>
        <nav aria-label="Navegação principal" className="hidden items-center gap-5 text-[13px] xl:gap-7 xl:text-sm lg:flex">
          {nav.map(([label, href]) => <a key={label} href={href} className="relative py-2 text-bone/75 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform hover:text-bone hover:after:scale-x-100">{label}</a>)}
        </nav>
        <div className="flex items-center">
          <button className={icon} aria-label={search ? 'Fechar busca' : 'Buscar'} aria-expanded={search} onClick={() => setSearch(!search)}><Search size={19} /></button>
          <a className={`${icon} hidden sm:grid`} aria-label="Minha conta" href={url('/my-account/login')}><User size={19} /></a>
          <a className={`${icon} relative`} aria-label={`Carrinho, ${count} itens`} href="#">
            <ShoppingBag size={19} />
            {count > 0 && <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-ink">{count}</span>}
          </a>
        </div>
      </div>
      {search && (
        <form id="site-search" action="/instrumentos" method="get" className="border-t border-white/[.08] bg-ink/95 px-4 py-3 sm:px-6">
          <div className="mx-auto flex h-11 w-full max-w-2xl overflow-hidden rounded-full border border-white/10 bg-graphite transition focus-within:border-gold/45 focus-within:ring-2 focus-within:ring-gold/20">
            <label className="sr-only" htmlFor="site-search-input">Buscar instrumentos no catálogo</label>
            <input id="site-search-input" name="q" autoFocus type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Busque por instrumento, marca ou modelo" className="min-w-0 flex-1 bg-transparent px-5 text-sm text-bone placeholder:text-bone/40 outline-none" />
            <button type="submit" aria-label="Pesquisar no catálogo" className="grid w-12 shrink-0 place-items-center text-bone/70 transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-gold"><Search size={18} /></button>
          </div>
        </form>
      )}
      {menu && (
        <nav id="mobile-navigation" aria-label="Navegação móvel" className="border-t border-white/[.08] bg-ink px-4 pb-4 lg:hidden">
          {nav.map(([label, href]) => <a key={label} href={href} onClick={() => setMenu(false)} className="block border-b border-white/[.06] py-3.5 font-display text-lg text-bone/85 transition-colors hover:text-gold">{label}</a>)}
        </nav>
      )}
    </header>
  )
}
