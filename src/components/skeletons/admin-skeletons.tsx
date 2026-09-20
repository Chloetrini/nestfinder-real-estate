import Skeleton from '@/components/ui/skeleton'

// Loading placeholders for the admin area (stat cards, tables and the whole frame)

export const StatCardsSkeleton = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
    {[0, 1, 2, 3].map(i => (
      <div key={i} className="bg-white dark:bg-gray-900 rounded-xl p-5 flex flex-col gap-4 shadow-sm animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
        <Skeleton className="h-4 w-1/2" delay={i * 80} />
        <Skeleton className="h-9 w-2/3" delay={i * 80 + 100} />
        <Skeleton className="h-3 w-1/3" delay={i * 80 + 200} />
      </div>
    ))}
  </div>
)

export const TableSkeleton = ({ rows = 6 }: { rows?: number }) => (
  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden">
    <div className="flex gap-4 px-6 py-4 border-b border-gray-100 dark:border-gray-800">
      {[30, 20, 15, 15].map((w, i) => (
        <Skeleton key={i} className="h-4" style={{ width: `${w}%` }} delay={i * 60} />
      ))}
    </div>
    {Array.from({ length: rows }, (_, r) => (
      <div key={r} className="flex items-center gap-4 px-6 py-4 border-b border-gray-50 dark:border-gray-800/60 animate-fade-up" style={{ animationDelay: `${r * 60}ms` }}>
        <Skeleton className="h-12 w-12 rounded-lg shrink-0" delay={r * 60} />
        <Skeleton className="h-4 w-[28%]" delay={r * 60 + 80} />
        <Skeleton className="h-4 w-[18%]" delay={r * 60 + 120} />
        <Skeleton className="h-4 w-[14%]" delay={r * 60 + 160} />
        <Skeleton className="h-8 w-16 rounded-md ml-auto" delay={r * 60 + 200} />
      </div>
    ))}
  </div>
)

/** A page-sized skeleton (heading + cards + table) for admin pages that are still fetching */
export const AdminContentSkeleton = () => (
  <div className="p-4 md:p-8 flex flex-col gap-8" role="status" aria-label="Loading">
    <div className="flex flex-col gap-3">
      <Skeleton className="h-7 w-48" />
      <Skeleton className="h-4 w-64" delay={100} />
    </div>
    <StatCardsSkeleton />
    <TableSkeleton />
  </div>
)

/** Whole admin frame (sidebar + content) while the property list first loads */
export const AdminPageSkeleton = () => (
  <div className="flex flex-col lg:flex-row lg:h-screen w-full bg-[#F3F4F6] dark:bg-gray-950">
    <div className="hidden lg:flex flex-col gap-6 w-[260px] bg-white dark:bg-gray-900 border-r border-[#BAB9B9] dark:border-gray-700 p-5">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-5 w-32" delay={100} />
      </div>
      {[0, 1, 2, 3].map(i => (
        <Skeleton key={i} className="h-9 w-full rounded-md" delay={150 + i * 100} />
      ))}
    </div>
    <main className="flex-1 overflow-hidden">
      <AdminContentSkeleton />
    </main>
  </div>
)
