// price/inst (12x com juros) e url vieram do site atual em 01/10/2026. demo:true = sem preço real.
const u = (p) => 'https://www.tenormusic.com.br' + p
export const products = [
  { id: 'ytr-3335s', name: 'Trompete Yamaha YTR-3335S', cat: 'trompetes', condition: 'novo', price: 5999, inst: 598.3, url: u('/trompete/trompete-yamaha-ytr-3335s-novo') },
  { id: 'jtr700', name: 'Trompete Jupiter JTR700 Sib', cat: 'trompetes', condition: 'novo', price: 4499, inst: 448.7, url: u('/trompete/trompete-jupiter-jtr700-novo') },
  { id: 'ytr-2330', name: 'Trompete Yamaha YTR-2330', cat: 'trompetes', condition: 'novo', price: 4699, inst: 468.65, url: u('/trompete/trompete-yamaha-ytr2330-novo') },
  { id: 'hf890', name: 'Bombardino HS Musical HF890', cat: 'tubas', condition: 'novo', price: 11990, inst: 1195.8, url: u('/euphonio-bombardino/bombardino-hs-musical-hf890-novo') },
  { id: 'jtb700v', name: 'Trombone Jupiter JTB-700V Sib', cat: 'trombones', condition: 'novo', price: 9900, inst: 987.36, url: u('/trombone/trombone-de-pistos/trombone-jupiter-jtb-700v-sib-novo') },
  { id: 'flauta-shelter', name: 'Flauta transversal Shelter', cat: 'madeiras', condition: 'novo', price: 999, inst: 99.63, url: u('/fllauta/flauta-transversal-shelter-nova') },
  { id: 'clarinete-shelter', name: 'Clarinete Shelter Sib 17 chaves', cat: 'madeiras', condition: 'novo', price: 999, inst: 99.63, url: u('/clarinete/clarinete-shelter-sib-17-chaves-novo') },
  { id: 'classic', name: 'Órgão eletrônico Digital Acordes Classic', cat: 'teclas', condition: 'novo', price: 5977, inst: 596.11, url: u('/orgaoeletronico/orgao-eletronico-digital-acordes-classic-preto-novo') },
  { id: 'harmonics', name: 'Sax barítono Harmonics Mib c/ Lá grave', cat: 'saxofones', condition: 'novo', badge: 'oferta', price: 11900, inst: 1186.83, url: u('/saxofones/sax-baritono/sax-baritono-harmonics-mib-c-la-grave-novo') },
  { id: 'yts-62', name: 'Sax tenor Yamaha YTS-62 profissional', cat: 'saxofones', condition: 'novo', status: 'esgotado', url: u('/saxofone/sax-tenor/sax-tenor-yamaha-yts-62-profissional-novo-3127') },
  { id: 'yas-280', name: 'Sax alto Yamaha YAS-280', cat: 'saxofones', condition: 'novo', demo: true, url: u('/saxofone/sax-alto') },
  { id: 'yts-480s', name: 'Sax tenor Yamaha YTS-480S', cat: 'saxofones', condition: 'novo', demo: true, url: u('/saxofone/sax-tenor') },
]
