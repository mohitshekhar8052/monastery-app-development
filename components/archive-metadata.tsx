import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Ruler, Palette, Globe, Download } from "lucide-react"

interface ArchiveItem {
  id: string
  title: string
  type: string
  monastery: string
  dateCreated: string
  language?: string
  material?: string
  dimensions?: string
  condition: string
  tags: string[]
  downloadFormats: string[]
}

interface ArchiveMetadataProps {
  item: ArchiveItem
}

export function ArchiveMetadata({ item }: ArchiveMetadataProps) {
  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Item Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Date Created</span>
              </div>
              <span className="font-medium">{item.dateCreated}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Monastery</span>
              </div>
              <span className="font-medium">{item.monastery}</span>
            </div>

            {item.language && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <span>Language</span>
                </div>
                <span className="font-medium">{item.language}</span>
              </div>
            )}

            {item.material && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Palette className="h-4 w-4" />
                  <span>Material</span>
                </div>
                <span className="font-medium">{item.material}</span>
              </div>
            )}

            {item.dimensions && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Ruler className="h-4 w-4" />
                  <span>Dimensions</span>
                </div>
                <span className="font-medium">{item.dimensions}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Condition</span>
              <Badge variant="outline">{item.condition}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Download Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Download Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {item.downloadFormats.map((format) => (
            <Button key={format} variant="outline" className="w-full justify-start bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Download as {format}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Citation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Citation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-3 bg-muted rounded text-sm font-mono">
            {item.title}. ({item.dateCreated}). {item.monastery} Digital Archives. Sacred Journeys Platform. Retrieved{" "}
            {new Date().toLocaleDateString()}, from https://sacredjourneys.org/archives/{item.id}
          </div>
          <Button size="sm" variant="outline" className="mt-2 bg-transparent">
            Copy Citation
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
