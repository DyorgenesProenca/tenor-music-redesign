import { createContext, useContext, useState } from 'react'
const Ctx = createContext()
// Carrinho apenas demonstrativo (sem checkout)
export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const add = (p) => setItems((i) => [...i, p])
  return <Ctx.Provider value={{ count: items.length, add }}>{children}</Ctx.Provider>
}
export const useCart = () => useContext(Ctx)
