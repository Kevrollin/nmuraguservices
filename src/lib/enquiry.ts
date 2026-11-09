/**
 * Lets a "Ask about this service" link preselect that service in the
 * enquiry form, without coupling the two components.
 */
const EVENT = 'nm:select-service'

export function requestServiceEnquiry(serviceId: string) {
  window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: serviceId }))
}

export function onServiceEnquiry(handler: (serviceId: string) => void) {
  const listener = (event: Event) => handler((event as CustomEvent<string>).detail)
  window.addEventListener(EVENT, listener)
  return () => window.removeEventListener(EVENT, listener)
}
