export const PRODUCT_API_BASE = '/api'

/** Static SVG shown when a product/hero image URL fails to load. */
export const PRODUCT_IMAGE_PLACEHOLDER = '/images/product-placeholder.svg'

export function getProductRating(product: Product) {
  return product.rating.rate
}

export function getProductReviewCount(product: Product) {
  return product.rating.count
}

export function getProductSummary(product: Product) {
  if (product.description.length <= 120) {
    return product.description
  }

  return `${product.description.slice(0, 117).trim()}...`
}

export function getProductImages(product: Product) {
  if (product.images.length) {
    return product.images
  }

  return product.image ? [product.image] : []
}

export function formatProductPrice(price: number) {
  return `${new Intl.NumberFormat('fa-IR').format(price)} تومان`
}

export function isProductInStock(product: Product) {
  return product.stock > 0
}
