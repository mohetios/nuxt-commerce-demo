# AGENTS.md

## Project Scope

This is a Nuxt 4 commerce UI mockup. Keep the app focused on two public routes:

- `/` renders the product list home page.
- `/products/[id]` renders the product details page.

The current app is intentionally frontend-only and reads products from Fake Store API with Nuxt `useFetch`. Do not reintroduce auth flows, route middleware, server API handlers, sessions, JWT logic, dashboards, or user pages unless the product requirements explicitly change.

## Tech Stack

- Nuxt 4 with the `app/` directory structure
- Vue 3 and TypeScript
- Nuxt UI 4 for application components
- Tailwind CSS 4 through Nuxt UI
- Iconify local icon packages for `lucide` and `simple-icons`
- npm with `package-lock.json`

## Structure

- `app/layouts/default.vue`: the only layout. It owns the shared page chrome.
- `app/components/MainHeader.vue`: main header.
- `app/components/MainMenu.vue`: primary navigation.
- `app/components/MainFooter.vue`: footer.
- `app/components/ProductCard.vue`: catalog card.
- `app/components/ProductGallery.vue`: details image gallery.
- `app/data/products.ts`: Fake Store API types, base URL, and product helpers.
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
- Do not add decorative-only complexity, nested cards, or large marketing-only sections that hide the actual product UI.

## Data Rules

- Fetch product data with Nuxt `useFetch`.
- Use `FAKE_STORE_API_BASE` from `app/data/products.ts`.
- Keep Fake Store response typing in `FakeStoreProduct`.
- Use product `id` for detail routing.
- Keep complex filters in computed state until a real backend filter API is introduced.

## Code Quality Rules

- Follow the official Nuxt ESLint module pattern with flat config.
- Keep type-only imports as `import type`.
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
