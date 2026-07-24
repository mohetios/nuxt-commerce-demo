<script setup lang="ts">
const props = defineProps<{
  product: Product
}>()

const imageSrc = ref(props.product.image)

watch(
  () => props.product.image,
  (src) => {
    imageSrc.value = src
  }
)

function onImageError() {
  if (imageSrc.value !== PRODUCT_IMAGE_PLACEHOLDER) {
    imageSrc.value = PRODUCT_IMAGE_PLACEHOLDER
  }
}
</script>

<template>
  <UCard
    :ui="{
      root: 'overflow-hidden ring-default transition hover:-translate-y-0.5 hover:shadow-lg',
      body: 'p-0 sm:p-0',
      footer: 'p-4 sm:p-4'
    }"
  >
    <NuxtLink
      :to="`/products/${product.id}`"
      class="block"
    >
      <div class="relative aspect-[4/3] overflow-hidden bg-muted">
        <NuxtImg
          :src="imageSrc"
          :alt="product.title"
          class="h-full w-full object-cover p-2 transition duration-300 hover:scale-105"
          width="640"
          height="480"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          loading="lazy"
          placeholder
          quality="75"
          @error="onImageError"
        />

        <UBadge
          class="absolute start-3 top-3"
          color="primary"
          variant="soft"
        >
          {{ product.category }}
        </UBadge>
      </div>
    </NuxtLink>

    <template #footer>
      <div class="space-y-4">
        <div class="space-y-2">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-xs font-medium tracking-wide text-muted">
                {{ product.category }}
              </p>
              <NuxtLink
                :to="`/products/${product.id}`"
                class="mt-1 line-clamp-1 text-base font-semibold text-highlighted"
              >
                {{ product.title }}
              </NuxtLink>
            </div>
            <div class="text-end">
              <p class="font-semibold text-highlighted">
                {{ formatProductPrice(product.price) }}
              </p>
            </div>
          </div>

          <p class="line-clamp-2 min-h-10 text-sm leading-5 text-muted">
            {{ getProductSummary(product) }}
          </p>
        </div>

        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-1.5 text-sm text-muted">
            <UIcon
              name="i-lucide-star"
              class="size-4 text-primary"
            />
            <span>{{ getProductRating(product) }}</span>
            <span>({{ getProductReviewCount(product) }})</span>
          </div>

          <UButton
            :to="`/products/${product.id}`"
            color="primary"
            variant="soft"
            size="sm"
            icon="i-lucide-arrow-left"
            trailing
          >
            مشاهده
          </UButton>
        </div>
      </div>
    </template>
  </UCard>
</template>
