import '@fontsource-variable/manrope'
import '@fontsource-variable/dm-sans'
import './styles/index.css'
import { startTransition, StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Production builds ship prerendered HTML (see scripts/prerender.mjs), which
// React hydrates. Hydrating inside a transition lets React work in short
// slices, so a tap during hydration isn't blocked. The dev server starts with
// an empty root instead.
if (root.firstElementChild) {
  startTransition(() => {
    hydrateRoot(root, app)
  })
} else {
  createRoot(root).render(app)
}
