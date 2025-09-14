"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, MapPin, Clock, Users, ChevronLeft, ChevronRight, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const virtualTours = [
  {
    id: "potala-palace",
    name: "Potala Palace",
    location: "Lhasa, Tibet",
    image: "/monastery-golden-hour-mountain-backdrop.jpg",
    duration: "45 min",
    difficulty: "Beginner",
    rating: 4.9,
    reviews: 2847,
    description:
      "Explore the iconic winter palace of the Dalai Lama, a masterpiece of Tibetan architecture rising majestically above Lhasa.",
    highlights: ["Red Palace", "White Palace", "Throne Room", "Sacred Chapels"],
    featured: true,
  },
  {
    id: "sera-monastery",
    name: "Sera Monastery",
    location: "Lhasa, Tibet",
    image: "/monks-debating-courtyard-traditional-robes-animate.jpg",
    duration: "35 min",
    difficulty: "Intermediate",
    rating: 4.8,
    reviews: 1923,
    description: "Witness the famous monk debates and explore one of the three great Gelug monasteries of Tibet.",
    highlights: ["Debate Courtyard", "Assembly Hall", "Monk Quarters", "Sacred Statues"],
    featured: true,
  },
  {
    id: "hemis-monastery",
    name: "Hemis Monastery",
    location: "Ladakh, India",
    image: "/hemis-festival-masked-dancers-colorful.jpg",
    duration: "30 min",
    difficulty: "Beginner",
    rating: 4.7,
    reviews: 1456,
    description:
      "Discover the largest monastery in Ladakh, famous for its annual festival and stunning mountain setting.",
    highlights: ["Main Temple", "Museum", "Festival Grounds", "Mountain Views"],
    featured: false,
  },
  {
    id: "tashilhunpo",
    name: "Tashilhunpo Monastery",
    location: "Shigatse, Tibet",
    image: "/butter-lamps-monastery-golden-light-prayer.jpg",
    duration: "40 min",
    difficulty: "Intermediate",
    rating: 4.8,
    reviews: 1678,
    description: "Visit the traditional seat of the Panchen Lama and marvel at the giant Buddha statue.",
    highlights: ["Giant Buddha", "Panchen Lama Palace", "Assembly Halls", "Butter Lamps"],
    featured: true,
  },
  {
    id: "samye-monastery",
    name: "Samye Monastery",
    location: "Shannan, Tibet",
    image: "/tibetan-monastery-floating-clouds-mystical.jpg",
    duration: "50 min",
    difficulty: "Advanced",
    rating: 4.9,
    reviews: 987,
    description: "Experience Tibet's first monastery, built in the 8th century with unique mandala architecture.",
    highlights: ["Central Temple", "Mandala Layout", "Ancient Murals", "Sacred Relics"],
    featured: false,
  },
  {
    id: "drepung-monastery",
    name: "Drepung Monastery",
    location: "Lhasa, Tibet",
    image: "/ancient-buddhist-manuscript-kangyur-text.jpg",
    duration: "55 min",
    difficulty: "Advanced",
    rating: 4.7,
    reviews: 1234,
    description: "Explore what was once the world's largest monastery, home to thousands of monks.",
    highlights: ["Main Assembly Hall", "Ganden Palace", "Manuscript Library", "Monk Residences"],
    featured: true,
  },
]

export default function VirtualToursPage() {
  const [currentTour, setCurrentTour] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [filter, setFilter] = useState("all")

  const featuredTours = virtualTours.filter((tour) => tour.featured)
  const displayTours = filter === "featured" ? featuredTours : virtualTours

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentTour((prev) => (prev + 1) % featuredTours.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay, featuredTours.length])

  const goToPrevious = () => {
    setCurrentTour((prev) => (prev - 1 + featuredTours.length) % featuredTours.length)
  }

  const goToNext = () => {
    setCurrentTour((prev) => (prev + 1) % featuredTours.length)
  }

  const currentFeaturedTour = featuredTours[currentTour]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-balance mb-4">Virtual Monastery Tours</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Journey through sacred spaces with immersive 360° virtual tours of the world's most significant Buddhist
            monasteries
          </p>
        </div>

        {/* Featured Tour Slideshow */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Featured Tours</h2>

          <div className="relative max-w-5xl mx-auto">
            <Card className="overflow-hidden shadow-2xl">
              <div className="relative aspect-[16/9]">
                <img
                  src={currentFeaturedTour?.image || "/placeholder.svg"}
                  alt={currentFeaturedTour?.name}
                  className="w-full h-full object-cover transition-all duration-700"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Tour Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <Badge className="mb-3 bg-primary/90">Featured Tour</Badge>
                      <h3 className="text-3xl font-bold mb-2">{currentFeaturedTour?.name}</h3>
                      <div className="flex items-center gap-4 mb-3 text-sm opacity-90">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {currentFeaturedTour?.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {currentFeaturedTour?.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {currentFeaturedTour?.rating}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {currentFeaturedTour?.reviews.toLocaleString()} reviews
                        </div>
                      </div>
                      <p className="text-lg mb-4 opacity-95 max-w-2xl">{currentFeaturedTour?.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {currentFeaturedTour?.highlights.map((highlight) => (
                          <Badge key={highlight} variant="secondary" className="bg-white/20 text-white border-white/30">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link href={`/tour/${currentFeaturedTour?.id}`}>
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      <Play className="h-5 w-5 mr-2" />
                      Start Virtual Tour
                    </Button>
                  </Link>
                </div>

                {/* Navigation Arrows */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0"
                  onClick={goToNext}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                {/* Auto-play Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white border-0"
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                >
                  {isAutoPlay ? "Pause" : "Play"}
                </Button>
              </div>
            </Card>

            {/* Progress Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {featuredTours.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index === currentTour ? "bg-primary scale-125" : "bg-muted hover:bg-muted-foreground/50",
                  )}
                  onClick={() => setCurrentTour(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
            All Tours ({virtualTours.length})
          </Button>
          <Button variant={filter === "featured" ? "default" : "outline"} onClick={() => setFilter("featured")}>
            Featured ({featuredTours.length})
          </Button>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayTours.map((tour) => (
            <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="relative aspect-[4/3]">
                <img
                  src={tour.image || "/placeholder.svg"}
                  alt={tour.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {tour.featured && <Badge className="absolute top-3 left-3 bg-primary">Featured</Badge>}

                <Badge
                  variant="secondary"
                  className={cn(
                    "absolute top-3 right-3",
                    tour.difficulty === "Beginner" && "bg-green-500/90 text-white",
                    tour.difficulty === "Intermediate" && "bg-yellow-500/90 text-white",
                    tour.difficulty === "Advanced" && "bg-red-500/90 text-white",
                  )}
                >
                  {tour.difficulty}
                </Badge>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-bold text-lg mb-1">{tour.name}</h3>
                  <div className="flex items-center gap-3 text-sm opacity-90">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {tour.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {tour.duration}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{tour.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({tour.reviews.toLocaleString()} reviews)</span>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{tour.description}</p>

                <Link href={`/tour/${tour.id}`}>
                  <Button className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    Start Tour
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
