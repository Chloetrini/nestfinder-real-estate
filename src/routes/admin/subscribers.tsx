import { useState } from 'react'
import { Download, MailPlus, Trash2 } from 'lucide-react'
import { AdminContentSkeleton } from '@/components/skeletons/admin-skeletons'
import { useDeleteSubscriber, useSubscribers } from '@/hooks/admin/use-admin'
import { useSeo } from '@/hooks/use-seo'

const formatDate = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

// /adminPage/subscribers  -  everyone who signed up with the newsletter box in the footer
const Subscribers = () => {
  useSeo({ title: 'Subscribers', noindex: true })
  const { data, isLoading, isError } = useSubscribers()
  const remove = useDeleteSubscriber()
  const [confirmId, setConfirmId] = useState<string | null>(null)

  if (isLoading) return <AdminContentSkeleton />
  const subscribers = data?.subscribers ?? []

  const exportCsv = () => {
    const csv = ['email,subscribed', ...subscribers.map(s => `${s.email},${s.createdAt}`)].join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'nestfinder-subscribers.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col bg-[#F3F4F6] dark:bg-gray-950 pb-24 lg:pb-10 min-h-screen font-['Lato']">
      <nav className="bg-white dark:bg-gray-900 px-4 lg:px-10 h-[76px] flex items-center border-b border-[#BAB9B9] dark:border-gray-600">
        <h1 className="font-bold text-[20px] lg:text-[22px] text-[#023337] dark:text-gray-100">Subscribers</h1>
      </nav>

      <div className="px-4 lg:px-10 py-6 lg:py-8 flex flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[15px] text-gray-600 dark:text-gray-300">
            <span className="text-[28px] font-bold text-[#023337] dark:text-gray-100 mr-2">{subscribers.length}</span>
            {subscribers.length === 1 ? 'person' : 'people'} subscribed to the newsletter
          </p>
          <button
            onClick={exportCsv}
            disabled={subscribers.length === 0}
            className="inline-flex w-fit items-center gap-2 rounded-[8px] bg-[#1A3C34] px-5 py-3 text-[14px] font-semibold text-white transition-transform hover:scale-105 disabled:opacity-50 dark:bg-[#24574a]"
          >
            <Download size={16} /> Export CSV
          </button>
        </div>

        {isError ? (
          <p className="py-16 text-center text-red-500">We could not load the subscribers. Please refresh.</p>
        ) : subscribers.length === 0 ? (
          <div className="rounded-xl bg-white dark:bg-gray-900 py-20 text-center text-[#75928B] animate-fade-up">
            <MailPlus className="mx-auto mb-3 h-10 w-10 opacity-50" />
            <p>No subscribers yet. They will appear here when visitors use the newsletter box in the footer.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100 dark:divide-gray-800 rounded-xl bg-white dark:bg-gray-900 shadow-sm animate-fade-up">
            {subscribers.map(s => (
              <li key={s._id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <div className="min-w-0">
                  <a href={`mailto:${s.email}`} className="block truncate text-[15px] font-semibold text-[#023337] hover:underline dark:text-gray-100">{s.email}</a>
                  <p className="text-[13px] text-gray-500 dark:text-gray-400">Joined {formatDate(s.createdAt)}</p>
                </div>
                {confirmId === s._id ? (
                  <span className="inline-flex items-center gap-2 text-[14px]">
                    <button onClick={() => { remove.mutate(s._id); setConfirmId(null) }} className="rounded-[8px] bg-red-500 px-3 py-2 font-semibold text-white hover:bg-red-600">Remove</button>
                    <button onClick={() => setConfirmId(null)} className="rounded-[8px] border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-700 dark:text-gray-200">Cancel</button>
                  </span>
                ) : (
                  <button onClick={() => setConfirmId(s._id)} aria-label={`Remove ${s.email}`} className="rounded-[8px] p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                    <Trash2 size={18} />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Subscribers
