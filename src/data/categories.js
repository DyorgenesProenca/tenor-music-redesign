import { Music, Music2, Music3, Music4, Piano, Guitar, Package } from 'lucide-react'
import { url } from './site.js'
export const categories = [
  { key: 'saxofones', name: 'Saxofones', desc: 'Soprano, alto, tenor e barítono', icon: Music2, href: url('/saxofone') },
  { key: 'trompetes', name: 'Trompetes', desc: 'Trompetes, cornets e flugelhorns', icon: Music4, href: url('/trompete') },
  { key: 'trombones', name: 'Trombones', desc: 'De pistos, de vara e trombonito', icon: Music3, href: url('/trombone') },
  { key: 'teclas', name: 'Teclas', desc: 'Teclados, órgãos e pianos', icon: Piano, href: url('/teclas') },
  { key: 'cordas', name: 'Cordas', desc: 'Violinos, violas, violoncelos e violões', icon: Guitar, href: url('/cordas') },
  { key: 'madeiras', name: 'Madeiras', desc: 'Flautas, clarinetes e clarones', icon: Music, href: url('/clarinete') },
  { key: 'tubas', name: 'Tubas & Bombardinos', desc: 'Tubas, sousafones, euphonios e trompas', icon: Music2, href: url('/bombardino') },
  { key: 'acessorios', name: 'Acessórios', desc: 'Bocais, boquilhas, estojos e mais', icon: Package, href: url('/acessorios') },
]
