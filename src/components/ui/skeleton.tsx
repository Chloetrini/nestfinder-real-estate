import type { CSSProperties, HTMLAttributes } from 'react'

// shadcn/ui-style Skeleton: a soft placeholder block with a light "shimmer" sweeping across it.
// Give it a size and shape with className, e.g. <Skeleton className="h-5 w-3/4" />
interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Delay (ms) before the shimmer starts, so neighbouring blocks don't pulse in sync */
  delay?: number
}

const Skeleton = ({ className = '', delay = 0, style, ...props }: SkeletonProps) => {
  const shimmerStyle: CSSProperties = { animationDelay: `${delay}ms` }
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden rounded-md bg-gray-200 dark:bg-gray-800 ${className}`}
      style={style}
      {...props}
    >
      <span
        className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/70 to-transparent dark:via-white/10"
        style={shimmerStyle}
      />
    </div>
  )
}

export default Skeleton
