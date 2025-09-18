"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Clock, Mountain, Route } from "lucide-react"

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
  distance: string
}

interface MapSidebarProps {
  onMonasterySelect?: (monastery: Monastery) => void
}

const monasteries: Monastery[] = [
  {
    id: "rumtek",
    name: "Rumtek Monastery",
    location: "Gangtok, Sikkim",
    coordinates: [88.6019, 27.3319], // [lng, lat] - Updated accurate coordinates
    description: "The largest monastery in Sikkim and seat of the Karmapa. Known for its golden stupa and beautiful architecture.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/15870906958510098992",
    established: "1966 CE",
    visitors: "200K annually",
    tags: ["Kagyu School", "Karmapa Seat", "Golden Stupa"],
    difficulty: "Easy",
    altitude: "1,550m",
    distance: "24 km",
  },
  {
    id: "enchey",
    name: "Enchey Monastery",
    location: "Gangtok, Sikkim",
    coordinates: [88.6192, 27.3358], // [lng, lat] - Updated accurate coordinates
    description: "Built on a site blessed by Lama Druptob Karpo, offering panoramic views of Kanchenjunga.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/9645865906034039316",
    established: "1909 CE",
    visitors: "120K annually",
    tags: ["Nyingma School", "City Views", "Tantric Practices"],
    difficulty: "Easy",
    altitude: "1,675m",
    distance: "3 km",
  },
  {
    id: "dubdi",
    name: "Dubdi Monastery",
    location: "Yuksom, West Sikkim",
    coordinates: [88.2299, 27.3668], // [lng, lat] - Updated accurate coordinates
    description: "The oldest monastery in Sikkim, also known as 'The Retreat'. Founded by Lhatsun Chenpo.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/13186172895752387023",
    established: "1701 CE",
    visitors: "45K annually",
    tags: ["Oldest Monastery", "Historical Site", "Lhatsun Chenpo"],
    difficulty: "Difficult",
    altitude: "2,100m",
    distance: "140 km",
  },
  {
    id: "phodong",
    name: "Phodong Monastery",
    location: "North Sikkim",
    coordinates: [88.5829, 27.4168], // [lng, lat] - Updated accurate coordinates
    description: "One of the most important monasteries in North Sikkim, known for its annual masked dance festival.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/8355151222744786139",
    established: "1740 CE",
    visitors: "65K annually",
    tags: ["Kagyu School", "Masked Dance", "North Sikkim"],
    difficulty: "Moderate",
    altitude: "1,300m",
    distance: "38 km",
  },
  {
    id: "tashiding",
    name: "Tashiding Monastery",
    location: "Tashiding, West Sikkim",
    coordinates: [88.2981, 27.3083], // [lng, lat] - Updated accurate coordinates
    description: "Sacred monastery on a hilltop, believed to cleanse sins of those who see it. Famous for Bhumchu festival.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/1933641250976900931",
    established: "1641 CE",
    visitors: "80K annually",
    tags: ["Sacred Site", "Bhumchu Festival", "Sin Cleansing"],
    difficulty: "Moderate",
    altitude: "1,465m",
    distance: "95 km",
  },
  {
    id: "pemayangtse",
    name: "Pemayangtse Monastery",
    location: "Pelling, West Sikkim",
    coordinates: [88.2520, 27.3045], // [lng, lat] - Updated accurate coordinates
    description: "One of the oldest and most important monasteries in Sikkim, meaning 'Perfect Sublime Lotus'.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/223723027753944223",
    established: "1705 CE",
    visitors: "150K annually",
    tags: ["Nyingma School", "Royal Monastery", "Ancient Artifacts"],
    difficulty: "Moderate",
    altitude: "2,085m",
    distance: "115 km",
  },
  {
    id: "ralang",
    name: "Ralang Monastery",
    location: "Ralang, West Sikkim",
    coordinates: [88.3267, 27.3257], // [lng, lat] - Updated accurate coordinates
    description: "Beautiful monastery known for its peaceful surroundings and traditional Kagyu teachings.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/9820843602396613586",
    established: "1768 CE",
    visitors: "40K annually",
    tags: ["Kagyu School", "Peaceful", "Traditional"],
    difficulty: "Moderate",
    altitude: "1,600m",
    distance: "105 km",
  },
  {
    id: "kartok",
    name: "Kartok Monastery",
    location: "West Sikkim",
    coordinates: [88.5881, 27.2408], // [lng, lat] - Updated accurate coordinates
    description: "Ancient monastery with rich historical significance and beautiful mountain views.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/12649175881081987815",
    established: "17th Century",
    visitors: "25K annually",
    tags: ["Ancient", "Mountain Views", "Historical"],
    difficulty: "Difficult",
    altitude: "1,800m",
    distance: "120 km",
  },
  {
    id: "lingdum",
    name: "Lingdum Monastery",
    location: "Ranka, East Sikkim",
    coordinates: [88.5795, 27.3308], // [lng, lat] - Updated accurate coordinates
    description: "Modern monastery complex known for its beautiful architecture and peaceful meditation halls.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/11678863970765068241",
    established: "1999 CE",
    visitors: "85K annually",
    tags: ["Modern", "Architecture", "Meditation"],
    difficulty: "Easy",
    altitude: "1,200m",
    distance: "45 km",
  },
  {
    id: "phensang",
    name: "Phensang Monastery",
    location: "North Sikkim",
    coordinates: [88.6103, 27.4203], // [lng, lat] - Updated accurate coordinates
    description: "Remote monastery offering stunning views of the Himalayas and traditional Buddhist practices.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/3246796675827008895",
    established: "18th Century",
    visitors: "30K annually",
    tags: ["Remote", "Himalayan Views", "Traditional"],
    difficulty: "Difficult",
    altitude: "2,200m",
    distance: "85 km",
  },
  {
    id: "sanga-choeling",
    name: "Sanga Choeling Monastery",
    location: "Pelling, West Sikkim",
    coordinates: [88.2216, 27.2979], // [lng, lat] - Updated accurate coordinates
    description: "The second oldest monastery in Sikkim, offering spectacular views of Kanchenjunga.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/8957885440789428602",
    established: "1697 CE",
    visitors: "55K annually",
    tags: ["Second Oldest", "Kanchenjunga Views", "Historic"],
    difficulty: "Moderate",
    altitude: "2,100m",
    distance: "118 km",
  },
  {
    id: "tsuklakhang",
    name: "Tsuklakhang Monastery",
    location: "Gangtok, Sikkim",
    coordinates: [88.6150, 27.3260], // [lng, lat] - Updated accurate coordinates
    description: "Royal chapel and monastery, center of Buddhist activities in Gangtok.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/3133993396411084512",
    established: "1894 CE",
    visitors: "100K annually",
    tags: ["Royal Chapel", "Buddhist Center", "Gangtok"],
    difficulty: "Easy",
    altitude: "1,650m",
    distance: "2 km",
  },
  {
    id: "labrang",
    name: "Labrang Monastery",
    location: "North Sikkim",
    coordinates: [88.5794, 27.4181], // [lng, lat] - Updated accurate coordinates
    description: "Historic monastery known for its ancient manuscripts and traditional teachings.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/4077670432127252993",
    established: "1844 CE",
    visitors: "35K annually",
    tags: ["Ancient Manuscripts", "Traditional", "Historic"],
    difficulty: "Moderate",
    altitude: "1,400m",
    distance: "42 km",
  },
  {
    id: "lachen",
    name: "Lachen Monastery",
    location: "Lachen, North Sikkim",
    coordinates: [88.5566, 27.7162], // [lng, lat] - Updated accurate coordinates
    description: "High-altitude monastery in the beautiful Lachen valley, gateway to Gurudongmar Lake.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/3084510397331365072",
    established: "19th Century",
    visitors: "20K annually",
    tags: ["High Altitude", "Lachen Valley", "Gurudongmar Gateway"],
    difficulty: "Difficult",
    altitude: "2,750m",
    distance: "125 km",
  },
  {
    id: "ranka",
    name: "Ranka Monastery",
    location: "Ranka, East Sikkim",
    coordinates: [88.5795, 27.3308], // [lng, lat] - Same as Lingdum (as noted by user)
    description: "Serene monastery surrounded by lush forests and offering panoramic valley views.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/4184074827260027762",
    established: "20th Century",
    visitors: "50K annually",
    tags: ["Forest Setting", "Valley Views", "Serene"],
    difficulty: "Easy",
    altitude: "1,400m",
    distance: "48 km",
  },
]

const routes = [
  {
    id: "sikkim-heritage",
    name: "Sikkim Heritage Circuit",
    duration: "5 days",
    monasteries: 6,
    difficulty: "Moderate",
    distance: "285 km",
    description: "Complete spiritual journey through Sikkim's most sacred monasteries",
  },
  {
    id: "west-sikkim-trail",
    name: "West Sikkim Monastery Trail",
    duration: "3 days",
    monasteries: 4,
    difficulty: "Moderate",
    distance: "180 km",
    description: "Explore ancient monasteries in the scenic western valleys of Sikkim",
  },
  {
    id: "gangtok-circuit",
    name: "Gangtok Monastery Circuit",
    duration: "1 day",
    monasteries: 2,
    difficulty: "Easy",
    distance: "35 km",
    description: "Day trip covering major monasteries around Sikkim's capital",
  },
]

export function MapSidebar({ onMonasterySelect }: MapSidebarProps) {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "easy" | "moderate" | "difficult">("all")

  const filteredMonasteries = monasteries.filter((monastery) => {
    const matchesFilter = selectedFilter === "all" || monastery.difficulty.toLowerCase() === selectedFilter
    return matchesFilter
  })

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
    <div className="w-80 min-w-80 max-w-80 bg-card border-l flex flex-col overflow-hidden">
      <div className="p-4 border-b flex-shrink-0">
        <div className="flex gap-1">
          <Button
            size="sm"
            variant={selectedFilter === "all" ? "default" : "outline"}
            onClick={() => setSelectedFilter("all")}
            className="text-xs"
          >
            All
          </Button>
          <Button
            size="sm"
            variant={selectedFilter === "easy" ? "default" : "outline"}
            onClick={() => setSelectedFilter("easy")}
            className="text-xs"
          >
            Easy
          </Button>
          <Button
            size="sm"
            variant={selectedFilter === "moderate" ? "default" : "outline"}
            onClick={() => setSelectedFilter("moderate")}
            className="text-xs"
          >
            Moderate
          </Button>
          <Button
            size="sm"
            variant={selectedFilter === "difficult" ? "default" : "outline"}
            onClick={() => setSelectedFilter("difficult")}
            className="text-xs"
          >
            Difficult
          </Button>
        </div>
      </div>

      <Tabs defaultValue="monasteries" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="grid w-full grid-cols-2 mx-4 mt-4 flex-shrink-0">
          <TabsTrigger value="monasteries">Monasteries</TabsTrigger>
          <TabsTrigger value="routes">Routes</TabsTrigger>
        </TabsList>

        <TabsContent value="monasteries" className="flex-1 mt-4 overflow-hidden">
          <ScrollArea className="h-full px-4">
            <div className="space-y-3 pb-4">
              {filteredMonasteries.map((monastery) => (
                <Card key={monastery.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3">
                    <div className="flex gap-3">
                      <img
                        src={monastery.image || "/placeholder.svg"}
                        alt={monastery.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-balance mb-1">{monastery.name}</h3>
                        <div className="flex items-center text-xs text-muted-foreground mb-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          {monastery.location}
                        </div>

                        <div className="flex items-center justify-between text-xs mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getDifficultyColor(monastery.difficulty)}`}></div>
                            <span>{monastery.difficulty}</span>
                          </div>
                          <div className="flex items-center">
                            <Mountain className="h-3 w-3 mr-1" />
                            {monastery.altitude}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center">
                            <Route className="h-3 w-3 mr-1" />
                            {monastery.distance}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {monastery.tags[0]}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button 
                        size="sm" 
                        className="flex-1 text-xs"
                        onClick={() => onMonasterySelect?.(monastery)}
                      >
                        View on Map
                      </Button>
                      <Link href={`/virtual-tours/${monastery.id}`} className="flex-1">
                        <Button size="sm" variant="outline" className="w-full text-xs bg-transparent">
                          Virtual Tour
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="routes" className="flex-1 mt-4 overflow-hidden">
          <ScrollArea className="h-full px-4">
            <div className="space-y-3 pb-4">
              {routes.map((route) => (
                <Card key={route.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-balance">{route.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs text-muted-foreground text-pretty mb-3">{route.description}</p>

                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {route.duration}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {route.monasteries} stops
                      </div>
                      <div className="flex items-center">
                        <Route className="h-3 w-3 mr-1" />
                        {route.distance}
                      </div>
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-1 ${getDifficultyColor(route.difficulty)}`}></div>
                        {route.difficulty}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 text-xs">
                        View Route
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 text-xs bg-transparent">
                        Plan Trip
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
