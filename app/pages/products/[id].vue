<script setup lang="ts">
const route = useRoute()
const productId = computed(() => Number(route.params.id))

const { data: product, pending, error } = await useFetch<Product>(() => `/api/products/${productId.value}`)

const { data: relatedProducts } = await useFetch<Product[]>(() => `/api/products/${productId.value}/related`, {
  default: () => []
})

const quantity = ref(1)
const productImages = computed(() => product.value ? getProductImages(product.value) : [])

const breadcrumbItems = computed(() => {
  const items: Array<{ label: string, to?: string }> = [
    { label: 'خانه', to: '/' },
    { label: 'محصولات', to: '/' }
  ]

  if (product.value) {
    items.push({ label: product.value.title })
  }

  return items
})

const specificationRows = computed(() => {
  if (!product.value) {
    return []
  }

  const baseRows = [
    { label: 'برند', value: 'فُروشگاه' },
    { label: 'مدل', value: product.value.model || product.value.slug },
    { label: 'دسته‌بندی', value: product.value.category },
    { label: 'توضیحات', value: product.value.description }
  ]

  const technicalRows = product.value.specifications?.length
    ? product.value.specifications
    : [
        { label: 'قیمت', value: formatProductPrice(product.value.price) },
        { label: 'موجودی', value: String(product.value.stock) },
        {
          label: 'امتیاز',
          value: `${getProductRating(product.value)} از ۵ (${getProductReviewCount(product.value)} نظر)`
        },
        {
          label: 'وضعیت',
          value: isProductInStock(product.value) ? 'موجود' : 'ناموجود'
        }
      ]

  return [...baseRows, ...technicalRows]
})

useSeoMeta({
  title: () => product.value ? `${product.value.title} | فُروشگاه` : 'محصول | فُروشگاه',
  description: () => product.value?.description,
  ogTitle: () => product.value?.title,
  ogDescription: () => product.value?.description,
  ogImage: () => product.value?.image
})
</script>

<template>
  <UContainer class="py-6 md:py-8">
    <AppBreadcrumb :items="breadcrumbItems" />

    <UAlert
      v-if="error"
      color="error"
      variant="soft"
      icon="i-lucide-circle-alert"
      title="بارگذاری محصول ناموفق بود"
      description="لطفاً به فهرست محصولات برگردید و دوباره تلاش کنید."
      class="mb-6"
    />

    <div
      v-else-if="pending"
      class="space-y-5"
    >
      <USkeleton class="h-8 w-64 rounded-md" />
      <USkeleton class="aspect-[5/4] w-full rounded-2xl" />
      <USkeleton class="h-72 w-full rounded-2xl" />
    </div>

    <template v-else-if="product">
      <div class="mb-5 space-y-3 md:hidden">
        <UBadge
          color="primary"
          variant="soft"
        >
          {{ product.category }}
        </UBadge>
        <h1 class="page-title">
          {{ product.title }}
        </h1>
        <p class="secondary-text">
          {{ formatProductPrice(product.price) }}
        </p>
      </div>

      <div class="space-y-5">
        <div class="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)] lg:items-start">
          <ProductGallery
            :images="productImages"
            :name="product.title"
          />

          <aside class="surface-card space-y-5 p-4 sm:p-5">
            <div class="hidden space-y-3 md:block">
              <UBadge
                color="primary"
                variant="soft"
              >
                {{ product.category }}
              </UBadge>
              <h1 class="page-title">
                {{ product.title }}
              </h1>
              <p class="secondary-text line-clamp-3">
                {{ getProductSummary(product) }}
              </p>
            </div>

            <div class="flex items-end justify-between gap-4">
              <div>
                <p class="meta-text mb-1">
                  قیمت
                </p>
                <p class="text-2xl font-bold text-ink md:text-3xl">
                  {{ formatProductPrice(product.price) }}
                </p>
              </div>
              <UBadge
                :color="isProductInStock(product) ? 'success' : 'error'"
                variant="soft"
              >
                {{ isProductInStock(product) ? 'موجود' : 'ناموجود' }}
              </UBadge>
            </div>

            <USeparator class="border-soft-border" />

            <div class="grid gap-4 sm:grid-cols-2">
              <UFormField label="دسته‌بندی">
                <UInput
                  :model-value="product.category"
                  readonly
                  icon="i-lucide-tags"
                  :ui="{ base: 'bg-field ring-soft-border' }"
                />
              </UFormField>
              <UFormField label="تعداد">
                <UInputNumber
                  v-model="quantity"
                  :min="1"
                  :max="Math.min(10, product.stock || 1)"
                  :ui="{ base: 'rounded-md' }"
                />
              </UFormField>
            </div>

            <div class="grid gap-3">
              <UButton
                color="primary"
                size="lg"
                block
                icon="i-lucide-shopping-cart"
                class="text-sm"
                :disabled="!isProductInStock(product)"
              >
                افزودن به سبد
              </UButton>
              <UButton
                color="neutral"
                variant="outline"
                size="lg"
                block
                icon="i-lucide-heart"
                class="text-sm border-soft-border"
              >
                ذخیره
              </UButton>
            </div>
          </aside>
        </div>

        <ProductSpecTable :rows="specificationRows" />
      </div>

      <section
        v-if="relatedProducts.length"
        class="mt-10 space-y-4"
      >
        <div>
          <h2 class="section-title">
            محصولات مرتبط
          </h2>
          <p class="secondary-text mt-1">
            بیشتر از {{ product.category }}
          </p>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ProductCard
            v-for="item in relatedProducts"
            :key="item.id"
            :product="item"
          />
        </div>
      </section>
    </template>
  </UContainer>
</template>
