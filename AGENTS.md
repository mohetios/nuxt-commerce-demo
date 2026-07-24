# AGENTS.md

## Project Scope

This is a Nuxt 4 commerce UI mockup. Keep the app focused on two public routes:

- `/` renders the product list home page.
- `/products/[id]` renders the product details page.

The app is SSR-first. Product data comes from an internal Nitro demo API backed by a server-side demo data pack. Do not reintroduce auth flows, route middleware, sessions, JWT logic, dashboards, or user pages unless the product requirements explicitly change. Product-only Nitro handlers under `server/api/` are allowed.

## Tech Stack

- Nuxt 4 with the `app/` directory structure
- Vue 3 and TypeScript
- Nuxt UI 4 for application components
- Tailwind CSS 4 through Nuxt UI
- Iconify local icon packages for `lucide` and `simple-icons`
- Nitro server routes for the demo product API
- npm with `package-lock.json`

## Structure

- `app/layouts/default.vue`: the only layout. It owns the shared page chrome.
- `app/components/MainHeader.vue`: main header.
- `app/components/MainMenu.vue`: primary navigation.
- `app/components/MainFooter.vue`: footer.
- `app/components/ProductCard.vue`: catalog card.
- `app/components/ProductGallery.vue`: details image gallery.
- `shared/types/product.ts`: product contract (auto-imported).
- `shared/utils/products.ts`: product helpers (auto-imported).
- `server/data/products.ts`: Persian demo product data pack.
- `server/data/product-image-sources.ts`: private Unsplash URLs for the KV image cache.
- `server/assets/demo-images/`: offline seed bytes used when Unsplash is unreachable.
- `server/api/products/index.get.ts`: product collection endpoint.
- `server/api/products/[id].get.ts`: product detail endpoint.
- `server/api/products/[id]/related.get.ts`: related products endpoint.
- `server/api/categories/index.get.ts`: category list endpoint.
- `server/api/images/[...path].get.ts`: KV-backed product image proxy.
- `app/pages/index.vue`: product list home page.
- `app/pages/products/[id].vue`: product details page.
- `app/assets/css/main.css`: Tailwind and Nuxt UI theme tokens.
- `app/app.config.ts`: Nuxt UI color aliases.
- `eslint.config.mjs`: project-aware Nuxt flat config plus local quality rules.
- `tsconfig.json`: Nuxt project references. Keep direct customizations in `nuxt.config.ts`.

## UI Rules

- Build with Nuxt UI components first: `UButton`, `UCard`, `UBadge`, `UContainer`, `UInput`, `USelect`, `USelectMenu`, `UAccordion`, and related components.
- Use `primary` for brand actions. The primary palette maps to `#E20054` via `brand-500` in `app/assets/css/main.css`.
- Keep the interface commerce-focused: product browsing, product details, pricing, ratings, stock, filters, and purchase actions.
- Use icons from the installed Iconify collections. Prefer `i-lucide-*` for UI actions.
- Keep page copy concise and product-oriented.
- Prefer RTL-friendly layout utilities (`start`/`end`) for the Persian storefront.
- Do not add decorative-only complexity, nested cards, or large marketing-only sections that hide the actual product UI.

## Data Rules

- Fetch product data with Nuxt `useFetch` against internal `/api/*` routes so the initial payload is resolved during SSR.
- Keep the demo catalog in `server/data/products.ts` and expose it only through Nitro handlers.
- Keep response typing in auto-imported `Product` from `shared/types/product.ts`.
- Prefer Nuxt auto-imports for Vue/Nuxt APIs, shared types, and shared utils. Do not manually import symbols that Nuxt already provides.
- Use product `id` for detail routing.
- Keep complex filters in computed state until richer API filter params are introduced.

## Code Quality Rules

- Follow the official Nuxt ESLint module pattern with flat config.
- Prefer Nuxt auto-imports over manual imports for framework APIs, components, shared types, and shared utils.
- Keep type-only imports as `import type` when a manual import is required.
- Avoid `any`; add explicit response types for external data.
- Keep root `tsconfig.json` as Nuxt project references.
- Extend stricter TypeScript behavior in `nuxt.config.ts`, not by rewriting generated `.nuxt` config.

## Cleanup Rules

- Do not commit generated folders such as `.nuxt`, `.output`, `.nitro`, `.cache`, `dist`, or `node_modules`.
- Remove unused pages, layouts, middleware, APIs, and dependencies when a feature is removed.
- Keep `package.json` and `package-lock.json` aligned.
- This project uses npm, not pnpm or yarn.

## Commands

Use these only when needed or explicitly requested:

```bash
npm install
npm run dev
npm run lint
npm run lint:fix
npm run typecheck
npm run check
npm run build
npm run preview
```

Avoid running dev servers, builds, or typechecks after every small change unless the user asks for verification or the change is broad enough to justify it.

## Implementation Notes

- Prefer small, direct components over premature abstractions.
- Keep the single-layout assumption intact.
- Preserve responsive behavior for mobile and desktop.
- Keep all generated UI code readable and easy to replace when real commerce APIs are introduced.
