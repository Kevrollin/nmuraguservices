import type { MouseEvent } from 'react'

/**
 * Scrolls to an in-page section and moves keyboard focus there. Smoothness
 * comes from the CSS `scroll-behavior`, which is only set when the visitor
 * has not asked for reduced motion.
 */
export function scrollToSection(id: string) {
  const target = document.getElementById(id)
  if (!target) return

  if (id === 'top') window.scrollTo({ top: 0 })
  else target.scrollIntoView({ block: 'start' })

  const url = id === 'top' ? window.location.pathname + window.location.search : `#${id}`
  window.history.replaceState(null, '', url)
  target.focus({ preventScroll: true })
}

/**
 * Click handler for `<a href="#id">` links. Leaves modified clicks (new tab,
 * etc.) to the browser. Before hydration the plain anchor still works.
 */
export function handleSectionLink(event: MouseEvent<HTMLAnchorElement>, id: string, after?: () => void) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return
  }
  event.preventDefault()
  after?.()
  scrollToSection(id)
}
