// Property photos are stored on Cloudinary. Asking Cloudinary for a resized, compressed copy
// (instead of the original upload, often 3-8 MB) is the single biggest speed-up for the listings.
//   f_auto -> modern format the browser supports (WebP/AVIF)
//   q_auto -> automatic quality
//   w_XXX  -> only as wide as the screen needs
const CLOUDINARY_MARKER = '/image/upload/'

export const optimizeImage = (url: string | undefined | null, width: number): string => {
  if (!url) return ''
  if (!url.includes('res.cloudinary.com') || !url.includes(CLOUDINARY_MARKER)) return url
  // Already transformed (contains f_auto or w_): leave it alone
  if (/\/upload\/[^/]*(f_auto|w_\d+)/.test(url)) return url
  return url.replace(CLOUDINARY_MARKER, `${CLOUDINARY_MARKER}f_auto,q_auto,c_limit,w_${width}/`)
}

/** `srcset` string so phones download the small file and big screens the larger one */
export const imageSrcSet = (url: string | undefined | null, widths: number[]): string | undefined => {
  if (!url || !url.includes('res.cloudinary.com')) return undefined
  return widths.map((w) => `${optimizeImage(url, w)} ${w}w`).join(', ')
}
