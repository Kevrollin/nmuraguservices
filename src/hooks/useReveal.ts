import { useEffect } from 'react'

/**
 * Gentle entrance for `[data-reveal]` blocks. Runs once after hydration and
 * only affects blocks that start below the fold, so nothing already on screen
 * flickers and the prerendered page stays fully visible without JavaScript.
 * Skipped entirely for visitors who prefer reduced motion.
 */
export function useReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          el.classList.add('reveal-in')
          el.classList.remove('reveal-pending')
          observer.unobserve(el)
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
    )

    const fold = window.innerHeight * 0.94
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      if (el.getBoundingClientRect().top > fold) {
        el.classList.add('reveal-pending')
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [])
}
