import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, ArrowLeft, Share2, Download, Settings } from "lucide-react"
import Link from "next/link"

export function MapHeader() {
  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Sikkim Monastery Map</h1>
              <div className="text-xs text-muted-foreground">Explore sacred monasteries of the Himalayan state</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="hidden sm:flex">
            8 Monasteries
          </Badge>
          <Badge variant="outline" className="hidden sm:flex">
            Sikkim Region
          </Badge>

          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
