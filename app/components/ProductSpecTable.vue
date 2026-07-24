<script setup lang="ts">
defineProps<{
  rows: Array<{
    label: string
    value: string
  }>
  title?: string
}>()
</script>

<template>
  <section class="surface-card p-4 sm:p-5">
    <h2 class="section-title mb-4">
      {{ title || 'مشخصات محصول' }}
    </h2>

    <dl class="space-y-3">
      <div
        v-for="row in rows"
        :key="row.label"
        class="soft-row grid gap-2 sm:grid-cols-[minmax(8rem,12rem)_minmax(0,1fr)] sm:items-start sm:gap-6"
      >
        <dt class="meta-text shrink-0">
          {{ row.label }}
        </dt>
        <dd class="body-text whitespace-pre-wrap">
          {{ row.value }}
        </dd>
      </div>
    </dl>
  </section>
</template>
