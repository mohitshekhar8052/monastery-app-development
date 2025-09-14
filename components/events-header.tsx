import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Filter, Bell, Share2 } from "lucide-react"
import Link from "next/link"

export function EventsHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>

            <div>
              <h1 className="text-2xl font-bold text-balance">Cultural Calendar & Events</h1>
              <p className="text-muted-foreground">Discover sacred festivals and spiritual gatherings</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary">24 Upcoming Events</Badge>
            <Badge variant="outline">6 This Month</Badge>

            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search festivals, ceremonies, or events..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Event Filters
          </Button>
        </div>
      </div>
    </header>
  )
}
