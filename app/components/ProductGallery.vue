<script setup lang="ts">
const props = defineProps<{
  images: string[]
  name: string
}>()

const selectedImage = ref(props.images[0] ?? PRODUCT_IMAGE_PLACEHOLDER)
const failedImages = ref(new Set<string>())

watch(
  () => props.images,
  (images) => {
    failedImages.value = new Set()
    selectedImage.value = images[0] ?? PRODUCT_IMAGE_PLACEHOLDER
  },
  { deep: true }
)

function displaySrc(src: string) {
  return failedImages.value.has(src) ? PRODUCT_IMAGE_PLACEHOLDER : src
}

function onImageError(src: string) {
  if (!src || src === PRODUCT_IMAGE_PLACEHOLDER || failedImages.value.has(src)) {
    return
  }

  const next = new Set(failedImages.value)
  next.add(src)
  failedImages.value = next

  if (selectedImage.value === src) {
    selectedImage.value = PRODUCT_IMAGE_PLACEHOLDER
  }
}
</script>

<template>
  <div class="surface-card space-y-3 p-3 sm:p-4">
    <div class="relative aspect-[4/3] overflow-hidden rounded-lg bg-field sm:aspect-[5/4]">
      <NuxtImg
        :src="displaySrc(selectedImage)"
        :alt="name"
        class="h-full w-full object-cover"
        width="960"
        height="768"
        sizes="(max-width: 1024px) 100vw, 720px"
        loading="eager"
        placeholder
        quality="80"
        @error="onImageError(selectedImage)"
      />
    </div>

    <div
      v-if="images.length > 1"
      class="grid grid-cols-3 gap-3 sm:grid-cols-4"
    >
      <button
        v-for="image in images"
        :key="image"
        type="button"
        class="aspect-square overflow-hidden rounded-lg border bg-field transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        :class="selectedImage === image || (selectedImage === PRODUCT_IMAGE_PLACEHOLDER && failedImages.has(image))
          ? 'border-brand-500 ring-2 ring-brand-200'
          : 'border-soft-border hover:border-brand-300'"
        @click="selectedImage = failedImages.has(image) ? PRODUCT_IMAGE_PLACEHOLDER : image"
      >
        <NuxtImg
          :src="displaySrc(image)"
          :alt="`${name} gallery image`"
          class="h-full w-full object-cover"
          width="200"
          height="200"
          sizes="120px"
          loading="lazy"
          placeholder
          quality="70"
          @error="onImageError(image)"
        />
      </button>
    </div>
  </div>
</template>
