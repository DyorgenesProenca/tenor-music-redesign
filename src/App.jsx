import { CartProvider } from './hooks/useCart.jsx'
import TopBar from './components/layout/TopBar.jsx'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import Home from './pages/Home.jsx'
import InstrumentCatalog from './pages/InstrumentCatalog.jsx'
import ProductPage from './pages/ProductPage.jsx'

function CurrentPage() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/'

  if (pathname === '/instrumentos') return <InstrumentCatalog />

  const productRoute = pathname.match(/^\/produto\/([^/]+)$/)
  if (productRoute) {
    let productId = productRoute[1]
    try { productId = decodeURIComponent(productId) } catch { /* ID inválido será tratado como não encontrado. */ }
    return <ProductPage productId={productId} />
  }

  return <Home />
}

export default function App() {
  return (<CartProvider><TopBar /><Header /><CurrentPage /><Footer /></CartProvider>)
}
