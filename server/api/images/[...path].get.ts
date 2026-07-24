export default defineEventHandler(async (event) => {
  const pathParam = getRouterParam(event, 'path')
  const ref = parseImagePath(pathParam)

  if (!ref) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Image not found'
    })
  }

  const image = await getCachedOrFetchImage(getImagesKv(event), ref)

  setHeader(event, 'Content-Type', image.contentType)
  setHeader(event, 'Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800')
  setHeader(event, 'X-Image-Cache', image.cacheStatus)

  return new Uint8Array(image.body)
})
