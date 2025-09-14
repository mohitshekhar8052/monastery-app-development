import { EventDetails } from "@/components/event-details"
import { EventRegistration } from "@/components/event-registration"
import { RelatedEvents } from "@/components/related-events"
import { notFound } from "next/navigation"

// Mock event data
const events = {
  "hemis-festival-2024": {
    id: "hemis-festival-2024",
    title: "Hemis Festival 2024",
    type: "festival",
    monastery: "Hemis Monastery",
    location: "Ladakh, India",
    startDate: "2024-07-15",
    endDate: "2024-07-16",
    startTime: "09:00",
    endTime: "18:00",
    description:
      "The annual Hemis Festival celebrates the birth anniversary of Guru Padmasambhava, featuring spectacular masked dances (Cham) performed by monks in the monastery courtyard.",
    longDescription:
      "The Hemis Festival is one of the most famous and colorful festivals in Ladakh, held annually at Hemis Monastery. The festival commemorates the birth anniversary of Guru Padmasambhava, the founder of Tantric Buddhism in Tibet. The highlight of the festival is the sacred masked dance (Cham) performed by monks wearing elaborate costumes and masks representing various deities and demons. The dances are not merely performances but are considered sacred rituals that help purify the environment and bring blessings to all who witness them.",
    image: "/hemis-festival-masked-dancers-colorful.jpg",
    significance:
      "This festival represents the triumph of good over evil and serves as a spiritual cleansing for the community.",
    traditions: [
      "Sacred Cham dances performed by monks",
      "Display of ancient thangka paintings",
      "Traditional Ladakhi music and chanting",
      "Community feast and cultural exchange",
    ],
    schedule: [
      { time: "09:00", activity: "Opening ceremony and prayers" },
      { time: "10:30", activity: "First Cham dance performance" },
      { time: "12:00", activity: "Community lunch break" },
      { time: "14:00", activity: "Thangka display and blessing" },
      { time: "15:30", activity: "Main Cham dance performance" },
      { time: "17:00", activity: "Closing prayers and community gathering" },
    ],
    attendanceInfo: {
      capacity: 2000,
      registered: 1247,
      ticketRequired: false,
      accessibility: "Limited wheelchair access",
    },
    tags: ["Festival", "Masked Dance", "Guru Padmasambhava", "Ladakhi Culture"],
    relatedEvents: ["losar-celebration", "buddha-purnima", "monlam-prayer"],
  },
}

interface EventPageProps {
  params: {
    eventId: string
  }
}

export default function EventPage({ params }: EventPageProps) {
  const event = events[params.eventId as keyof typeof events]

  if (!event) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <EventDetails event={event} />
          </div>
          <div className="space-y-6">
            <EventRegistration event={event} />
            <RelatedEvents eventIds={event.relatedEvents} />
          </div>
        </div>
      </div>
    </div>
  )
}

export function generateStaticParams() {
  return [{ eventId: "hemis-festival-2024" }]
}
