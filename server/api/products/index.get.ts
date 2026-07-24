import { listDemoProducts } from '~~/server/data/products'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const category = typeof query.category === 'string' ? query.category : undefined

  const products = listDemoProducts()

  if (!category || category === 'All') {
    return products
  }

  return products.filter(product => product.category === category)
})
