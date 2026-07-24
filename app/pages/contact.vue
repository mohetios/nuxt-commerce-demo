<script setup lang="ts">
useSeoMeta({
  title: 'تماس با ما | فُروشگاه',
  description: 'راه‌های ارتباطی با پشتیبانی فُروشگاه برای سفارش و پیگیری خرید.'
})

const breadcrumbItems = [
  { label: 'خانه', to: '/' },
  { label: 'تماس با ما' }
]

const contacts = [
  {
    icon: 'i-lucide-phone',
    label: 'تلفن پشتیبانی',
    value: '۰۲۱-۹۱۰۰۰۰۰۰'
  },
  {
    icon: 'i-lucide-mail',
    label: 'ایمیل',
    value: 'support@forushgah.demo'
  },
  {
    icon: 'i-lucide-map-pin',
    label: 'آدرس نمایشگاه',
    value: 'تهران، خیابان ولیعصر، پلاک ۱۲۳ (نمونه)'
  },
  {
    icon: 'i-lucide-clock-3',
    label: 'ساعات پاسخگویی',
    value: 'شنبه تا پنجشنبه، ۹ تا ۱۸'
  }
]
</script>

<template>
  <UContainer class="py-8 md:py-10">
    <UBreadcrumb
      :items="breadcrumbItems"
      class="mb-6"
    />

    <section class="mx-auto max-w-2xl space-y-6 text-start">
      <div class="space-y-3">
        <h1 class="page-title">
          تماس با ما
        </h1>
        <p class="body-text text-muted-blue">
          برای پیگیری سفارش، هماهنگی نصب یا سوالات قبل از خرید با ما در ارتباط باشید.
          اطلاعات زیر نمونه‌ای برای رابط کاربری دمو است.
        </p>
      </div>

      <ul class="grid gap-3 sm:grid-cols-2">
        <li
          v-for="item in contacts"
          :key="item.label"
          class="surface-card flex items-start gap-3 p-4"
        >
          <span class="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-blue text-brand-500">
            <UIcon
              :name="item.icon"
              class="size-5"
            />
          </span>
          <div class="min-w-0 space-y-1">
            <p class="meta-text">
              {{ item.label }}
            </p>
            <p class="text-sm font-semibold text-ink">
              {{ item.value }}
            </p>
          </div>
        </li>
      </ul>

      <div class="soft-row body-text">
        پیام شما در نسخه دمو ذخیره نمی‌شود؛ این صفحه فقط ساختار تماس را نشان می‌دهد.
      </div>
    </section>
  </UContainer>
</template>
