"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ImageIcon, Music, Palette, Calendar, MapPin, Download, Eye } from "lucide-react"
import Link from "next/link"

interface ArchiveItem {
  id: string
  title: string
  type: "manuscript" | "artifact" | "audio" | "artwork" | "photograph"
  monastery: string
  description: string
  dateCreated: string
  language?: string
  image: string
  tags: string[]
  condition: string
  significance: string
}

const archiveItems: ArchiveItem[] = [
  {
    id: "kangyur-collection",
    title: "Golden Kangyur Collection - Volume 12",
    type: "manuscript",
    monastery: "Tashilhunpo Monastery",
    description:
      "Sacred Buddhist texts written in gold ink, containing the direct teachings of Buddha with intricate illuminations.",
    dateCreated: "14th Century",
    language: "Classical Tibetan",
    image: "/images/ancient-tibetan-manuscript-gold.jpg", // Updated with beautiful golden manuscript image
    tags: ["Buddhist Canon", "Tibetan Literature", "Religious Text"],
    condition: "Excellent",
    significance: "One of the most important collections of Buddhist canonical literature.",
  },
  {
    id: "thangka-painting-1",
    title: "Green Tara Thangka Masterpiece",
    type: "artwork",
    monastery: "Hemis Monastery",
    description:
      "Exquisite thangka painting of Green Tara, the female Buddha of compassion, painted with natural pigments.",
    dateCreated: "16th Century",
    image: "/images/thangka-green-tara-painting.jpg", // Updated with beautiful Green Tara thangka image
    tags: ["Thangka", "Buddhist Art", "Green Tara"],
    condition: "Good",
    significance: "Masterpiece of Tibetan religious art showcasing traditional painting techniques.",
  },
  {
    id: "prayer-chants-recording",
    title: "Morning Prayer Chants Collection",
    type: "audio",
    monastery: "Potala Palace",
    description:
      "Traditional Tibetan Buddhist chanting recorded during morning prayers with accompanying video documentation.",
    dateCreated: "Contemporary Recording",
    image: "/images/prayer-wheels-spinning-monastery.jpg", // Updated with prayer wheels image
    tags: ["Chanting", "Prayer", "Ritual Music"],
    condition: "Digital",
    significance: "Preserves the oral tradition of Tibetan Buddhist liturgical music.",
  },
  {
    id: "ritual-bell",
    title: "Ceremonial Vajra and Bell Set",
    type: "artifact",
    monastery: "Ganden Monastery",
    description:
      "Bronze ritual vajra and bell used in Buddhist ceremonies, featuring intricate engravings and sacred symbols.",
    dateCreated: "15th Century",
    image: "/images/ritual-vajra-bell-bronze.jpg", // Updated with beautiful ritual vajra bell image
    tags: ["Ritual Object", "Bronze", "Ceremonial"],
    condition: "Very Good",
    significance: "Essential ritual implements representing the union of wisdom and compassion.",
  },
  {
    id: "monastery-architecture",
    title: "Himalayan Monastery Documentation",
    type: "photograph",
    monastery: "Samye Monastery",
    description:
      "Stunning photographic documentation of monasteries nestled in the Himalayan valleys, showcasing architectural harmony with nature.",
    dateCreated: "2020",
    image: "/images/himalayan-monastery-valley.jpg", // Updated with beautiful Himalayan monastery image
    tags: ["Architecture", "Photography", "Documentation"],
    condition: "Digital",
    significance: "Documents the integration of monastic architecture with natural landscapes.",
  },
  {
    id: "debate-tradition",
    title: "Monastic Debate Tradition",
    type: "photograph",
    monastery: "Drepung Monastery",
    description:
      "Photographic series documenting the ancient tradition of philosophical debates among monks in monastery courtyards.",
    dateCreated: "2023",
    image: "/images/monks-debate-courtyard.jpg", // Updated with monks debate image
    tags: ["Philosophy", "Education", "Tradition"],
    condition: "Digital",
    significance: "Captures the living tradition of Buddhist philosophical discourse and learning.",
  },
]

const typeIcons = {
  manuscript: BookOpen,
  artifact: Palette,
  audio: Music,
  artwork: ImageIcon,
  photograph: ImageIcon,
}

export function ArchivesGrid() {
  const [sortBy, setSortBy] = useState<"date" | "title" | "monastery">("date")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const sortedItems = [...archiveItems].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title)
      case "monastery":
        return a.monastery.localeCompare(b.monastery)
      case "date":
      default:
        return a.dateCreated.localeCompare(b.dateCreated)
    }
  })

  return (
    <div className="space-y-6">
      {/* Sort and View Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{archiveItems.length} items found</span>
          <div className="flex items-center gap-2">
            <span className="text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date" | "title" | "monastery")}
              className="text-sm border border-border rounded px-2 py-1 bg-background"
            >
              <option value="date">Date Created</option>
              <option value="title">Title</option>
              <option value="monastery">Monastery</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant={viewMode === "grid" ? "default" : "outline"} onClick={() => setViewMode("grid")}>
            Grid
          </Button>
          <Button size="sm" variant={viewMode === "list" ? "default" : "outline"} onClick={() => setViewMode("list")}>
            List
          </Button>
        </div>
      </div>

      {/* Items Grid */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {sortedItems.map((item) => {
          const IconComponent = typeIcons[item.type]

          if (viewMode === "list") {
            return (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-balance">{item.title}</h3>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <IconComponent className="h-4 w-4" />
                          <span className="text-xs capitalize">{item.type}</span>
                        </div>
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <MapPin className="h-3 w-3 mr-1" />
                        {item.monastery}
                        <span className="mx-2">•</span>
                        <Calendar className="h-3 w-3 mr-1" />
                        {item.dateCreated}
                      </div>

                      <p className="text-sm text-muted-foreground text-pretty mb-3 line-clamp-2">{item.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {item.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Link href={`/archives/${item.id}`}>
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          </Link>
                          <Button size="sm" variant="ghost">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          }

          return (
            <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-background/90 text-foreground">
                    <IconComponent className="h-3 w-3 mr-1" />
                    {item.type}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="outline" className="bg-background/90">
                    {item.condition}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-balance leading-tight">{item.title}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  {item.monastery}
                  <span className="mx-2">•</span>
                  <Calendar className="h-3 w-3 mr-1" />
                  {item.dateCreated}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground text-pretty mb-4 line-clamp-3">{item.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Link href={`/archives/${item.id}`} className="flex-1">
                    <Button size="sm" className="w-full">
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                  </Link>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
