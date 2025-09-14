import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, MapPin, Clock, Bell, Heart } from "lucide-react"

interface Event {
  id: string
  title: string
  startDate: string
  startTime: string
  monastery: string
  attendanceInfo: {
    capacity: number
    registered: number
    ticketRequired: boolean
  }
}

interface EventRegistrationProps {
  event: Event
}

export function EventRegistration({ event }: EventRegistrationProps) {
  const spotsRemaining = event.attendanceInfo.capacity - event.attendanceInfo.registered
  const isAlmostFull = spotsRemaining <= event.attendanceInfo.capacity * 0.1

  return (
    <div className="space-y-6">
      {/* Registration Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Event Registration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Date</span>
              </div>
              <span className="font-medium">
                {new Date(event.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Time</span>
              </div>
              <span className="font-medium">{event.startTime}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Location</span>
              </div>
              <span className="font-medium">{event.monastery}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>Availability</span>
              </div>
              <div className="text-right">
                <div className="font-medium">{spotsRemaining} spots left</div>
                {isAlmostFull && (
                  <Badge variant="destructive" className="text-xs mt-1">
                    Almost Full
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Button className="w-full" size="lg">
              {event.attendanceInfo.ticketRequired ? "Register & Get Ticket" : "Register for Free"}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              {event.attendanceInfo.ticketRequired
                ? "Free registration required for attendance"
                : "No ticket required - registration helps us plan"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Calendar className="h-4 w-4 mr-2" />
            Add to Calendar
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Bell className="h-4 w-4 mr-2" />
            Set Reminder
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Heart className="h-4 w-4 mr-2" />
            Save to Favorites
          </Button>
        </CardContent>
      </Card>

      {/* Event Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Event Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Capacity</span>
            <span className="font-medium">{event.attendanceInfo.capacity}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Registered</span>
            <span className="font-medium">{event.attendanceInfo.registered}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Completion Rate</span>
            <span className="font-medium">
              {Math.round((event.attendanceInfo.registered / event.attendanceInfo.capacity) * 100)}%
            </span>
          </div>

          <div className="mt-4">
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

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Need Help?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="text-muted-foreground">
            For questions about this event, accessibility needs, or registration assistance:
          </p>
          <div className="space-y-1">
            <div>
              <span className="font-medium">Email:</span> events@sacredjourneys.org
            </div>
            <div>
              <span className="font-medium">Phone:</span> +1 (555) 123-4567
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
