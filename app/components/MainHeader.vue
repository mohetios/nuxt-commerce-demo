<template>
  <header class="sticky top-0 z-40 border-b border-default bg-default/85 backdrop-blur">
    <UContainer class="flex h-20 flex-row-reverse items-center justify-between gap-6">
      <NuxtLink
        to="/"
        class="flex items-center gap-3 text-highlighted"
        aria-label="Go to home"
      >
        <AppLogo class="h-9 w-auto" />
      </NuxtLink>

      <MainMenu class="hidden flex-1 justify-center md:flex" />

      <UButton
        to="#"
        color="primary"
        size="lg"
        icon="i-lucide-phone-call"
        class="rounded-2xl px-8 font-semibold"
      >
        تماس
      </UButton>
    </UContainer>

    <UContainer class="border-t border-default md:hidden">
      <MainMenu class="h-12 justify-end overflow-x-auto" />
    </UContainer>
  </header>
</template>
