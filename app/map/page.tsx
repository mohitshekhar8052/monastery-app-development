"use client"

import { useState } from "react"
import { MapboxMap } from "@/components/mapbox-map"
import { MapSidebar } from "@/components/map-sidebar"
import { MapHeader } from "@/components/map-header"

interface Monastery {
  id: string
  name: string
  location: string
  coordinates: [number, number]
  description: string
  image: string
  established: string
  visitors: string
  tags: string[]
  difficulty: "Easy" | "Moderate" | "Difficult"
  altitude: string
}

export default function MapPage() {
  const [selectedMonasteryFromSidebar, setSelectedMonasteryFromSidebar] = useState<Monastery | null>(null)

  return (
    <div className="h-screen w-screen bg-background overflow-hidden">
      <MapHeader />
      <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden">
        <div className="flex-1 min-w-0 relative overflow-hidden">
          <MapboxMap selectedMonastery={selectedMonasteryFromSidebar} />
        </div>
        <MapSidebar onMonasterySelect={setSelectedMonasteryFromSidebar} />
      </div>
    </div>
  )
}
