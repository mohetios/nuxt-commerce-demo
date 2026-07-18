export const FAKE_STORE_API_BASE = 'https://fakestoreapi.com'

export type FakeStoreProduct = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating?: {
    rate: number
    count: number
  }
}

export const getProductRating = (product: FakeStoreProduct) => product.rating?.rate ?? 0

export const getProductReviewCount = (product: FakeStoreProduct) => product.rating?.count ?? 0

export const getProductSummary = (product: FakeStoreProduct) => {
  if (product.description.length <= 120) {
    return product.description
  }

  return `${product.description.slice(0, 117).trim()}...`
}
