import { Music, Music2, Music3, Music4, Piano, Guitar, Package } from 'lucide-react'

const catalogUrl = (category) => `/instrumentos?categoria=${category}`

export const categoryRegistry = [
  { slug: 'saxofones', name: 'Saxofones', description: 'Soprano, alto, tenor e barítono', icon: Music2, sortOrder: 10, catalogSortOrder: 10, catalogVisible: true, homepageVisible: true },
  { slug: 'trompetes', name: 'Trompetes', description: 'Trompetes, cornets e flugelhorns', icon: Music4, sortOrder: 20, catalogSortOrder: 20, catalogVisible: true, homepageVisible: true },
  { slug: 'trombones', name: 'Trombones', description: 'De pistos, de vara e trombonito', icon: Music3, sortOrder: 30, catalogSortOrder: 30, catalogVisible: true, homepageVisible: true },
  { slug: 'clarinetes', name: 'Clarinetes', description: 'Clarinete, clarone e instrumentos da família', icon: Music, sortOrder: 90, catalogSortOrder: 40, catalogVisible: true, homepageVisible: false },
  { slug: 'flautas', name: 'Flautas', description: 'Flautas transversais e outros modelos', icon: Music, sortOrder: 100, catalogSortOrder: 50, catalogVisible: true, homepageVisible: false },
  { slug: 'cordas', name: 'Cordas', description: 'Violinos, violas, violoncelos e violões', icon: Guitar, sortOrder: 50, catalogSortOrder: 60, catalogVisible: true, homepageVisible: true },
  { slug: 'teclas', name: 'Teclas', description: 'Teclados, órgãos e pianos', icon: Piano, sortOrder: 40, catalogSortOrder: 70, catalogVisible: true, homepageVisible: true },
  { slug: 'violoes', name: 'Violões', description: 'Violões e instrumentos acústicos de cordas', icon: Guitar, sortOrder: 110, catalogSortOrder: 80, catalogVisible: true, homepageVisible: false },
  { slug: 'outros', name: 'Outros', description: 'Instrumentos e acessórios diversos', icon: Package, sortOrder: 120, catalogSortOrder: 90, catalogVisible: true, homepageVisible: false },
  { slug: 'madeiras', name: 'Madeiras', description: 'Flautas, clarinetes e clarones', icon: Music, sortOrder: 60, catalogSortOrder: 100, catalogVisible: false, homepageVisible: true },
  { slug: 'tubas', name: 'Tubas & Bombardinos', description: 'Tubas, sousafones, euphonios e trompas', icon: Music2, sortOrder: 70, catalogSortOrder: 110, catalogVisible: false, homepageVisible: true },
  { slug: 'acessorios', name: 'Acessórios', description: 'Bocais, boquilhas, estojos e mais', icon: Package, sortOrder: 80, catalogSortOrder: 120, catalogVisible: false, homepageVisible: true },
]

export const categories = categoryRegistry
  .filter((category) => category.homepageVisible)
  .sort((a, b) => a.sortOrder - b.sortOrder)
  .map((category) => ({
    key: category.slug,
    name: category.name,
    desc: category.description,
    icon: category.icon,
    href: catalogUrl(category.slug === 'tubas' || category.slug === 'acessorios' ? 'outros' : category.slug),
  }))

export const catalogCategories = categoryRegistry
  .filter((category) => category.catalogVisible)
  .sort((a, b) => a.catalogSortOrder - b.catalogSortOrder)
  .map(({ slug, name }) => ({ key: slug, name }))
