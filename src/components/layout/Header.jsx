import { useEffect, useState } from 'react'
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react'
import { nav, url } from '../../data/site.js'
import { useCart } from '../../hooks/useCart.jsx'

export default function Header() {
  const [menu, setMenu] = useState(false), [search, setSearch] = useState(false), [scrolled, setScrolled] = useState(false)
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
        <a href="#" className="shrink-0 font-display text-[1.2rem] font-semibold tracking-[-.025em] sm:text-[1.35rem]">Tenor<span className="text-gold"> Music</span></a>
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
        <form id="site-search" onSubmit={(e) => e.preventDefault()} className="border-t border-white/[.08] bg-ink/95 px-4 py-3 sm:px-6">
          <input autoFocus type="search" placeholder="Busque por instrumento, marca ou modelo" className="mx-auto block h-11 w-full max-w-2xl rounded-full border border-white/10 bg-graphite px-5 text-sm text-bone placeholder:text-bone/40 outline-none transition focus:border-gold/45 focus:ring-2 focus:ring-gold/20" />
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
