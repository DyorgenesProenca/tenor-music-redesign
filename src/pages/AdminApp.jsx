import { useCallback, useEffect, useState } from 'react'
import { Activity, Boxes, ClipboardList, LogOut, Settings, ShieldCheck } from 'lucide-react'
import { supabaseConfigured } from '../lib/supabaseClient.js'
import { currentUserIsAdmin, getCurrentSession, signInWithPassword, signOutAdmin } from '../services/authService.js'
import AdminDashboard from './admin/AdminDashboard.jsx'
import AdminProducts from './admin/AdminProducts.jsx'
import ProductForm from './admin/ProductForm.jsx'
import AdminCategories from './admin/AdminCategories.jsx'
import AdminSettings from './admin/AdminSettings.jsx'

const navItems = [
  { href: '/admin', label: 'Visão geral', icon: Activity, exact: true },
  { href: '/admin/produtos', label: 'Produtos', icon: Boxes },
  { href: '/admin/categorias', label: 'Categorias', icon: ClipboardList },
  { href: '/admin/configuracoes', label: 'Configurações', icon: Settings },
]

function SetupNotice() {
  return (
    <main className="grid min-h-screen place-items-center bg-ink px-4 py-12 text-bone">
      <section className="w-full max-w-xl rounded-3xl border border-white/10 bg-graphite p-6 sm:p-9">
        <ShieldCheck className="text-gold" size={30} />
        <p className="mt-6 text-[10px] font-bold uppercase tracking-[.22em] text-gold">Painel administrativo</p>
        <h1 className="mt-2 font-display text-3xl">Configure o banco da loja</h1>
        <p className="mt-4 text-sm leading-6 text-bone/65">O painel permanece bloqueado até que as variáveis do Supabase estejam configuradas. Siga o guia de instalação e crie o primeiro administrador na lista de permissão do banco.</p>
        <p className="mt-6 rounded-xl border border-white/10 bg-ink/60 p-4 text-xs leading-5 text-bone/55">Os passos completos estão em <code className="text-bone/85">docs/admin-setup.md</code>, no repositório do projeto.</p>
        <p className="mt-5 text-xs leading-5 text-bone/40">Nenhuma credencial padrão é criada ou exibida. Sem a configuração, o site público usa o catálogo local apenas para leitura.</p>
      </section>
    </main>
  )
}

function LoginForm({ onAuthenticated }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setBusy(true)
    setMessage('')
    try {
      const session = await signInWithPassword(email.trim(), password)
      if (!await currentUserIsAdmin()) {
        await signOutAdmin()
        throw new Error('Este usuário não está autorizado a acessar o painel. Peça ao responsável para adicioná-lo à lista de administradores.')
      }
      onAuthenticated(session)
    } catch (error) {
      setMessage(error.message || 'Não foi possível iniciar a sessão.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-ink px-4 py-12 text-bone">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-white/10 bg-graphite p-6 sm:p-9">
        <p className="text-[10px] font-bold uppercase tracking-[.22em] text-gold">Tenor Music · Administração</p>
        <h1 className="mt-3 font-display text-3xl">Entrar no painel</h1>
        <p className="mt-2 text-sm text-bone/55">Use o usuário administrativo criado no projeto Supabase.</p>
        <label className="mt-7 block text-xs font-semibold text-bone/65">E-mail<input required autoComplete="username" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-ink px-4 text-sm text-bone outline-none focus:border-gold/50" /></label>
        <label className="mt-4 block text-xs font-semibold text-bone/65">Senha<input required autoComplete="current-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-ink px-4 text-sm text-bone outline-none focus:border-gold/50" /></label>
        {message && <p role="alert" className="mt-4 rounded-xl border border-red-300/20 bg-red-950/30 p-3 text-sm leading-5 text-red-200">{message}</p>}
        <button disabled={busy} className="mt-6 min-h-12 w-full rounded-full bg-gold px-5 text-sm font-bold text-ink transition hover:bg-gold-deep disabled:cursor-wait disabled:opacity-60">{busy ? 'Verificando acesso…' : 'Entrar'}</button>
        <a href="/" className="mt-5 block text-center text-sm text-bone/50 hover:text-gold">Voltar ao site</a>
      </form>
    </main>
  )
}

function AdminLayout({ children, session, onSignOut, pathname }) {
  return (
    <div className="min-h-screen bg-ink text-bone">
      <header className="border-b border-white/[.08] bg-graphite/70">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a href="/admin" className="font-display text-xl font-semibold">Tenor<span className="text-gold"> Music</span><span className="ml-3 border-l border-white/15 pl-3 text-xs font-sans font-medium text-bone/45">Painel</span></a>
          <div className="flex items-center gap-3 text-xs text-bone/55"><span className="hidden sm:inline">{session?.user?.email}</span><button type="button" onClick={onSignOut} className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 px-4 font-semibold text-bone/75 hover:border-gold/40 hover:text-gold"><LogOut size={15} />Sair</button></div>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1500px] gap-7 px-4 py-6 sm:px-6 lg:grid-cols-[230px_minmax(0,1fr)] lg:px-8 lg:py-9">
        <nav aria-label="Navegação administrativa" className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-1">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href)
            return <a key={href} href={href} aria-current={active ? 'page' : undefined} className={`flex min-h-11 shrink-0 items-center gap-3 rounded-xl px-4 text-sm font-semibold transition ${active ? 'bg-gold/10 text-gold ring-1 ring-gold/20' : 'text-bone/55 hover:bg-white/[.04] hover:text-bone'}`}><Icon size={17} />{label}</a>
          })}
          <a href="/" className="hidden px-4 pt-7 text-xs text-bone/40 hover:text-gold lg:block">← Voltar ao site</a>
        </nav>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  )
}

function AdminRoute({ pathname }) {
  if (pathname === '/admin' || pathname === '/admin/') return <AdminDashboard />
  if (pathname === '/admin/produtos') return <AdminProducts />
  if (pathname === '/admin/produtos/novo') return <ProductForm />
  const editMatch = pathname.match(/^\/admin\/produtos\/([^/]+)\/editar$/)
  if (editMatch) {
    let productId = editMatch[1]
    try { productId = decodeURIComponent(productId) } catch { /* ID inválido será exibido como não encontrado. */ }
    return <ProductForm productId={productId} />
  }
  if (pathname === '/admin/categorias') return <AdminCategories />
  if (pathname === '/admin/configuracoes') return <AdminSettings />
  return <section className="rounded-2xl border border-white/10 p-7"><h1 className="font-display text-2xl">Página administrativa não encontrada</h1><a className="mt-4 inline-block text-sm text-gold" href="/admin">Voltar à visão geral</a></section>
}

export default function AdminApp() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/admin'
  const [session, setSession] = useState(null)
  const [access, setAccess] = useState('checking')

  const authorize = useCallback(async (activeSession) => {
    if (!activeSession) { setSession(null); setAccess('login'); return }
    setSession(activeSession)
    try {
      const isAdmin = await currentUserIsAdmin()
      setAccess(isAdmin ? 'allowed' : 'denied')
      if (!isAdmin) await signOutAdmin()
    } catch {
      setAccess('error')
    }
  }, [])

  useEffect(() => {
    let active = true
    if (!supabaseConfigured) { setAccess('setup'); return () => { active = false } }
    getCurrentSession().then((current) => { if (active) authorize(current) }).catch(() => { if (active) { setSession(null); setAccess('login') } })
    return () => { active = false }
  }, [authorize])

  const logout = async () => {
    await signOutAdmin().catch(() => {})
    setSession(null)
    setAccess('login')
  }

  if (access === 'setup') return <SetupNotice />
  if (access === 'checking') return <main className="grid min-h-screen place-items-center bg-ink text-sm text-bone/60">Verificando acesso…</main>
  if (access === 'login') return <LoginForm onAuthenticated={authorize} />
  if (access === 'denied') return <main className="grid min-h-screen place-items-center bg-ink px-4 text-center text-bone"><div><ShieldCheck className="mx-auto text-gold" size={32} /><h1 className="mt-5 font-display text-3xl">Acesso não autorizado</h1><p className="mt-3 max-w-md text-sm leading-6 text-bone/55">Esta conta não está na lista administrativa do banco de dados.</p><button onClick={logout} className="mt-6 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold">Voltar ao login</button></div></main>
  if (access === 'error') return <main className="grid min-h-screen place-items-center bg-ink px-4 text-center text-bone"><div><h1 className="font-display text-3xl">Não foi possível verificar as permissões</h1><p className="mt-3 text-sm text-bone/55">Confira a migração e as políticas RLS descritas no guia administrativo.</p><button onClick={logout} className="mt-6 rounded-full bg-gold px-5 py-3 text-sm font-bold text-ink">Sair e tentar novamente</button></div></main>

  return <AdminLayout session={session} onSignOut={logout} pathname={pathname}><AdminRoute pathname={pathname} /></AdminLayout>
}
