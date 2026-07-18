<script setup lang="ts">
import type { FakeStoreProduct } from '~/data/products'
import { FAKE_STORE_API_BASE, getProductRating } from '~/data/products'

useSeoMeta({
  title: 'Products | Nuxt Market',
  description: 'Browse commerce products fetched from Fake Store API with Nuxt UI components.'
})

const { data: products, pending, error } = await useFetch<FakeStoreProduct[]>(`${FAKE_STORE_API_BASE}/products`, {
  default: () => []
})

const route = useRoute()
const categories = computed(() => ['All', ...Array.from(new Set(products.value.map(product => product.category)))])
const selectedCategory = computed({
  get: () => typeof route.query.category === 'string' ? route.query.category : 'All',
  set: async (category: string) => {
    await navigateTo(category === 'All'
      ? { path: '/' }
      : { path: '/', query: { category } })
  }
})

const sort = ref('featured')
const sortItems = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to high', value: 'price-asc' },
  { label: 'Price: High to low', value: 'price-desc' },
  { label: 'Top rated', value: 'rating' }
]

const visibleProducts = computed(() => {
  const categoryProducts = selectedCategory.value === 'All'
    ? products.value
    : products.value.filter(product => product.category === selectedCategory.value)

  return [...categoryProducts].sort((a, b) => {
    if (sort.value === 'price-asc') return a.price - b.price
    if (sort.value === 'price-desc') return b.price - a.price
    if (sort.value === 'rating') return getProductRating(b) - getProductRating(a)

    return a.id - b.id
  })
})
</script>

<template>
  <div>
    <section class="border-b border-default bg-default">
      <UContainer class="grid gap-10 py-10 lg:grid-cols-[1fr_420px] lg:items-center lg:py-14">
        <div class="max-w-3xl space-y-6">
          <div class="space-y-3">
            <UBadge
              color="primary"
              variant="soft"
              icon="i-lucide-sparkles"
            >
              New season essentials
            </UBadge>
            <h1 class="text-4xl font-bold tracking-normal text-highlighted sm:text-5xl">
              Products for everyday routines
            </h1>
            <p class="max-w-2xl text-base leading-7 text-muted">
              Browse products from Fake Store API with responsive cards, filters, product details, ratings, pricing, and purchase actions built with Nuxt UI.
            </p>
          </div>

          <div class="flex flex-wrap gap-3">
            <UButton
              color="primary"
              size="lg"
              icon="i-lucide-shopping-bag"
              to="#products"
            >
              Shop products
            </UButton>
            <UButton
              color="neutral"
              variant="outline"
              size="lg"
              icon="i-lucide-truck"
            >
              Free shipping
            </UButton>
          </div>
        </div>

        <div class="relative aspect-[4/3] overflow-hidden rounded-lg border border-default bg-muted">
          <img
            src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=85"
            alt="Curated product display"
            class="h-full w-full object-cover"
          >
          <div class="absolute bottom-4 left-4 right-4">
            <UCard :ui="{ body: 'p-4 sm:p-4' }">
              <div class="flex items-center justify-between gap-4">
                <div>
                  <p class="text-sm font-semibold text-highlighted">
                    Weekend edit
                  </p>
                  <p class="text-xs text-muted">
                    {{ products.length }} products ready to preview
                  </p>
                </div>
                <UButton
                  color="primary"
                  icon="i-lucide-arrow-right"
                  aria-label="Browse"
                />
              </div>
            </UCard>
          </div>
        </div>
      </UContainer>
    </section>

    <UContainer
      id="products"
      class="py-10"
    >
      <div class="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 class="text-2xl font-semibold tracking-normal text-highlighted">
            Product list
          </h2>
          <p class="mt-1 text-sm text-muted">
            {{ visibleProducts.length }} items in {{ selectedCategory }}
          </p>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
          <USelectMenu
            v-model="selectedCategory"
            :items="categories"
            class="w-full sm:w-48"
            icon="i-lucide-tags"
          />
          <USelect
            v-model="sort"
            :items="sortItems"
            class="w-full sm:w-52"
            icon="i-lucide-arrow-up-down"
          />
        </div>
      </div>

      <UAlert
        v-if="error"
        color="error"
        variant="soft"
        icon="i-lucide-circle-alert"
        title="Products could not be loaded"
        description="Please try again later."
      />

      <div
        v-else-if="pending"
        class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
      >
        <USkeleton
          v-for="index in 6"
          :key="index"
          class="h-96 rounded-lg"
        />
      </div>

      <div
        v-else
        class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
      >
        <ProductCard
          v-for="product in visibleProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </UContainer>
  </div>
</template>
