<script setup lang="ts">
const props = defineProps<{
  categories: string[]
  selectedCategory: string
  search: string
}>()

const emit = defineEmits<{
  'update:selectedCategory': [value: string]
  'update:search': [value: string]
  'apply': []
}>()

const searchModel = computed({
  get: () => props.search,
  set: (value: string) => emit('update:search', value)
})

function selectCategory(category: string) {
  emit('update:selectedCategory', category)
}
</script>

<template>
  <div class="space-y-4">
    <section class="surface-card p-4">
      <p class="mb-3 text-sm font-semibold text-ink">
        جست‌وجوی محصول
      </p>
      <UInput
        v-model="searchModel"
        icon="i-lucide-search"
        placeholder="نام یا مدل محصول..."
        size="md"
        :ui="{
          base: 'bg-field ring-soft-border'
        }"
        @keydown.enter="emit('apply')"
      />
    </section>

    <section class="surface-card p-4">
      <p class="mb-3 text-sm font-semibold text-ink">
        دسته‌بندی
      </p>
      <ul class="space-y-2">
        <li
          v-for="category in categories"
          :key="category"
        >
          <button
            type="button"
            class="flex w-full items-center gap-3 rounded-md px-2 py-2 text-start text-sm transition"
            :class="selectedCategory === category
              ? 'bg-brand-50 font-semibold text-brand-600'
              : 'text-ink hover:bg-field'"
            @click="selectCategory(category)"
          >
            <span
              class="flex size-4 shrink-0 items-center justify-center rounded-full border"
              :class="selectedCategory === category
                ? 'border-brand-500 bg-brand-500 text-white'
                : 'border-soft-border bg-white'"
              aria-hidden="true"
            >
              <UIcon
                v-if="selectedCategory === category"
                name="i-lucide-check"
                class="size-2.5"
              />
            </span>
            <span class="leading-5">
              {{ category }}
            </span>
          </button>
        </li>
      </ul>
    </section>

    <UButton
      color="primary"
      size="lg"
      block
      icon="i-lucide-search"
      class="text-sm"
      @click="emit('apply')"
    >
      اعمال فیلتر
    </UButton>
  </div>
</template>
