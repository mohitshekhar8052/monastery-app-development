"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Layers, ZoomIn, ZoomOut, RotateCcw, Route } from "lucide-react"

interface Monastery {
  id: string
  name: string
  location: string
  coordinates: [number, number] // [lat, lng]
  description: string
  image: string
  established: string
  visitors: string
  tags: string[]
  difficulty: "Easy" | "Moderate" | "Difficult"
  altitude: string
}

const monasteries: Monastery[] = [
  {
    id: "potala-palace",
    name: "Potala Palace",
    location: "Lhasa, Tibet",
    coordinates: [29.6558, 91.117],
    description: "Former residence of the Dalai Lama, this iconic palace is a masterpiece of Tibetan architecture.",
    image: "/placeholder-sh2ao.png",
    established: "7th Century",
    visitors: "2.1M annually",
    tags: ["UNESCO World Heritage", "Tibetan Buddhism", "Historical"],
    difficulty: "Moderate",
    altitude: "3,700m",
  },
  {
    id: "tashilhunpo",
    name: "Tashilhunpo Monastery",
    location: "Shigatse, Tibet",
    coordinates: [29.2675, 88.8792],
    description: "One of the largest functioning monasteries in Tibet, home to the Panchen Lama.",
    image: "/placeholder-9q0cl.png",
    established: "1447 CE",
    visitors: "500K annually",
    tags: ["Active Monastery", "Gelug School", "Spiritual Center"],
    difficulty: "Moderate",
    altitude: "3,800m",
  },
  {
    id: "hemis",
    name: "Hemis Monastery",
    location: "Ladakh, India",
    coordinates: [34.1341, 77.6267],
    description: "Famous for its annual Hemis Festival and stunning mountain backdrop in the Himalayas.",
    image: "/placeholder-6q0e0.png",
    established: "1630 CE",
    visitors: "300K annually",
    tags: ["Festival Venue", "Drukpa Lineage", "Mountain Setting"],
    difficulty: "Difficult",
    altitude: "3,505m",
  },
  {
    id: "rongbuk",
    name: "Rongbuk Monastery",
    location: "Mount Everest, Tibet",
    coordinates: [28.15, 86.8522],
    description: "The highest monastery in the world, offering breathtaking views of Mount Everest.",
    image: "/placeholder-tabsn.png",
    established: "1902 CE",
    visitors: "150K annually",
    tags: ["Highest Monastery", "Everest Base Camp", "Nyingma School"],
    difficulty: "Difficult",
    altitude: "5,154m",
  },
  {
    id: "samye",
    name: "Samye Monastery",
    location: "Shannan, Tibet",
    coordinates: [29.4167, 91.7833],
    description: "The first Buddhist monastery built in Tibet, representing the Buddhist cosmos.",
    image: "/placeholder-af2mc.png",
    established: "779 CE",
    visitors: "400K annually",
    tags: ["First Monastery", "Historical Significance", "Mandala Design"],
    difficulty: "Easy",
    altitude: "3,556m",
  },
  {
    id: "ganden",
    name: "Ganden Monastery",
    location: "Lhasa, Tibet",
    coordinates: [29.7333, 91.4667],
    description: "Mother monastery of the Gelug school, founded by Je Tsongkhapa.",
    image: "/placeholder-9x6c6.png",
    established: "1409 CE",
    visitors: "350K annually",
    tags: ["Gelug School", "Tsongkhapa", "Pilgrimage Site"],
    difficulty: "Moderate",
    altitude: "4,300m",
  },
]

export function InteractiveMap() {
  const [selectedMonastery, setSelectedMonastery] = useState<Monastery | null>(null)
  const [mapCenter, setMapCenter] = useState<[number, number]>([29.6558, 91.117])
  const [zoom, setZoom] = useState(6)
  const [showRoute, setShowRoute] = useState(false)
  const [mapStyle, setMapStyle] = useState<"satellite" | "terrain" | "standard">("terrain")

  const mapRef = useRef<HTMLDivElement>(null)

  const handleMonasteryClick = (monastery: Monastery) => {
    setSelectedMonastery(monastery)
    setMapCenter(monastery.coordinates)
    setZoom(12)
  }

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 1, 18))
  }

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 1, 3))
  }

  const resetView = () => {
    setMapCenter([29.6558, 91.117])
    setZoom(6)
    setSelectedMonastery(null)
  }

  const toggleRoute = () => {
    setShowRoute(!showRoute)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500"
      case "Moderate":
        return "bg-yellow-500"
      case "Difficult":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="relative w-full h-full">
      {/* Map Container */}
      <div
        ref={mapRef}
        className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 relative overflow-hidden"
        style={{
          backgroundImage: `url('/placeholder.svg?key=map-terrain')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Monastery Markers */}
        {monasteries.map((monastery) => {
          // Simple coordinate to pixel conversion for demo
          const x = ((monastery.coordinates[1] + 180) / 360) * 100
          const y = ((90 - monastery.coordinates[0]) / 180) * 100

          return (
            <button
              key={monastery.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 ${
                selectedMonastery?.id === monastery.id ? "scale-125 z-20" : "z-10"
              }`}
              style={{
                left: `${x}%`,
                top: `${y}%`,
              }}
              onClick={() => handleMonasteryClick(monastery)}
            >
              <div className="relative">
                <div
                  className={`w-6 h-6 rounded-full border-2 border-white shadow-lg ${getDifficultyColor(monastery.difficulty)} flex items-center justify-center`}
                >
                  <MapPin className="w-3 h-3 text-white" />
                </div>
                {selectedMonastery?.id === monastery.id && (
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-48">
                    <Card className="shadow-lg">
                      <CardContent className="p-3">
                        <img
                          src={monastery.image || "/placeholder.svg"}
                          alt={monastery.name}
                          className="w-full h-24 object-cover rounded mb-2"
                        />
                        <h3 className="font-semibold text-sm mb-1">{monastery.name}</h3>
                        <p className="text-xs text-muted-foreground mb-2">{monastery.location}</p>
                        <div className="flex items-center justify-between text-xs">
                          <Badge variant="outline" className="text-xs">
                            {monastery.difficulty}
                          </Badge>
                          <span className="text-muted-foreground">{monastery.altitude}</span>
                        </div>
                        <Button size="sm" className="w-full mt-2 text-xs">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </button>
          )
        })}

        {/* Route Lines (if enabled) */}
        {showRoute && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <pattern id="routePattern" patternUnits="userSpaceOnUse" width="10" height="10">
                <rect width="10" height="10" fill="none" />
                <path d="M0,5 L10,5" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
              </pattern>
            </defs>
            {monasteries.slice(0, -1).map((monastery, index) => {
              const nextMonastery = monasteries[index + 1]
              const x1 = ((monastery.coordinates[1] + 180) / 360) * 100
              const y1 = ((90 - monastery.coordinates[0]) / 180) * 100
              const x2 = ((nextMonastery.coordinates[1] + 180) / 360) * 100
              const y2 = ((90 - nextMonastery.coordinates[0]) / 180) * 100

              return (
                <line
                  key={`route-${index}`}
                  x1={`${x1}%`}
                  y1={`${y1}%`}
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke="url(#routePattern)"
                  strokeWidth="3"
                />
              )
            })}
          </svg>
        )}
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <div className="bg-background/90 backdrop-blur rounded-lg p-2 shadow-lg">
          <div className="flex flex-col gap-1">
            <Button size="sm" variant="outline" onClick={zoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={zoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={resetView}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="bg-background/90 backdrop-blur rounded-lg p-2 shadow-lg">
          <div className="flex flex-col gap-1">
            <Button size="sm" variant={showRoute ? "default" : "outline"} onClick={toggleRoute}>
              <Route className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline">
              <Navigation className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline">
              <Layers className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4">
        <Card className="bg-background/90 backdrop-blur">
          <CardContent className="p-3">
            <h4 className="font-semibold text-sm mb-2">Difficulty Levels</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Easy Access</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Moderate Trek</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Difficult Journey</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Location Info */}
      <div className="absolute top-4 left-4">
        <Card className="bg-background/90 backdrop-blur">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <div>
                <div className="font-semibold text-sm">
                  {selectedMonastery ? selectedMonastery.name : "Himalayan Region"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {selectedMonastery ? selectedMonastery.location : "Buddhist Monasteries"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
