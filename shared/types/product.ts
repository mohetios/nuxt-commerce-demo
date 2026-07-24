export type ProductRating = {
  rate: number
  count: number
}

export type ProductSpecification = {
  label: string
  value: string
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
  model?: string
  specifications?: ProductSpecification[]
}
