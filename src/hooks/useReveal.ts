import { useEffect, useRef } from "react";

export const useReveal = (options: IntersectionObserverInit = {}) => {
  const ref = useRef<HTMLDivElement | HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, ...options });

    el.querySelectorAll(".in-view-item").forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [options]);

  return ref;
};
