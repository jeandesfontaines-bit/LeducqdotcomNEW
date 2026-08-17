/**
 * SEO Utilities
 * Meta tags, Open Graph, and structured data helpers
 */

export interface MetaTags {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
}

/**
 * Update document meta tags
 */
export function updateMetaTags({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
}: MetaTags) {
  // Title
  document.title = title;
  updateOrCreateMetaTag('og:title', title);
  updateOrCreateMetaTag('twitter:title', title);

  // Description
  updateOrCreateMetaTag('description', description);
  updateOrCreateMetaTag('og:description', description);
  updateOrCreateMetaTag('twitter:description', description);

  // Canonical
  if (canonical) {
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;
  }

  // OG Image
  if (ogImage) {
    updateOrCreateMetaTag('og:image', ogImage);
    updateOrCreateMetaTag('twitter:image', ogImage);
  }

  // OG Type
  updateOrCreateMetaTag('og:type', ogType);

  // Twitter
  updateOrCreateMetaTag('twitter:card', twitterCard);
}

/**
 * Update or create meta tag
 */
function updateOrCreateMetaTag(name: string, content: string) {
  let tag = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`) as HTMLMetaElement;
  if (!tag) {
    tag = document.createElement('meta');
    if (name.startsWith('og:')) {
      tag.setAttribute('property', name);
    } else {
      tag.setAttribute('name', name);
    }
    document.head.appendChild(tag);
  }
  tag.content = content;
}

/**
 * Generate JSON-LD structured data
 */
export function generateJsonLd(data: Record<string, any>) {
  let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

/**
 * Generate sitemap entries
 */
export function generateSitemapEntry(url: string, lastmod?: string, priority = 0.8) {
  return {
    url,
    lastmod: lastmod || new Date().toISOString().split('T')[0],
    priority,
  };
}
