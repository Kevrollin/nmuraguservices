import type { ReviewExcerpt } from '../data/siteConfig'

/**
 * Displays genuine review excerpts, if any have been approved and added to
 * siteConfig.reviews.excerpts. Renders nothing while that list is empty.
 */
export function ReviewExcerpts({ excerpts, platform }: { excerpts: ReviewExcerpt[]; platform: string }) {
  if (excerpts.length === 0) return null

  return (
    <ul className="excerpts" aria-label={`Excerpts from ${platform} reviews`}>
      {excerpts.map((excerpt) => (
        <li key={`${excerpt.author}-${excerpt.quote.slice(0, 24)}`} className="excerpt">
          <figure>
            <blockquote className="excerpt__quote">
              <p>&ldquo;{excerpt.quote}&rdquo;</p>
            </blockquote>
            <figcaption className="excerpt__meta">
              <span className="excerpt__author">{excerpt.author}</span>
              <span>
                {platform} review{excerpt.date ? `, ${excerpt.date}` : ''}
              </span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  )
}
