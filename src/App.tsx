import { LucideProvider } from 'lucide-react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Coverage } from './components/Coverage'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Reviews } from './components/Reviews'
import { Services } from './components/Services'
import { TrustBar } from './components/TrustBar'
import { WhyChooseUs } from './components/WhyChooseUs'
import { useReveal } from './hooks/useReveal'

export default function App() {
  useReveal()

  return (
    <LucideProvider strokeWidth={1.6}>
      <Navbar />
      <main id="main">
        <Hero />
        <TrustBar />
        <About />
        <Services />
        <WhyChooseUs />
        <Coverage />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </LucideProvider>
  )
}
