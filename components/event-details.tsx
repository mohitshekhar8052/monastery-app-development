import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Share2, Download, ArrowLeft, Play } from "lucide-react"
import Link from "next/link"

interface Event {
  id: string
  title: string
  type: string
  monastery: string
  location: string
  startDate: string
  endDate?: string
  startTime: string
  endTime: string
  description: string
  longDescription: string
  image: string
  significance: string
  traditions: string[]
  schedule: Array<{ time: string; activity: string }>
  attendanceInfo: {
    capacity: number
    registered: number
    ticketRequired: boolean
    accessibility: string
  }
  tags: string[]
}

interface EventDetailsProps {
  event: Event
}

export function EventDetails({ event }: EventDetailsProps) {
  const formatDate = (startDate: string, endDate?: string) => {
    const start = new Date(startDate)
    const startFormatted = start.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    if (endDate) {
      const end = new Date(endDate)
      const endFormatted = end.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      return `${startFormatted} - ${endFormatted}`
    }

    return startFormatted
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link href="/events">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
        </Link>

        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-balance mb-2">{event.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Badge variant="secondary">{event.type}</Badge>
              <span>•</span>
              <span>{event.monastery}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {event.location}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(event.startDate, event.endDate)}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {event.startTime} - {event.endTime}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-1" />
              Download Info
            </Button>
          </div>
        </div>

        <p className="text-lg text-muted-foreground text-pretty">{event.description}</p>
      </div>

      {/* Hero Image with Video */}
      <div className="relative overflow-hidden rounded-lg">
        <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-64 md:h-96 object-cover" />
        {event.type === "festival" && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <Button size="lg" className="bg-background/90 text-foreground hover:bg-background">
              <Play className="h-6 w-6 mr-2" />
              Watch Festival Highlights
            </Button>
          </div>
        )}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="text-sm text-background bg-foreground/80 px-3 py-1 rounded-full">
            {event.attendanceInfo.registered} / {event.attendanceInfo.capacity} registered
          </div>
          <div className="flex gap-1">
            {event.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-background/90 text-foreground text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {event.type === "festival" && (
        <Card>
          <CardHeader>
            <CardTitle>Festival Videos & Media</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <video className="w-full h-full object-cover" poster="/images/monks-debate-courtyard.jpg" controls>
                  <source src="/videos/monastery-morning-prayers.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute bottom-2 left-2">
                  <Badge variant="secondary" className="bg-background/90 text-foreground text-xs">
                    Morning Prayers
                  </Badge>
                </div>
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <video className="w-full h-full object-cover" poster="/images/ritual-vajra-bell-bronze.jpg" controls>
                  <source src="/videos/butter-lamp-ceremony.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute bottom-2 left-2">
                  <Badge variant="secondary" className="bg-background/90 text-foreground text-xs">
                    Butter Lamp Ceremony
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* About the Event */}
      <Card>
        <CardHeader>
          <CardTitle>About This Event</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-pretty leading-relaxed">{event.longDescription}</p>

          <div>
            <h4 className="font-semibold mb-2">Cultural Significance</h4>
            <p className="text-muted-foreground text-pretty leading-relaxed">{event.significance}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Traditional Elements</h4>
            <ul className="space-y-1">
              {event.traditions.map((tradition, index) => (
                <li key={index} className="text-muted-foreground flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  {tradition}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Event Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Event Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {event.schedule.map((item, index) => (
              <div key={index} className="flex gap-4 pb-4 border-b border-border last:border-b-0 last:pb-0">
                <div className="w-16 text-sm font-medium text-primary">{item.time}</div>
                <div className="flex-1">
                  <p className="text-sm">{item.activity}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Attendance Information */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Capacity</span>
              <span className="font-medium">{event.attendanceInfo.capacity} people</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Currently Registered</span>
              <span className="font-medium">{event.attendanceInfo.registered} people</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Ticket Required</span>
              <span className="font-medium">{event.attendanceInfo.ticketRequired ? "Yes" : "No"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Accessibility</span>
              <span className="font-medium">{event.attendanceInfo.accessibility}</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Registration Progress</span>
              <span>{Math.round((event.attendanceInfo.registered / event.attendanceInfo.capacity) * 100)}% full</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(event.attendanceInfo.registered / event.attendanceInfo.capacity) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
