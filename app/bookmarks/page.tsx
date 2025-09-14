"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bookmark, Search, MapPin, Calendar, ImageIcon, FileText, Trash2 } from "lucide-react"

const bookmarkedItems = [
  {
    id: 1,
    type: "monastery",
    title: "Potala Palace",
    description: "Former residence of the Dalai Lama in Lhasa, Tibet",
    location: "Lhasa, Tibet",
    dateAdded: "2024-12-10",
    image: "/monasteries/potala-palace.jpg",
    tags: ["Tibet", "Palace", "Historical"],
  },
  {
    id: 2,
    type: "tour",
    title: "Morning Prayer Ceremony",
    description: "360° virtual tour of morning prayers at Sera Monastery",
    location: "Sera Monastery",
    dateAdded: "2024-12-08",
    image: "/tours/morning-prayer.jpg",
    tags: ["Prayer", "Ceremony", "Virtual Tour"],
  },
  {
    id: 3,
    type: "archive",
    title: "Ancient Tibetan Manuscript",
    description: "14th century Buddhist text on meditation practices",
    location: "Digital Archive",
    dateAdded: "2024-12-05",
    image: "/archives/manuscript.jpg",
    tags: ["Manuscript", "Buddhism", "Meditation"],
  },
  {
    id: 4,
    type: "event",
    title: "Virtual Meditation Circle",
    description: "Weekly community meditation session",
    location: "Online",
    dateAdded: "2024-12-03",
    image: "/events/meditation-circle.jpg",
    tags: ["Meditation", "Community", "Weekly"],
  },
]

export default function BookmarksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")

  const filteredBookmarks = bookmarkedItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || item.type === selectedType
    return matchesSearch && matchesType
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "monastery":
        return <MapPin className="w-4 h-4" />
      case "tour":
        return <ImageIcon className="w-4 h-4" />
      case "archive":
        return <FileText className="w-4 h-4" />
      case "event":
        return <Calendar className="w-4 h-4" />
      default:
        return <Bookmark className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">My Sacred Bookmarks</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Your saved monasteries, tours, archives, and spiritual content
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search your bookmarks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Tabs value={selectedType} onValueChange={setSelectedType} className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="monastery">Monasteries</TabsTrigger>
              <TabsTrigger value="tour">Tours</TabsTrigger>
              <TabsTrigger value="archive">Archives</TabsTrigger>
              <TabsTrigger value="event">Events</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookmarks.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow group">
              <div className="aspect-video bg-gradient-to-br from-cyan-100 to-slate-100 rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="secondary" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(item.type)}
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-slate-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {item.location}
                </div>

                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-xs text-slate-500">Saved {new Date(item.dateAdded).toLocaleDateString()}</span>
                  <Button variant="outline" size="sm">
                    Visit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBookmarks.length === 0 && (
          <div className="text-center py-12">
            <Bookmark className="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No bookmarks found</h3>
            <p className="text-slate-500">
              {searchTerm ? "Try adjusting your search terms" : "Start exploring and bookmark your favorite content"}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
