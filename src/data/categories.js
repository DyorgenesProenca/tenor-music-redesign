import { Music, Music2, Music3, Music4, Piano, Guitar, Package } from 'lucide-react'

const catalogUrl = (category) => `/instrumentos?categoria=${category}`

export const categories = [
  { key: 'saxofones', name: 'Saxofones', desc: 'Soprano, alto, tenor e barítono', icon: Music2, href: catalogUrl('saxofones') },
  { key: 'trompetes', name: 'Trompetes', desc: 'Trompetes, cornets e flugelhorns', icon: Music4, href: catalogUrl('trompetes') },
  { key: 'trombones', name: 'Trombones', desc: 'De pistos, de vara e trombonito', icon: Music3, href: catalogUrl('trombones') },
  { key: 'teclas', name: 'Teclas', desc: 'Teclados, órgãos e pianos', icon: Piano, href: catalogUrl('teclas') },
  { key: 'cordas', name: 'Cordas', desc: 'Violinos, violas, violoncelos e violões', icon: Guitar, href: catalogUrl('cordas') },
  { key: 'madeiras', name: 'Madeiras', desc: 'Flautas, clarinetes e clarones', icon: Music, href: catalogUrl('madeiras') },
  { key: 'tubas', name: 'Tubas & Bombardinos', desc: 'Tubas, sousafones, euphonios e trompas', icon: Music2, href: catalogUrl('outros') },
  { key: 'acessorios', name: 'Acessórios', desc: 'Bocais, boquilhas, estojos e mais', icon: Package, href: catalogUrl('outros') },
]

export const catalogCategories = [
  { key: 'saxofones', name: 'Saxofones' },
  { key: 'trompetes', name: 'Trompetes' },
  { key: 'trombones', name: 'Trombones' },
  { key: 'clarinetes', name: 'Clarinetes' },
  { key: 'flautas', name: 'Flautas' },
  { key: 'cordas', name: 'Cordas' },
  { key: 'teclas', name: 'Teclas' },
  { key: 'violoes', name: 'Violões' },
  { key: 'outros', name: 'Outros' },
]
