import { CircleCheck, Lock, Send } from 'lucide-react'
import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { publishedServices } from '../data/siteConfig'
import { onServiceEnquiry } from '../lib/enquiry'
import { enquiryMessage, external, whatsappHref } from '../lib/links'

type Field = 'name' | 'phone' | 'service' | 'message'
type Values = Record<Field, string>
type Errors = Partial<Record<Field, string>>

const GENERAL = 'general'
const MESSAGE_MAX = 600

const serviceOptions = [
  ...publishedServices.map((service) => ({ value: service.id, label: service.title })),
  { value: GENERAL, label: 'General enquiry' },
]

const empty: Values = { name: '', phone: '', service: '', message: '' }
const order: Field[] = ['name', 'phone', 'service', 'message']

function validate(values: Values): Errors {
  const errors: Errors = {}

  if (values.name.trim().length < 2) errors.name = 'Please enter your full name.'

  const phone = values.phone.replace(/[\s().-]/g, '')
  if (!phone) errors.phone = 'Please enter a phone number we can reach you on.'
  else if (!/^\+?\d{9,15}$/.test(phone)) errors.phone = 'Please enter a valid phone number, for example 0712 345 678.'

  if (!serviceOptions.some((option) => option.value === values.service)) {
    errors.service = 'Please choose the service you need.'
  }

  if (values.message.trim().length < 10) errors.message = 'Please add a short message (at least 10 characters).'

  return errors
}

export function EnquiryForm() {
  const id = useId()
  const fieldId = (field: Field) => `${id}-${field}`
  const formRef = useRef<HTMLFormElement>(null)
  const [values, setValues] = useState<Values>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [attempted, setAttempted] = useState(false)
  const [sentHref, setSentHref] = useState<string | null>(null)
  // The prerendered form can't submit until React has hydrated it; before
  // then a native submit would put the enquiry in the page URL.
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])

  // "Ask about this service" links preselect the service.
  useEffect(
    () =>
      onServiceEnquiry((serviceId) => {
        if (!serviceOptions.some((option) => option.value === serviceId)) return
        setValues((current) => ({ ...current, service: serviceId }))
        setErrors((current) => ({ ...current, service: undefined }))
      }),
    [],
  )

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [event.target.name as Field]: event.target.value }
    setValues(next)
    setSentHref(null)
    if (attempted) setErrors(validate(next))
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setAttempted(true)
    const found = validate(values)
    setErrors(found)

    const firstInvalid = order.find((field) => found[field])
    if (firstInvalid) {
      const control = formRef.current?.elements.namedItem(firstInvalid)
      if (control instanceof HTMLElement) control.focus()
      return
    }

    const service = serviceOptions.find((option) => option.value === values.service)?.label ?? 'General enquiry'
    const href = whatsappHref(
      enquiryMessage({
        name: values.name.trim(),
        phone: values.phone.trim(),
        service,
        message: values.message.trim(),
      }),
    )
    window.open(href, '_blank', 'noopener,noreferrer')
    setSentHref(href)
  }

  const errorCount = Object.values(errors).filter(Boolean).length

  const describedBy = (field: Field, extra?: string) =>
    [errors[field] ? `${fieldId(field)}-error` : null, extra].filter(Boolean).join(' ') || undefined

  const errorText = (field: Field) =>
    errors[field] ? (
      <p id={`${fieldId(field)}-error`} className="field__error">
        {errors[field]}
      </p>
    ) : null

  return (
    <form ref={formRef} className="enquiry" noValidate onSubmit={onSubmit} aria-labelledby={`${id}-title`}>
      <div className="enquiry__head">
        <h3 id={`${id}-title`}>Send an enquiry</h3>
        <p>Fill in a few details and we&rsquo;ll open WhatsApp with your message ready to send.</p>
      </div>

      <div className="enquiry__row">
        <div className={`field${errors.name ? ' has-error' : ''}`}>
          <label htmlFor={fieldId('name')}>Full name</label>
          <input
            id={fieldId('name')}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={80}
            value={values.name}
            onChange={onChange}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy('name')}
            required
          />
          {errorText('name')}
        </div>

        <div className={`field${errors.phone ? ' has-error' : ''}`}>
          <label htmlFor={fieldId('phone')}>Phone number</label>
          <input
            id={fieldId('phone')}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="e.g. 0712 345 678"
            maxLength={20}
            value={values.phone}
            onChange={onChange}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describedBy('phone')}
            required
          />
          {errorText('phone')}
        </div>
      </div>

      <div className={`field${errors.service ? ' has-error' : ''}`}>
        <label htmlFor={fieldId('service')}>Service required</label>
        <div className="field__select">
          <select
            id={fieldId('service')}
            name="service"
            value={values.service}
            onChange={onChange}
            aria-invalid={errors.service ? true : undefined}
            aria-describedby={describedBy('service')}
            required
          >
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {errorText('service')}
      </div>

      <div className={`field${errors.message ? ' has-error' : ''}`}>
        <div className="field__label-row">
          <label htmlFor={fieldId('message')}>Short message</label>
          <span id={`${fieldId('message')}-count`} className="field__count tabular">
            {values.message.length}/{MESSAGE_MAX}
          </span>
        </div>
        <textarea
          id={fieldId('message')}
          name="message"
          rows={4}
          maxLength={MESSAGE_MAX}
          placeholder="Briefly describe what you need help with."
          value={values.message}
          onChange={onChange}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy('message', `${fieldId('message')}-count`)}
          required
        />
        {errorText('message')}
      </div>

      <p className="enquiry__privacy">
        <Lock size={16} />
        <span>
          For your security, please don&rsquo;t include passwords, PINs, KRA or iTax login details, or confidential
          financial documents in this form.
        </span>
      </p>

      <button type="submit" className="btn btn--primary btn--lg enquiry__submit" disabled={!hydrated}>
        Send via WhatsApp
        <Send className="icon-nudge-x" />
      </button>

      <div className="enquiry__status" role="status" aria-live="polite">
        {attempted && errorCount > 0 && (
          <p className="enquiry__status-error">
            Please check the {errorCount === 1 ? 'highlighted field' : `${errorCount} highlighted fields`}.
          </p>
        )}
        {sentHref && (
          <p className="enquiry__status-ok">
            <CircleCheck size={18} />
            <span>
              Your message is ready in WhatsApp. Press send there to deliver it.{' '}
              <a href={sentHref} {...external}>
                Open WhatsApp again
              </a>
            </span>
          </p>
        )}
      </div>
    </form>
  )
}
