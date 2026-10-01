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
  const icon = 'grid h-11 w-11 place-items-center rounded-md transition-colors hover:text-gold'
  return (
    <header className={`sticky top-0 z-50 border-b border-white/10 backdrop-blur transition-colors ${scrolled ? 'bg-ink/95' : 'bg-ink/70'}`}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-[height] duration-300 ${scrolled ? 'h-14' : 'h-[72px]'}`}>
        <button className={`${icon} -ml-2 lg:hidden`} aria-label="Menu" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
        <a href="#" className="font-display text-xl font-semibold tracking-wide">Tenor<span className="text-gold"> Music</span></a>
        <nav className="hidden gap-8 text-sm lg:flex">
          {nav.map(([label, href]) => <a key={label} href={href} className="text-bone/80 transition-colors hover:text-gold">{label}</a>)}
        </nav>
        <div className="flex items-center">
          <button className={icon} aria-label="Buscar" onClick={() => setSearch(!search)}><Search size={20} /></button>
          <a className={`${icon} hidden sm:grid`} aria-label="Minha conta" href={url('/my-account/login')}><User size={20} /></a>
          <a className={`${icon} relative`} aria-label={`Carrinho, ${count} itens`} href="#">
            <ShoppingBag size={20} />
            {count > 0 && <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-ink">{count}</span>}
          </a>
        </div>
      </div>
      {search && (
        <form onSubmit={(e) => e.preventDefault()} className="border-t border-white/10 px-4 py-3">
          <input autoFocus type="search" placeholder="Busque por instrumento, marca ou modelo" className="mx-auto block h-11 w-full max-w-2xl rounded-md bg-graphite px-4 text-sm outline-none ring-1 ring-white/15 focus:ring-gold" />
        </form>
      )}
      {menu && (
        <nav className="border-t border-white/10 bg-ink px-4 pb-4 lg:hidden">
          {nav.map(([label, href]) => <a key={label} href={href} onClick={() => setMenu(false)} className="block border-b border-white/5 py-4 font-display text-lg">{label}</a>)}
        </nav>
      )}
    </header>
  )
}
