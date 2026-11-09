import { siteConfig } from '../data/siteConfig'
import './About.css'

const { business } = siteConfig

/** Only confirmed facts: no founding date, team size or client numbers. */
const facts = [
  { term: 'Practice', detail: 'Accounting, tax and business advisory' },
  { term: 'Led by', detail: `A ${business.credentialLong} (${business.credential})` },
  { term: 'Based in', detail: business.location.display },
  { term: 'Works with', detail: 'Individuals, entrepreneurs and small and medium-sized businesses' },
]

export function About() {
  return (
    <section id="about" className="section about" tabIndex={-1} aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__head" data-reveal>
          <p className="eyebrow">About the practice</p>
          <h2 id="about-title">Accounting that goes beyond the numbers.</h2>
        </div>

        <div className="about__body">
          <div className="about__copy" data-reveal>
            <p className="lead">
              Good financial management starts with accurate records and the right professional guidance.
            </p>
            <p>
              At {business.name}, we help individuals and businesses bring structure to their financial records,
              understand their obligations and make informed decisions.
            </p>
            <p>Our approach is built around professionalism, dependable support and practical financial guidance.</p>
          </div>

          <figure className="ledger" data-reveal>
            <figcaption className="ledger__caption">The practice at a glance</figcaption>
            <dl className="ledger__rows">
              {facts.map((fact) => (
                <div className="ledger__row" key={fact.term}>
                  <dt>{fact.term}</dt>
                  <dd>{fact.detail}</dd>
                </div>
              ))}
            </dl>
          </figure>
        </div>
      </div>
    </section>
  )
}
