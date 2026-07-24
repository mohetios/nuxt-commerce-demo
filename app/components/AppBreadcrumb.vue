<script setup lang="ts">
export type AppBreadcrumbItem = {
  label: string
  to?: string
}

const props = defineProps<{
  items: AppBreadcrumbItem[]
}>()

const breadcrumbItems = computed(() =>
  props.items.map((item) => {
    if (item.to) {
      return {
        label: item.label,
        to: item.to
      }
    }

    return {
      label: item.label
    }
  })
)
</script>

<template>
  <UBreadcrumb
    :items="breadcrumbItems"
    class="mb-4"
    :ui="{
      root: 'gap-1.5',
      list: 'gap-1.5',
      item: 'gap-1.5',
      link: 'text-xs text-muted-blue md:text-sm',
      separatorIcon: 'size-3.5 text-muted-blue'
    }"
  />
</template>
