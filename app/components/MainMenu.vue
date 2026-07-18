<script setup lang="ts">
const links = [
  {
    key: 'products',
    label: 'لیست محصولات',
    to: '#',
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
    icon: 'i-lucide-phone-call',
    active: true
  }
]
</script>

<template>
  <UNavigationMenu
    :items="links"
    orientation="horizontal"
    highlight
    :ui="{
      list: 'flex-row-reverse gap-7',
      link: 'flex-row-reverse gap-2 whitespace-nowrap text-base font-semibold',
      linkLeadingIcon: 'size-5'
    }"
  />
</template>
