import { CartProvider } from './hooks/useCart.jsx'
import TopBar from './components/layout/TopBar.jsx'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import Home from './pages/Home.jsx'
export default function App() {
  return (<CartProvider><TopBar /><Header /><Home /><Footer /></CartProvider>)
}
