<script setup lang="ts">
import { fa_ir } from '@nuxt/ui/locale'

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'fa',
    dir: 'rtl'
  }
})

const title = 'فُروشگاه'
const description = 'فروشگاه دموی فُروشگاه با کاتالوگ فارسی، API داخلی و رندر کامل SSR.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp :locale="fa_ir" dir="rtl">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
