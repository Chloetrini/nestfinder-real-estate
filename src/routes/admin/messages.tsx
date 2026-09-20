import { useMemo, useState } from 'react'
import { Mail, Phone, Trash2, CheckCheck, RotateCcw, Reply } from 'lucide-react'
import { AdminContentSkeleton } from '@/components/skeletons/admin-skeletons'
import { useContactMessages, useDeleteContactMessage, useUpdateContactStatus } from '@/hooks/admin/use-admin'
import { useSeo } from '@/hooks/use-seo'

type Tab = 'all' | 'new' | 'responded'

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

// /adminPage/messages  -  everything visitors sent from the Contact page
const Messages = () => {
  useSeo({ title: 'Messages', noindex: true })
  const { data, isLoading, isError } = useContactMessages()
  const setStatus = useUpdateContactStatus()
  const remove = useDeleteContactMessage()
  const [tab, setTab] = useState<Tab>('all')
  const [confirmId, setConfirmId] = useState<string | null>(null)

  const messages = data?.messages ?? []
  const shown = useMemo(() => (tab === 'all' ? messages : messages.filter(m => m.status === tab)), [messages, tab])

  if (isLoading) return <AdminContentSkeleton />

  const tabs: Array<{ key: Tab; label: string; count: number }> = [
    { key: 'all', label: 'All', count: messages.length },
    { key: 'new', label: 'New', count: data?.newCount ?? 0 },
    { key: 'responded', label: 'Responded', count: messages.length - (data?.newCount ?? 0) },
  ]

  return (
    <div className="flex flex-col bg-[#F3F4F6] dark:bg-gray-950 pb-24 lg:pb-10 min-h-screen font-['Lato']">
      <nav className="bg-white dark:bg-gray-900 px-4 lg:px-10 h-[76px] flex items-center border-b border-[#BAB9B9] dark:border-gray-600">
        <h1 className="font-bold text-[20px] lg:text-[22px] text-[#023337] dark:text-gray-100">Messages</h1>
      </nav>

      <div className="px-4 lg:px-10 py-6 lg:py-8 flex flex-col gap-6">
        <div className="flex w-full overflow-x-auto rounded-[8px] bg-[#D7FFF6] p-1 dark:bg-[#0f3b32] sm:w-fit">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`whitespace-nowrap rounded-md px-4 py-2 text-[14px] font-medium transition-all ${tab === t.key ? 'bg-white dark:bg-gray-900 text-[#414242] dark:text-gray-100 shadow-sm' : 'text-[#75928B]'}`}
            >
              {t.label} <span className="ml-1 text-[12px] opacity-70">{t.count}</span>
            </button>
          ))}
        </div>

        {isError ? (
          <p className="py-16 text-center text-red-500">We could not load the messages. Please refresh.</p>
        ) : shown.length === 0 ? (
          <div className="rounded-xl bg-white dark:bg-gray-900 py-20 text-center text-[#75928B] animate-fade-up">
            <Mail className="mx-auto mb-3 h-10 w-10 opacity-50" />
            <p>{tab === 'all' ? 'No messages yet. They will show up here when visitors use the Contact page.' : `No ${tab} messages.`}</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {shown.map((m, i) => (
              <li
                key={m._id}
                className={`rounded-xl bg-white dark:bg-gray-900 p-5 shadow-sm border-l-4 animate-fade-up ${m.status === 'new' ? 'border-[#F4A261]' : 'border-green-500'}`}
                style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-[16px] font-bold text-[#023337] dark:text-gray-100">{m.subject}</p>
                    <p className="text-[14px] text-gray-600 dark:text-gray-300">
                      {m.name} · <a href={`mailto:${m.email}`} className="text-[#1A3C34] dark:text-[#8fd3c0] hover:underline">{m.email}</a>
                      {m.phone && (
                        <>
                          {' · '}
                          <a href={`tel:${m.phone}`} className="inline-flex items-center gap-1 hover:underline"><Phone size={12} />{m.phone}</a>
                        </>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-gray-500 dark:text-gray-400">
                    <span className={`rounded-full px-3 py-1 text-[12px] font-semibold ${m.status === 'new' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/40' : 'bg-green-100 text-green-600 dark:bg-green-900/40'}`}>
                      {m.status === 'new' ? 'New' : 'Responded'}
                    </span>
                    {formatDate(m.createdAt)}
                  </div>
                </div>

                <p className="mt-3 whitespace-pre-line text-[15px] leading-7 text-gray-700 dark:text-gray-300">{m.message}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={`mailto:${m.email}?subject=${encodeURIComponent('Re: ' + m.subject)}`}
                    onClick={() => m.status === 'new' && setStatus.mutate({ id: m._id, status: 'responded' })}
                    className="inline-flex items-center gap-2 rounded-[8px] bg-[#1A3C34] px-4 py-2 text-[14px] font-semibold text-white transition-transform hover:scale-105 dark:bg-[#24574a]"
                  >
                    <Reply size={16} /> Reply
                  </a>
                  <button
                    onClick={() => setStatus.mutate({ id: m._id, status: m.status === 'new' ? 'responded' : 'new' })}
                    disabled={setStatus.isPending}
                    className="inline-flex items-center gap-2 rounded-[8px] border border-gray-300 dark:border-gray-600 px-4 py-2 text-[14px] text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    {m.status === 'new' ? <><CheckCheck size={16} /> Mark responded</> : <><RotateCcw size={16} /> Mark as new</>}
                  </button>
                  {confirmId === m._id ? (
                    <span className="inline-flex items-center gap-2 text-[14px]">
                      <span className="text-gray-600 dark:text-gray-300">Delete for good?</span>
                      <button onClick={() => { remove.mutate(m._id); setConfirmId(null) }} className="rounded-[8px] bg-red-500 px-3 py-2 font-semibold text-white hover:bg-red-600">Yes, delete</button>
                      <button onClick={() => setConfirmId(null)} className="rounded-[8px] border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-700 dark:text-gray-200">Cancel</button>
                    </span>
                  ) : (
                    <button onClick={() => setConfirmId(m._id)} className="inline-flex items-center gap-2 rounded-[8px] px-4 py-2 text-[14px] text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                      <Trash2 size={16} /> Delete
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Messages
