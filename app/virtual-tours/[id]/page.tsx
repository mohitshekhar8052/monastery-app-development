"use client"

import { useParams } from "next/navigation"
import { VirtualTourViewer } from "@/components/virtual-tour-viewer"
import { Header } from "@/components/header"

// Monastery data (this should ideally come from a database or API)
const monasteries = {
  "rumtek": {
    id: "rumtek",
    name: "Rumtek Monastery",
    location: "Gangtok, Sikkim",
    description: "The largest monastery in Sikkim and seat of the Karmapa. Known for its golden stupa and beautiful architecture.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/15870906958510098992",
    established: "1966 CE",
    virtualTourData: {
      scenes: [
        {
          id: "main-hall",
          name: "Main Prayer Hall",
          image: "/360-degree-monastery-interior-virtual-tour-preview.jpg",
          hotspots: [
            { x: 50, y: 30, title: "Golden Stupa", description: "Sacred golden stupa containing relics" },
            { x: 70, y: 60, title: "Prayer Wheels", description: "Traditional Tibetan prayer wheels" }
          ]
        },
        {
          id: "courtyard",
          name: "Monastery Courtyard",
          image: "/placeholder.jpg",
          hotspots: [
            { x: 40, y: 50, title: "Central Shrine", description: "Main outdoor shrine for ceremonies" }
          ]
        }
      ]
    }
  },
  "enchey": {
    id: "enchey",
    name: "Enchey Monastery",
    location: "Gangtok, Sikkim",
    description: "Built on a site blessed by Lama Druptob Karpo, offering panoramic views of Kanchenjunga.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/9645865906034039316",
    established: "1909 CE",
    virtualTourData: {
      scenes: [
        {
          id: "main-hall",
          name: "Main Prayer Hall",
          image: "/360-degree-monastery-interior-virtual-tour-preview.jpg",
          hotspots: [
            { x: 30, y: 40, title: "Buddha Statue", description: "Ancient Buddha statue" },
            { x: 80, y: 20, title: "Mountain View", description: "View of Kanchenjunga" }
          ]
        }
      ]
    }
  },
  "dubdi": {
    id: "dubdi",
    name: "Dubdi Monastery",
    location: "Yuksom, West Sikkim",
    description: "The oldest monastery in Sikkim, also known as 'The Retreat'. Founded by Lhatsun Chenpo.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/13186172895752387023",
    established: "1701 CE",
    virtualTourData: {
      scenes: [
        {
          id: "main-hall",
          name: "Ancient Prayer Hall",
          image: "/360-degree-monastery-interior-virtual-tour-preview.jpg",
          hotspots: [
            { x: 50, y: 50, title: "Historical Artifacts", description: "Ancient Buddhist artifacts" }
          ]
        }
      ]
    }
  },
  "phodong": {
    id: "phodong",
    name: "Phodong Monastery",
    location: "North Sikkim",
    description: "One of the most important monasteries in North Sikkim, known for its annual masked dance festival.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/8355151222744786139",
    established: "1740 CE",
    virtualTourData: {
      scenes: [
        {
          id: "main-hall",
          name: "Festival Hall",
          image: "/360-degree-monastery-interior-virtual-tour-preview.jpg",
          hotspots: [
            { x: 60, y: 40, title: "Dance Floor", description: "Where masked dances are performed" }
          ]
        }
      ]
    }
  },
  "tashiding": {
    id: "tashiding",
    name: "Tashiding Monastery",
    location: "Tashiding, West Sikkim",
    description: "Sacred monastery on a hilltop, believed to cleanse sins of those who see it. Famous for Bhumchu festival.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/1933641250976900931",
    established: "1641 CE",
    virtualTourData: {
      scenes: [
        {
          id: "main-hall",
          name: "Sacred Hall",
          image: "/360-degree-monastery-interior-virtual-tour-preview.jpg",
          hotspots: [
            { x: 50, y: 30, title: "Sacred Vessel", description: "Holy water vessel for Bhumchu festival" }
          ]
        }
      ]
    }
  },
  "pemayangtse": {
    id: "pemayangtse",
    name: "Pemayangtse Monastery",
    location: "Pelling, West Sikkim",
    description: "One of the oldest and most important monasteries in Sikkim, meaning 'Perfect Sublime Lotus'.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/223723027753944223",
    established: "1705 CE",
    virtualTourData: {
      scenes: [
        {
          id: "main-hall",
          name: "Lotus Hall",
          image: "/360-degree-monastery-interior-virtual-tour-preview.jpg",
          hotspots: [
            { x: 45, y: 35, title: "Lotus Statue", description: "Sacred lotus meditation statue" }
          ]
        }
      ]
    }
  },
  "ralang": {
    id: "ralang",
    name: "Ralang Monastery",
    location: "Ralang, West Sikkim",
    description: "Beautiful monastery known for its peaceful surroundings and traditional Kagyu teachings.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/9820843602396613586",
    established: "1768 CE",
    virtualTourData: {
      scenes: [
        {
          id: "main-hall",
          name: "Meditation Hall",
          image: "/360-degree-monastery-interior-virtual-tour-preview.jpg",
          hotspots: [
            { x: 50, y: 50, title: "Meditation Area", description: "Traditional meditation space" }
          ]
        }
      ]
    }
  },
  "kartok": {
    id: "kartok",
    name: "Kartok Monastery",
    location: "West Sikkim",
    description: "Ancient monastery with rich historical significance and beautiful mountain views.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/12649175881081987815",
    established: "17th Century",
    virtualTourData: {
      scenes: [
        {
          id: "main-hall",
          name: "Ancient Hall",
          image: "/360-degree-monastery-interior-virtual-tour-preview.jpg",
          hotspots: [
            { x: 40, y: 30, title: "Ancient Murals", description: "Historical wall paintings" }
          ]
        }
      ]
    }
  },
  "lingdum": {
    id: "lingdum",
    name: "Lingdum Monastery",
    location: "Ranka, East Sikkim",
    description: "Modern monastery complex known for its beautiful architecture and peaceful meditation halls.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/11678863970765068241",
    established: "1999 CE",
    virtualTourData: {
      scenes: [
        {
          id: "main-hall",
          name: "Modern Prayer Hall",
          image: "/360-degree-monastery-interior-virtual-tour-preview.jpg",
          hotspots: [
            { x: 50, y: 40, title: "Contemporary Design", description: "Modern Buddhist architecture" }
          ]
        }
      ]
    }
  },
  "phensang": {
    id: "phensang",
    name: "Phensang Monastery",
    location: "North Sikkim",
    description: "Remote monastery offering stunning views of the Himalayas and traditional Buddhist practices.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/3246796675827008895",
    established: "18th Century",
    virtualTourData: {
      scenes: [
        {
          id: "main-hall",
          name: "Mountain View Hall",
          image: "/360-degree-monastery-interior-virtual-tour-preview.jpg",
          hotspots: [
            { x: 70, y: 20, title: "Himalayan Vista", description: "Panoramic mountain views" }
          ]
        }
      ]
    }
  },
  "sanga-choeling": {
    id: "sanga-choeling",
    name: "Sanga Choeling Monastery",
    location: "Pelling, West Sikkim",
    description: "The second oldest monastery in Sikkim, offering spectacular views of Kanchenjunga.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/8957885440789428602",
    established: "1697 CE",
    virtualTourData: {
      scenes: [
        {
          id: "main-hall",
          name: "Historic Prayer Hall",
          image: "/360-degree-monastery-interior-virtual-tour-preview.jpg",
          hotspots: [
            { x: 60, y: 30, title: "Kanchenjunga View", description: "Sacred mountain view" }
          ]
        }
      ]
    }
  },
  "tsuklakhang": {
    id: "tsuklakhang",
    name: "Tsuklakhang Monastery",
    location: "Gangtok, Sikkim",
    description: "Royal chapel and monastery, center of Buddhist activities in Gangtok.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/3133993396411084512",
    established: "1894 CE",
    virtualTourData: {
      scenes: [
        {
          id: "main-hall",
          name: "Royal Chapel",
          image: "/360-degree-monastery-interior-virtual-tour-preview.jpg",
          hotspots: [
            { x: 50, y: 45, title: "Royal Throne", description: "Historic royal prayer seat" }
          ]
        }
      ]
    }
  },
  "labrang": {
    id: "labrang",
    name: "Labrang Monastery",
    location: "North Sikkim",
    description: "Historic monastery known for its ancient manuscripts and traditional teachings.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/4077670432127252993",
    established: "1844 CE",
    virtualTourData: {
      scenes: [
        {
          id: "main-hall",
          name: "Manuscript Hall",
          image: "/360-degree-monastery-interior-virtual-tour-preview.jpg",
          hotspots: [
            { x: 40, y: 50, title: "Ancient Texts", description: "Collection of sacred manuscripts" }
          ]
        }
      ]
    }
  },
  "lachen": {
    id: "lachen",
    name: "Lachen Monastery",
    location: "Lachen, North Sikkim",
    description: "High-altitude monastery in the beautiful Lachen valley, gateway to Gurudongmar Lake.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/3084510397331365072",
    established: "19th Century",
    virtualTourData: {
      scenes: [
        {
          id: "main-hall",
          name: "High Altitude Hall",
          image: "/360-degree-monastery-interior-virtual-tour-preview.jpg",
          hotspots: [
            { x: 50, y: 30, title: "Alpine Setting", description: "High mountain monastery" }
          ]
        }
      ]
    }
  },
  "ranka": {
    id: "ranka",
    name: "Ranka Monastery",
    location: "Ranka, East Sikkim",
    description: "Serene monastery surrounded by lush forests and offering panoramic valley views.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/4184074827260027762",
    established: "20th Century",
    virtualTourData: {
      scenes: [
        {
          id: "main-hall",
          name: "Forest Temple",
          image: "/360-degree-monastery-interior-virtual-tour-preview.jpg",
          hotspots: [
            { x: 60, y: 40, title: "Nature View", description: "Forest and valley panorama" }
          ]
        }
      ]
    }
  }
}

export default function VirtualTourPage() {
  const params = useParams()
  const monasteryId = params.id as string
  
  const monastery = monasteries[monasteryId as keyof typeof monasteries]

  if (!monastery) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Virtual Tour Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The virtual tour for this monastery is not available yet.
          </p>
          <a 
            href="/virtual-tours" 
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Browse All Virtual Tours
          </a>
        </div>
      </div>
    )
  }

  // Transform monastery data to tour format expected by VirtualTourViewer
  const tour = {
    id: monastery.id,
    name: monastery.name,
    location: monastery.location,
    description: monastery.description,
    scenes: monastery.virtualTourData.scenes.map((scene, index) => ({
      id: scene.id,
      name: scene.name,
      panorama: scene.image,
      hotspots: scene.hotspots.map((hotspot, hotspotIndex) => ({
        id: hotspotIndex + 1,
        x: hotspot.x,
        y: hotspot.y,
        title: hotspot.title,
        description: hotspot.description
      }))
    })),
    audioGuide: {
      languages: ["English", "Tibetan"],
      narrator: "Monastery Guide"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="h-[calc(100vh-4rem)]">
        <VirtualTourViewer tour={tour} />
      </div>
    </div>
  )
}