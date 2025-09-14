"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Volume2, VolumeX, RotateCcw, Maximize, Minimize, ZoomIn, ZoomOut, Info, X } from "lucide-react"

interface Hotspot {
  id: number
  x: number
  y: number
  title: string
  description: string
}

interface Scene {
  id: string
  name: string
  panorama: string
  hotspots: Hotspot[]
}

interface Tour {
  id: string
  name: string
  location: string
  description: string
  scenes: Scene[]
  audioGuide: {
    languages: string[]
    narrator: string
  }
}

interface VirtualTourViewerProps {
  tour: Tour
}

export function VirtualTourViewer({ tour }: VirtualTourViewerProps) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null)
  const [rotation, setRotation] = useState(0)

  const viewerRef = useRef<HTMLDivElement>(null)
  const currentScene = tour.scenes[currentSceneIndex]

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const resetView = () => {
    setZoom(1)
    setRotation(0)
  }

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 3))
  }

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5))
  }

  const handleHotspotClick = (hotspot: Hotspot) => {
    setSelectedHotspot(hotspot)
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  return (
    <div ref={viewerRef} className="relative w-full h-full bg-black">
      {/* 360° Panorama Viewer */}
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-300 cursor-grab active:cursor-grabbing"
          style={{
            backgroundImage: `url(${currentScene.panorama})`,
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
          }}
        >
          {/* Interactive Hotspots */}
          {currentScene.hotspots.map((hotspot) => (
            <button
              key={hotspot.id}
              className="absolute w-6 h-6 bg-accent rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform animate-pulse"
              style={{
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => handleHotspotClick(hotspot)}
            >
              <Info className="w-3 h-3 text-white mx-auto" />
            </button>
          ))}
        </div>
      </div>

      {/* Top Controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-background/90 text-foreground">
            {currentScene.name}
          </Badge>
          <Badge variant="outline" className="bg-background/90">
            Scene {currentSceneIndex + 1} of {tour.scenes.length}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" className="bg-background/90">
            <Volume2 className="h-4 w-4 mr-1" />
            Audio Guide
          </Button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-background/90 backdrop-blur rounded-lg p-3">
          <div className="flex items-center justify-between">
            {/* Playback Controls */}
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={togglePlayPause}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button size="sm" variant="outline" onClick={toggleMute}>
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Button size="sm" variant="outline" onClick={resetView}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            {/* Scene Navigation */}
            <div className="flex items-center gap-1">
              {tour.scenes.map((scene, index) => (
                <Button
                  key={scene.id}
                  size="sm"
                  variant={index === currentSceneIndex ? "default" : "outline"}
                  onClick={() => setCurrentSceneIndex(index)}
                  className="px-2"
                >
                  {index + 1}
                </Button>
              ))}
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={zoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={zoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={toggleFullscreen}>
                {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hotspot Information Modal */}
      {selectedHotspot && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{selectedHotspot.title}</h3>
                <Button size="sm" variant="ghost" onClick={() => setSelectedHotspot(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-muted-foreground mb-4">{selectedHotspot.description}</p>
              <div className="flex gap-2">
                <Button size="sm">Learn More</Button>
                <Button size="sm" variant="outline">
                  Audio Description
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Loading Indicator */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin opacity-50" />
      </div>
    </div>
  )
}
