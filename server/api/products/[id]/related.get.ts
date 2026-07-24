import { listRelatedDemoProducts, findDemoProduct } from '~~/server/data/products'

export default defineEventHandler((event) => {
  const idParam = getRouterParam(event, 'id')
  const id = Number(idParam)

  if (!Number.isInteger(id) || id <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid product id'
    })
  }

  const product = findDemoProduct(id)

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found'
    })
  }

  const query = getQuery(event)
  const limit = Number(query.limit ?? 3)

  return listRelatedDemoProducts(product, Number.isFinite(limit) && limit > 0 ? limit : 3)
})
