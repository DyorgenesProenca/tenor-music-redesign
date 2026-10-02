export const store = {
  url: 'https://www.tenormusic.com.br',
  whatsapp: 'https://api.whatsapp.com/send?phone=5541998574242',
  phones: ['(41) 99857-4242', '(41) 99290-9058'],
  email: 'atendimento@tenormusic.com.br',
  address: 'Rua Guaritá, 354 – Fazenda Rio Grande, PR',
  hours: ['Segunda a sexta, 9h às 18h', 'Sábado, 8h às 17h'],
}
export const url = (p) => store.url + p
export const nav = [
  ['Instrumentos', '/instrumentos'], ['Acessórios', '/instrumentos?categoria=outros'], ['Ofertas', '/#ofertas'],
  ['Novidades', '/#destaques'], ['Seminovos', '/#novos-seminovos'],
]
export const institutional = [
  ['Empresa', '/empresa'], ['Como comprar', '/como-comprar'], ['Segurança', '/seguranca'],
  ['Envio', '/envio'], ['Pagamento', '/pagamento'], ['Tempo de garantia', '/tempo-de-garantia'], ['Contato', '/contato'],
]
export const payments = ['Pix', 'Boleto', 'Visa', 'Mastercard', 'Elo', 'Amex', 'Diners']
