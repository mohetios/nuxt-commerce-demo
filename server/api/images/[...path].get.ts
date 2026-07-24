import {
  getCachedOrFetchImage,
  getImagesKv,
  getPlaceholderCachedImage,
  parseImagePath
} from '~~/server/utils/image-cache'

function sendImage(
  event: Parameters<typeof setHeader>[0],
  image: { body: ArrayBuffer, contentType: string, cacheStatus: string }
) {
  setHeader(event, 'Content-Type', image.contentType)
  setHeader(event, 'Cache-Control', image.cacheStatus === 'FALLBACK'
    ? 'public, max-age=60'
    : 'public, max-age=86400, stale-while-revalidate=604800')
  setHeader(event, 'X-Image-Cache', image.cacheStatus)

  return new Uint8Array(image.body)
}

/**
 * Product/hero image proxy. Always returns a valid image response so NuxtImg
 * never receives a hard 4xx/5xx that leaves broken UI.
 */
export default defineEventHandler(async (event) => {
  try {
    const pathParam = getRouterParam(event, 'path')
    const ref = parseImagePath(pathParam)

    if (!ref) {
      return sendImage(event, getPlaceholderCachedImage())
    }

    const image = await getCachedOrFetchImage(getImagesKv(event), ref)
    return sendImage(event, image)
  } catch {
    return sendImage(event, getPlaceholderCachedImage())
  }
})
