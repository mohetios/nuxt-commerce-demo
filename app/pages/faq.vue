<script setup lang="ts">
useSeoMeta({
  title: 'سوالات متداول | فُروشگاه',
  description: 'پاسخ پرسش‌های رایج درباره سفارش، نصب و گارانتی محصولات فُروشگاه.'
})

const breadcrumbItems = [
  { label: 'خانه', to: '/' },
  { label: 'سوالات متداول' }
]

const faqs = [
  {
    label: 'زمان تحویل سفارش چقدر است؟',
    content: 'در حالت عادی، سفارش‌های آمادهٔ انبار ظرف ۳ تا ۷ روز کاری ارسال می‌شوند. محصولات سفارشی ممکن است تا دو هفته زمان ببرند.'
  },
  {
    label: 'آیا نصب در محل انجام می‌شود؟',
    content: 'بله، برای بیشتر شهرها نصب توسط تیم همکار فُروشگاه قابل هماهنگی است. هزینه نصب پس از بازدید فنی اعلام می‌شود.'
  },
  {
    label: 'گارانتی محصولات چگونه است؟',
    content: 'پنجره‌ها و درهای آلومینیومی دارای گارانتی سازنده برای یراق و رنگ هستند. جزئیات گارانتی هر محصول در صفحه همان کالا آمده است.'
  },
  {
    label: 'چطور اندازه دقیق را مشخص کنم؟',
    content: 'می‌توانید از صفحه دریافت مشاوره درخواست بازدید اندازه بگیرید، یا نقشه و ابعاد تقریبی را برای مشاور ارسال کنید.'
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
          سوالات متداول
        </h1>
        <p class="body-text text-muted-blue">
          پاسخ‌های کوتاه به پرسش‌های پرتکرار خریداران. محتوای این صفحه برای دموی فروشگاه نوشته شده است.
        </p>
      </div>

      <UAccordion
        :items="faqs"
        type="multiple"
        :ui="{
          trigger: 'text-start font-semibold text-ink',
          body: 'text-sm leading-6 text-muted-blue'
        }"
      />
    </section>
  </UContainer>
</template>
