import speakingData from '../data/speaking.json'

export interface SpeakingEvent {
  slug: string
  title: string
  event: string
  date: string // ISO date string
  venue: string
  city: string
  country: string
  role: string
  description: string
  tags: string[]
}

export const speakingEvents: SpeakingEvent[] = speakingData as SpeakingEvent[]

export function getUpcomingEvents(reference: Date = new Date()): SpeakingEvent[] {
  const refTs = reference.getTime()
  return speakingEvents.filter(e => new Date(e.date).getTime() >= refTs)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export function getPastEvents(reference: Date = new Date()): SpeakingEvent[] {
  const refTs = reference.getTime()
  return speakingEvents.filter(e => new Date(e.date).getTime() < refTs)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
