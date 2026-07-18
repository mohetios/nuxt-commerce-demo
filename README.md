# Nuxt Commerce Test

A clean Nuxt 4 commerce UI mockup built with Nuxt UI. The app fetches products from Fake Store API and has two public pages: a product list home page and a product detail page.

## Technical Overview

- Framework: Nuxt 4 with Vue 3 and TypeScript
- UI: Nuxt UI 4
- Styling: Tailwind CSS 4 through Nuxt UI
- Icons: Iconify `lucide` and `simple-icons`
- Data: Fake Store API through Nuxt `useFetch`
- API helpers/types: `app/data/products.ts`
- Quality: Nuxt ESLint flat config and Nuxt TypeScript project references
- Package manager: npm

## App Structure

- `app/layouts/default.vue`: single shared layout
- `app/components/MainHeader.vue`: main header
- `app/components/MainMenu.vue`: primary navigation
- `app/components/MainFooter.vue`: footer
- `app/components/ProductCard.vue`: product card for listing pages
- `app/components/ProductGallery.vue`: product detail gallery
- `app/pages/index.vue`: product list home page
- `app/pages/products/[id].vue`: product detail page
- `app/data/products.ts`: Fake Store API base URL, product type, and helpers
- `app/assets/css/main.css`: Tailwind imports and Nuxt UI color palette
- `app/app.config.ts`: Nuxt UI theme aliases
- `eslint.config.mjs`: Nuxt ESLint flat config extension
- `tsconfig.json`: Nuxt TypeScript project references

## Data Flow

Product data comes from Fake Store API:

- Product list: `GET https://fakestoreapi.com/products`
- Product details: `GET https://fakestoreapi.com/products/:id`

The app uses Nuxt `useFetch` directly in pages for now. Product filtering and sorting are intentionally kept client-side and simple so the logic can later move to a richer API layer.

## Theme

The Nuxt UI primary color is configured as `brand`, with `brand-500` set to `#E20054`.

```ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'brand',
      neutral: 'slate'
    }
  }
})
```

## Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run quality checks:

```bash
npm run lint
npm run typecheck
npm run check
```

Auto-fix lint issues:

```bash
npm run lint:fix
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Notes

This project is frontend-only for now. Auth pages, middleware, JWT server utilities, and API routes were removed as unnecessary for the current commerce mockup.

The root `tsconfig.json` should stay as Nuxt project references. Custom TypeScript strictness lives in `nuxt.config.ts`, matching Nuxt's recommended project-reference setup.
