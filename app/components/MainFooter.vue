<template>
  <footer class="mt-auto">
    <div class="border-t border-soft-border bg-surface">
      <UContainer class="grid gap-10 py-10 md:grid-cols-[1.1fr_2fr] md:py-12">
        <div class="space-y-4">
          <AppLogo class="h-9 w-auto text-ink" />
          <p class="secondary-text max-w-sm">
            فروشگاه دموی Nuxt با کاتالوگ فارسی، API داخلی و رندر کامل سمت سرور.
          </p>
        </div>

        <div class="grid gap-8 sm:grid-cols-3">
          <div>
            <p class="mb-3 text-sm font-semibold text-ink">
              فروشگاه
            </p>
            <ul class="space-y-2 text-sm text-muted-blue">
              <li>
                <NuxtLink
                  to="/"
                  class="transition hover:text-brand-500"
                >
                  همه محصولات
                </NuxtLink>
              </li>
              <li>پنجره آلومینیومی</li>
              <li>درهای شیشه‌ای</li>
            </ul>
          </div>
          <div>
            <p class="mb-3 text-sm font-semibold text-ink">
              پشتیبانی
            </p>
            <ul class="space-y-2 text-sm text-muted-blue">
              <li>ارسال و نصب</li>
              <li>ضمانت</li>
              <li>تماس</li>
            </ul>
          </div>
          <div>
            <p class="mb-3 text-sm font-semibold text-ink">
              شبکه‌ها
            </p>
            <div class="flex gap-2">
              <UButton
                color="primary"
                variant="soft"
                icon="i-simple-icons-instagram"
                aria-label="Instagram"
              />
              <UButton
                color="primary"
                variant="soft"
                icon="i-simple-icons-x"
                aria-label="X"
              />
              <UButton
                color="primary"
                variant="soft"
                icon="i-simple-icons-tiktok"
                aria-label="TikTok"
              />
            </div>
          </div>
        </div>
      </UContainer>
    </div>

    <div class="border-t border-soft-border bg-surface-soft">
      <UContainer class="flex flex-col items-center justify-between gap-4 py-5 sm:flex-row">
        <p class="meta-text text-center sm:text-start">
          © {{ new Date().getFullYear() }} Nuxt Market — فروشگاه دمو
        </p>
        <div class="flex items-center gap-3 text-brand-500">
          <UIcon
            name="i-simple-icons-instagram"
            class="size-4"
          />
          <UIcon
            name="i-simple-icons-x"
            class="size-4"
          />
          <UIcon
            name="i-simple-icons-tiktok"
            class="size-4"
          />
        </div>
      </UContainer>
    </div>
  </footer>
</template>
