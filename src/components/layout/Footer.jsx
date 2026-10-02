import { store, url, institutional, payments } from '../../data/site.js'
import { useCatalogData } from '../../contexts/CatalogDataContext.jsx'
const h = 'mb-4 font-display text-lg'
const link = 'text-bone/60 transition-colors hover:text-gold'
export default function Footer() {
  const { settings } = useCatalogData()
  return (
    <footer className="border-t border-white/10 bg-graphite">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className={h}>Institucional</h3>
          <ul className="space-y-2 text-sm">{institutional.map(([l, p]) => <li key={l}><a className={link} href={url(p)}>{l}</a></li>)}</ul>
        </div>
        <div>
          <h3 className={h}>Atendimento</h3>
          <ul className="space-y-2 text-sm text-bone/60">{store.hours.map((t) => <li key={t}>{t}</li>)}</ul>
          <h3 className={`${h} mt-8`}>Redes sociais</h3>
          <a className={`${link} text-sm`} href={settings.whatsappUrl || store.whatsapp}>WhatsApp</a>
        </div>
        <div>
          <h3 className={h}>Contato</h3>
          <ul className="space-y-2 text-sm text-bone/60">
            {store.phones.map((p) => <li key={p}>{p}</li>)}
            <li><a className={link} href={`mailto:${settings.contactEmail || store.email}`}>{settings.contactEmail || store.email}</a></li>
            <li>{store.address}</li>
          </ul>
        </div>
        <div>
          <h3 className={h}>Formas de pagamento</h3>
          <div className="flex flex-wrap gap-2">{payments.map((p) => <span key={p} className="rounded border border-white/15 px-2.5 py-1 text-xs text-bone/70">{p}</span>)}</div>
          <h3 className={`${h} mt-8`}>Segurança</h3>
          <a className={`${link} text-sm`} href="https://www.lojaprotegida.com.br/736958">Loja Protegida</a>
        </div>
      </div>
      <p className="border-t border-white/10 px-4 py-5 text-center text-xs text-bone/40">Protótipo de redesign para apresentação. Não é o site oficial da Tenor Music.</p>
    </footer>
  )
}
