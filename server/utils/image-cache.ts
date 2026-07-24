import type { H3Event } from 'h3'
import {
  getProductImageSource,
  heroImageSource
} from '~~/server/data/product-image-sources'

export type ImagesKv = {
  get: (key: string, type: 'arrayBuffer') => Promise<ArrayBuffer | null>
  getWithMetadata: (
    key: string,
    type: 'arrayBuffer'
  ) => Promise<{
    value: ArrayBuffer | null
    metadata: { contentType?: string } | null
  }>
  put: (
    key: string,
    value: ArrayBuffer | ArrayBufferView | string,
    options?: {
      expirationTtl?: number
      metadata?: { contentType: string }
    }
  ) => Promise<void>
}

export type CachedImage = {
  body: ArrayBuffer
  contentType: string
  cacheStatus: 'HIT' | 'MISS' | 'BYPASS' | 'SEED' | 'FALLBACK'
}

/** 30 days — demo images rarely change. */
const IMAGE_TTL_SECONDS = 60 * 60 * 24 * 30

const PLACEHOLDER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800" role="img" aria-label="تصویر موجود نیست">
  <rect width="800" height="800" fill="#f4f4f5"/>
  <rect x="260" y="240" width="280" height="220" rx="20" fill="none" stroke="#d4d4d8" stroke-width="10"/>
  <circle cx="350" cy="310" r="32" fill="#d4d4d8"/>
  <path d="M290 420 L360 340 L410 390 L460 330 L510 420 Z" fill="#d4d4d8"/>
  <text x="400" y="540" text-anchor="middle" font-family="system-ui,sans-serif" font-size="28" fill="#a1a1aa">تصویر موجود نیست</text>
</svg>`

type ImageRef
  = | { kind: 'hero' }
    | { kind: 'product', productId: number, slot: number }

export function parseImagePath(pathParam: string | string[] | undefined): ImageRef | null {
  const segments = (Array.isArray(pathParam)
    ? pathParam
    : (pathParam ?? '').split('/'))
    .map(segment => segment.trim())
    .filter(Boolean)

  if (segments.length === 1 && segments[0] === 'hero') {
    return { kind: 'hero' }
  }

  if (segments.length === 1 || segments.length === 2) {
    const productId = Number(segments[0])
    const slot = segments.length === 2 ? Number(segments[1]) : 0

    if (!Number.isInteger(productId) || productId < 1) return null
    if (!Number.isInteger(slot) || slot < 0) return null

    return { kind: 'product', productId, slot }
  }

  return null
}

export function resolveImageSource(ref: ImageRef) {
  if (ref.kind === 'hero') {
    return {
      key: 'image:hero',
      sourceUrl: heroImageSource,
      seedPath: 'demo-images/hero.jpg'
    }
  }

  const sourceUrl = getProductImageSource(ref.productId, ref.slot)
  if (!sourceUrl) return null

  return {
    key: `image:${ref.productId}:${ref.slot}`,
    sourceUrl,
    seedPath: `demo-images/${ref.productId}/${ref.slot}.jpg`
  }
}

function toArrayBuffer(value: unknown): ArrayBuffer | null {
  if (value == null) return null
  if (value instanceof ArrayBuffer) return value
  if (ArrayBuffer.isView(value)) {
    return value.buffer.slice(value.byteOffset, value.byteOffset + value.byteLength) as ArrayBuffer
  }
  return null
}

function getPlaceholderImage(): CachedImage {
  const bytes = new TextEncoder().encode(PLACEHOLDER_SVG)
  return {
    body: bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer,
    contentType: 'image/svg+xml; charset=utf-8',
    cacheStatus: 'FALLBACK'
  }
}

async function fetchUpstreamImage(sourceUrl: string) {
  const response = await fetch(sourceUrl, {
    headers: {
      'Accept': 'image/*',
      'User-Agent': 'nuxt-commerce-demo-image-cache/1.0'
    }
  })

  if (!response.ok) {
    throw new Error(`Upstream image fetch failed (${response.status})`)
  }

  const contentType = response.headers.get('content-type')?.split(';')[0]?.trim() || 'image/jpeg'
  const body = await response.arrayBuffer()

  if (!body.byteLength) {
    throw new Error('Upstream image fetch returned empty body')
  }

  return { body, contentType }
}

async function readSeedImage(seedPath: string) {
  try {
    const raw = await useStorage('assets:server').getItemRaw(seedPath)
    const body = toArrayBuffer(raw)

    if (!body || body.byteLength === 0) return null

    return {
      body,
      contentType: 'image/jpeg'
    }
  } catch {
    return null
  }
}

async function resolveImageBytes(sourceUrl: string, seedPath: string) {
  try {
    const upstream = await fetchUpstreamImage(sourceUrl)
    return { ...upstream, fromSeed: false as const }
  } catch {
    const seeded = await readSeedImage(seedPath)
    if (!seeded) {
      return null
    }
    return { ...seeded, fromSeed: true as const }
  }
}

async function writeImageCache(
  kv: ImagesKv | undefined,
  key: string,
  body: ArrayBuffer,
  contentType: string
) {
  if (!kv) return

  try {
    await kv.put(key, body, {
      expirationTtl: IMAGE_TTL_SECONDS,
      metadata: { contentType }
    })
  } catch {
    // Cache write failures should not break image delivery.
  }
}

async function readImageCache(kv: ImagesKv | undefined, key: string) {
  if (!kv) return null

  try {
    const cached = await kv.getWithMetadata(key, 'arrayBuffer')
    if (!cached.value || cached.value.byteLength === 0) return null

    return {
      body: cached.value,
      contentType: cached.metadata?.contentType || 'image/jpeg',
      cacheStatus: 'HIT' as const
    }
  } catch {
    // Cache read failures should fall through to upstream/seed/placeholder.
    return null
  }
}

/**
 * Always resolves to a valid image body.
 * Prefer KV → Unsplash → seed bytes → inline SVG placeholder (never throws).
 */
export async function getCachedOrFetchImage(
  kv: ImagesKv | undefined,
  ref: ImageRef
): Promise<CachedImage> {
  const resolved = resolveImageSource(ref)
  if (!resolved) {
    return getPlaceholderImage()
  }

  const { key, sourceUrl, seedPath } = resolved

  const cached = await readImageCache(kv, key)
  if (cached) return cached

  const image = await resolveImageBytes(sourceUrl, seedPath)
  if (!image) {
    return getPlaceholderImage()
  }

  await writeImageCache(kv, key, image.body, image.contentType)

  return {
    body: image.body,
    contentType: image.contentType,
    cacheStatus: kv
      ? (image.fromSeed ? 'SEED' : 'MISS')
      : (image.fromSeed ? 'SEED' : 'BYPASS')
  }
}

export function getPlaceholderCachedImage() {
  return getPlaceholderImage()
}

export function getImagesKv(event: H3Event): ImagesKv | undefined {
  try {
    const cloudflare = event.context.cloudflare as { env?: { IMAGES_KV?: ImagesKv } } | undefined
    return cloudflare?.env?.IMAGES_KV
  } catch {
    return undefined
  }
}
