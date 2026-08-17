/**
 * Accessibility Utilities
 * Helper functions and classes for accessibility improvements
 */

/**
 * Skip to main content link
 * Allows keyboard users to skip to main content
 */
export const skipToMainContent = {
  linkClass: "sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-black focus:font-bold",
  ariaLabel: "Skip to main content",
};

/**
 * Accessible focus styles
 */
export const focusStyles = "focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black";

/**
 * Semantic HTML role helpers
 */
export const roles = {
  navigation: "nav",
  main: "main",
  contentinfo: "contentinfo",
  list: "list",
  listitem: "listitem",
};

/**
 * ARIA labels for common patterns
 */
export const ariaLabels = {
  closeButton: "Close dialog",
  toggleMenu: "Toggle navigation menu",
  search: "Search content",
  play: "Play media",
  pause: "Pause media",
};

/**
 * Skip links component to inject at top of page
 */
export function SkipLinks() {
  return (
    <a
      href="#main-content"
      className={skipToMainContent.linkClass}
    >
      {skipToMainContent.ariaLabel}
    </a>
  );
}
