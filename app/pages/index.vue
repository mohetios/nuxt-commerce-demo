<script setup lang="ts">
useSeoMeta({
  title: 'محصولات | Nuxt Market',
  description: 'مرور محصولات فروشگاه دمو با رندر کامل SSR از طریق API داخلی Nuxt.'
})

const { data: products, pending, error } = await useFetch<Product[]>('/api/products', {
  default: () => [],
  key: 'catalog-products'
})

const { data: categoryOptions } = await useFetch<string[]>('/api/categories', {
  default: () => [],
  key: 'catalog-categories'
})

const route = useRoute()
const categories = computed(() => ['همه', ...categoryOptions.value])
const selectedCategory = computed({
  get: () => typeof route.query.category === 'string' ? route.query.category : 'همه',
  set: async (category: string) => {
    await navigateTo(category === 'همه'
      ? { path: '/' }
      : { path: '/', query: { category } })
  }
})

const sort = ref('featured')
const sortItems = [
  { label: 'ویژه', value: 'featured' },
  { label: 'ارزان‌ترین', value: 'price-asc' },
  { label: 'گران‌ترین', value: 'price-desc' },
  { label: 'بالاترین امتیاز', value: 'rating' }
]

const visibleProducts = computed(() => {
  const categoryProducts = selectedCategory.value === 'همه'
    ? products.value
    : products.value.filter(product => product.category === selectedCategory.value)

  return [...categoryProducts].sort((a, b) => {
    if (sort.value === 'price-asc') return a.price - b.price
    if (sort.value === 'price-desc') return b.price - a.price
    if (sort.value === 'rating') return getProductRating(b) - getProductRating(a)
    if (sort.value === 'featured') return Number(b.featured) - Number(a.featured) || a.id - b.id

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
              کالکشن جدید فصل
            </UBadge>
            <h1 class="text-4xl font-bold tracking-normal text-highlighted sm:text-5xl">
              محصولات برای روزمرگی‌های شما
            </h1>
            <p class="max-w-2xl text-base leading-7 text-muted">
              کاتالوگ دمو با داده فارسی از API داخلی Nuxt، کارت‌های واکنش‌گرا، فیلتر، جزئیات محصول، امتیاز و قیمت.
            </p>
          </div>

          <div class="flex flex-wrap gap-3">
            <UButton
              color="primary"
              size="lg"
              icon="i-lucide-shopping-bag"
              to="#products"
            >
              مشاهده محصولات
            </UButton>
            <UButton
              color="neutral"
              variant="outline"
              size="lg"
              icon="i-lucide-truck"
            >
              ارسال رایگان
            </UButton>
          </div>
        </div>

        <div class="relative aspect-[4/3] overflow-hidden rounded-lg border border-default bg-muted">
          <img
            src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=85"
            alt="نمایش محصولات فروشگاه"
            class="h-full w-full object-cover"
          >
          <div class="absolute inset-x-4 bottom-4">
            <UCard :ui="{ body: 'p-4 sm:p-4' }">
              <div class="flex items-center justify-between gap-4">
                <div>
                  <p class="text-sm font-semibold text-highlighted">
                    انتخاب آخر هفته
                  </p>
                  <p class="text-xs text-muted">
                    {{ products.length }} محصول آماده مشاهده
                  </p>
                </div>
                <UButton
                  color="primary"
                  icon="i-lucide-arrow-left"
                  aria-label="مرور محصولات"
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
            فهرست محصولات
          </h2>
          <p class="mt-1 text-sm text-muted">
            {{ visibleProducts.length }} مورد در {{ selectedCategory }}
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
        title="بارگذاری محصولات ناموفق بود"
        description="لطفاً دوباره تلاش کنید."
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
