import { listDemoCategories } from '~~/server/data/products'

export default defineEventHandler(() => {
  return listDemoCategories()
})
