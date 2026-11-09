/**
 * Brand colours for the SVG artwork (hero illustration, reach diagram), which
 * can't read CSS variables in presentation attributes. Keep in step with
 * src/styles/tokens.css. Navy and gold are sampled from the Muragu & Co. CPA-K logo.
 */
export const palette = {
  navy: '#00204E',
  gold: '#CD8C00',
  /** Gold dark enough for small text on light backgrounds. */
  goldInk: '#8A5E00',
  paper: '#F7F6F1',
  slate: '#68717A',
} as const
