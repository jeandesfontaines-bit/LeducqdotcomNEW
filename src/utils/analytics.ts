/**
 * Analytics Utilities
 * Track page views, events, and performance metrics
 */

export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

/**
 * Track page view
 */
export function trackPageView(pathname: string, title?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: pathname,
      page_title: title || document.title,
    });
  }
}

/**
 * Track custom event
 */
export function trackEvent({ category, action, label, value }: AnalyticsEvent) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
}

/**
 * Track platform click
 */
export function trackPlatformClick(platformName: string) {
  trackEvent({
    category: 'engagement',
    action: 'platform_click',
    label: platformName,
  });
}

/**
 * Track music stream
 */
export function trackMusicStream(trackName: string, platform: string) {
  trackEvent({
    category: 'music',
    action: 'stream',
    label: `${trackName} on ${platform}`,
  });
}

/**
 * Measure Core Web Vitals
 */
export function measureWebVitals(onPerfEntry?: (entry: any) => void) {
  if ('web-vital' in window) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
}
