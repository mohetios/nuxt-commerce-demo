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

/**
 * Visual-development fixtures derived from the naming and content pattern
 * visible in the supplied Figma PNG.
 *
 * These are not an exact OCR transcription.
 * Keep the current Nuxt server API as the default application data source.
 */
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
