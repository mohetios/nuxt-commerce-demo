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
    to: '/consultation',
    icon: 'i-lucide-book-open'
  },
  {
    key: 'faq',
    label: 'سوالات متداول',
    to: '/faq',
    icon: 'i-lucide-message-circle-question'
  },
  {
    key: 'contact',
    label: 'تماس با ما',
    to: '/contact',
    icon: 'i-lucide-phone-call'
  }
]
</script>

<template>
  <UNavigationMenu
    :items="links"
    :orientation="orientation"
    highlight
    dir="rtl"
    :ui="{
      root: orientation === 'horizontal' ? 'justify-start' : undefined,
      list: orientation === 'horizontal' ? 'gap-6' : 'gap-1',
      link: 'gap-2 whitespace-nowrap text-sm font-semibold text-ink text-start',
      linkLeadingIcon: 'size-4 shrink-0 text-muted-blue'
    }"
  />
</template>
