import { CartProvider } from './hooks/useCart.jsx'
import TopBar from './components/layout/TopBar.jsx'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import Home from './pages/Home.jsx'
import InstrumentCatalog from './pages/InstrumentCatalog.jsx'
import ProductPage from './pages/ProductPage.jsx'
import AdminApp from './pages/AdminApp.jsx'
import { CatalogDataProvider } from './contexts/CatalogDataContext.jsx'

function CurrentPage() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/'

  if (pathname === '/admin' || pathname.startsWith('/admin/')) return <AdminApp />

  let page
  if (pathname === '/instrumentos') page = <InstrumentCatalog />

  const productRoute = pathname.match(/^\/produto\/([^/]+)$/)
  if (productRoute) {
    let productId = productRoute[1]
    try { productId = decodeURIComponent(productId) } catch { /* ID inválido será tratado como não encontrado. */ }
    page = <ProductPage productId={productId} />
  }

  if (!page) page = <Home />
  return <><TopBar /><Header />{page}<Footer /></>
}

export default function App() {
  return <CartProvider><CatalogDataProvider><CurrentPage /></CatalogDataProvider></CartProvider>
}
