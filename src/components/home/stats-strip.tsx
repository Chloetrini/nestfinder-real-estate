import CountUp from '@/components/ui/count-up'
import Reveal from '@/components/ui/reveal'

// Placeholder figures: put your real numbers here
const STATS = [
  { value: 100, suffix: '+', label: 'properties' },
  { value: 200, suffix: 'k+', label: 'Number of clients' },
  { value: 3000, suffix: '+', label: 'Team Members' },
  { value: 70, suffix: '+', label: 'Locations' },
  { value: 14, suffix: '+', label: 'Years of Exp' },
] as const

// Same look as the numbers band on the About page: dark green, big orange figures that count up
const Testimonials = () => {
  return (
    <section className="w-full bg-[#1A3C34] py-14 text-white dark:bg-[#0f2a24] md:py-16">
      <div className="container mx-auto grid max-w-[1100px] grid-cols-2 gap-x-6 gap-y-10 px-6 text-center md:grid-cols-5">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 110} className={i === STATS.length - 1 ? 'col-span-2 md:col-span-1' : ''}>
            <p className="font-[Manrope] text-[40px] font-extrabold text-[#F4A261] md:text-[48px] lg:text-[56px]">
              <CountUp value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-1 font-[Inter] text-[14px] text-white/80 md:text-[15px]">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
