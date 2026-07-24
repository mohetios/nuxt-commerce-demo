# Cursor Task — Align Nuxt Commerce Demo with the Figma Export

## Objective

Refactor the existing `mohetios/nuxt-commerce-demo` interface so the catalog and product detail pages use one consistent visual language derived from the supplied Figma PNG.

The target is not a pixel-perfect recreation from a low-resolution montage. The target is a coherent implementation of the visible design system:

- Persian RTL interface
- pale blue page canvas
- white rounded surfaces
- strong magenta primary actions
- dark blue-gray typography
- compact filters
- rounded product cards
- restrained borders and shadows
- consistent desktop, tablet, and mobile behavior

Do not remove or bypass the existing Nuxt server API integration. Keep the existing product fetching and current product contract working.

---

## Evidence and confidence

### High-confidence values

These colors are directly visible in the exported image and already partially match the repository theme:

| Token | Value | Use |
| --- | --- | --- |
| `brand-500` | `#E20054` | Primary buttons, active filters, important links |
| `canvas` | `#E8EDF5` | Main page background |
| `ink` | `#253343` | Main text and headings |
| `muted` | `#6783A0` | Secondary text and quiet icons |
| `surface` | `#FFFFFF` | Cards, header, footer, filter panels |
| `surface-soft` | `#F8F9FC` | Soft rows and secondary surfaces |
| `field` | `#F5F7FA` | Specification rows and inactive fields |
| `surface-blue` | `#EDF2FE` | Very light blue panels |
| `brand-soft` | `#FFF0F6` | Active chips and soft brand backgrounds |

### Medium-confidence values

The source is a composite PNG rather than the Figma layer tree. Use these values consistently instead of trying to invent slightly different radii or spacing per component.

- Font: `Vazirmatn`
- Base spacing unit: `4px`
- Main surface radius: `16px`
- Small surface radius: `12px`
- Input radius: `10px`
- Button/chip radius: `9999px`
- Standard border: `1px solid #E3E8F0`
- Standard shadow: `0 4px 14px rgba(37, 51, 67, 0.06)`

### Low-confidence content

Small text inside the montage is not reliable enough for exact OCR. Product names below are normalized fixtures based on the visible naming pattern, not verbatim Figma copy.

---

## 1. Global design tokens

Update `app/assets/css/main.css` and keep the existing brand scale.

```css
@import "tailwindcss";
@import "@nuxt/ui";

@theme static {
  --font-sans: "Vazirmatn", sans-serif;
  --font-serif: "Vazirmatn", serif;
  --font-mono: "Vazirmatn", monospace;

  --color-brand-50: #fff0f6;
  --color-brand-100: #ffe0ed;
  --color-brand-200: #ffc2dc;
  --color-brand-300: #ff8fbd;
  --color-brand-400: #ff5798;
  --color-brand-500: #e20054;
  --color-brand-600: #c9004b;
  --color-brand-700: #a60041;
  --color-brand-800: #870039;
  --color-brand-900: #700333;
  --color-brand-950: #45001d;

  --color-canvas: #e8edf5;
  --color-surface: #ffffff;
  --color-surface-soft: #f8f9fc;
  --color-field: #f5f7fa;
  --color-surface-blue: #edf2fe;
  --color-ink: #253343;
  --color-muted-blue: #6783a0;
  --color-soft-border: #e3e8f0;

  --radius-control: 10px;
  --radius-small-surface: 12px;
  --radius-surface: 16px;
  --radius-pill: 9999px;
}
```

Add reusable component classes only when Nuxt UI props are not enough:

```css
@layer components {
  .app-canvas {
    @apply min-h-screen bg-canvas text-ink;
  }

  .surface-card {
    @apply rounded-[var(--radius-surface)] border border-soft-border bg-surface;
    box-shadow: 0 4px 14px rgb(37 51 67 / 6%);
  }

  .surface-panel {
    @apply rounded-[var(--radius-surface)] bg-surface;
  }

  .soft-row {
    @apply rounded-[var(--radius-control)] bg-field px-4 py-3;
  }

  .brand-outline-control {
    @apply rounded-[var(--radius-control)] border border-brand-300 bg-white;
  }
}
```

Do not scatter arbitrary hex values in Vue templates after this change.

---

## 2. Typography system

Use a small, practical Persian commerce scale.

| Role | Classes |
| --- | --- |
| Page title | `text-2xl md:text-3xl font-bold leading-tight text-ink` |
| Section title | `text-lg md:text-xl font-bold text-ink` |
| Card title | `text-sm md:text-base font-semibold leading-6 text-ink` |
| Body | `text-sm leading-6 text-ink` |
| Secondary | `text-xs md:text-sm leading-5 text-muted-blue` |
| Button | `text-sm font-semibold` |
| Metadata | `text-xs font-medium text-muted-blue` |

Rules:

- The application is `dir="rtl"` and `lang="fa"`.
- Keep Latin model codes, prices, and technical values readable.
- Product card titles should use at most two lines.
- Avoid oversized marketing headings. The Figma is compact and product-oriented.
- Do not use multiple unrelated font weights inside one small card.

---

## 3. Spacing system

Use only this practical spacing set unless a component requires a documented exception:

```text
4, 8, 12, 16, 20, 24, 32, 40, 48, 64
```

Recommended use:

- page horizontal padding: `16px` mobile, `24px` tablet, `32px` desktop
- section gap: `24–32px`
- card padding: `8–16px`
- form control gap: `12px`
- grid gap: `16px`
- footer top/bottom padding: `40–48px`

Do not introduce isolated values such as `13px`, `18px`, `22px`, or unrelated radii.

---

## 4. Layout patterns

### Shared page shell

```text
Header
Breadcrumb / page context
Main content on pale blue canvas
Footer information area
Lower legal/social strip
```

### Desktop catalog

```text
Main container: max-width about 1180–1240px
Direction: RTL
Right column: filters, about 260–280px
Left/main column: toolbar + 3-column product grid
Gap between sidebar and grid: 20–24px
```

### Tablet catalog

```text
Persistent sidebar may remain visible above about 900px
Sidebar width: about 220–240px
Grid: 2 or 3 columns depending on available card width
Never let cards become narrower than about 190px
```

### Mobile catalog

The provided montage does not contain a usable full mobile catalog frame. Implement the natural continuation of the visible system:

```text
One-column product grid
Search and sort at the top
Filters open in a drawer or modal
No persistent sidebar
16px page padding
Full-width controls
```

### Product detail

Desktop/tablet:

```text
Breadcrumb
Large white product media card
Large product image with internal rounded corners
White specifications card below
Specification content organized as label/value rows
Footer
```

Mobile:

```text
Breadcrumb
Title
Large media card
Specifications card
Rows stacked vertically
Footer sections stacked
```

---

## 5. Component specifications

### Header

Visual behavior:

- white background
- visually light bottom border
- compact height, approximately `64–72px`
- logo and navigation centered within the main container
- magenta primary action
- mobile navigation reduces to icon controls

Avoid:

- dark header backgrounds
- strong shadows
- oversized navigation
- decorative gradients

### Breadcrumb

- quiet muted-blue text
- small icons
- compact vertical spacing
- current page slightly darker
- placed directly above the main product content

### Catalog toolbar

The Figma shows a long rounded white toolbar above the grid.

Include:

- result count/title
- active filter chips
- sort control
- search when useful

Pattern:

```text
white surface
16px radius
12–16px padding
small muted labels
brand-soft active chips
```

### Filter panel

Each group is an independent white rounded card.

Group structure:

```text
Header row
Optional chevron
Compact options
Checkbox/radio/color state
```

Use:

- `16px` panel radius
- `12–16px` panel padding
- `8–12px` option gaps
- magenta active state
- dark neutral inactive icon state
- a prominent full-width magenta apply/search button

### Product card

Structure:

```text
White rounded outer card
Image at top
Product title
Optional model/category metadata
Outlined or soft action row
```

Recommended implementation:

- outer radius: `16px`
- image radius: `12px`
- card border: `#E3E8F0`
- no heavy shadow
- image ratio close to `4:3`
- product image uses `object-cover` for local design fixtures and `object-contain` for Fake Store products when needed
- title clamps to two lines
- action is a full-width quiet button with magenta text and arrow
- hover: subtle upward movement only, maximum `-2px`
- focus state must be visible

Do not put unrelated badges, ratings, price blocks, and multiple actions into every card unless the product contract requires them. The Figma card is visually simple.

### Product media card

- white outer surface
- `16px` radius
- image inside with `12px` radius
- optional small floating image action in a dark translucent circle
- no text overlay on the main image

### Specification card

Desktop:

```text
Section title
Rows with a quiet gray/blue background
Right label column
Left value/content column
Long descriptions wrap naturally
```

Mobile:

```text
Each property becomes one stacked soft row
Description is a larger multiline row
```

Use `field` background and consistent `10px` row radius.

### Footer

The visual contains two footer levels.

Primary footer:

- white background
- three information groups
- small headings
- muted links
- contact/social icons

Lower strip:

- very light background
- centered legal copy
- social icons in brand color
- optional trust/payment marks

Mobile footer groups stack vertically with generous separation.

---

## 6. Responsive rules

### Breakpoints

Use Tailwind defaults unless the repository already defines explicit alternatives.

```text
mobile: < 640px
small tablet: 640–899px
tablet/desktop transition: 900–1279px
desktop: >= 1280px
```

### Grid

```text
mobile: 1 column
small tablet: 2 columns
large tablet: 2 or 3 columns based on sidebar width
desktop: 3 columns with sidebar
```

### Cards

- maintain the same radius across breakpoints
- do not reduce mobile radius to zero
- keep product image and content inside one card
- avoid fixed card heights that clip Persian text

### Navigation and filters

- desktop/tablet: visible navigation and sidebar
- mobile: icon header and filter drawer
- active filter count may appear as a small magenta badge

---

## 7. Product content model

Keep the existing external API product contract intact.

Create a presentation-level type or mapper only when required:

```ts
export type CatalogProductView = {
  id: number
  slug: string
  name: string
  model?: string
  category: string
  price?: number
  image: string
  summary?: string
  featured?: boolean
  specifications?: Array<{
    label: string
    value: string
  }>
}
```

Recommended architecture:

```text
Fake Store API response
        ↓
Existing server API normalization
        ↓
Product domain object
        ↓
Optional catalog presentation mapper
        ↓
ProductCard / Product detail UI
```

Do not hardcode Figma-specific content directly into `ProductCard.vue`.

---

## 8. Normalized demo naming pattern

The visible Figma uses a technical product naming style that appears to combine:

```text
[product type] + [system/series] + "مدل" + [Latin model code]
```

Use this pattern for local visual fixtures only.

Examples:

```text
پنجره آلومینیومی ترمال‌بریک مدل SW72
پنجره دوجداره کشویی مدل SL60
پنجره لولایی دوحالته مدل TT70
در کشویی شیشه‌ای مدل GL80
در ورودی آلومینیومی مدل EN90
پنجره لیفت‌اند‌اسلاید مدل LS140
پنجره آلومینیومی ثابت مدل FX60
در بالکنی دوجداره مدل BD70
پنجره کلنگی مدل AW55
سیستم نمای شیشه‌ای مدل CW50
پنجره کشویی سه‌ریل مدل TR90
در اتوماتیک شیشه‌ای مدل AD100
```

Suggested categories:

```text
همه محصولات
پنجره آلومینیومی
پنجره دوجداره
درهای شیشه‌ای
سیستم کشویی
نمای شیشه‌ای
```

Suggested filters:

```text
جست‌وجوی محصول
دسته‌بندی
نوع بازشو
رنگ پروفیل
سری محصول
```

Suggested specification labels:

```text
برند
مدل
دسته‌بندی
توضیحات
جنس پروفیل
نوع شیشه
رنگ
عرض
ارتفاع
ضمانت
```

Important: these are normalized demo fixtures, not an exact transcription of tiny Figma text.

---

## 9. Demo fixtures

Create fixtures only for visual development or fallback behavior. The default production/challenge path must continue to consume the existing Nuxt server API.

```ts
export const figmaDemoProducts = [
  {
    id: 1001,
    slug: 'thermal-break-window-sw72',
    name: 'پنجره آلومینیومی ترمال‌بریک',
    model: 'SW72',
    category: 'پنجره آلومینیومی',
    image: '/images/demo/window-01.jpg',
    summary: 'سیستم پنجره آلومینیومی با عایق حرارتی و طراحی مناسب فضاهای مسکونی.',
    featured: true,
    specifications: [
      { label: 'جنس پروفیل', value: 'آلومینیوم ترمال‌بریک' },
      { label: 'نوع شیشه', value: 'دوجداره' },
      { label: 'نوع بازشو', value: 'لولایی دوحالته' },
      { label: 'رنگ', value: 'سفید' },
      { label: 'ضمانت', value: '۵ سال' }
    ]
  },
  {
    id: 1002,
    slug: 'sliding-window-sl60',
    name: 'پنجره دوجداره کشویی',
    model: 'SL60',
    category: 'سیستم کشویی',
    image: '/images/demo/window-02.jpg',
    summary: 'پنجره کشویی جمع‌وجور برای فضاهایی که به بازشوی روان و اشغال فضای کمتر نیاز دارند.',
    featured: true,
    specifications: [
      { label: 'جنس پروفیل', value: 'آلومینیوم' },
      { label: 'نوع شیشه', value: 'دوجداره' },
      { label: 'نوع بازشو', value: 'کشویی' },
      { label: 'تعداد ریل', value: '۲ ریل' },
      { label: 'ضمانت', value: '۳ سال' }
    ]
  },
  {
    id: 1003,
    slug: 'tilt-turn-window-tt70',
    name: 'پنجره لولایی دوحالته',
    model: 'TT70',
    category: 'پنجره دوجداره',
    image: '/images/demo/window-03.jpg',
    summary: 'پنجره دوحالته با امکان بازشوی کامل و حالت تهویه.',
    featured: false,
    specifications: [
      { label: 'جنس پروفیل', value: 'UPVC' },
      { label: 'نوع شیشه', value: 'دوجداره سکوریت' },
      { label: 'نوع بازشو', value: 'دوحالته' },
      { label: 'رنگ', value: 'سفید' },
      { label: 'ضمانت', value: '۵ سال' }
    ]
  },
  {
    id: 1004,
    slug: 'glass-sliding-door-gl80',
    name: 'در کشویی شیشه‌ای',
    model: 'GL80',
    category: 'درهای شیشه‌ای',
    image: '/images/demo/door-01.jpg',
    summary: 'در شیشه‌ای کشویی با فریم باریک برای فضاهای روشن و مینیمال.',
    featured: true,
    specifications: [
      { label: 'جنس پروفیل', value: 'آلومینیوم' },
      { label: 'نوع شیشه', value: 'سکوریت لمینت' },
      { label: 'نوع بازشو', value: 'کشویی' },
      { label: 'رنگ', value: 'نقره‌ای' },
      { label: 'ضمانت', value: '۳ سال' }
    ]
  },
  {
    id: 1005,
    slug: 'lift-slide-window-ls140',
    name: 'پنجره لیفت‌اند‌اسلاید',
    model: 'LS140',
    category: 'سیستم کشویی',
    image: '/images/demo/window-04.jpg',
    summary: 'سیستم کشویی بزرگ‌مقیاس برای دهانه‌های وسیع و دید باز.',
    featured: false,
    specifications: [
      { label: 'جنس پروفیل', value: 'آلومینیوم ترمال‌بریک' },
      { label: 'نوع شیشه', value: 'سه‌جداره' },
      { label: 'نوع بازشو', value: 'لیفت‌اند‌اسلاید' },
      { label: 'رنگ', value: 'خاکستری' },
      { label: 'ضمانت', value: '۵ سال' }
    ]
  },
  {
    id: 1006,
    slug: 'fixed-window-fx60',
    name: 'پنجره آلومینیومی ثابت',
    model: 'FX60',
    category: 'پنجره آلومینیومی',
    image: '/images/demo/window-05.jpg',
    summary: 'پنجره ثابت برای نورگیری بیشتر و ترکیب با سایر مدل‌های بازشو.',
    featured: false,
    specifications: [
      { label: 'جنس پروفیل', value: 'آلومینیوم' },
      { label: 'نوع شیشه', value: 'دوجداره' },
      { label: 'نوع بازشو', value: 'ثابت' },
      { label: 'رنگ', value: 'سفید' },
      { label: 'ضمانت', value: '۳ سال' }
    ]
  }
] satisfies CatalogProductView[]
```

Do not add these image paths unless matching assets exist. When assets are unavailable, retain the images returned by the current API.

---

## 10. Page-specific changes

### Catalog page

Refactor the current page toward the Figma composition:

1. Keep current SSR-safe server API fetching.
2. Remove or reduce the large marketing hero if it prevents alignment with the Figma catalog.
3. Add a compact breadcrumb.
4. Use a two-column RTL layout on desktop:
   - right filter sidebar
   - left catalog region
5. Move result information, active chips, and sort controls into one rounded toolbar.
6. Keep the URL-backed category filter.
7. Present cards with the extracted simple card style.
8. Add a clean empty state.
9. On mobile, move filters into a drawer.

### Product detail page

1. Add the same breadcrumb style.
2. Use one large white media surface.
3. Use a separate white specifications surface.
4. Convert product attributes to consistent label/value rows.
5. Keep dynamic SEO metadata.
6. Preserve loading, not-found, and error behavior.
7. Keep related products only if they do not conflict with the supplied detail design; place them after the specification card.

---

## 11. Nuxt UI alignment

Keep:

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

Standardize per-component `ui` overrides instead of writing deeply duplicated utility lists.

Recommended mapping:

- `UButton`: brand filled for primary action, brand outline/soft for secondary product action
- `UCard`: white surface, 16px radius, soft border, minimal shadow
- `UInput`: 10px radius, white or field background, brand focus ring
- `UCheckbox` / `URadio`: brand active state
- `UBadge`: pill shape, brand-soft background
- `USlideover` / `UDrawer`: mobile filters
- `USkeleton`: same radius as the final card or row

---

## 12. Implementation sequence

Perform the work in small reviewable steps.

### Step 1 — Baseline

- run lint
- run typecheck
- run production build
- record current behavior
- do not start visual changes while the baseline is broken

### Step 2 — Tokens

- add extracted semantic tokens
- remove arbitrary colors
- verify existing primary brand remains `#E20054`

### Step 3 — Shared shell

- align body canvas
- align header
- add breadcrumb component if useful
- align footer

### Step 4 — Catalog components

- add filter group component
- align toolbar
- simplify and restyle product card
- implement desktop grid/sidebar layout

### Step 5 — Product detail

- align media surface
- align specification rows
- verify mobile stacking

### Step 6 — Responsive pass

Check at least:

```text
375px
768px
1024px
1440px
```

### Step 7 — Quality

- keyboard navigation
- visible focus
- valid heading order
- image alt text
- loading/error/empty states
- no horizontal overflow
- no clipped Persian copy

### Step 8 — Verification

Run:

```bash
npm run lint
npm run typecheck
npm run build
```

---

## 13. Non-negotiable constraints

- Preserve Nuxt 4, Vue 3, TypeScript, Nuxt UI, and Tailwind.
- Preserve the existing server API as the default data source.
- Do not introduce Pinia only for page-local filters.
- Do not create a generic service/repository layer that only wraps one request.
- Do not hardcode products inside Vue components.
- Do not invent extra colors or gradients.
- Do not use more than the documented radius scale.
- Do not hide incomplete behavior behind non-functional buttons.
- Do not change desktop layout without checking tablet and mobile.
- Keep the interface Persian and RTL.
- Keep the implementation simple enough to review as a hiring challenge.

---

## 14. Completion criteria

The work is complete when:

- both pages visibly belong to the same design system;
- the canvas, surfaces, borders, text, and primary color match the extracted palette;
- catalog filters and cards follow the Figma composition;
- the product detail page uses the same surface and specification patterns;
- desktop, tablet, and mobile layouts are deliberate;
- API-backed data still loads through the current Nuxt server endpoints;
- loading, error, and empty states use the same design language;
- lint, typecheck, and build pass;
- there are no random one-off colors, radii, or spacing values.
