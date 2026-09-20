import logo from '@/assets/brand/logo.png'

// Full-screen loader used while a lazy page or the sign-in check is loading:
// the logo floats gently above a glowing ring, with three bouncing dots underneath.
const PageLoader = () => (
  <div className="flex flex-col items-center justify-center gap-6 h-screen bg-white dark:bg-gray-950" role="status" aria-label="Loading">
    <div className="relative flex items-center justify-center">
      <span className="absolute h-20 w-20 rounded-full bg-[#1A3C34]/15 dark:bg-[#8fd3c0]/15 animate-ping" />
      <span className="absolute h-16 w-16 rounded-full border-2 border-[#1A3C34]/30 dark:border-[#8fd3c0]/30 border-t-[#1A3C34] dark:border-t-[#8fd3c0] animate-spin" />
      <img src={logo} alt="" className="relative h-9 w-9 animate-float" />
    </div>
    <div className="flex gap-2">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="h-2.5 w-2.5 rounded-full bg-[#1A3C34] dark:bg-[#8fd3c0] animate-dot"
          style={{ animationDelay: `${i * 160}ms` }}
        />
      ))}
    </div>
  </div>
)

export default PageLoader
