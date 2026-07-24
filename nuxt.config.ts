// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    'nitro-cloudflare-dev'
  ],

  ssr: true,

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { ssr: true },
    '/products/**': { ssr: true },
    '/api/**': { ssr: false }
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    preset: 'cloudflare_pages',
    prerender: {
      autoSubfolderIndex: false
    }
  },

  typescript: {
    strict: true,
    typeCheck: false,
    tsConfig: {
      compilerOptions: {
        exactOptionalPropertyTypes: true,
        noUncheckedIndexedAccess: true
      }
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  // IPX needs Node/Sharp and breaks on Cloudflare Pages SSR/edge.
  // `none` is a passthrough that still supports NuxtImg props (lazy, sizes, placeholder UX).
  image: {
    provider: 'none',
    quality: 75
  }
})
