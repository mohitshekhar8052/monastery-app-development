"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, BookOpen, ImageIcon, Star, ExternalLink } from "lucide-react"

interface SearchResult {
  id: string
  type: "monastery" | "event" | "archive" | "tour"
  title: string
  description: string
  image: string
  location?: string
  date?: string
  relevanceScore: number
  tags: string[]
  monastery?: string
  aiSummary?: string
}

const mockSearchResults: SearchResult[] = [
  {
    id: "hemis-monastery",
    type: "monastery",
    title: "Hemis Monastery",
    description: "Famous for its annual festival and stunning mountain backdrop in the Himalayas.",
    image: "/placeholder-6q0e0.png",
    location: "Ladakh, India",
    relevanceScore: 0.95,
    tags: ["Festival Venue", "Drukpa Lineage", "Mountain Setting"],
    aiSummary:
      "Hemis Monastery is renowned for hosting one of Ladakh's most spectacular festivals, featuring traditional masked dances and cultural celebrations.",
  },
  {
    id: "hemis-festival-2024",
    type: "event",
    title: "Hemis Festival 2024",
    description: "Annual masked dance festival celebrating Guru Padmasambhava with spectacular Cham performances.",
    image: "/hemis-festival-masked-dancers-colorful.jpg",
    location: "Hemis Monastery, Ladakh",
    date: "July 15-16, 2024",
    relevanceScore: 0.92,
    tags: ["Masked Dance", "Guru Padmasambhava", "Cultural"],
    monastery: "Hemis Monastery",
    aiSummary:
      "This festival represents the triumph of good over evil through sacred masked dances performed by monks in elaborate costumes.",
  },
  {
    id: "masked-dance-traditions",
    type: "archive",
    title: "Masked Dance Traditions",
    description: "Historical documents and photographs documenting the evolution of Cham dance performances.",
    image: "/placeholder.svg?key=masked-dance-archive",
    relevanceScore: 0.88,
    tags: ["Cham Dance", "Historical", "Photography"],
    monastery: "Multiple Monasteries",
    aiSummary:
      "These archives preserve the rich tradition of Buddhist masked dances, showing their spiritual significance and artistic evolution.",
  },
  {
    id: "potala-palace-tour",
    type: "tour",
    title: "Potala Palace Virtual Tour",
    description: "Immersive 360° virtual tour of the former residence of the Dalai Lama.",
    image: "/placeholder-sh2ao.png",
    location: "Lhasa, Tibet",
    relevanceScore: 0.85,
    tags: ["Virtual Tour", "UNESCO Heritage", "Architecture"],
    monastery: "Potala Palace",
    aiSummary:
      "Experience the architectural marvel of Potala Palace through detailed virtual tours showcasing its spiritual and historical significance.",
  },
]

const typeIcons = {
  monastery: MapPin,
  event: Calendar,
  archive: BookOpen,
  tour: ImageIcon,
}

const typeColors = {
  monastery: "bg-blue-500",
  event: "bg-red-500",
  archive: "bg-green-500",
  tour: "bg-purple-500",
}

export function SearchResults() {
  const [sortBy, setSortBy] = useState<"relevance" | "date" | "type">("relevance")
  const [showAISummaries, setShowAISummaries] = useState(true)

  const sortedResults = [...mockSearchResults].sort((a, b) => {
    switch (sortBy) {
      case "relevance":
        return b.relevanceScore - a.relevanceScore
      case "date":
        if (!a.date && !b.date) return 0
        if (!a.date) return 1
        if (!b.date) return -1
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "type":
        return a.type.localeCompare(b.type)
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Search Results</h2>
          <p className="text-sm text-muted-foreground">{mockSearchResults.length} results found</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "relevance" | "date" | "type")}
              className="text-sm border border-border rounded px-2 py-1 bg-background"
            >
              <option value="relevance">Relevance</option>
              <option value="date">Date</option>
              <option value="type">Type</option>
            </select>
          </div>

          <Button
            size="sm"
            variant={showAISummaries ? "default" : "outline"}
            onClick={() => setShowAISummaries(!showAISummaries)}
          >
            AI Summaries
          </Button>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {sortedResults.map((result) => {
          const IconComponent = typeIcons[result.type]
          return (
            <Card key={result.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <img
                    src={result.image || "/placeholder.svg"}
                    alt={result.title}
                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${typeColors[result.type]}`}></div>
                        <Badge variant="outline" className="text-xs">
                          <IconComponent className="h-3 w-3 mr-1" />
                          {result.type}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-muted-foreground">
                            {Math.round(result.relevanceScore * 100)}% match
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>

                    <h3 className="text-lg font-semibold text-balance mb-1">{result.title}</h3>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      {result.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {result.location}
                        </div>
                      )}
                      {result.date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {result.date}
                        </div>
                      )}
                      {result.monastery && (
                        <div className="text-xs">
                          <span className="font-medium">at</span> {result.monastery}
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground text-pretty mb-3">{result.description}</p>

                    {showAISummaries && result.aiSummary && (
                      <div className="p-3 bg-primary/5 rounded-lg mb-3 border-l-2 border-primary">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-bold">AI</span>
                          </div>
                          <span className="text-xs font-medium text-primary">AI Summary</span>
                        </div>
                        <p className="text-sm text-pretty">{result.aiSummary}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {result.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm">
                          {result.type === "tour" ? "Start Tour" : result.type === "event" ? "Register" : "Explore"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Results
        </Button>
      </div>
    </div>
  )
}
