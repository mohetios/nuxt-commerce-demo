<script setup lang="ts">
withDefaults(defineProps<{
  orientation?: 'horizontal' | 'vertical'
}>(), {
  orientation: 'horizontal'
})

const links = [
  {
    key: 'products',
    label: 'لیست محصولات',
    to: '/',
    icon: 'i-lucide-layout-grid'
  },
  {
    key: 'consultation',
    label: 'دریافت مشاوره',
    to: '#',
    icon: 'i-lucide-book-open'
  },
  {
    key: 'faq',
    label: 'سوالات متداول',
    to: '#',
    icon: 'i-lucide-message-circle-question'
  },
  {
    key: 'contact',
    label: 'تماس با ما',
    to: '#',
    icon: 'i-lucide-phone-call'
  }
]
</script>

<template>
  <UNavigationMenu
    :items="links"
    :orientation="orientation"
    highlight
    :ui="{
      list: orientation === 'horizontal' ? 'gap-6' : 'gap-1',
      link: 'gap-2 whitespace-nowrap text-sm font-semibold text-ink',
      linkLeadingIcon: 'size-4 text-muted-blue'
    }"
  />
</template>
