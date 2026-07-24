<template>
  <UHeader title="Nuxt Market">
    <template #title>
      <AppLogo class="h-9 w-auto" />
    </template>

    <MainMenu />

    <template #right>
      <UColorModeButton />

      <UButton
        to="#"
        color="primary"
        size="lg"
        icon="i-lucide-phone-call"
        class="rounded-2xl px-8 font-semibold"
      >
        تماس
      </UButton>
    </template>

    <template #body>
      <MainMenu orientation="vertical" />
    </template>
  </UHeader>
</template>
