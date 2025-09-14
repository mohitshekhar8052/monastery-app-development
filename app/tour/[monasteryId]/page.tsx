import { VirtualTourViewer } from "@/components/virtual-tour-viewer"
import { TourNavigation } from "@/components/tour-navigation"
import { TourInfo } from "@/components/tour-info"
import { notFound } from "next/navigation"

// Mock data for monastery tours
const monasteryTours = {
  "potala-palace": {
    id: "potala-palace",
    name: "Potala Palace",
    location: "Lhasa, Tibet",
    description: "Former residence of the Dalai Lama, this iconic palace is a masterpiece of Tibetan architecture.",
    scenes: [
      {
        id: "main-hall",
        name: "Main Assembly Hall",
        panorama: "/360-degree-monastery-interior-virtual-tour-preview.jpg",
        hotspots: [
          {
            id: 1,
            x: 30,
            y: 40,
            title: "Golden Buddha Statue",
            description: "A magnificent 8-meter tall golden Buddha statue",
          },
          {
            id: 2,
            x: 70,
            y: 60,
            title: "Prayer Wheels",
            description: "Traditional Tibetan prayer wheels used by pilgrims",
          },
          {
            id: 3,
            x: 50,
            y: 20,
            title: "Ceiling Murals",
            description: "Intricate paintings depicting Buddhist teachings",
          },
        ],
      },
      {
        id: "throne-room",
        name: "Dalai Lama's Throne Room",
        panorama: "/placeholder.svg?key=throne-room",
        hotspots: [
          { id: 4, x: 50, y: 50, title: "Golden Throne", description: "The ceremonial throne of the Dalai Lama" },
          { id: 5, x: 20, y: 30, title: "Sacred Texts", description: "Ancient Buddhist scriptures and teachings" },
        ],
      },
      {
        id: "meditation-hall",
        name: "Meditation Hall",
        panorama: "/placeholder.svg?key=meditation-hall",
        hotspots: [
          { id: 6, x: 40, y: 45, title: "Meditation Cushions", description: "Traditional meditation seating area" },
          { id: 7, x: 60, y: 35, title: "Incense Altar", description: "Sacred altar for burning incense offerings" },
        ],
      },
    ],
    audioGuide: {
      languages: ["English", "Tibetan", "Chinese", "Hindi"],
      narrator: "Tenzin Norbu, Buddhist Scholar",
    },
  },
}

interface TourPageProps {
  params: {
    monasteryId: string
  }
}

export default function TourPage({ params }: TourPageProps) {
  const tour = monasteryTours[params.monasteryId as keyof typeof monasteryTours]

  if (!tour) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Main Tour Viewer */}
        <div className="flex-1 relative">
          <VirtualTourViewer tour={tour} />
        </div>

        {/* Side Panel */}
        <div className="w-full lg:w-80 bg-card border-l flex flex-col">
          <TourInfo tour={tour} />
          <TourNavigation tour={tour} />
        </div>
      </div>
    </div>
  )
}

export function generateStaticParams() {
  return [{ monasteryId: "potala-palace" }]
}
