// price/inst (12x com juros) e url vieram do site atual em 01/10/2026. demo:true = sem preço real.
const u = (p) => 'https://www.tenormusic.com.br' + p

const withCatalogFields = (product) => ({
  ...product,
  category: product.category || product.cat,
  model: product.model || '',
  image: product.image ?? null,
  gallery: product.gallery ?? [],
  price: product.price ?? null,
  oldPrice: product.oldPrice ?? null,
  description: product.description ?? '',
  specifications: product.specifications ?? [],
  stock: product.stock ?? (product.status === 'esgotado' ? 0 : null),
  availability: product.availability ?? (product.status === 'esgotado' || product.stock === 0 ? 'esgotado' : Number.isFinite(product.stock) ? 'disponivel' : 'sob-consulta'),
  highlight: product.highlight ?? product.badge === 'oferta',
  installments: product.installments ?? (product.inst ? { count: 12, amount: product.inst, hasInterest: true } : null),
})

export const products = [
  withCatalogFields({ id: 'ytr-3335s', name: 'Trompete Yamaha YTR-3335S', brand: 'Yamaha', model: 'YTR-3335S', cat: 'trompetes', category: 'trompetes', condition: 'novo', price: 5999, inst: 598.3, url: u('/trompete/trompete-yamaha-ytr-3335s-novo') }),
  withCatalogFields({ id: 'jtr700', name: 'Trompete Jupiter JTR700 Sib', brand: 'Jupiter', model: 'JTR700 Sib', cat: 'trompetes', category: 'trompetes', condition: 'novo', price: 4499, inst: 448.7, url: u('/trompete/trompete-jupiter-jtr700-novo') }),
  withCatalogFields({ id: 'ytr-2330', name: 'Trompete Yamaha YTR-2330', brand: 'Yamaha', model: 'YTR-2330', cat: 'trompetes', category: 'trompetes', condition: 'novo', price: 4699, inst: 468.65, url: u('/trompete/trompete-yamaha-ytr2330-novo') }),
  withCatalogFields({ id: 'hf890', name: 'Bombardino HS Musical HF890', brand: 'HS Musical', model: 'HF890', cat: 'tubas', category: 'outros', condition: 'novo', price: 11990, inst: 1195.8, url: u('/euphonio-bombardino/bombardino-hs-musical-hf890-novo') }),
  withCatalogFields({ id: 'jtb700v', name: 'Trombone Jupiter JTB-700V Sib', brand: 'Jupiter', model: 'JTB-700V Sib', cat: 'trombones', category: 'trombones', condition: 'novo', price: 9900, inst: 987.36, url: u('/trombone/trombone-de-pistos/trombone-jupiter-jtb-700v-sib-novo') }),
  withCatalogFields({ id: 'flauta-shelter', name: 'Flauta transversal Shelter', brand: 'Shelter', cat: 'madeiras', category: 'flautas', condition: 'novo', price: 999, inst: 99.63, url: u('/fllauta/flauta-transversal-shelter-nova') }),
  withCatalogFields({ id: 'clarinete-shelter', name: 'Clarinete Shelter Sib 17 chaves', brand: 'Shelter', cat: 'madeiras', category: 'clarinetes', condition: 'novo', price: 999, inst: 99.63, url: u('/clarinete/clarinete-shelter-sib-17-chaves-novo') }),
  withCatalogFields({ id: 'classic', name: 'Órgão eletrônico Digital Acordes Classic', brand: 'Digital Acordes', model: 'Classic', cat: 'teclas', category: 'teclas', condition: 'novo', price: 5977, inst: 596.11, url: u('/orgaoeletronico/orgao-eletronico-digital-acordes-classic-preto-novo') }),
  withCatalogFields({ id: 'harmonics', name: 'Sax barítono Harmonics Mib c/ Lá grave', brand: 'Harmonics', cat: 'saxofones', category: 'saxofones', condition: 'novo', badge: 'oferta', price: 11900, inst: 1186.83, url: u('/saxofones/sax-baritono/sax-baritono-harmonics-mib-c-la-grave-novo') }),
  withCatalogFields({ id: 'yts-62', name: 'Sax tenor Yamaha YTS-62 profissional', brand: 'Yamaha', model: 'YTS-62', cat: 'saxofones', category: 'saxofones', condition: 'novo', status: 'esgotado', url: u('/saxofone/sax-tenor/sax-tenor-yamaha-yts-62-profissional-novo-3127') }),
  withCatalogFields({ id: 'yas-280', name: 'Sax alto Yamaha YAS-280', brand: 'Yamaha', model: 'YAS-280', cat: 'saxofones', category: 'saxofones', condition: 'novo', demo: true, url: u('/saxofone/sax-alto') }),
  withCatalogFields({ id: 'yts-480s', name: 'Sax tenor Yamaha YTS-480S', brand: 'Yamaha', model: 'YTS-480S', cat: 'saxofones', category: 'saxofones', condition: 'novo', demo: true, url: u('/saxofone/sax-tenor') }),
]
