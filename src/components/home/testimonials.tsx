import { Quote, Star } from "lucide-react"
import Reveal from "@/components/ui/reveal"
import michael from "@/assets/avatars/michael.png"
import sophie from "@/assets/avatars/sophie.png"
import carey from "@/assets/avatars/carey.png"
import micah from "@/assets/avatars/micah.png"
import emmanuel from "@/assets/avatars/emma.png"

// Edit the quotes here. Each card is laid out for you.
const REVIEWS = [
  { name: "Michael Carter", avatar: michael, text: "Finding my dream Apartment was so easy with Nest Finder Pro. The Listings were accurate, the agents were responsive and i was happy to move in" },
  { name: "Sophie Ann", avatar: sophie, text: "NestFinder Pro made the whole property search stress free. Their verified listings gave me confidence that what i saw was what i got" },
  { name: "Carey- Yin-un", avatar: carey, text: "I was skeptical about searching for home online but NestFinder Pro changed that. They are professional, and incredible people i can trust" },
  { name: "Micah Richards", avatar: micah, text: "NestFinder Pro made the whole property search stress free. Their verified listings gave me confidence that what i saw was what i got" },
  { name: "Emmanuel Bait", avatar: emmanuel, text: "I was skeptical about searching for home online but NestFinder Pro changed that. They are professional, and incredible people i can trust" },
]

const Testimonials2 = () => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Soft colour behind the cards */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-[#8fd3c0]/25 blur-3xl dark:bg-[#1A3C34]/50" />
      </div>

      <div className="container mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 px-4">
        <Reveal className="flex flex-col items-center gap-3 text-center">
          <p className="font-[Manrope] text-[14px] font-bold uppercase tracking-widest text-[#F4A261]">Testimonials</p>
          <h2 className="px-4 font-[Manrope] text-[30px] font-bold leading-tight text-[#131817] dark:text-gray-100 md:text-[42px]">What Our Satisfied Clients Say</h2>
          <div className="flex items-center gap-1" aria-label="Rated 5 out of 5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={20} className="fill-[#F4A261] text-[#F4A261]" aria-hidden="true" />
            ))}
          </div>
        </Reveal>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-6">
          {REVIEWS.map((r, i) => {
            const lead = i === 0 // the first card is the highlighted one
            return (
              <Reveal
                key={r.name}
                delay={(i % 3) * 110}
                className={`${i < 3 ? "md:col-span-2" : "md:col-span-3"}`}
              >
                <figure
                  className={`group relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-[20px] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${
                    lead
                      ? "bg-[#1A3C34] text-white shadow-xl dark:bg-[#24574a]"
                      : "border border-gray-100 bg-white text-[#353535] shadow-md dark:border-white/10 dark:bg-gray-900 dark:text-gray-200 dark:hover:shadow-black/40"
                  }`}
                >
                  <Quote aria-hidden="true" size={54} className={`absolute -right-2 -top-2 rotate-180 transition-transform duration-500 group-hover:rotate-[170deg] ${lead ? "text-white/10" : "text-[#1A3C34]/10 dark:text-[#8fd3c0]/10"}`} />

                  <div className="flex gap-1" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={16} className="fill-[#F4A261] text-[#F4A261]" />
                    ))}
                  </div>

                  <blockquote className="relative font-[Inter] text-[15px] leading-[27px]">“{r.text}”</blockquote>

                  <figcaption className="flex items-center gap-3">
                    <img src={r.avatar} alt="" loading="lazy" className={`h-[48px] w-[48px] rounded-full object-cover ring-2 ${lead ? "ring-white/40" : "ring-[#8fd3c0]/50"}`} />
                    <span className="flex flex-col">
                      <span className={`font-[Manrope] text-[16px] font-bold ${lead ? "text-white" : "text-[#131817] dark:text-gray-100"}`}>{r.name}</span>
                      <span className={`text-[12px] ${lead ? "text-white/70" : "text-gray-500 dark:text-gray-400"}`}>Verified client</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Testimonials2
