import { useEffect } from 'react';

/**
 * Scroll-reveal: marks elements with [data-reveal] as .in-view when they
 * enter the viewport. Re-runs when `deps` change so dynamically rendered
 * elements (e.g. "view all projects") are picked up too.
 */
export function useScrollReveal(deps: unknown[] = []) {
  useEffect(() => {
    document.documentElement.classList.add('reveal-ready');
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in-view'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' },
    );
    els.forEach((el) => {
      if (!el.classList.contains('in-view')) observer.observe(el);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
