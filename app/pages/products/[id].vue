<script setup lang="ts">
const route = useRoute()
const productId = computed(() => Number(route.params.id))

const { data: product, pending, error } = await useFetch<Product>(() => `/api/products/${productId.value}`)

const { data: relatedProducts } = await useFetch<Product[]>(() => `/api/products/${productId.value}/related`, {
  default: () => []
})

const quantity = ref(1)
const productImages = computed(() => product.value ? getProductImages(product.value) : [])

useSeoMeta({
  title: () => product.value ? `${product.value.title} | Nuxt Market` : 'محصول | Nuxt Market',
  description: () => product.value?.description,
  ogTitle: () => product.value?.title,
  ogDescription: () => product.value?.description,
  ogImage: () => product.value?.image
})
</script>

<template>
  <UContainer class="py-8 lg:py-12">
    <div class="mb-6">
      <UButton
        to="/"
        color="neutral"
        variant="ghost"
        icon="i-lucide-arrow-right"
      >
        بازگشت به محصولات
      </UButton>
    </div>

    <UAlert
      v-if="error"
      color="error"
      variant="soft"
      icon="i-lucide-circle-alert"
      title="بارگذاری محصول ناموفق بود"
      description="لطفاً به فهرست محصولات برگردید و دوباره تلاش کنید."
    />

    <div
      v-else-if="pending"
      class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px]"
    >
      <USkeleton class="aspect-square rounded-lg" />
      <div class="space-y-4">
        <USkeleton class="h-10 w-2/3" />
        <USkeleton class="h-24 w-full" />
        <USkeleton class="h-72 w-full rounded-lg" />
      </div>
    </div>

    <div
      v-else-if="product"
      class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px]"
    >
      <ProductGallery
        :images="productImages"
        :name="product.title"
      />

      <aside class="space-y-6">
        <div class="space-y-4">
          <div class="flex flex-wrap items-center gap-2">
            <UBadge
              color="primary"
              variant="soft"
            >
              {{ product.category }}
            </UBadge>
          </div>

          <div>
            <p class="text-sm font-medium tracking-wide text-muted">
              دیتاپک دموی داخلی
            </p>
            <h1 class="mt-2 text-3xl font-bold tracking-normal text-highlighted sm:text-4xl">
              {{ product.title }}
            </h1>
          </div>

          <div class="flex items-center gap-3">
            <div class="flex items-center gap-1 text-primary">
              <UIcon
                v-for="index in 5"
                :key="index"
                name="i-lucide-star"
                class="size-4"
              />
            </div>
            <p class="text-sm text-muted">
              امتیاز {{ getProductRating(product) }} از {{ getProductReviewCount(product) }} نظر
            </p>
          </div>

          <p class="text-base leading-7 text-muted">
            {{ product.description }}
          </p>
        </div>

        <UCard :ui="{ body: 'p-5 sm:p-5' }">
          <div class="space-y-5">
            <div class="flex items-end justify-between gap-4">
              <div>
                <p class="text-3xl font-bold text-highlighted">
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

            <USeparator />

            <div class="grid gap-4 sm:grid-cols-2">
              <UFormField label="دسته‌بندی">
                <UInput
                  :model-value="product.category"
                  readonly
                  icon="i-lucide-tags"
                />
              </UFormField>
              <UFormField label="تعداد">
                <UInputNumber
                  v-model="quantity"
                  :min="1"
                  :max="Math.min(10, product.stock || 1)"
                />
              </UFormField>
            </div>

            <div class="grid gap-3 sm:grid-cols-2">
              <UButton
                color="primary"
                size="lg"
                block
                icon="i-lucide-shopping-cart"
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
              >
                ذخیره
              </UButton>
            </div>
          </div>
        </UCard>

        <UAccordion
          type="multiple"
          :default-value="['features']"
          :items="[{
            label: 'ویژگی‌ها',
            icon: 'i-lucide-list-checks',
            value: 'features',
            slot: 'features'
          }, {
            label: 'مشخصات',
            icon: 'i-lucide-ruler',
            value: 'specs',
            slot: 'specs'
          }, {
            label: 'ارسال و مرجوعی',
            icon: 'i-lucide-truck',
            value: 'shipping',
            slot: 'shipping'
          }]"
        >
          <template #features>
            <ul class="space-y-2 pb-3 text-sm text-muted">
              <li class="flex items-center gap-2">
                <UIcon
                  name="i-lucide-check"
                  class="size-4 text-primary"
                />
                داده محصول از API داخلی Nuxt با رندر SSR بارگذاری می‌شود.
              </li>
              <li class="flex items-center gap-2">
                <UIcon
                  name="i-lucide-check"
                  class="size-4 text-primary"
                />
                دسته‌بندی، قیمت، توضیحات، تصاویر و امتیاز از دیتاپک دمو تامین شده‌اند.
              </li>
            </ul>
          </template>

          <template #specs>
            <dl class="grid gap-3 pb-3 text-sm">
              <div class="flex items-center justify-between gap-4 border-b border-default pb-2">
                <dt class="text-muted">
                  شناسه محصول
                </dt>
                <dd class="font-medium text-highlighted">
                  {{ product.id }}
                </dd>
              </div>
              <div class="flex items-center justify-between gap-4 border-b border-default pb-2">
                <dt class="text-muted">
                  دسته‌بندی
                </dt>
                <dd class="font-medium text-highlighted">
                  {{ product.category }}
                </dd>
              </div>
              <div class="flex items-center justify-between gap-4">
                <dt class="text-muted">
                  موجودی
                </dt>
                <dd class="font-medium text-highlighted">
                  {{ product.stock }}
                </dd>
              </div>
            </dl>
          </template>

          <template #shipping>
            <p class="pb-3 text-sm leading-6 text-muted">
              ارسال استاندارد رایگان برای سفارش‌های آزمایشی بالای ۷۵۰٬۰۰۰ تومان. مرجوعی تا ۳۰ روز در شرایط اولیه پذیرفته می‌شود.
            </p>
          </template>
        </UAccordion>
      </aside>
    </div>

    <section
      v-if="product && relatedProducts.length"
      class="mt-14"
    >
      <div class="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 class="text-2xl font-semibold tracking-normal text-highlighted">
            محصولات مرتبط
          </h2>
          <p class="mt-1 text-sm text-muted">
            بیشتر از {{ product.category }}
          </p>
        </div>
      </div>

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <ProductCard
          v-for="item in relatedProducts"
          :key="item.id"
          :product="item"
        />
      </div>
    </section>
  </UContainer>
</template>
