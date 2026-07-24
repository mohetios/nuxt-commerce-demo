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
      root: 'group overflow-hidden ring-1 ring-soft-border shadow-none transition duration-200 hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-brand-300',
      body: 'p-2 sm:p-2',
      footer: 'space-y-3 p-3 pt-2 sm:p-3 sm:pt-2'
    }"
  >
    <NuxtLink
      :to="`/products/${product.id}`"
      class="block outline-none"
    >
      <div class="relative aspect-[4/3] overflow-hidden rounded-lg bg-field">
        <NuxtImg
          :src="imageSrc"
          :alt="product.title"
          class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          width="640"
          height="480"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          loading="lazy"
          placeholder
          quality="75"
          @error="onImageError"
        />
      </div>
    </NuxtLink>

    <template #footer>
      <div class="space-y-1">
        <p class="meta-text">
          {{ product.category }}
        </p>
        <NuxtLink
          :to="`/products/${product.id}`"
          class="card-title line-clamp-2 block outline-none hover:text-brand-600 focus-visible:text-brand-600"
        >
          {{ product.title }}
        </NuxtLink>
      </div>

      <UButton
        :to="`/products/${product.id}`"
        color="primary"
        variant="outline"
        size="sm"
        block
        trailing-icon="i-lucide-arrow-left"
        class="text-sm"
      >
        مشاهده محصول
      </UButton>
    </template>
  </UCard>
</template>
