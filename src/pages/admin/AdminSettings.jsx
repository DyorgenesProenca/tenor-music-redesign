import { useEffect, useState } from 'react'
import { CheckCircle2, ShieldCheck } from 'lucide-react'
import { getSiteSettings, updateSiteSettings } from '../../services/settingsService.js'
import { useCatalogData } from '../../contexts/CatalogDataContext.jsx'

const inputClass = 'mt-2 h-12 w-full rounded-xl border border-white/10 bg-ink px-4 text-sm text-bone outline-none focus:border-gold/50'

export default function AdminSettings() {
  const [settings, setSettings] = useState({ whatsappUrl: '', contactEmail: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const { refreshCatalog } = useCatalogData()

  useEffect(() => {
    getSiteSettings().then(setSettings).catch((failure) => setError(failure.message || 'Falha ao carregar configurações.')).finally(() => setLoading(false))
  }, [])

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    setSaved(false)
    try {
      const whatsapp = new URL(settings.whatsappUrl)
      if (whatsapp.protocol !== 'https:') throw new Error('O endereço do WhatsApp deve começar com https://.')
    } catch (failure) {
      setError(failure.message || 'Informe um endereço válido para o WhatsApp.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.contactEmail)) { setError('Informe um e-mail de contato válido.'); return }

    setSaving(true)
    try {
      setSettings(await updateSiteSettings(settings))
      await refreshCatalog()
      setSaved(true)
    } catch (failure) {
      setError(failure.message || 'Não foi possível salvar as configurações.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="py-10 text-sm text-bone/50">Carregando configurações…</p>

  return (
    <main>
      <p className="text-[10px] font-bold uppercase tracking-[.22em] text-gold">Loja</p>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl">Configurações</h1>
      <p className="mt-2 text-sm text-bone/50">Dados de contato exibidos no site público.</p>
      {error && <p role="alert" className="mt-5 rounded-xl border border-red-300/20 bg-red-950/30 p-4 text-sm text-red-200">{error}</p>}
      {saved && <p role="status" className="mt-5 flex items-center gap-2 rounded-xl border border-gold/20 bg-gold/[.06] p-4 text-sm text-gold"><CheckCircle2 size={17} />Configurações salvas.</p>}

      <form onSubmit={submit} className="mt-7 max-w-2xl rounded-2xl border border-white/[.08] bg-graphite/45 p-5 sm:p-7">
        <label className="block text-xs font-semibold text-bone/65">Link do WhatsApp<input required type="url" value={settings.whatsappUrl} onChange={(event) => setSettings((current) => ({ ...current, whatsappUrl: event.target.value }))} className={inputClass} placeholder="https://api.whatsapp.com/send?phone=..." /></label>
        <label className="mt-5 block text-xs font-semibold text-bone/65">E-mail de contato<input required type="email" value={settings.contactEmail} onChange={(event) => setSettings((current) => ({ ...current, contactEmail: event.target.value }))} className={inputClass} /></label>
        <button disabled={saving} className="mt-6 min-h-12 rounded-full bg-gold px-6 text-sm font-bold text-ink hover:bg-gold-deep disabled:opacity-60">{saving ? 'Salvando…' : 'Salvar configurações'}</button>
      </form>

      <aside className="mt-6 flex max-w-2xl gap-3 rounded-2xl border border-white/[.08] p-5 text-sm leading-6 text-bone/50"><ShieldCheck className="mt-0.5 shrink-0 text-gold" size={18} /><p>Os dados são públicos para leitura e só usuários incluídos em <code className="text-bone/75">admin_users</code> podem alterá-los. Chaves secretas do projeto não são armazenadas nesta tela.</p></aside>
      <p className="mt-5 text-sm text-bone/45">Veja <code className="text-bone/70">docs/admin-setup.md</code> no repositório para os passos de configuração.</p>
    </main>
  )
}
