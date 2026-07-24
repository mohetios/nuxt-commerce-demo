# Nuxt Commerce Demo

A frontend commerce implementation built for a technical hiring challenge using Nuxt 4, Vue 3, TypeScript, Nuxt UI, and the Fake Store API.


### Implemented

- Nuxt 4 application structure
- Vue 3 Composition API with `<script setup lang="ts">`
- Nuxt UI and Tailwind CSS based interface
- Shared default layout, header, navigation, and footer
- Product catalog fetched from Fake Store API
- Typed product model and product helper functions
- Responsive product-card grid
- Product category filtering
- URL-backed category state using the `category` query parameter
- Product sorting by featured order, price, and rating
- Dynamic product detail route: `/products/:id`
- Product gallery component
- Related-product selection
- Dynamic SEO metadata for product pages
- Loading skeletons
- API error states
- ESLint and strict TypeScript configuration
- Local development, typecheck, lint, build, and preview scripts

### Planned

- Complete visual comparison against every Figma breakpoint and state
- Shopping-cart state and cart drawer/page
- Quantity synchronization between product detail and cart
- Favorites/wishlist state
- Search and improved catalog discovery
- Empty states for filters, cart, favorites, and failed product lookup
- Toast feedback for user actions
- Persistence for cart and favorites
- Component tests
- User-flow/E2E tests
- Accessibility audit
- Performance and image-loading review
- CI workflow for lint, typecheck, tests, and production build
- Deployment and final delivery verification

## Technology Stack

| Area | Technology | Responsibility |
| --- | --- | --- |
| Framework | Nuxt 4 | Routing, SSR-capable rendering, application conventions, SEO |
| UI runtime | Vue 3 | Reactive components and Composition API |
| Language | TypeScript | API contracts, props, helpers, and stricter correctness checks |
| Component system | Nuxt UI | Accessible UI primitives and consistent component APIs |
| Styling | Tailwind CSS | Responsive layout and design implementation |
| Icons | Iconify | Lucide and brand icon collections |
| Data source | Fake Store API | Product catalog and product detail data |
| Data fetching | Nuxt `useFetch` | SSR-safe initial API requests and request state |
| Quality | ESLint + Nuxt typecheck | Static analysis and framework-aware type checking |

## Architecture Overview

The current architecture is deliberately small. API reads remain close to the pages that own them, reusable rendering logic lives in components, and API contracts/helpers are centralized in one data module.

```mermaid
flowchart LR
    User[Browser / User]

    subgraph Nuxt[Nuxt 4 Application]
        Router[File-based Router]

        subgraph Pages[Page Layer]
            Catalog["app/pages/index.vue\nCatalog orchestration"]
            Detail["app/pages/products/[id].vue\nProduct detail orchestration"]
        end

        subgraph UI[Reusable UI Layer]
            Layout[Default Layout]
            Header[Header and Menu]
            ProductCard[ProductCard]
            Gallery[ProductGallery]
            Footer[Footer]
        end

        subgraph Domain[Typed Product Boundary]
            Types[FakeStoreProduct type]
            Helpers[Rating, review, summary helpers]
            Config[API base URL]
        end

        Fetch[Nuxt useFetch]
    end

    API[Fake Store API]

    User --> Router
    Router --> Catalog
    Router --> Detail

    Catalog --> ProductCard
    Detail --> Gallery
    Detail --> ProductCard

    Layout --> Header
    Layout --> Footer
    Layout --> Pages

    Catalog --> Domain
    Detail --> Domain
    ProductCard --> Domain

    Catalog --> Fetch
    Detail --> Fetch
    Fetch --> API
```

## Current Data Flow

### Catalog page

```mermaid
sequenceDiagram
    actor User
    participant Page as Catalog Page
    participant Nuxt as useFetch
    participant API as Fake Store API
    participant State as Reactive/Computed State
    participant UI as ProductCard Grid

    User->>Page: Open catalog
    Page->>Nuxt: Request GET /products
    Nuxt->>API: Fetch product collection
    API-->>Nuxt: Product[]
    Nuxt-->>Page: data / pending / error

    Page->>State: Derive categories
    Page->>State: Read category from route query
    Page->>State: Apply category filter
    Page->>State: Apply selected sorting rule
    State-->>UI: visibleProducts
    UI-->>User: Responsive product grid

    User->>Page: Change category
    Page->>Page: Update URL query
    Page->>State: Recompute visible products
    State-->>UI: Updated product grid
```

The URL is the source of truth for category selection. This keeps the selected category shareable, refresh-safe, and compatible with browser navigation. Sorting is currently local UI state because it does not yet need to be shareable or persisted.

### Product detail page

```mermaid
sequenceDiagram
    actor User
    participant Route as /products/:id
    participant Nuxt as useFetch
    participant API as Fake Store API
    participant Detail as Product Detail State
    participant UI as Detail Components

    User->>Route: Open product URL
    Route->>Detail: Parse productId

    par Fetch selected product
        Detail->>Nuxt: GET /products/:id
        Nuxt->>API: Product request
        API-->>Nuxt: Product
    and Fetch candidate products
        Detail->>Nuxt: GET /products
        Nuxt->>API: Product collection request
        API-->>Nuxt: Product[]
    end

    Detail->>Detail: Select same-category products
    Detail->>Detail: Exclude current product
    Detail->>Detail: Fall back to remaining products
    Detail-->>UI: Product, gallery, quantity, related products
    UI-->>User: Product detail page
```

The current detail page favors clarity over abstraction. If the project grows, duplicated endpoint logic can move into typed catalog composables without changing the page/component responsibilities.

## Rendering and State Boundaries

```text
Remote server state
├── Product list
├── Product detail
└── Request status/error

URL state
└── Selected category

Local page state
├── Selected sort order
└── Selected quantity

Derived state
├── Available categories
├── Filtered/sorted products
├── Product image list
└── Related products

Planned shared client state
├── Cart
└── Favorites
```

This separation prevents temporary UI state from being mixed with API data and avoids introducing a global store before shared state actually exists.

## Repository Structure

```text
.
├── app/
│   ├── app.config.ts             # Nuxt UI theme aliases
│   ├── assets/css/main.css       # Tailwind and theme styles
│   ├── components/
│   │   ├── MainHeader.vue
│   │   ├── MainMenu.vue
│   │   ├── MainFooter.vue
│   │   ├── ProductCard.vue
│   │   └── ProductGallery.vue
│   ├── data/products.ts          # API base URL, product type, helpers
│   ├── layouts/default.vue       # Shared application shell
│   └── pages/
│       ├── index.vue             # Catalog page
│       └── products/[id].vue     # Dynamic product detail page
├── eslint.config.mjs
├── nuxt.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Key Engineering Decisions

### 1. Direct `useFetch` calls in pages

The challenge currently uses a public read-only API and has two product-facing routes. Keeping initial requests in the owning pages makes the data dependency visible and avoids creating repository/service layers that would only wrap a single call.

A composable/API-client layer becomes useful when one or more of these conditions appear:

- request behavior is repeated across several pages;
- endpoint normalization becomes non-trivial;
- authentication or shared headers are introduced;
- caching and invalidation require explicit keys;
- server-side API proxying becomes necessary;
- multiple backend providers must share one frontend contract.

### 2. Typed API boundary

`app/data/products.ts` owns the product contract, the API base URL, and pure helper functions. Components do not redefine external response shapes.

### 3. URL-backed filtering

Category selection is represented by `?category=...` rather than hidden global state. It survives refreshes and creates directly shareable catalog views.

### 4. Derived data stays computed

Categories, filtered products, sorted products, images, and related products are derived with `computed` state instead of being duplicated and manually synchronized.

### 5. Reusable components remain presentation-focused

`ProductCard` receives a typed product and renders it. The catalog page owns filtering and sorting; the detail page owns route-aware fetching and product-specific orchestration.

### 6. Strictness without custom framework overrides

The project keeps Nuxt's generated TypeScript project references and adds stricter compiler checks through `nuxt.config.ts`, including:

- `strict`
- `exactOptionalPropertyTypes`
- `noUncheckedIndexedAccess`

## Intended Target Architecture

The current implementation is enough for read-only catalog browsing. The next architecture adds shared interaction state while preserving the existing page/component boundaries.

```mermaid
flowchart TB
    Design[Figma Screens and Interaction States]
    Requirements[UI and Behavior Inventory]

    subgraph App[Nuxt Application]
        Pages[Pages\nCatalog / Product / Cart]
        Components[Reusable Components]
        CatalogData[Catalog Composables\nuseProducts / useProduct]
        CartState[Shared Cart State]
        FavoriteState[Shared Favorites State]
        Persistence[Client Persistence Adapter]
        Feedback[Toast and Error Feedback]
    end

    API[Fake Store API]
    QA[Quality Gates\nLint / Typecheck / Tests / Build]
    Delivery[Public GitHub Repository and Deployment]

    Design --> Requirements
    Requirements --> Pages
    Requirements --> Components

    Pages --> CatalogData
    CatalogData --> API

    Pages --> CartState
    Pages --> FavoriteState
    Components --> CartState
    Components --> FavoriteState

    CartState --> Persistence
    FavoriteState --> Persistence
    CartState --> Feedback
    FavoriteState --> Feedback

    App --> QA
    QA --> Delivery
```

The target does not require a backend rewrite. Cart and favorites can initially use Nuxt shared state or a small store with browser persistence. A server-backed cart would only be justified after authentication or cross-device synchronization is introduced.

## Delivery Plan

```mermaid
flowchart LR
    A[1. Inspect Figma]
    B[2. Inventory screens, states, breakpoints]
    C[3. Define tokens and component boundaries]
    D[4. Build shared layout and primitives]
    E[5. Connect typed product API]
    F[6. Implement catalog]
    G[7. Implement product detail]
    H[8. Add cart and favorites]
    I[9. Cover loading, error, empty states]
    J[10. Responsive and accessibility pass]
    K[11. Tests and performance review]
    L[12. Build, deploy, document, deliver]

    A --> B --> C --> D --> E --> F --> G --> H --> I --> J --> K --> L

    classDef done fill:#dcfce7,stroke:#16a34a,color:#14532d;
    classDef active fill:#fef3c7,stroke:#d97706,color:#78350f;
    classDef planned fill:#e0e7ff,stroke:#4f46e5,color:#312e81;

    class A,B,C,D,E,F,G done;
    class I active;
    class H,J,K,L planned;
```


## Milestones and Acceptance Criteria

### Milestone 1 — Foundation

**Status:** Complete

- Nuxt 4 project initialized
- Nuxt UI and global styling configured
- Strict TypeScript and ESLint enabled
- Shared layout and navigation established

### Milestone 2 — Catalog

**Status:** Complete

- Product collection loads from Fake Store API
- Loading and error states exist
- Category filter works
- Selected category is represented in the URL
- Sort options work without mutating source data
- Product cards are responsive and reusable

### Milestone 3 — Product Detail

**Status:** Complete for read-only browsing

- Dynamic product route works
- Product data and SEO metadata are route-aware
- Quantity input is available
- Product gallery is separated into a component
- Related products are derived from API data
- Missing/failing requests display a visible failure state

### Milestone 4 — Commerce Interaction

**Status:** Planned

- Add-to-cart updates shared cart state
- Re-adding a product updates quantity predictably
- Cart state persists across refreshes
- Cart total is derived rather than manually synchronized
- Remove, increment, decrement, and clear actions are covered
- Favorite state is shared and persistent
- User actions provide immediate accessible feedback

### Milestone 5 — Design and UX Completion

**Status:** Planned

- Compare each screen against Figma at target breakpoints
- Validate spacing, type scale, images, controls, and interaction states
- Add empty states and disabled states
- Validate keyboard navigation and visible focus
- Check semantic headings, labels, link purpose, and image alternatives
- Review reduced-motion behavior where animation is present

### Milestone 6 — Verification and Delivery

**Status:** Planned

- Unit/component tests pass
- Critical user-flow tests pass
- Lint passes
- Typecheck passes
- Production build passes
- Responsive manual QA passes
- README matches the actual implementation
- Public repository history explains the development progression
- Deployment URL and repository URL are verified before delivery

## Testing Strategy

### Static checks

```bash
npm run lint
npm run typecheck
npm run check
npm run build
```

### Planned component coverage

**ProductCard**

- renders product fields safely;
- creates the correct detail URL;
- handles missing optional rating data.

**ProductGallery**

- renders supplied images;
- exposes meaningful alternative text;
- handles an empty image list.

**Catalog page**

- derives unique categories;
- filters by category;
- sorts without mutating the fetched collection;
- displays loading, error, empty, and populated states.

**Product detail page**

- parses the route id;
- renders API-backed metadata;
- excludes the active item from related products;
- uses fallback related products when the category has no alternatives.

### Planned E2E coverage

```text
Open catalog
→ filter category
→ open product
→ change quantity
→ add to cart
→ open cart
→ update quantity
→ remove product
→ verify totals and persistence
```

## Commit Strategy

The repository history should communicate the implementation progression. A suitable sequence is:

```text
chore: initialize Nuxt application and quality tooling
feat: add shared commerce layout and theme
feat: add typed Fake Store product boundary
feat: implement responsive product catalog
feat: add category query state and product sorting
feat: implement dynamic product detail route
feat: add loading error and related-product states
feat: add shared cart and favorite state
accessibility: review keyboard and semantic behavior
test: add catalog and cart coverage
docs: document architecture decisions and delivery status
```

Commits should stay focused: one understandable product or engineering change per commit, without mixing unrelated formatting and feature work.

## Setup

### Prerequisites

- Node.js compatible with the current Nuxt release
- npm 11 or a compatible npm version

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

The app is available at [http://localhost:3000](http://localhost:3000) by default.

### Quality checks

```bash
npm run check
```

Or run the checks independently:

```bash
npm run lint
npm run typecheck
```

### Production build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Known Limitations

The repository is not yet a complete checkout product.

- Add-to-cart and save buttons are currently visual interactions only.
- Cart and favorite state have not been implemented.
- The project currently consumes Fake Store API directly from the Nuxt pages.
- API data is illustrative and does not provide a production commerce contract.
- Product images and descriptions are controlled by the external API and have inconsistent dimensions/content quality.
- Automated tests and CI are planned but not yet included.
- Final pixel-level Figma comparison is still required.
- No authentication, payment, inventory reservation, order submission, or server-backed persistence is included.

These limitations are intentionally documented so reviewers can distinguish current behavior from the proposed architecture.


## Review Guide

For a focused code review, start with:

- `app/pages/index.vue` — catalog data flow, URL state, filtering, and sorting;
- `app/pages/products/[id].vue` — route-aware data fetching and detail orchestration;
- `app/components/ProductCard.vue` — typed reusable component boundary;
- `app/components/ProductGallery.vue` — isolated visual behavior;
- `app/data/products.ts` — external API contract and pure helpers;
- `nuxt.config.ts` — strictness and framework configuration;
- `package.json` — quality and delivery commands.

