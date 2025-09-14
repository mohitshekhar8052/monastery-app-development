import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Share2, Heart, Download } from "lucide-react"

interface Tour {
  id: string
  name: string
  location: string
  description: string
  scenes: any[]
  audioGuide: {
    languages: string[]
    narrator: string
  }
}

interface TourInfoProps {
  tour: Tour
}

export function TourInfo({ tour }: TourInfoProps) {
  return (
    <div className="p-4 border-b">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl text-balance">{tour.name}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {tour.location}
              </div>
            </div>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground text-pretty mb-4">{tour.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">360° Virtual Tour</Badge>
            <Badge variant="outline">Audio Guide</Badge>
            <Badge variant="outline">Interactive</Badge>
          </div>

          <div className="flex gap-2">
            <Button size="sm" className="flex-1">
              <Download className="h-4 w-4 mr-1" />
              Save Tour
            </Button>
            <Button size="sm" variant="outline" className="flex-1 bg-transparent">
              View Gallery
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
