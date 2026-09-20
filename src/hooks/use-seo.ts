import { useEffect } from 'react'

interface SeoOptions {
  title: string
  description?: string
  /** Pages that should not appear in Google (login, admin, ...) */
  noindex?: boolean
}

const SITE_NAME = 'NestFinder Pro'
const DEFAULT_DESCRIPTION = 'NestFinder Pro: find, rent and buy homes across Nigeria.'

const setMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(selector)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

const setCanonical = (href: string) => {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = href
}

// Sets the tab title and the search / social-share tags for the current page.
// Call it once at the top of a page component.
export const useSeo = ({ title, description = DEFAULT_DESCRIPTION, noindex = false }: SeoOptions) => {
  useEffect(() => {
    const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`
    document.title = fullTitle

    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', window.location.href)
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    setCanonical(`${window.location.origin}${window.location.pathname}`)
  }, [title, description, noindex])
}
