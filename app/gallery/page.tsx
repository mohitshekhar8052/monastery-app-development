"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Play, Pause, Maximize2, Download } from "lucide-react"
import { cn } from "@/lib/utils"

const galleryImages = [
  {
    id: 1,
    src: "/monastery-golden-hour-mountain-backdrop.jpg",
    title: "Golden Hour at Tashilhunpo",
    description: "The monastery glows in the warm evening light against the dramatic Himalayan backdrop",
    location: "Shigatse, Tibet",
    photographer: "Tenzin Wangdu",
    year: "2023",
  },
  {
    id: 2,
    src: "/monks-prayer-ceremony-colorful-robes.jpg",
    title: "Morning Prayer Ceremony",
    description: "Monks in traditional maroon robes gather for the daily morning prayers",
    location: "Sera Monastery",
    photographer: "Lobsang Tashi",
    year: "2023",
  },
  {
    id: 3,
    src: "/ancient-buddhist-manuscript-kangyur-text.jpg",
    title: "Ancient Kangyur Manuscript",
    description: "Sacred Buddhist texts preserved for centuries in traditional Tibetan script",
    location: "Drepung Monastery",
    photographer: "Pema Norbu",
    year: "2022",
  },
  {
    id: 4,
    src: "/hemis-festival-masked-dancers-colorful.jpg",
    title: "Hemis Festival Dancers",
    description: "Spectacular masked dance performance during the annual Hemis Festival",
    location: "Hemis Monastery, Ladakh",
    photographer: "Stanzin Dorje",
    year: "2023",
  },
  {
    id: 5,
    src: "/tibetan-monastery-prayer-flags-mountain-view.jpg",
    title: "Prayer Flags in the Wind",
    description: "Colorful prayer flags flutter against the pristine mountain landscape",
    location: "Rongbuk Monastery",
    photographer: "Karma Lhamo",
    year: "2023",
  },
  {
    id: 6,
    src: "/buddhist-monks-meditation-hall-candles.jpg",
    title: "Meditation Hall at Dawn",
    description: "Peaceful meditation hall illuminated by butter lamps and morning light",
    location: "Ganden Monastery",
    photographer: "Thubten Gyatso",
    year: "2022",
  },
]

export default function GalleryPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Auto-advance slideshow
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const currentImage = galleryImages[currentIndex]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-balance mb-4">Sacred Photography Gallery</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Immerse yourself in the beauty and spirituality of Buddhist monasteries through our curated collection of
            photography
          </p>
        </div>

        {/* Main Slideshow */}
        <div
          className={cn(
            "relative mx-auto mb-8 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500",
            isFullscreen ? "fixed inset-4 z-50 bg-black" : "max-w-4xl",
          )}
        >
          <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-900 to-slate-700">
            <img
              src={currentImage.src || "/placeholder.svg"}
              alt={currentImage.title}
              className="w-full h-full object-cover transition-opacity duration-700"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Image Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">{currentImage.title}</h2>
              <p className="text-lg mb-2 opacity-90">{currentImage.description}</p>
              <div className="flex items-center gap-4 text-sm opacity-75">
                <span>📍 {currentImage.location}</span>
                <span>📸 {currentImage.photographer}</span>
                <span>📅 {currentImage.year}</span>
              </div>
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

            {/* Control Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/20 hover:bg-black/40 text-white border-0"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="bg-black/20 hover:bg-black/40 text-white border-0"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>

              <Button variant="ghost" size="icon" className="bg-black/20 hover:bg-black/40 text-white border-0">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75",
                )}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
          {galleryImages.map((image, index) => (
            <Card
              key={image.id}
              className={cn(
                "cursor-pointer transition-all duration-300 overflow-hidden",
                index === currentIndex ? "ring-2 ring-primary scale-105 shadow-lg" : "hover:scale-102 hover:shadow-md",
              )}
              onClick={() => setCurrentIndex(index)}
            >
              <div className="aspect-square relative">
                <img src={image.src || "/placeholder.svg"} alt={image.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <h3 className="text-white text-xs font-medium truncate">{image.title}</h3>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
