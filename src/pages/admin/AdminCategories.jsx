import { useEffect, useState } from 'react'
import { Check, Pencil, Plus, X } from 'lucide-react'
import { createCategory, listAdminCategories, updateCategory } from '../../services/categoriesService.js'
import { useCatalogData } from '../../contexts/CatalogDataContext.jsx'

const inputClass = 'mt-2 h-11 w-full rounded-xl border border-white/10 bg-ink px-3 text-sm text-bone outline-none focus:border-gold/50'
const blank = { slug: '', name: '', description: '', sortOrder: 0, catalogSortOrder: 0, active: true, catalogVisible: true, homepageVisible: false }
const slugify = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState(blank)
  const [originalSlug, setOriginalSlug] = useState('')
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const { refreshCatalog } = useCatalogData()

  const load = () => listAdminCategories().then(setCategories).catch((failure) => setError(failure.message || 'Falha ao carregar categorias.')).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const startCreate = () => { setForm({ ...blank, sortOrder: categories.length * 10 + 10, catalogSortOrder: categories.length * 10 + 10 }); setOriginalSlug(''); setEditing(true); setError('') }
  const startEdit = (category) => { setForm({ ...category }); setOriginalSlug(category.slug); setEditing(true); setError('') }

  const save = async (event) => {
    event.preventDefault()
    const clean = { ...form, slug: slugify(form.slug || form.name), name: form.name.trim(), description: form.description.trim() }
    if (!clean.name || !clean.slug) { setError('Informe nome e identificador da categoria.'); return }
    setSaving(true)
    setError('')
    try {
      if (originalSlug) await updateCategory(originalSlug, clean)
      else await createCategory(clean)
      await refreshCatalog()
      setEditing(false)
      await load()
    } catch (failure) {
      setError(failure.message || 'Não foi possível salvar a categoria.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main>
      <p className="text-[10px] font-bold uppercase tracking-[.22em] text-gold">Organização</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4"><div><h1 className="font-display text-3xl sm:text-4xl">Categorias</h1><p className="mt-2 text-sm text-bone/50">{categories.length} categorias · controle de visibilidade do catálogo e homepage.</p></div><button onClick={startCreate} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gold px-5 text-sm font-bold text-ink"><Plus size={17} />Nova categoria</button></div>
      {error && <p role="alert" className="mt-5 rounded-xl border border-red-300/20 bg-red-950/30 p-4 text-sm text-red-200">{error}</p>}

      {editing && <form onSubmit={save} className="mt-6 rounded-2xl border border-gold/20 bg-graphite/70 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4"><h2 className="font-display text-xl">{originalSlug ? 'Editar categoria' : 'Adicionar categoria'}</h2><button type="button" onClick={() => setEditing(false)} aria-label="Fechar formulário" className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-bone/55"><X size={16} /></button></div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-xs font-semibold text-bone/65">Nome<input required value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value, ...(originalSlug ? {} : { slug: slugify(event.target.value) }) }))} className={inputClass} /></label>
          <label className="block text-xs font-semibold text-bone/65">Identificador<input required pattern="[a-z0-9]+(-[a-z0-9]+)*" value={form.slug} onChange={(event) => setForm((current) => ({ ...current, slug: slugify(event.target.value) }))} className={inputClass} /><span className="mt-1 block text-[10px] text-bone/35">Usado nas URLs e relacionado aos produtos existentes.</span></label>
          <label className="block text-xs font-semibold text-bone/65 sm:col-span-2">Descrição<input value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} className={inputClass} /></label>
          <label className="block text-xs font-semibold text-bone/65">Ordem na homepage<input min="0" step="1" type="number" value={form.sortOrder} onChange={(event) => setForm((current) => ({ ...current, sortOrder: event.target.value }))} className={inputClass} /></label>
          <label className="block text-xs font-semibold text-bone/65">Ordem no catálogo<input min="0" step="1" type="number" value={form.catalogSortOrder} onChange={(event) => setForm((current) => ({ ...current, catalogSortOrder: event.target.value }))} className={inputClass} /></label>
        </div>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
          <label className="flex items-center gap-2 text-sm text-bone/70"><input type="checkbox" checked={form.active} onChange={(event) => setForm((current) => ({ ...current, active: event.target.checked }))} className="accent-[#ffb800]" />Ativa</label>
          <label className="flex items-center gap-2 text-sm text-bone/70"><input type="checkbox" checked={form.catalogVisible} onChange={(event) => setForm((current) => ({ ...current, catalogVisible: event.target.checked }))} className="accent-[#ffb800]" />Mostrar no catálogo</label>
          <label className="flex items-center gap-2 text-sm text-bone/70"><input type="checkbox" checked={form.homepageVisible} onChange={(event) => setForm((current) => ({ ...current, homepageVisible: event.target.checked }))} className="accent-[#ffb800]" />Mostrar na homepage</label>
        </div>
        <button disabled={saving} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-gold px-5 text-sm font-bold text-ink disabled:opacity-60"><Check size={16} />{saving ? 'Salvando…' : 'Salvar categoria'}</button>
      </form>}

      <section aria-label="Lista de categorias" className="mt-6 overflow-hidden rounded-2xl border border-white/[.08] bg-graphite/45">
        {loading ? <p className="p-7 text-sm text-bone/50">Carregando categorias…</p> : <ul className="divide-y divide-white/[.06]">{categories.map((category) => <li key={category.slug} className="flex flex-wrap items-center justify-between gap-4 p-4 sm:px-5">
          <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="font-semibold">{category.name}</h2><span className={`rounded-full px-2 py-1 text-[9px] font-bold uppercase ${category.active ? 'bg-emerald-500/10 text-emerald-300' : 'bg-white/5 text-bone/40'}`}>{category.active ? 'Ativa' : 'Inativa'}</span></div><p className="mt-1 text-xs text-bone/45">/{category.slug} · homepage {category.sortOrder} · catálogo {category.catalogSortOrder} · {category.catalogVisible ? 'visível' : 'oculta'}{category.homepageVisible ? ' · homepage visível' : ''}</p>{category.description && <p className="mt-2 line-clamp-2 text-xs text-bone/40">{category.description}</p>}</div>
          <button onClick={() => startEdit(category)} aria-label={`Editar categoria ${category.name}`} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-bone/55 hover:border-gold/30 hover:text-gold"><Pencil size={16} /></button>
        </li>)}</ul>}
      </section>
    </main>
  )
}
