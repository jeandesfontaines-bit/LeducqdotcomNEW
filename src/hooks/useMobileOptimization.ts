import { useEffect, useState } from 'react';

export interface MobileOptimizationConfig {
  enableTouchOptimization: boolean;
  enableViewportHeight: boolean;
  enableSafeArea: boolean;
}

/**
 * Hook for mobile optimization
 * Handles touch interactions, viewport, and safe areas
 */
export function useMobileOptimization(config: Partial<MobileOptimizationConfig> = {}) {
  const {
    enableTouchOptimization = true,
    enableViewportHeight = true,
    enableSafeArea = true,
  } = config;

  const [isMobile, setIsMobile] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [touchSupported, setTouchSupported] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check touch support
    const checkTouchSupport = () => {
      setTouchSupported(
        () =>
          ('ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            (navigator as any).msMaxTouchPoints > 0) as unknown as boolean
      );
    };

    // Set viewport height (for mobile 100vh bug)
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      setViewportHeight(window.innerHeight);
    };

    checkMobile();
    checkTouchSupport();
    setVH();

    window.addEventListener('resize', checkMobile);
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  // Enable touch optimization
  useEffect(() => {
    if (enableTouchOptimization && touchSupported) {
      document.documentElement.classList.add('touch-supported');
    }
  }, [enableTouchOptimization, touchSupported]);

  // Enable safe area support (notch handling)
  useEffect(() => {
    if (enableSafeArea) {
      document.documentElement.style.setProperty(
        '--safe-area-inset-top',
        'env(safe-area-inset-top, 0)'
      );
      document.documentElement.style.setProperty(
        '--safe-area-inset-bottom',
        'env(safe-area-inset-bottom, 0)'
      );
    }
  }, [enableSafeArea]);

  return { isMobile, viewportHeight, touchSupported };
}
