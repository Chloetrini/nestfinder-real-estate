import { type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { BadgeCheck, Zap, Users, Search, GitCompareArrows, MessageCircle, KeyRound, ArrowRight } from 'lucide-react'
import HeaderNavBar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import SignInModal from '@/components/shared/sign-in-modal'
import Reveal from '@/components/ui/reveal'
import CountUp from '@/components/ui/count-up'
import { useAuth } from '@/context/auth-context'
import { useProperties } from '@/hooks/properties/use-properties'
import { useSeo } from '@/hooks/use-seo'
import keyHouse from '@/assets/images/about-house.webp'
import villa from '@/assets/images/sunset.webp'
import heroHouse from '@/assets/images/hero-house.webp'

// Edit these numbers to match the business
const STATS = [
  { value: 500, suffix: '+', label: 'Properties verified' },
  { value: 1200, suffix: '+', label: 'Happy families' },
  { value: 36, suffix: '', label: 'States covered' },
]

const VALUES = [
  { icon: BadgeCheck, title: 'Verified listings', text: 'Every property on our platform goes through a verification process, so what you see is what you get.' },
  { icon: Zap, title: 'Swift technology', text: 'Smart filters, instant search and a live map make finding your next home faster than ever.' },
  { icon: Users, title: 'Expert support', text: 'Our team of real estate experts is there to guide you through the paperwork and the legalities.' },
]

const STEPS = [
  { icon: Search, title: 'Search', text: 'Filter by area, type, bedrooms and budget.' },
  { icon: GitCompareArrows, title: 'Compare', text: 'Check photos, prices and the map side by side.' },
  { icon: MessageCircle, title: 'Talk to the agent', text: 'Send an enquiry or call straight from the page.' },
  { icon: KeyRound, title: 'Move in', text: 'Sign with confidence and collect your keys.' },
]

const AboutPage: FC = () => {
  useSeo({ title: 'About us', description: 'Learn how NestFinder Pro helps people find, rent and buy verified homes across Nigeria.' })
  const navigate = useNavigate()
  const { showModal } = useAuth()
  const { data: properties = [] } = useProperties()

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen font-[Manrope] overflow-x-hidden">
      <HeaderNavBar />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#1A3C34] text-white">
        <img src={keyHouse} alt="" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#0f2a24]/95 via-[#1A3C34]/85 to-[#24574a]/70" />
        <div aria-hidden="true" className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[#F4A261]/25 blur-3xl animate-float [animation-duration:8s]" />
        <div aria-hidden="true" className="absolute -bottom-32 left-10 -z-10 h-72 w-72 rounded-full bg-[#8fd3c0]/20 blur-3xl animate-float [animation-duration:10s]" />

        <div className="container mx-auto max-w-[1000px] px-6 py-24 text-center md:py-32">
          <span className="animate-fade-up inline-block rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[13px] backdrop-blur">About NestFinder Pro</span>
          <h1 className="animate-fade-up mt-6 text-[36px] font-extrabold leading-tight md:text-[64px]" style={{ animationDelay: '100ms' }}>
            Redefining real estate <span className="text-[#F4A261]">in Nigeria</span>
          </h1>
          <p className="animate-fade-up mx-auto mt-6 max-w-2xl font-[Inter] text-[17px] leading-8 text-white/85 md:text-[20px]" style={{ animationDelay: '200ms' }}>
            We don't just list houses. We help you discover the place where your next chapter begins.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="container mx-auto max-w-[1200px] px-6 py-20 md:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal from="left" className="order-2 lg:order-1">
            <p className="mb-3 text-[14px] font-bold uppercase tracking-widest text-[#F4A261]">Our journey</p>
            <h2 className="mb-6 text-[30px] font-bold leading-tight text-[#1A3C34] dark:text-[#8fd3c0] md:text-[42px]">A home search should be as joyful as living in one</h2>
            <p className="mb-5 font-[Inter] text-[17px] leading-8 text-[#535353] dark:text-gray-300">
              NestFinder Pro started from a simple observation: finding a home in Nigeria needed a bridge built on transparency, technology and trust.
            </p>
            <p className="font-[Inter] text-[17px] leading-8 text-[#535353] dark:text-gray-300">
              Today we connect people looking for a place with verified, good-quality listings, and give them the tools to compare and decide with confidence.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="group mt-8 inline-flex items-center gap-2 font-semibold text-[#1A3C34] dark:text-[#8fd3c0]"
            >
              Talk to our team <ArrowRight size={18} className="transition-transform group-hover:translate-x-1.5" />
            </button>
          </Reveal>

          {/* Photo composition */}
          <Reveal from="right" className="relative order-1 mx-auto h-[420px] w-full max-w-[520px] lg:order-2 lg:h-[520px]">
            <div aria-hidden="true" className="absolute -left-4 top-8 h-full w-[85%] rounded-[36px] bg-[#D7FFF6] dark:bg-[#0f3b32]" />
            <img src={heroHouse} alt="A modern family home" loading="lazy" className="absolute right-0 top-0 h-[78%] w-[64%] rounded-t-[999px] rounded-b-[32px] object-cover shadow-2xl" />
            <img src={villa} alt="A modern villa at dusk" loading="lazy" className="absolute bottom-0 left-0 h-[46%] w-[52%] rounded-[28px] border-[6px] border-white object-cover shadow-xl dark:border-gray-950" />
            <div className="absolute bottom-[6%] right-[2%] flex animate-float items-center gap-3 rounded-2xl bg-white p-4 shadow-xl dark:bg-gray-900 [animation-duration:5s]">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1A3C34] text-white dark:bg-[#24574a]"><BadgeCheck size={22} /></span>
              <span>
                <span className="block text-[20px] font-extrabold leading-none text-[#1A3C34] dark:text-[#8fd3c0]">
                  <CountUp value={properties.length} />
                </span>
                <span className="text-[12px] text-gray-500 dark:text-gray-400">live listings now</span>
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Numbers */}
      <section className="bg-[#1A3C34] py-14 text-white dark:bg-[#0f2a24]">
        <div className="container mx-auto grid max-w-[1000px] grid-cols-1 gap-10 px-6 text-center sm:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 120}>
              <p className="text-[44px] font-extrabold text-[#F4A261] md:text-[56px]"><CountUp value={s.value} suffix={s.suffix} /></p>
              <p className="mt-1 font-[Inter] text-[15px] text-white/80">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto max-w-[1200px] px-6 py-20 md:py-28">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-[14px] font-bold uppercase tracking-widest text-[#F4A261]">How it works</p>
          <h2 className="text-[30px] font-bold text-[#1A3C34] dark:text-[#8fd3c0] md:text-[42px]">From first search to front door</h2>
        </Reveal>
        <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div aria-hidden="true" className="absolute left-[12%] right-[12%] top-8 hidden border-t-2 border-dashed border-[#1A3C34]/20 dark:border-[#8fd3c0]/20 lg:block" />
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 130} className="relative text-center">
              <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#1A3C34] text-white shadow-lg ring-8 ring-white transition-transform hover:scale-110 dark:bg-[#24574a] dark:ring-gray-950">
                <Icon size={26} />
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#F4A261] text-[12px] font-bold text-[#1A3C34]">{i + 1}</span>
              </div>
              <h3 className="mb-2 text-[18px] font-bold text-[#0A1916] dark:text-gray-100">{title}</h3>
              <p className="font-[Inter] text-[15px] leading-7 text-[#535353] dark:text-gray-300">{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="bg-[#E4F0ED] py-20 dark:bg-[#10231f] md:py-28">
        <div className="container mx-auto max-w-[1200px] px-6">
          <Reveal className="mb-14 text-center">
            <h2 className="text-[30px] font-bold text-[#1A3C34] dark:text-[#8fd3c0] md:text-[42px]">Why NestFinder Pro?</h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 130}>
                <div className="group h-full rounded-2xl bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-gray-900">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1A3C34] text-white transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 dark:bg-[#24574a]">
                    <Icon size={30} />
                  </div>
                  <h3 className="mb-3 text-[20px] font-bold text-[#1A3C34] dark:text-[#8fd3c0]">{title}</h3>
                  <p className="font-[Inter] leading-7 text-[#535353] dark:text-gray-300">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="px-6 py-20 md:py-28">
        <Reveal className="relative mx-auto max-w-[1000px] overflow-hidden rounded-[32px] bg-linear-to-br from-[#1A3C34] to-[#24574a] px-8 py-16 text-center text-white shadow-2xl">
          <div aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#F4A261]/30 blur-3xl animate-float [animation-duration:7s]" />
          <h2 className="relative text-[28px] font-bold md:text-[40px]">Ready to find your dream nest?</h2>
          <p className="relative mx-auto mt-4 max-w-xl font-[Inter] text-white/80">Browse verified homes today, or send us a message and we will help you find the right one.</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate('/properties')} className="rounded-[12px] bg-[#F4A261] px-8 py-4 font-bold text-[#1A3C34] transition-transform hover:scale-105">Explore properties</button>
            <button onClick={() => navigate('/contact')} className="rounded-[12px] border border-white/40 px-8 py-4 font-bold transition-colors hover:bg-white hover:text-[#1A3C34]">Contact us</button>
          </div>
        </Reveal>
      </section>

      <Footer />
      {showModal && <SignInModal />}
    </div>
  )
}

export default AboutPage
