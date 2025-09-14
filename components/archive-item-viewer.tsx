"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ZoomIn, ZoomOut, RotateCcw, Download, Share2, ChevronLeft, ChevronRight, Maximize } from "lucide-react"

interface ArchiveItem {
  id: string
  title: string
  type: string
  monastery: string
  description: string
  dateCreated: string
  language?: string
  material?: string
  dimensions?: string
  condition: string
  images: string[]
  transcription?: string
  significance: string
  tags: string[]
  downloadFormats: string[]
}

interface ArchiveItemViewerProps {
  item: ArchiveItem
}

export function ArchiveItemViewer({ item }: ArchiveItemViewerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [showTranscription, setShowTranscription] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length)
  }

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 3))
  }

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5))
  }

  const resetZoom = () => {
    setZoom(1)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-balance mb-2">{item.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Badge variant="secondary">{item.type}</Badge>
              <span>•</span>
              <span>{item.monastery}</span>
              <span>•</span>
              <span>{item.dateCreated}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        </div>

        <p className="text-muted-foreground text-pretty">{item.description}</p>
      </div>

      {/* Image Viewer */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative bg-muted">
            <div className="relative overflow-hidden" style={{ minHeight: "400px" }}>
              <img
                src={item.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${item.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain transition-transform duration-300"
                style={{ transform: `scale(${zoom})` }}
              />

              {/* Image Navigation */}
              {item.images.length > 1 && (
                <>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/90"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/90"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            {/* Viewer Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary" className="bg-background/90" onClick={zoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary" className="bg-background/90" onClick={zoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary" className="bg-background/90" onClick={resetZoom}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-sm text-background bg-foreground/80 px-3 py-1 rounded-full">
                {currentImageIndex + 1} of {item.images.length}
              </div>

              <Button size="sm" variant="secondary" className="bg-background/90">
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Thumbnails */}
      {item.images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {item.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded border-2 overflow-hidden ${
                index === currentImageIndex ? "border-primary" : "border-border"
              }`}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Transcription/Translation */}
      {item.transcription && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Transcription & Translation</h3>
              <Button size="sm" variant="outline" onClick={() => setShowTranscription(!showTranscription)}>
                {showTranscription ? "Hide" : "Show"} Text
              </Button>
            </div>

            {showTranscription && (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Original Text ({item.language})</h4>
                  <p className="text-sm font-mono leading-relaxed">
                    [Original text would be displayed here in the appropriate script]
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">English Translation</h4>
                  <p className="text-sm leading-relaxed">
                    [English translation of the text would be displayed here, maintaining the spiritual and cultural
                    context of the original work.]
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Significance */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-3">Cultural Significance</h3>
          <p className="text-muted-foreground text-pretty leading-relaxed">{item.significance}</p>
        </CardContent>
      </Card>
    </div>
  )
}
