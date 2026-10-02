// Catálogo local de contingência e fonte da carga inicial do Supabase.
// Estoque null significa que a quantidade ainda precisa ser confirmada pela loja.
const product = (fields) => ({
  previousPrice: null,
  image: null,
  images: [],
  description: '',
  specifications: [],
  stock: null,
  installments: null,
  highlight: false,
  offer: false,
  available: true,
  createdAt: null,
  updatedAt: null,
  ...fields,
})

const initialProducts = [
  product({ id: 'ytr-3335s', name: 'Trompete Yamaha YTR-3335S', brand: 'Yamaha', model: 'YTR-3335S', category: 'trompetes', condition: 'novo', price: 5999, installments: { count: 12, amount: 598.3, hasInterest: true } }),
  product({ id: 'jtr700', name: 'Trompete Jupiter JTR700 Sib', brand: 'Jupiter', model: 'JTR700 Sib', category: 'trompetes', condition: 'novo', price: 4499, installments: { count: 12, amount: 448.7, hasInterest: true } }),
  product({ id: 'ytr-2330', name: 'Trompete Yamaha YTR-2330', brand: 'Yamaha', model: 'YTR-2330', category: 'trompetes', condition: 'novo', price: 4699, installments: { count: 12, amount: 468.65, hasInterest: true } }),
  product({ id: 'hf890', name: 'Bombardino HS Musical HF890', brand: 'HS Musical', model: 'HF890', category: 'outros', condition: 'novo', price: 11990, installments: { count: 12, amount: 1195.8, hasInterest: true } }),
  product({ id: 'jtb700v', name: 'Trombone Jupiter JTB-700V Sib', brand: 'Jupiter', model: 'JTB-700V Sib', category: 'trombones', condition: 'novo', price: 9900, installments: { count: 12, amount: 987.36, hasInterest: true } }),
  product({ id: 'flauta-shelter', name: 'Flauta transversal Shelter', brand: 'Shelter', model: '', category: 'flautas', condition: 'novo', price: 999, installments: { count: 12, amount: 99.63, hasInterest: true } }),
  product({ id: 'clarinete-shelter', name: 'Clarinete Shelter Sib 17 chaves', brand: 'Shelter', model: '', category: 'clarinetes', condition: 'novo', price: 999, installments: { count: 12, amount: 99.63, hasInterest: true } }),
  product({ id: 'classic', name: 'Órgão eletrônico Digital Acordes Classic', brand: 'Digital Acordes', model: 'Classic', category: 'teclas', condition: 'novo', price: 5977, installments: { count: 12, amount: 596.11, hasInterest: true } }),
  product({ id: 'harmonics', name: 'Sax barítono Harmonics Mib c/ Lá grave', brand: 'Harmonics', model: '', category: 'saxofones', condition: 'novo', price: 11900, installments: { count: 12, amount: 1186.83, hasInterest: true }, highlight: true, offer: true }),
  product({ id: 'yts-62', name: 'Sax tenor Yamaha YTS-62 profissional', brand: 'Yamaha', model: 'YTS-62', category: 'saxofones', condition: 'novo', stock: 0 }),
  product({ id: 'yas-280', name: 'Sax alto Yamaha YAS-280', brand: 'Yamaha', model: 'YAS-280', category: 'saxofones', condition: 'novo', price: null }),
  product({ id: 'yts-480s', name: 'Sax tenor Yamaha YTS-480S', brand: 'Yamaha', model: 'YTS-480S', category: 'saxofones', condition: 'novo', price: null }),
]

export const products = initialProducts.map((item, index) => ({ ...item, sortOrder: (index + 1) * 10 }))
