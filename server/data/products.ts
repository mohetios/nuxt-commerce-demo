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
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=900&q=80'
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
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80'
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
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=900&q=80'
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
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80'
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
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=900&q=80'
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
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=900&q=80'
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
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1577937927133-66ef06acdf4a?auto=format&fit=crop&w=900&q=80'
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
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a67478a?auto=format&fit=crop&w=900&q=80'
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
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=80'
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
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80'
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
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=900&q=80'
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
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1578587018452-892badc357af?auto=format&fit=crop&w=900&q=80'
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
