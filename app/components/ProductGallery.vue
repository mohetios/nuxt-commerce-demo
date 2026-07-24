<script setup lang="ts">
const props = defineProps<{
  images: string[]
  name: string
}>()

const selectedImage = ref(props.images[0] ?? '')

watch(
  () => props.images,
  (images) => {
    selectedImage.value = images[0] ?? ''
  },
  { deep: true }
)
</script>

<template>
  <div class="space-y-3">
    <div class="aspect-square overflow-hidden rounded-lg border border-default bg-muted">
      <NuxtImg
        :src="selectedImage"
        :alt="name"
        class="h-full w-full object-cover"
        width="800"
        height="800"
        sizes="(max-width: 1024px) 100vw, 480px"
        loading="eager"
        placeholder
        quality="80"
      />
    </div>

    <div class="grid grid-cols-3 gap-3">
      <button
        v-for="image in images"
        :key="image"
        type="button"
        class="aspect-square overflow-hidden rounded-md border bg-muted transition"
        :class="selectedImage === image ? 'border-primary ring-2 ring-primary/20' : 'border-default hover:border-primary/60'"
        @click="selectedImage = image"
      >
        <NuxtImg
          :src="image"
          :alt="`${name} gallery image`"
          class="h-full w-full object-cover"
          width="200"
          height="200"
          sizes="120px"
          loading="lazy"
          placeholder
          quality="70"
        />
      </button>
    </div>
  </div>
</template>
