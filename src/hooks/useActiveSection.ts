import { useEffect, useState } from 'react'

/**
 * Returns the id of the navigation section currently in the upper part of
 * the viewport, for highlighting the matching navigation link.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  const key = ids.join('|')

  useEffect(() => {
    const sectionIds = key.split('|')
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0 || !('IntersectionObserver' in window)) return

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        const current = sectionIds.filter((id) => visible.has(id)).at(-1)
        if (current) setActive(current)
      },
      // A band from just below the header to the middle of the screen.
      { rootMargin: '-80px 0px -50% 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [key])

  return active
}
