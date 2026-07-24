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
const filtersOpen = ref(false)
const search = ref(typeof route.query.q === 'string' ? route.query.q : '')
const sort = ref('featured')

const sortItems = [
  { label: 'ویژه', value: 'featured' },
  { label: 'ارزان‌ترین', value: 'price-asc' },
  { label: 'گران‌ترین', value: 'price-desc' },
  { label: 'بالاترین امتیاز', value: 'rating' }
]

const categories = computed(() => ['همه محصولات', ...categoryOptions.value])

const selectedCategory = computed({
  get: () => {
    if (typeof route.query.category === 'string') {
      return route.query.category
    }
    return 'همه محصولات'
  },
  set: async (category: string) => {
    await navigateTo({
      path: '/',
      query: {
        ...(category !== 'همه محصولات' ? { category } : {}),
        ...(search.value.trim() ? { q: search.value.trim() } : {})
      }
    })
  }
})

const breadcrumbItems = computed(() => [
  { label: 'خانه', to: '/' },
  { label: selectedCategory.value === 'همه محصولات' ? 'محصولات' : selectedCategory.value }
])

const activeChips = computed(() => {
  const chips: Array<{ key: string, label: string }> = []

  if (selectedCategory.value !== 'همه محصولات') {
    chips.push({ key: 'category', label: selectedCategory.value })
  }

  if (search.value.trim()) {
    chips.push({ key: 'search', label: `جست‌وجو: ${search.value.trim()}` })
  }

  return chips
})

const visibleProducts = computed(() => {
  const query = search.value.trim().toLowerCase()

  const categoryProducts = selectedCategory.value === 'همه محصولات'
    ? products.value
    : products.value.filter(product => product.category === selectedCategory.value)

  const filtered = query
    ? categoryProducts.filter((product) => {
        const haystack = `${product.title} ${product.model ?? ''} ${product.category} ${product.description}`.toLowerCase()
        return haystack.includes(query)
      })
    : categoryProducts

  return [...filtered].sort((a, b) => {
    if (sort.value === 'price-asc') return a.price - b.price
    if (sort.value === 'price-desc') return b.price - a.price
    if (sort.value === 'rating') return getProductRating(b) - getProductRating(a)
    if (sort.value === 'featured') return Number(b.featured) - Number(a.featured) || a.id - b.id

    return a.id - b.id
  })
})

async function applyFilters() {
  filtersOpen.value = false
  await navigateTo({
    path: '/',
    query: {
      ...(selectedCategory.value !== 'همه محصولات' ? { category: selectedCategory.value } : {}),
      ...(search.value.trim() ? { q: search.value.trim() } : {})
    }
  })
}

function openFilters() {
  filtersOpen.value = true
}

async function clearChip(key: string) {
  if (key === 'category') {
    selectedCategory.value = 'همه محصولات'
    return
  }

  if (key === 'search') {
    search.value = ''
    await applyFilters()
  }
}

async function clearAllFilters() {
  search.value = ''
  filtersOpen.value = false
  await navigateTo({ path: '/' })
}
</script>

<template>
  <UContainer class="py-6 md:py-8">
    <AppBreadcrumb :items="breadcrumbItems" />

    <div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-6">
      <aside class="hidden w-[260px] shrink-0 lg:block xl:w-[280px]">
        <CatalogFilters
          v-model:selected-category="selectedCategory"
          v-model:search="search"
          :categories="categories"
          @apply="applyFilters"
        />
      </aside>

      <div class="min-w-0 flex-1 space-y-4">
        <div class="surface-card flex flex-col gap-4 p-3 sm:p-4">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 class="section-title">
                فهرست محصولات
              </h1>
              <p class="secondary-text mt-1">
                {{ visibleProducts.length }} مورد
                <span v-if="selectedCategory !== 'همه محصولات'">
                  در {{ selectedCategory }}
                </span>
              </p>
            </div>

            <div class="flex items-center gap-2">
              <UButton
                color="neutral"
                variant="outline"
                icon="i-lucide-sliders-horizontal"
                class="lg:hidden"
                :ui="{ base: 'rounded-full border-soft-border' }"
                @click="openFilters"
              >
                فیلتر
                <UBadge
                  v-if="activeChips.length"
                  color="primary"
                  variant="solid"
                  size="sm"
                  class="ms-1"
                >
                  {{ activeChips.length }}
                </UBadge>
              </UButton>

              <USelect
                v-model="sort"
                :items="sortItems"
                icon="i-lucide-arrow-up-down"
                class="min-w-40 flex-1 sm:flex-none"
                :ui="{
                  base: 'rounded-full bg-field ring-soft-border'
                }"
              />
            </div>
          </div>

          <div
            v-if="activeChips.length"
            class="flex flex-wrap items-center gap-2"
          >
            <UBadge
              v-for="chip in activeChips"
              :key="chip.key"
              color="primary"
              variant="soft"
              size="md"
              class="gap-1 pe-1"
            >
              {{ chip.label }}
              <UButton
                color="primary"
                variant="link"
                size="xs"
                icon="i-lucide-x"
                :aria-label="`حذف ${chip.label}`"
                class="ms-0.5"
                @click="clearChip(chip.key)"
              />
            </UBadge>

            <UButton
              color="neutral"
              variant="ghost"
              size="xs"
              class="text-muted-blue"
              @click="clearAllFilters"
            >
              پاک کردن
            </UButton>
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
          class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          <USkeleton
            v-for="index in 6"
            :key="index"
            class="h-80 rounded-2xl"
          />
        </div>

        <div
          v-else-if="!visibleProducts.length"
          class="surface-card flex flex-col items-center gap-3 px-6 py-16 text-center"
        >
          <UIcon
            name="i-lucide-search-x"
            class="size-10 text-muted-blue"
          />
          <p class="section-title">
            محصولی یافت نشد
          </p>
          <p class="secondary-text max-w-sm">
            فیلترها را تغییر دهید یا جست‌وجو را پاک کنید تا همه محصولات را ببینید.
          </p>
          <UButton
            color="primary"
            variant="soft"
            @click="clearAllFilters"
          >
            نمایش همه محصولات
          </UButton>
        </div>

        <div
          v-else
          class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          <ProductCard
            v-for="product in visibleProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>

    <USlideover
      v-model:open="filtersOpen"
      title="فیلتر محصولات"
      description="دسته‌بندی و جست‌وجو"
      :ui="{
        content: 'max-w-sm bg-canvas',
        body: 'bg-canvas'
      }"
    >
      <template #body>
        <CatalogFilters
          v-model:selected-category="selectedCategory"
          v-model:search="search"
          :categories="categories"
          @apply="applyFilters"
        />
      </template>
    </USlideover>
  </UContainer>
</template>
