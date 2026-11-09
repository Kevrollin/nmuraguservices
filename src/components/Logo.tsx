import { siteConfig } from '../data/siteConfig'

interface LogoProps {
  /** `onLight` for light backgrounds, `onDark` for navy backgrounds. */
  variant?: 'onLight' | 'onDark'
  className?: string
  /** Use "lazy" below the fold (the footer) so it isn't preloaded with the page. */
  loading?: 'eager' | 'lazy'
}

/**
 * The brand logo. It reads its files from siteConfig.brand, so swapping in
 * the owner's official logo needs no component changes.
 */
export function Logo({ variant = 'onLight', className, loading }: LogoProps) {
  const { logo } = siteConfig.brand
  return (
    <img
      src={logo[variant]}
      width={logo.width}
      height={logo.height}
      alt={logo.alt}
      className={className}
      loading={loading}
      decoding="async"
    />
  )
}
