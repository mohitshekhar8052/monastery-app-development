import { EventsHeader } from "@/components/events-header"
import { EventsCalendar } from "@/components/events-calendar"
import { EventsList } from "@/components/events-list"
import { EventsFilters } from "@/components/events-filters"

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background">
      <EventsHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 flex-shrink-0">
            <EventsFilters />
          </aside>
          <main className="flex-1 space-y-8">
            <EventsCalendar />
            <EventsList />
          </main>
        </div>
      </div>
    </div>
  )
}
