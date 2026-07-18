<template>
  <footer class="border-t border-default bg-default">
    <UContainer class="grid gap-8 py-10 md:grid-cols-[1.1fr_2fr]">
      <div class="space-y-4">
        <AppLogo class="h-9 w-auto text-highlighted" />
        <p class="max-w-sm text-sm leading-6 text-muted">
          A focused Nuxt UI storefront mockup with clean product browsing and detail pages.
        </p>
      </div>

      <div class="grid gap-6 sm:grid-cols-3">
        <div>
          <p class="mb-3 text-sm font-semibold text-highlighted">
            Shop
          </p>
          <ul class="space-y-2 text-sm text-muted">
            <li>New arrivals</li>
            <li>Best sellers</li>
            <li>Gift cards</li>
          </ul>
        </div>
        <div>
          <p class="mb-3 text-sm font-semibold text-highlighted">
            Support
          </p>
          <ul class="space-y-2 text-sm text-muted">
            <li>Shipping</li>
            <li>Returns</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <p class="mb-3 text-sm font-semibold text-highlighted">
            Follow
          </p>
          <div class="flex gap-2">
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-simple-icons-instagram"
              aria-label="Instagram"
            />
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-simple-icons-x"
              aria-label="X"
            />
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-simple-icons-tiktok"
              aria-label="TikTok"
            />
          </div>
        </div>
      </div>
    </UContainer>
  </footer>
</template>
