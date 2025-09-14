"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Clock, Mountain, Route } from "lucide-react"

const monasteries = [
  {
    id: "potala-palace",
    name: "Potala Palace",
    location: "Lhasa, Tibet",
    description: "Former residence of the Dalai Lama, this iconic palace is a masterpiece of Tibetan architecture.",
    image: "/placeholder-sh2ao.png",
    established: "7th Century",
    visitors: "2.1M annually",
    tags: ["UNESCO World Heritage", "Tibetan Buddhism", "Historical"],
    difficulty: "Moderate",
    altitude: "3,700m",
    distance: "0 km",
  },
  {
    id: "tashilhunpo",
    name: "Tashilhunpo Monastery",
    location: "Shigatse, Tibet",
    description: "One of the largest functioning monasteries in Tibet, home to the Panchen Lama.",
    image: "/placeholder-9q0cl.png",
    established: "1447 CE",
    visitors: "500K annually",
    tags: ["Active Monastery", "Gelug School", "Spiritual Center"],
    difficulty: "Moderate",
    altitude: "3,800m",
    distance: "280 km",
  },
  {
    id: "hemis",
    name: "Hemis Monastery",
    location: "Ladakh, India",
    description: "Famous for its annual Hemis Festival and stunning mountain backdrop in the Himalayas.",
    image: "/placeholder-6q0e0.png",
    established: "1630 CE",
    visitors: "300K annually",
    tags: ["Festival Venue", "Drukpa Lineage", "Mountain Setting"],
    difficulty: "Difficult",
    altitude: "3,505m",
    distance: "1,200 km",
  },
]

const routes = [
  {
    id: "tibet-circuit",
    name: "Tibet Sacred Circuit",
    duration: "14 days",
    monasteries: 5,
    difficulty: "Moderate",
    distance: "1,200 km",
    description: "Complete pilgrimage route covering major Tibetan monasteries",
  },
  {
    id: "ladakh-trail",
    name: "Ladakh Monastery Trail",
    duration: "7 days",
    monasteries: 3,
    difficulty: "Difficult",
    distance: "450 km",
    description: "High-altitude monastery exploration in Ladakh region",
  },
]

export function MapSidebar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<"all" | "easy" | "moderate" | "difficult">("all")

  const filteredMonasteries = monasteries.filter((monastery) => {
    const matchesSearch =
      monastery.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      monastery.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === "all" || monastery.difficulty.toLowerCase() === selectedFilter
    return matchesSearch && matchesFilter
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
    <div className="w-80 bg-card border-l flex flex-col">
      <div className="p-4 border-b">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search monasteries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

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

      <Tabs defaultValue="monasteries" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 mx-4 mt-4">
          <TabsTrigger value="monasteries">Monasteries</TabsTrigger>
          <TabsTrigger value="routes">Routes</TabsTrigger>
        </TabsList>

        <TabsContent value="monasteries" className="flex-1 mt-4">
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
                      <Button size="sm" className="flex-1 text-xs">
                        View on Map
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 text-xs bg-transparent">
                        Virtual Tour
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="routes" className="flex-1 mt-4">
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
