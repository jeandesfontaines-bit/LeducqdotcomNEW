/**
 * Performance Optimization Utilities
 * Code splitting, lazy loading, and caching strategies
 */

/**
 * Prefetch resource
 */
export function prefetchResource(href: string, as?: string) {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  if (as) link.as = as;
  document.head.appendChild(link);
}

/**
 * Preload resource (higher priority)
 */
export function preloadResource(href: string, as: string, type?: string) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  document.head.appendChild(link);
}

/**
 * DNS prefetch for external domains
 */
export function dnsPrefetch(domain: string) {
  const link = document.createElement('link');
  link.rel = 'dns-prefetch';
  link.href = `//${domain}`;
  document.head.appendChild(link);
}

/**
 * Measure performance metrics
 */
export function measurePerformance(label: string) {
  if ('performance' in window) {
    performance.mark(`${label}-start`);
    return () => {
      performance.mark(`${label}-end`);
      performance.measure(label, `${label}-start`, `${label}-end`);
      const measure = performance.getEntriesByName(label)[0];
      console.log(`${label}: ${measure.duration.toFixed(2)}ms`);
    };
  }
  return () => {};
}

/**
 * Request idle callback polyfill
 */
export function scheduleIdleCallback(callback: () => void) {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback);
  } else {
    setTimeout(callback, 1);
  }
}
