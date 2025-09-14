"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Users, ChevronRight } from "lucide-react"
import Link from "next/link"

interface Event {
  id: string
  title: string
  type: "festival" | "ceremony" | "celebration" | "prayer" | "teaching"
  monastery: string
  location: string
  startDate: string
  endDate?: string
  startTime: string
  description: string
  image: string
  attendees: number
  capacity: number
  tags: string[]
  featured: boolean
}

const events: Event[] = [
  {
    id: "hemis-festival-2024",
    title: "Hemis Festival 2024",
    type: "festival",
    monastery: "Hemis Monastery",
    location: "Ladakh, India",
    startDate: "2024-07-15",
    endDate: "2024-07-16",
    startTime: "09:00",
    description: "Annual masked dance festival celebrating Guru Padmasambhava with spectacular Cham performances.",
    image: "/images/monks-debate-courtyard.jpg", // Updated with beautiful monks debate image
    attendees: 1247,
    capacity: 2000,
    tags: ["Masked Dance", "Guru Padmasambhava", "Cultural"],
    featured: true,
  },
  {
    id: "losar-celebration",
    title: "Tibetan New Year (Losar)",
    type: "celebration",
    monastery: "Multiple Monasteries",
    location: "Tibet & Ladakh",
    startDate: "2024-02-10",
    endDate: "2024-02-12",
    startTime: "06:00",
    description: "Traditional Tibetan New Year celebration with prayers, rituals, and community festivities.",
    image: "/images/prayer-wheels-spinning-monastery.jpg", // Updated with prayer wheels image
    attendees: 3456,
    capacity: 5000,
    tags: ["New Year", "Traditional", "Community"],
    featured: true,
  },
  {
    id: "buddha-purnima",
    title: "Buddha Purnima Celebration",
    type: "ceremony",
    monastery: "All Monasteries",
    location: "Multiple Locations",
    startDate: "2024-05-23",
    startTime: "05:00",
    description: "Celebration of Buddha's birth, enlightenment, and parinirvana with special prayers and teachings.",
    image: "/images/himalayan-monastery-valley.jpg", // Updated with beautiful Himalayan monastery image
    attendees: 2134,
    capacity: 3000,
    tags: ["Buddha", "Enlightenment", "Sacred"],
    featured: false,
  },
  {
    id: "monlam-prayer",
    title: "Monlam Prayer Festival",
    type: "prayer",
    monastery: "Ganden Monastery",
    location: "Lhasa, Tibet",
    startDate: "2024-03-15",
    endDate: "2024-03-22",
    startTime: "07:00",
    description: "Great Prayer Festival with intensive meditation, prayers, and teachings by senior monks.",
    image: "/images/ritual-vajra-bell-bronze.jpg", // Updated with ritual vajra bell image
    attendees: 876,
    capacity: 1500,
    tags: ["Prayer", "Meditation", "Teaching"],
    featured: false,
  },
  {
    id: "kalachakra-teaching",
    title: "Kalachakra Teaching Retreat",
    type: "teaching",
    monastery: "Tashilhunpo Monastery",
    location: "Shigatse, Tibet",
    startDate: "2024-08-10",
    endDate: "2024-08-17",
    startTime: "08:00",
    description: "Advanced tantric teachings on the Kalachakra system by His Holiness the Panchen Lama.",
    image: "/images/ancient-tibetan-manuscript-gold.jpg", // Updated with golden manuscript image
    attendees: 234,
    capacity: 500,
    tags: ["Tantra", "Advanced Teaching", "Kalachakra"],
    featured: false,
  },
  {
    id: "tara-puja",
    title: "Green Tara Puja Ceremony",
    type: "ceremony",
    monastery: "Samye Monastery",
    location: "Shannan, Tibet",
    startDate: "2024-06-08",
    startTime: "14:00",
    description: "Special ceremony dedicated to Green Tara, the female Buddha of compassionate action.",
    image: "/images/thangka-green-tara-painting.jpg", // Updated with Green Tara thangka image
    attendees: 567,
    capacity: 800,
    tags: ["Tara", "Compassion", "Ceremony"],
    featured: false,
  },
]

const typeColors = {
  festival: "bg-red-500",
  ceremony: "bg-blue-500",
  celebration: "bg-yellow-500",
  prayer: "bg-green-500",
  teaching: "bg-purple-500",
}

export function EventsList() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "featured">("all")
  const [sortBy, setSortBy] = useState<"date" | "popularity">("date")

  const filteredEvents = events.filter((event) => {
    if (filter === "featured") return event.featured
    if (filter === "upcoming") return new Date(event.startDate) > new Date()
    return true
  })

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === "popularity") {
      return b.attendees - a.attendees
    }
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  })

  const formatDate = (startDate: string, endDate?: string) => {
    const start = new Date(startDate)
    const startFormatted = start.toLocaleDateString("en-US", { month: "short", day: "numeric" })

    if (endDate) {
      const end = new Date(endDate)
      const endFormatted = end.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      return `${startFormatted} - ${endFormatted}`
    }

    return startFormatted
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Show:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as "all" | "upcoming" | "featured")}
              className="text-sm border border-border rounded px-2 py-1 bg-background"
            >
              <option value="all">All Events</option>
              <option value="upcoming">Upcoming</option>
              <option value="featured">Featured</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date" | "popularity")}
              className="text-sm border border-border rounded px-2 py-1 bg-background"
            >
              <option value="date">Date</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">{sortedEvents.length} events found</div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedEvents.map((event) => (
          <Card key={event.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="relative overflow-hidden">
              <img
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <Badge variant="secondary" className="bg-background/90 text-foreground">
                  {event.type}
                </Badge>
              </div>
              {event.featured && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-accent text-accent-foreground">Featured</Badge>
                </div>
              )}
              <div className="absolute bottom-3 left-3">
                <div className={`w-3 h-3 rounded-full ${typeColors[event.type]}`}></div>
              </div>
            </div>

            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-balance leading-tight">{event.title}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                {event.monastery}
                <span className="mx-2">•</span>
                {event.location}
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground text-pretty mb-4 line-clamp-2">{event.description}</p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(event.startDate, event.endDate)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{event.startTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>
                      {event.attendees}/{event.capacity} attending
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {Math.round((event.attendees / event.capacity) * 100)}% full
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {event.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Link href={`/events/${event.id}`} className="flex-1">
                  <Button size="sm" className="w-full">
                    View Details
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </Link>
                <Button size="sm" variant="outline">
                  Add to Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Events
        </Button>
      </div>
    </div>
  )
}
