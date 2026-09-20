import { useMemo, useState, type FC, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { Home, MapPin, Search } from "lucide-react"
import { useProperties } from "@/hooks/properties/use-properties"
import heroHouse from "@/assets/images/hero-house.webp"
import heroVilla from "@/assets/images/hero-villa.webp"
import heroInterior from "@/assets/images/hero-interior.webp"

// Quick searches under the search box: each one opens the properties page already filtered
const QUICK_LINKS = [
  { label: "For rent", query: "status=For%20Rent" },
  { label: "For sale", query: "status=For%20Sale" },
  { label: "Villas", query: "type=Villa" },
  { label: "Apartments", query: "type=Apartment" },
  { label: "Duplexes", query: "type=Duplex" },
]

// A real house photo cut into a shape (arch, rounded square or circle). The photos ship with the site, so they appear instantly.
const Photo = ({ src, alt, priority = false, className, onOpen }: { src: string; alt: string; priority?: boolean; className: string; onOpen: () => void }) => {
  const [loaded, setLoaded] = useState(false)
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Browse homes: ${alt}`}
      className={`group overflow-hidden bg-linear-to-br from-[#cfeee5] to-[#a8d8c9] dark:from-[#12362f] dark:to-[#0c2521] ${className}`}
    >
      <img
        src={src}
        alt={alt}
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </button>
  )
}

const HeaderContentSec: FC = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const { data: properties = [] } = useProperties()

  // The floating card shows a real listing: a featured one if there is one, otherwise the newest
  const main = useMemo(() => properties.find((p) => p.isFeatured) ?? properties[0], [properties])

  const openProperty = (id: string) => navigate(`/property/${id}`)
  const browse = () => navigate("/properties")
  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    navigate(`/properties${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`)
  }

  return (
    <section className="relative isolate overflow-hidden bg-[#F3FBF8] dark:bg-gray-950">
      {/* Background: soft colour glows and a faint dotted grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-[#8fd3c0]/40 blur-3xl dark:bg-[#1A3C34]/60" />
        <div className="absolute -bottom-40 -left-24 h-[420px] w-[420px] rounded-full bg-[#F4A261]/25 blur-3xl dark:bg-[#F4A261]/10" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(#1A3C34_1px,transparent_1px)] [background-size:26px_26px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)] dark:opacity-[0.25] dark:[background-image:radial-gradient(#8fd3c0_1px,transparent_1px)]" />
      </div>

      <div className="container mx-auto grid max-w-[1240px] items-center gap-12 px-6 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        {/* Words + search */}
        <div className="flex flex-col items-start gap-6 md:gap-7">
          <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-[#1A3C34]/15 bg-white/80 px-4 py-1.5 text-[13px] font-medium text-[#1A3C34] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-[#8fd3c0]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F4A261] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F4A261]" />
            </span>
            Verified homes across Nigeria
          </span>

          <h1 className="animate-fade-up font-[Manrope] text-[38px] font-[800] leading-[1.08] tracking-tight text-[#0A1916] dark:text-white md:text-[58px] xl:text-[64px]" style={{ animationDelay: "80ms" }}>
            Smart way to find{" "}
            <span className="relative inline-block whitespace-nowrap text-[#1A3C34] dark:text-[#8fd3c0]">
              your next home
              <svg aria-hidden="true" viewBox="0 0 300 14" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full text-[#F4A261]">
                <path d="M2 9 C60 2 120 2 180 7 S260 12 298 4" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="animate-fade-up max-w-[34rem] font-[Inter] text-[16px] leading-[28px] text-[#4a5a56] dark:text-gray-300 md:text-[19px] md:leading-[32px]" style={{ animationDelay: "160ms" }}>
            Compare homes, see real prices and talk to agents. Everything you need to rent or buy with confidence, in one place.
          </p>

          <form onSubmit={handleSearch} role="search" className="animate-fade-up flex w-full max-w-[600px] items-center gap-2 rounded-[16px] border border-gray-200 bg-white p-2 shadow-[0_20px_50px_-20px_rgba(26,60,52,0.45)] dark:border-gray-800 dark:bg-gray-900" style={{ animationDelay: "240ms" }}>
            <MapPin size={20} className="ml-3 shrink-0 text-[#4F887B]" aria-hidden="true" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by area, city or name, e.g. Lekki"
              aria-label="Search properties"
              className="h-[48px] min-w-0 flex-1 bg-transparent px-2 text-[15px] text-[#0A1916] outline-none placeholder:text-gray-400 dark:text-gray-100"
            />
            <button type="submit" className="flex h-[48px] shrink-0 items-center gap-2 rounded-[12px] bg-[#1A3C34] px-5 font-[Manrope] font-semibold text-white transition-all hover:bg-[#264d43] active:scale-95 dark:bg-[#24574a] dark:hover:bg-[#2d6a5a] md:px-7">
              <Search size={18} aria-hidden="true" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </form>

          <div className="animate-fade-up flex flex-wrap gap-2" style={{ animationDelay: "320ms" }}>
            {QUICK_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => navigate(`/properties?${link.query}`)}
                className="rounded-full border border-gray-300 bg-white/70 px-4 py-1.5 text-[14px] text-[#354541] transition-all hover:-translate-y-0.5 hover:border-[#1A3C34] hover:bg-[#1A3C34] hover:text-white dark:border-gray-700 dark:bg-white/5 dark:text-gray-200 dark:hover:border-[#24574a] dark:hover:bg-[#24574a]"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Photo collage: arch, rounded square and circle, with a floating price card */}
        <div className="relative mx-auto hidden h-[540px] w-full max-w-[560px] lg:block animate-fade-up" style={{ animationDelay: "200ms" }}>
          <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute -left-6 top-6 h-[300px] w-[300px] animate-spin text-[#1A3C34]/25 dark:text-[#8fd3c0]/25 [animation-duration:60s]">
            <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 9" strokeLinecap="round" />
          </svg>

          <Photo src={heroHouse} alt="A modern family home" priority onOpen={browse} className="absolute right-0 top-0 h-[470px] w-[62%] rounded-t-[999px] rounded-b-[36px] shadow-2xl" />
          <Photo src={heroVilla} alt="A modern villa at dusk" onOpen={browse} className="absolute bottom-0 left-0 h-[230px] w-[46%] rounded-[30px] border-[6px] border-[#F3FBF8] shadow-xl dark:border-gray-950" />
          <Photo src={heroInterior} alt="A bright living room" onOpen={browse} className="absolute bottom-[34px] right-[4%] h-[128px] w-[128px] rounded-full border-[6px] border-[#F3FBF8] shadow-xl dark:border-gray-950" />

          {main && (
            <button type="button" onClick={() => openProperty(main._id)} className="absolute left-0 top-[24%] flex animate-float items-center gap-3 text-left rounded-2xl border border-white/60 bg-white/90 p-3 pr-5 shadow-xl backdrop-blur dark:border-white/10 dark:bg-gray-900/90 [animation-duration:5s]">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1A3C34] text-white dark:bg-[#24574a]">
                <Home size={20} aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <span className="max-w-[170px] truncate font-[Manrope] text-[14px] font-bold text-[#0A1916] dark:text-gray-100">{main.propertyName}</span>
                <span className="text-[13px] text-[#4a5a56] dark:text-gray-400">
                  {main.sale} · ₦{main.price.toLocaleString()}
                </span>
              </span>
            </button>
          )}

          {properties.length > 0 && (
            <div className="absolute right-[2%] top-[4%] flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-[13px] font-semibold text-[#1A3C34] shadow-lg dark:bg-gray-900/95 dark:text-[#8fd3c0]">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              {properties.length} live listings
            </div>
          )}
        </div>

        {/* On phones: one photo under the search, the collage is too wide */}
        <div className="lg:hidden -mt-4">
          <Photo src={heroHouse} alt="A modern family home" priority onOpen={browse} className="block aspect-[4/3] w-full rounded-[28px] shadow-xl" />
        </div>
      </div>
    </section>
  )
}

export default HeaderContentSec
