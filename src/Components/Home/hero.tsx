import { useMemo, useState, type FC } from "react"
import { useNavigate } from "react-router-dom"
import { Home } from "lucide-react"
import SearchBox from "@/components/search/search-box"
import { optimizeImage } from "@/lib/image"
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

  // The collage shows photos of REAL properties: the featured ones first (the admin picks them with the star),
  // then the newest listings to fill any gap. The bundled photos are only a fallback while loading or when there are no listings.
  const featuredPhotos = useMemo(() => {
    const withPhoto = properties.filter((p) => p.images?.[0])
    return [...withPhoto.filter((p) => p.isFeatured), ...withPhoto.filter((p) => !p.isFeatured)].slice(0, 3)
  }, [properties])
  const slot = (i: number, fallback: string, fallbackAlt: string) => {
    const p = featuredPhotos[i]
    return p ? { src: optimizeImage(p.images[0], i === 0 ? 900 : 600), alt: p.propertyName, open: () => openProperty(p._id) } : { src: fallback, alt: fallbackAlt, open: browse }
  }

  // The floating card shows a real listing: a featured one if there is one, otherwise the newest
  const main = useMemo(() => properties.find((p) => p.isFeatured) ?? properties[0], [properties])

  const openProperty = (id: string) => navigate(`/property/${id}`)
  const browse = () => navigate("/properties")
  const photo0 = slot(0, heroHouse, "A modern family home")
  const photo1 = slot(1, heroVilla, "A modern villa at dusk")
  const photo2 = slot(2, heroInterior, "A bright living room")

  return (
    <section className="relative isolate z-20 bg-[#F3FBF8] dark:bg-gray-950">
      {/* Background: soft colour glows and a faint dotted grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
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

          <div className="animate-fade-up relative z-30 w-full max-w-[600px]" style={{ animationDelay: "240ms" }}>
            <SearchBox
              variant="hero"
              value={query}
              onChange={setQuery}
              onSubmit={(v) => navigate(`/properties${v ? `?q=${encodeURIComponent(v)}` : ""}`)}
              onSelect={(s) => {
                if (s.kind === "property") openProperty(s.id)
                else if (s.kind === "type") navigate(`/properties?type=${encodeURIComponent(s.label)}`)
                else navigate(`/properties?q=${encodeURIComponent(s.label.split(",")[0])}`)
              }}
              placeholder="Search by area, city or name, e.g. Lekki"
            />
          </div>

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

          <Photo key={photo0.src} src={photo0.src} alt={photo0.alt} priority onOpen={photo0.open} className="absolute right-0 top-0 h-[470px] w-[62%] rounded-t-[999px] rounded-b-[36px] shadow-2xl" />
          <Photo key={photo1.src} src={photo1.src} alt={photo1.alt} onOpen={photo1.open} className="absolute bottom-0 left-0 h-[230px] w-[46%] rounded-[30px] border-[6px] border-[#F3FBF8] shadow-xl dark:border-gray-950" />
          <Photo key={photo2.src} src={photo2.src} alt={photo2.alt} onOpen={photo2.open} className="absolute bottom-[34px] right-[4%] h-[128px] w-[128px] rounded-full border-[6px] border-[#F3FBF8] shadow-xl dark:border-gray-950" />

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
          <Photo key={photo0.src} src={photo0.src} alt={photo0.alt} priority onOpen={photo0.open} className="block aspect-[4/3] w-full rounded-[28px] shadow-xl" />
        </div>
      </div>
    </section>
  )
}

export default HeaderContentSec
