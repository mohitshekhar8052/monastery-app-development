import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"

// Mock related events data
const relatedEventsData = {
  "losar-celebration": {
    id: "losar-celebration",
    title: "Tibetan New Year (Losar)",
    type: "celebration",
    monastery: "Multiple Monasteries",
    startDate: "2024-02-10",
    image: "/placeholder.svg?key=losar-related",
  },
  "buddha-purnima": {
    id: "buddha-purnima",
    title: "Buddha Purnima Celebration",
    type: "ceremony",
    monastery: "All Monasteries",
    startDate: "2024-05-23",
    image: "/placeholder.svg?key=buddha-purnima-related",
  },
  "monlam-prayer": {
    id: "monlam-prayer",
    title: "Monlam Prayer Festival",
    type: "prayer",
    monastery: "Ganden Monastery",
    startDate: "2024-03-15",
    image: "/placeholder.svg?key=monlam-related",
  },
}

interface RelatedEventsProps {
  eventIds: string[]
}

export function RelatedEvents({ eventIds }: RelatedEventsProps) {
  const relatedEvents = eventIds.map((id) => relatedEventsData[id as keyof typeof relatedEventsData]).filter(Boolean)

  if (relatedEvents.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Related Events</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {relatedEvents.map((event) => (
          <div key={event.id} className="flex gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
            <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-12 h-12 object-cover rounded" />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm text-balance leading-tight mb-1">{event.title}</h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <Badge variant="outline" className="text-xs">
                  {event.type}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{event.monastery}</span>
                <span>•</span>
                <Calendar className="h-3 w-3" />
                <span>{new Date(event.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
              </div>
            </div>
          </div>
        ))}

        <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
          View All Related Events
        </Button>
      </CardContent>
    </Card>
  )
}
