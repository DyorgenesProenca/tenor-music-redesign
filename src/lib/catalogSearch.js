const conditionLabels = {
  novo: 'Novo',
  seminovo: 'Seminovo',
  usado: 'Usado',
}

export function cleanSearchTerm(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim()
}

function normalizeSearchText(value) {
  return cleanSearchTerm(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
}

export function matchesProductSearch(product, query, categories = []) {
  const terms = normalizeSearchText(query).split(' ').filter(Boolean)
  if (!terms.length) return true

  const categoryName = categories.find((category) => category.key === product.category)?.name
  const searchableText = normalizeSearchText([
    product.name,
    product.brand,
    product.model,
    product.category,
    categoryName,
    product.condition,
    conditionLabels[product.condition],
  ].filter(Boolean).join(' '))

  return terms.every((term) => searchableText.includes(term))
}
