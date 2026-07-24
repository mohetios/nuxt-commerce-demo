<template>
  <UHeader>
    <template #title>
      <NuxtLink
        to="/"
        class="inline-flex items-center"
        aria-label="Nuxt Market"
      >
        <AppLogo class="h-8 w-auto lg:h-9" />
      </NuxtLink>
    </template>

    <MainMenu class="hidden min-[900px]:flex" />

    <template #right>
      <UButton
        to="#"
        color="primary"
        size="md"
        icon="i-lucide-phone-call"
        class="hidden sm:inline-flex px-6 text-sm"
      >
        تماس
      </UButton>

      <UButton
        to="#"
        color="primary"
        size="md"
        icon="i-lucide-phone-call"
        class="sm:hidden"
        aria-label="تماس"
      />
    </template>

    <template #body>
      <MainMenu orientation="vertical" />
    </template>
  </UHeader>
</template>
