export type ProductRating = {
  rate: number
  count: number
}

export type Product = {
  id: number
  title: string
  slug: string
  price: number
  description: string
  category: string
  image: string
  images: string[]
  rating: ProductRating
  stock: number
  featured: boolean
}
