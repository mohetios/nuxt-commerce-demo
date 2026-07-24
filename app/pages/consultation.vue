<script setup lang="ts">
useSeoMeta({
  title: 'دریافت مشاوره | فُروشگاه',
  description: 'درخواست مشاوره رایگان برای انتخاب پنجره و در مناسب فضای شما.'
})

const breadcrumbItems = [
  { label: 'خانه', to: '/' },
  { label: 'دریافت مشاوره' }
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
          دریافت مشاوره
        </h1>
        <p class="body-text text-muted-blue">
          کارشناسان فُروشگاه برای انتخاب ابعاد، یراق‌آلات و نوع بازشو در کنار شما هستند.
          این صفحه فعلاً یک نمونهٔ نمایشی است و فرم واقعی هنوز فعال نشده است.
        </p>
      </div>

      <div class="surface-card space-y-4 p-5 sm:p-6">
        <h2 class="section-title">
          چه کمکی می‌توانیم بکنیم؟
        </h2>
        <ul class="body-text list-disc space-y-2 ps-5 text-muted-blue">
          <li>
            بررسی نیاز فضای مسکونی یا تجاری
          </li>
          <li>
            پیشنهاد مدل‌های پنجره و در آلومینیومی
          </li>
          <li>
            برآورد تقریبی هزینه نصب و ارسال
          </li>
        </ul>
        <UButton
          to="/contact"
          color="primary"
          icon="i-lucide-phone-call"
        >
          تماس با مشاور
        </UButton>
      </div>
    </section>
  </UContainer>
</template>
