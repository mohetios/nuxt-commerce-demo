import type { Product } from '#shared/types/product'
import { productImagePath, productImagePaths } from '~~/server/data/product-image-sources'

/**
 * Demo commerce catalog for the hiring challenge storefront.
 * Served only through Nitro API routes under /api/*.
 * Image fields are same-origin paths backed by the KV image cache.
 *
 * Titles follow the Figma visual naming pattern:
 * [product type] + [system/series] + "مدل" + [Latin model code]
 */
export const demoProducts: Product[] = [
  {
    id: 1,
    title: 'پنجره آلومینیومی ترمال‌بریک مدل SW72',
    slug: 'thermal-break-window-sw72',
    model: 'SW72',
    price: 18900000,
    description: 'سیستم پنجره آلومینیومی با عایق حرارتی و طراحی مناسب فضاهای مسکونی.',
    category: 'پنجره آلومینیومی',
    image: productImagePath(1, 0),
    images: productImagePaths(1),
    rating: { rate: 4.7, count: 128 },
    stock: 24,
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
    id: 2,
    title: 'پنجره دوجداره کشویی مدل SL60',
    slug: 'sliding-window-sl60',
    model: 'SL60',
    price: 12400000,
    description: 'پنجره کشویی جمع‌وجور برای فضاهایی که به بازشوی روان و اشغال فضای کمتر نیاز دارند.',
    category: 'سیستم کشویی',
    image: productImagePath(2, 0),
    images: productImagePaths(2),
    rating: { rate: 4.3, count: 86 },
    stock: 60,
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
    id: 3,
    title: 'پنجره لولایی دوحالته مدل TT70',
    slug: 'tilt-turn-window-tt70',
    model: 'TT70',
    price: 15600000,
    description: 'پنجره دوحالته با امکان بازشوی کامل و حالت تهویه.',
    category: 'پنجره دوجداره',
    image: productImagePath(3, 0),
    images: productImagePaths(3),
    rating: { rate: 4.6, count: 94 },
    stock: 18,
    featured: true,
    specifications: [
      { label: 'جنس پروفیل', value: 'UPVC' },
      { label: 'نوع شیشه', value: 'دوجداره سکوریت' },
      { label: 'نوع بازشو', value: 'دوحالته' },
      { label: 'رنگ', value: 'سفید' },
      { label: 'ضمانت', value: '۵ سال' }
    ]
  },
  {
    id: 4,
    title: 'در کشویی شیشه‌ای مدل GL80',
    slug: 'glass-sliding-door-gl80',
    model: 'GL80',
    price: 28700000,
    description: 'در شیشه‌ای کشویی با فریم باریک برای فضاهای روشن و مینیمال.',
    category: 'درهای شیشه‌ای',
    image: productImagePath(4, 0),
    images: productImagePaths(4),
    rating: { rate: 4.8, count: 211 },
    stock: 12,
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
    id: 5,
    title: 'در ورودی آلومینیومی مدل EN90',
    slug: 'aluminum-entrance-door-en90',
    model: 'EN90',
    price: 31800000,
    description: 'در ورودی آلومینیومی با عایق مناسب، قفل چندنقطه‌ای و ظاهر مدرن.',
    category: 'درهای شیشه‌ای',
    image: productImagePath(5, 0),
    images: productImagePaths(5),
    rating: { rate: 4.4, count: 67 },
    stock: 22,
    featured: false,
    specifications: [
      { label: 'جنس پروفیل', value: 'آلومینیوم ترمال‌بریک' },
      { label: 'نوع شیشه', value: 'سکوریت' },
      { label: 'نوع بازشو', value: 'لولایی' },
      { label: 'رنگ', value: 'آنترسیت' },
      { label: 'ضمانت', value: '۵ سال' }
    ]
  },
  {
    id: 6,
    title: 'پنجره لیفت‌اند‌اسلاید مدل LS140',
    slug: 'lift-slide-window-ls140',
    model: 'LS140',
    price: 45200000,
    description: 'سیستم کشویی بزرگ‌مقیاس برای دهانه‌های وسیع و دید باز.',
    category: 'سیستم کشویی',
    image: productImagePath(6, 0),
    images: productImagePaths(6),
    rating: { rate: 4.5, count: 153 },
    stock: 30,
    featured: true,
    specifications: [
      { label: 'جنس پروفیل', value: 'آلومینیوم ترمال‌بریک' },
      { label: 'نوع شیشه', value: 'سه‌جداره' },
      { label: 'نوع بازشو', value: 'لیفت‌اند‌اسلاید' },
      { label: 'رنگ', value: 'خاکستری' },
      { label: 'ضمانت', value: '۵ سال' }
    ]
  },
  {
    id: 7,
    title: 'پنجره آلومینیومی ثابت مدل FX60',
    slug: 'fixed-window-fx60',
    model: 'FX60',
    price: 8900000,
    description: 'پنجره ثابت برای نورگیری بیشتر و ترکیب با سایر مدل‌های بازشو.',
    category: 'پنجره آلومینیومی',
    image: productImagePath(7, 0),
    images: productImagePaths(7),
    rating: { rate: 4.2, count: 41 },
    stock: 45,
    featured: false,
    specifications: [
      { label: 'جنس پروفیل', value: 'آلومینیوم' },
      { label: 'نوع شیشه', value: 'دوجداره' },
      { label: 'نوع بازشو', value: 'ثابت' },
      { label: 'رنگ', value: 'سفید' },
      { label: 'ضمانت', value: '۳ سال' }
    ]
  },
  {
    id: 8,
    title: 'در بالکنی دوجداره مدل BD70',
    slug: 'balcony-door-bd70',
    model: 'BD70',
    price: 21400000,
    description: 'در بالکنی دوجداره با عایق صوتی مناسب و بازشوی روان.',
    category: 'پنجره دوجداره',
    image: productImagePath(8, 0),
    images: productImagePaths(8),
    rating: { rate: 4.1, count: 58 },
    stock: 16,
    featured: false,
    specifications: [
      { label: 'جنس پروفیل', value: 'UPVC' },
      { label: 'نوع شیشه', value: 'دوجداره' },
      { label: 'نوع بازشو', value: 'لولایی' },
      { label: 'رنگ', value: 'سفید' },
      { label: 'ضمانت', value: '۵ سال' }
    ]
  },
  {
    id: 9,
    title: 'پنجره کلنگی مدل AW55',
    slug: 'awning-window-aw55',
    model: 'AW55',
    price: 9800000,
    description: 'پنجره کلنگی مناسب تهویه کنترل‌شده در فضاهای اداری و مسکونی.',
    category: 'پنجره دوجداره',
    image: productImagePath(9, 0),
    images: productImagePaths(9),
    rating: { rate: 4.6, count: 73 },
    stock: 27,
    featured: false,
    specifications: [
      { label: 'جنس پروفیل', value: 'آلومینیوم' },
      { label: 'نوع شیشه', value: 'دوجداره' },
      { label: 'نوع بازشو', value: 'کلنگی' },
      { label: 'رنگ', value: 'سفید' },
      { label: 'ضمانت', value: '۳ سال' }
    ]
  },
  {
    id: 10,
    title: 'سیستم نمای شیشه‌ای مدل CW50',
    slug: 'curtain-wall-cw50',
    model: 'CW50',
    price: 67500000,
    description: 'سیستم نمای شیشه‌ای برای ساختمان‌های تجاری با خطوط باریک و دید وسیع.',
    category: 'نمای شیشه‌ای',
    image: productImagePath(10, 0),
    images: productImagePaths(10),
    rating: { rate: 4.3, count: 102 },
    stock: 35,
    featured: true,
    specifications: [
      { label: 'جنس پروفیل', value: 'آلومینیوم' },
      { label: 'نوع شیشه', value: 'لمینت سکوریت' },
      { label: 'نوع بازشو', value: 'ثابت / ترکیبی' },
      { label: 'رنگ', value: 'نقره‌ای' },
      { label: 'ضمانت', value: '۵ سال' }
    ]
  },
  {
    id: 11,
    title: 'پنجره کشویی سه‌ریل مدل TR90',
    slug: 'triple-rail-sliding-tr90',
    model: 'TR90',
    price: 19800000,
    description: 'پنجره کشویی سه‌ریل برای دهانه‌های عریض با امکان ترکیب چند لت متحرک.',
    category: 'سیستم کشویی',
    image: productImagePath(11, 0),
    images: productImagePaths(11),
    rating: { rate: 4.4, count: 89 },
    stock: 40,
    featured: false,
    specifications: [
      { label: 'جنس پروفیل', value: 'آلومینیوم' },
      { label: 'نوع شیشه', value: 'دوجداره' },
      { label: 'نوع بازشو', value: 'کشویی سه‌ریل' },
      { label: 'رنگ', value: 'خاکستری' },
      { label: 'ضمانت', value: '۳ سال' }
    ]
  },
  {
    id: 12,
    title: 'در اتوماتیک شیشه‌ای مدل AD100',
    slug: 'automatic-glass-door-ad100',
    model: 'AD100',
    price: 52400000,
    description: 'در اتوماتیک شیشه‌ای مناسب ورودی فروشگاه‌ها و فضاهای پرتردد.',
    category: 'درهای شیشه‌ای',
    image: productImagePath(12, 0),
    images: productImagePaths(12),
    rating: { rate: 4.7, count: 120 },
    stock: 21,
    featured: true,
    specifications: [
      { label: 'جنس پروفیل', value: 'آلومینیوم' },
      { label: 'نوع شیشه', value: 'سکوریت' },
      { label: 'نوع بازشو', value: 'اتوماتیک کشویی' },
      { label: 'رنگ', value: 'نقره‌ای' },
      { label: 'ضمانت', value: '۲ سال' }
    ]
  }
]

export function listDemoProducts() {
  return demoProducts
}

export function listDemoCategories() {
  return [...new Set(demoProducts.map(product => product.category))].sort((a, b) => a.localeCompare(b, 'fa'))
}

export function findDemoProduct(id: number) {
  return demoProducts.find(product => product.id === id)
}

export function listRelatedDemoProducts(product: Product, limit = 3) {
  const sameCategory = demoProducts.filter(item => item.category === product.category && item.id !== product.id)
  const fallback = demoProducts.filter(item => item.id !== product.id)

  return (sameCategory.length ? sameCategory : fallback).slice(0, limit)
}
