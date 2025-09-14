import { InteractiveMap } from "@/components/interactive-map"
import { MapSidebar } from "@/components/map-sidebar"
import { MapHeader } from "@/components/map-header"

export default function MapPage() {
  return (
    <div className="min-h-screen bg-background">
      <MapHeader />
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="flex-1 relative">
          <InteractiveMap />
        </div>
        <MapSidebar />
      </div>
    </div>
  )
}
