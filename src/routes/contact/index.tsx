import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import HeaderNavBar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import SignInModal from '@/components/shared/sign-in-modal'
import { sendContactMessage } from '@/api/contact'
import { SITE } from '@/constants/site'
import { useAuth } from '@/context/auth-context'
import { useSeo } from '@/hooks/use-seo'

const SUBJECTS = ['General question', 'Buying a home', 'Renting a home', 'Listing my property', 'Report a problem'] as const
const MAX_MESSAGE = 2000

interface FormState {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  website: string // honeypot
}

type Errors = Partial<Record<'name' | 'email' | 'message', string>>

const empty: FormState = { name: '', email: '', phone: '', subject: SUBJECTS[0], message: '', website: '' }

const validate = (form: FormState): Errors => {
  const errors: Errors = {}
  if (!form.name.trim()) errors.name = 'Please tell us your name'
  if (!form.email.trim()) errors.email = 'Email is required'
  else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = 'Please enter a valid email'
  if (form.message.trim().length < 10) errors.message = 'Please write a little more (at least 10 characters)'
  return errors
}

const InfoCard = ({ icon, title, children, delay }: { icon: ReactNode; title: string; children: ReactNode; delay: number }) => (
  <div
    className="flex items-start gap-4 rounded-2xl bg-white dark:bg-gray-900 p-5 shadow-md border border-gray-100 dark:border-gray-800 transition-transform hover:-translate-y-1 animate-fade-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D7FFF6] dark:bg-[#0f3b32] text-[#1A3C34] dark:text-[#8fd3c0]">{icon}</div>
    <div>
      <p className="font-bold text-[#0A1916] dark:text-gray-100">{title}</p>
      <div className="mt-1 text-[15px] text-[#535353] dark:text-gray-300 font-[Inter]">{children}</div>
    </div>
  </div>
)

const iconProps = { className: 'h-5 w-5', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, viewBox: '0 0 24 24' }

const fieldClass = (hasError: boolean) =>
  `w-full rounded-[10px] border bg-white dark:bg-gray-900 px-4 py-3 outline-none transition-shadow focus:ring-2 focus:ring-[#1A3C34]/40 dark:focus:ring-[#8fd3c0]/40 text-[#0A1916] dark:text-gray-100 ${
    hasError ? 'border-red-500' : 'border-[#918F8F] dark:border-gray-600'
  }`

const ContactPage = () => {
  useSeo({
    title: 'Contact us',
    description: 'Questions about buying, renting or listing a home in Nigeria? Send NestFinder Pro a message and we will get back to you.',
  })
  const { showModal } = useAuth()
  const [form, setForm] = useState<FormState>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [isSending, setIsSending] = useState(false)
  const [serverError, setServerError] = useState('')
  const [sent, setSent] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
    setServerError('')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setIsSending(true)
    try {
      const result = await sendContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        subject: form.subject,
        message: form.message.trim(),
        website: form.website,
      })
      if (result.success) {
        setSent(true)
        setForm(empty)
      } else {
        setServerError(result.message || 'We could not send your message. Please try again.')
      }
    } catch {
      setServerError('Network problem. Please check your connection and try again.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen font-[Manrope]">
      <HeaderNavBar />

      {/* Header band */}
      <section className="relative overflow-hidden bg-[#1A3C34] dark:bg-[#0f2a24] text-white">
        <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-[#F4A261]/20 blur-3xl animate-float" />
        <div className="absolute -bottom-28 -left-10 h-72 w-72 rounded-full bg-[#8fd3c0]/20 blur-3xl animate-float" style={{ animationDelay: '600ms' }} />
        <div className="relative container mx-auto max-w-[1100px] px-6 py-16 md:py-24 text-center animate-fade-up">
          <h1 className="text-[32px] md:text-[56px] font-bold leading-tight">Get in touch</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] md:text-[20px] text-white/80 font-[Inter]">
            Buying, renting or listing a home? Send us a message and a member of the team will reply within one working day.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-[1100px] px-6 py-12 md:py-16 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        {/* Contact details */}
        <div className="flex flex-col gap-4">
          <InfoCard delay={0} title="Email" icon={<svg {...iconProps}><path d="M4 4h16v16H4z" /><path d="m4 7 8 6 8-6" /></svg>}>
            <a className="hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </InfoCard>
          <InfoCard delay={80} title="Phone" icon={<svg {...iconProps}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" /></svg>}>
            <a className="hover:underline" href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a>
          </InfoCard>
          <InfoCard delay={160} title="Office" icon={<svg {...iconProps}><path d="M12 21s-7-6.1-7-11a7 7 0 1 1 14 0c0 4.9-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>}>
            {SITE.address}
          </InfoCard>
          <InfoCard delay={240} title="Opening hours" icon={<svg {...iconProps}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>}>
            {SITE.hours}
          </InfoCard>
        </div>

        {/* Form */}
        <div className="rounded-2xl bg-white dark:bg-gray-900 p-6 md:p-8 shadow-xl border border-gray-100 dark:border-gray-800 animate-fade-up" style={{ animationDelay: '120ms' }}>
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-10 text-center animate-fade-up" role="status">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
                <svg viewBox="0 0 24 24" className="h-10 w-10 fill-none stroke-green-500" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-[24px] font-bold text-[#0A1916] dark:text-gray-100">Message sent</h2>
              <p className="max-w-sm text-[#535353] dark:text-gray-300 font-[Inter]">Thank you for reaching out. We will reply to your email within one working day.</p>
              <button onClick={() => setSent(false)} className="mt-2 rounded-[10px] border border-[#1A3C34] dark:border-[#3b8a76] px-6 py-3 text-[#1A3C34] dark:text-[#8fd3c0] transition-colors hover:bg-[#1A3C34] hover:text-white dark:hover:bg-[#24574a]">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <h2 className="text-[22px] font-bold text-[#023337] dark:text-gray-100">Send us a message</h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-bold text-[#676565] dark:text-gray-300">Name</label>
                  <input id="name" name="name" autoComplete="name" value={form.name} onChange={handleChange} placeholder="Your full name" className={fieldClass(!!errors.name)} />
                  {errors.name && <p className="text-[13px] text-red-500">{errors.name}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-bold text-[#676565] dark:text-gray-300">Email</label>
                  <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className={fieldClass(!!errors.email)} />
                  {errors.email && <p className="text-[13px] text-red-500">{errors.email}</p>}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="font-bold text-[#676565] dark:text-gray-300">Phone <span className="font-normal">(optional)</span></label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={handleChange} placeholder="+234 ..." className={fieldClass(false)} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="font-bold text-[#676565] dark:text-gray-300">Subject</label>
                  <select id="subject" name="subject" value={form.subject} onChange={handleChange} className={fieldClass(false)}>
                    {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-bold text-[#676565] dark:text-gray-300">Message</label>
                <textarea id="message" name="message" rows={6} maxLength={MAX_MESSAGE} value={form.message} onChange={handleChange} placeholder="How can we help?" className={`${fieldClass(!!errors.message)} resize-none`} />
                <div className="flex justify-between text-[13px]">
                  <span className="text-red-500">{errors.message}</span>
                  <span className="text-gray-500 dark:text-gray-400">{form.message.length}/{MAX_MESSAGE}</span>
                </div>
              </div>

              {/* Honeypot: hidden from people, bots fill it in */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={handleChange} />
              </div>

              {serverError && <p role="alert" className="rounded-lg bg-red-50 dark:bg-red-900/30 px-4 py-3 text-[14px] text-red-600 dark:text-red-300">{serverError}</p>}

              <button
                type="submit"
                disabled={isSending}
                className="flex h-[52px] items-center justify-center gap-2 rounded-[10px] bg-[#1A3C34] dark:bg-[#24574a] text-white font-bold transition-all hover:bg-[#264d43] dark:hover:bg-[#2d6a5a] active:scale-[0.98] disabled:opacity-60"
              >
                {isSending && <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
                {isSending ? 'Sending...' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
      {showModal && <SignInModal />}
    </div>
  )
}

export default ContactPage
