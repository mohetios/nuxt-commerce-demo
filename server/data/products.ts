import type { Product } from '#shared/types/product'

/**
 * Demo commerce catalog for the hiring challenge storefront.
 * Served only through Nitro API routes under /api/*.
 */
export const demoProducts: Product[] = [
  {
    id: 1,
    title: 'کوله پشتی شهری ضدآب',
    slug: 'kole-poshti-shahri-zedab',
    price: 1890000,
    description: 'کوله پشتی سبک برای استفاده روزانه با فضای لپ‌تاپ ۱۵ اینچ، جیب‌های سازمان‌یافته و پارچه ضدآب. مناسب رفت‌وآمد شهری و سفرهای کوتاه.',
    category: 'لوازم سفر',
    image: '/products/product-1.jpg',
    images: [
      '/products/product-1.jpg',
      '/products/product-1-2.jpg',
      '/products/product-1-3.jpg'
    ],
    rating: { rate: 4.7, count: 128 },
    stock: 24,
    featured: true
  },
  {
    id: 2,
    title: 'تی‌شرت نخی یقه گرد مردانه',
    slug: 'tshirt-nakhi-yaghe-gerd',
    price: 420000,
    description: 'تی‌شرت نخی نرم با دوخت تمیز و برش استاندارد. مناسب استفاده روزمره در فصل گرم با تنفس‌پذیری بالا.',
    category: 'پوشاک مردانه',
    image: '/products/product-2.jpg',
    images: [
      '/products/product-2.jpg',
      '/products/product-2-2.jpg'
    ],
    rating: { rate: 4.3, count: 86 },
    stock: 60,
    featured: false
  },
  {
    id: 3,
    title: 'کت جین کلاسیک زنانه',
    slug: 'kot-jean-classic-zanane',
    price: 2450000,
    description: 'کت جین با قد متوسط، جیب‌های کاربردی و ظاهر مینیمال. ترکیب راحتی و استایل برای استفاده روزانه و نیمه‌رسمی.',
    category: 'پوشاک زنانه',
    image: '/products/product-3.jpg',
    images: [
      '/products/product-3.jpg',
      '/products/product-3-2.jpg'
    ],
    rating: { rate: 4.6, count: 94 },
    stock: 18,
    featured: true
  },
  {
    id: 4,
    title: 'هدفون بی‌سیم نویزکنسلینگ',
    slug: 'headphone-bisim-noise-cancelling',
    price: 6790000,
    description: 'هدفون بلوتوث با حذف نویز فعال، باتری طولانی‌مدت و صدای شفاف. مناسب کار، سفر و گوش دادن طولانی به موسیقی.',
    category: 'الکترونیک',
    image: '/products/product-4.jpg',
    images: [
      '/products/product-4.jpg',
      '/products/product-4-2.jpg',
      '/products/product-4-3.jpg'
    ],
    rating: { rate: 4.8, count: 211 },
    stock: 12,
    featured: true
  },
  {
    id: 5,
    title: 'ساعت مچی مینیمال استیل',
    slug: 'saat-machi-minimal-steel',
    price: 3180000,
    description: 'ساعت مچی با صفحه ساده، بند استیل و طراحی مینیمال. سبک و مناسب استایل روزمره و رسمی.',
    category: 'زیورآلات',
    image: '/products/product-5.jpg',
    images: [
      '/products/product-5.jpg',
      '/products/product-5-2.jpg'
    ],
    rating: { rate: 4.4, count: 67 },
    stock: 22,
    featured: false
  },
  {
    id: 6,
    title: 'کفش اسنیکر روزمره',
    slug: 'kafsh-sneaker-rozmare',
    price: 2750000,
    description: 'کفش اسنیکر سبک با کفی راحت و رویه تنفس‌پذیر. مناسب پیاده‌روی شهری و استایل کژوال.',
    category: 'کفش',
    image: '/products/product-6.jpg',
    images: [
      '/products/product-6.jpg',
      '/products/product-6-2.jpg'
    ],
    rating: { rate: 4.5, count: 153 },
    stock: 30,
    featured: true
  },
  {
    id: 7,
    title: 'لیوان سرامیکی دست‌ساز',
    slug: 'livan-seramiki-dastsaz',
    price: 290000,
    description: 'لیوان سرامیکی با لعاب مات و طراحی دست‌ساز. مناسب قهوه و چای روزانه با حس گرم و مینیمال.',
    category: 'خانه و آشپزخانه',
    image: '/products/product-7.jpg',
    images: [
      '/products/product-7.jpg',
      '/products/product-7-2.jpg'
    ],
    rating: { rate: 4.2, count: 41 },
    stock: 45,
    featured: false
  },
  {
    id: 8,
    title: 'کیف دوشی چرمی کوچک',
    slug: 'kif-doshi-chermi-kuchak',
    price: 1560000,
    description: 'کیف دوشی جمع‌وجور با جنس چرم مصنوعی باکیفیت، زیپ فلزی و بند قابل تنظیم. مناسب استفاده روزانه.',
    category: 'کیف و کوله',
    image: '/products/product-8.jpg',
    images: [
      '/products/product-8.jpg',
      '/products/product-8-2.jpg'
    ],
    rating: { rate: 4.1, count: 58 },
    stock: 16,
    featured: false
  },
  {
    id: 9,
    title: 'لامپ رومیزی LED قابل تنظیم',
    slug: 'lamp-roomizi-led',
    price: 980000,
    description: 'لامپ رومیزی با نور قابل تنظیم، بازوی منعطف و طراحی مدرن. مناسب میز کار، مطالعه و فضای شب.',
    category: 'خانه و آشپزخانه',
    image: '/products/product-9.jpg',
    images: [
      '/products/product-9.jpg',
      '/products/product-9-2.jpg'
    ],
    rating: { rate: 4.6, count: 73 },
    stock: 27,
    featured: false
  },
  {
    id: 10,
    title: 'عینک آفتابی پلاریزه',
    slug: 'eynak-aftabi-polarize',
    price: 1120000,
    description: 'عینک آفتابی با شیشه پلاریزه، فریم سبک و محافظت UV. مناسب رانندگی و فعالیت‌های فضای باز.',
    category: 'زیورآلات',
    image: '/products/product-10.jpg',
    images: [
      '/products/product-10.jpg',
      '/products/product-10-2.jpg'
    ],
    rating: { rate: 4.3, count: 102 },
    stock: 35,
    featured: true
  },
  {
    id: 11,
    title: 'ماوس بی‌سیم ارگونومیک',
    slug: 'mouse-bisim-ergonomic',
    price: 760000,
    description: 'ماوس بی‌سیم با طراحی ارگونومیک، کلیک بی‌صدا و دقت بالا. مناسب استفاده طولانی پشت میز کار.',
    category: 'الکترونیک',
    image: '/products/product-11.jpg',
    images: [
      '/products/product-11.jpg',
      '/products/product-11-2.jpg'
    ],
    rating: { rate: 4.4, count: 89 },
    stock: 40,
    featured: false
  },
  {
    id: 12,
    title: 'هودی پنبه‌ای ضخیم',
    slug: 'hoodie-panbei-zakim',
    price: 1340000,
    description: 'هودی پنبه‌ای ضخیم با کلاه یکپارچه و جیب جلو. گرم، نرم و مناسب فصل سرد.',
    category: 'پوشاک مردانه',
    image: '/products/product-12.jpg',
    images: [
      '/products/product-12.jpg',
      '/products/product-12-2.jpg'
    ],
    rating: { rate: 4.7, count: 120 },
    stock: 21,
    featured: true
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
