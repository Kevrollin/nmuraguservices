import { Menu, MessageCircle, Phone, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '../data/siteConfig'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrolled } from '../hooks/useScrolled'
import { external, generalEnquiryHref, telHref } from '../lib/links'
import { handleSectionLink } from '../lib/scroll'
import { Logo } from './Logo'
import './Navbar.css'

const { navigation, contact } = siteConfig
const navIds = navigation.map((item) => item.id)

export function Navbar() {
  const scrolled = useScrolled()
  const active = useActiveSection(navIds)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Mobile menu: lock page scroll, close on Escape, keep focus sensible.
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    root.classList.add('menu-open')
    panelRef.current?.querySelector<HTMLElement>('a')?.focus({ preventScroll: true })

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onResize = () => {
      if (window.innerWidth >= 960) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      root.classList.remove('menu-open')
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`site-header${scrolled || open ? ' is-raised' : ''}${open ? ' is-open' : ''}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="container site-header__inner">
        <a className="site-header__brand" href="#top" onClick={(e) => handleSectionLink(e, 'top', close)}>
          <Logo className="site-header__logo" />
        </a>

        <nav className="site-nav" aria-label="Main">
          <ul className="site-nav__list">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  className="site-nav__link"
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  onClick={(e) => handleSectionLink(e, item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="btn btn--primary btn--sm site-header__cta" href="#contact" onClick={(e) => handleSectionLink(e, 'contact')}>
          Let&rsquo;s Talk
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>

      <div id="mobile-menu" ref={panelRef} className="mobile-menu" hidden={!open}>
        <nav aria-label="Mobile">
          <ul className="mobile-menu__list">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  className="mobile-menu__link"
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  onClick={(e) => handleSectionLink(e, item.id, close)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu__actions">
          <a className="btn btn--primary" href={telHref}>
            <Phone /> Call {contact.phone.display}
          </a>
          <a className="btn btn--secondary" href={generalEnquiryHref} {...external}>
            <MessageCircle /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </header>
  )
}
