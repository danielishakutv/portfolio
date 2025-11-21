'use client'

import { speakingEvents, getUpcomingEvents, getPastEvents } from '../lib/speaking'
import { useState } from 'react'

export default function Speaking() {
  const upcoming = getUpcomingEvents()
  const past = getPastEvents().slice(0, 4) // show recent past
  const [active, setActive] = useState<typeof speakingEvents[number] | null>(null)

  const open = (e: typeof speakingEvents[number]) => setActive(e)
  const close = () => setActive(null)

  return (
    <section id="speaking" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Speaking
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Sharing knowledge and insights at conferences and events worldwide.
          </p>
        </div>

        {upcoming.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Upcoming</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {upcoming.map(event => (
                <TalkCard key={event.slug} data={event} highlight onOpen={() => open(event)} />
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {past.map(event => (
              <TalkCard key={event.slug} data={event} onOpen={() => open(event)} />
            ))}
          </div>
        </div>
      </div>
      {active && <EventModal event={active} onClose={close} />}
    </section>
  )
}

function TalkCard({ data, highlight, onOpen }: { data: typeof speakingEvents[number]; highlight?: boolean; onOpen: () => void }) {
  const date = new Date(data.date)
  // Use a fixed locale so server and client render the same text and
  // avoid hydration mismatches (different host locales produce different
  // month/day ordering). 'en-GB' gives "22 Nov 2025" format.
  const dateDisplay = date.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })
  return (
    <button onClick={onOpen} className={`text-left w-full bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-amber-400 ${highlight ? 'ring-2 ring-amber-400 dark:ring-amber-500' : ''}`}>
      <div className="mb-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">{dateDisplay}</span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{data.title}</h3>
      <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">{data.event}</p>
      <p className="text-gray-600 dark:text-gray-400 mb-4 flex items-center gap-1">📍 {data.venue}, {data.city}, {data.country}</p>
      <p className="text-xs text-amber-600 dark:text-amber-400 mb-4 font-semibold">Role: {data.role}</p>
      <p className="text-gray-500 dark:text-gray-400 text-sm italic mb-4">Tap to view details</p>
      <div className="flex flex-wrap gap-2">
        {data.tags.map(tag => (
          <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </button>
  )
}

function EventModal({ event, onClose }: { event: typeof speakingEvents[number]; onClose: () => void }) {
  const date = new Date(event.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 animate-fadeIn">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white pr-6">{event.title}</h3>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Close">
            <span className="text-lg">×</span>
          </button>
        </div>
        <div className="space-y-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">{date}</div>
          <div className="text-gray-700 dark:text-gray-300 font-medium">{event.event}</div>
          <div className="text-gray-600 dark:text-gray-400 flex items-center gap-1">📍 {event.venue}, {event.city}, {event.country}</div>
          <div className="text-amber-700 dark:text-amber-400 text-sm font-semibold">Role: {event.role}</div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{event.description}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {event.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
