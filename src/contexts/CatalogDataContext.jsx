import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { products as localProducts } from '../data/products.js'
import { categories as localHomepageCategories, catalogCategories as localCatalogCategories } from '../data/categories.js'
import { brands as localBrands } from '../data/brands.js'
import { storeSettings as localSettings } from '../data/site.js'
import { listPublicProducts } from '../services/productsService.js'
import { listHomepageCategories, listCatalogCategories } from '../services/categoriesService.js'
import { listPublicBrands } from '../services/brandsService.js'
import { getSiteSettings } from '../services/settingsService.js'

const CatalogDataContext = createContext(null)

export function CatalogDataProvider({ children }) {
  const [products, setProducts] = useState(localProducts.filter((product) => product.available))
  const [homepageCategories, setHomepageCategories] = useState(localHomepageCategories)
  const [catalogCategories, setCatalogCategories] = useState(localCatalogCategories)
  const [brands, setBrands] = useState(localBrands)
  const [settings, setSettings] = useState(localSettings)
  const [dataError, setDataError] = useState('')

  const refreshCatalog = useCallback(async () => {
    const results = await Promise.allSettled([
      listPublicProducts(), listHomepageCategories(), listCatalogCategories(), listPublicBrands(), getSiteSettings(),
    ])
    const [productResult, homepageResult, categoryResult, brandResult, settingsResult] = results
    if (productResult.status === 'fulfilled') setProducts(productResult.value)
    if (homepageResult.status === 'fulfilled') setHomepageCategories(homepageResult.value)
    if (categoryResult.status === 'fulfilled') setCatalogCategories(categoryResult.value)
    if (brandResult.status === 'fulfilled') setBrands(brandResult.value)
    if (settingsResult.status === 'fulfilled') setSettings(settingsResult.value)
    const failures = results.filter((result) => result.status === 'rejected')
    setDataError(failures.map((result) => result.reason?.message || 'Falha ao carregar dados.').join(' '))
  }, [])

  useEffect(() => { refreshCatalog() }, [refreshCatalog])

  const value = useMemo(() => ({ products, homepageCategories, catalogCategories, brands, settings, dataError, refreshCatalog }), [products, homepageCategories, catalogCategories, brands, settings, dataError, refreshCatalog])
  return <CatalogDataContext.Provider value={value}>{children}</CatalogDataContext.Provider>
}

export function useCatalogData() {
  const context = useContext(CatalogDataContext)
  if (!context) throw new Error('useCatalogData precisa ser usado dentro de CatalogDataProvider.')
  return context
}
