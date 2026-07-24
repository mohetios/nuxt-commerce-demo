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
  <div class="space-y-3">
    <div class="aspect-square overflow-hidden rounded-lg border border-default bg-muted">
      <NuxtImg
        :src="displaySrc(selectedImage)"
        :alt="name"
        class="h-full w-full object-cover"
        width="800"
        height="800"
        sizes="(max-width: 1024px) 100vw, 480px"
        loading="eager"
        placeholder
        quality="80"
        @error="onImageError(selectedImage)"
      />
    </div>

    <div
      v-if="images.length"
      class="grid grid-cols-3 gap-3"
    >
      <button
        v-for="image in images"
        :key="image"
        type="button"
        class="aspect-square overflow-hidden rounded-md border bg-muted transition"
        :class="selectedImage === image || (selectedImage === PRODUCT_IMAGE_PLACEHOLDER && failedImages.has(image))
          ? 'border-primary ring-2 ring-primary/20'
          : 'border-default hover:border-primary/60'"
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
