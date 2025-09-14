"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Clock, MapPin, User } from "lucide-react"
import { cn } from "@/lib/utils"

const culturalStories = [
  {
    id: 1,
    title: "The Legend of the Flying Monastery",
    subtitle: "How Samye Monastery Appeared Overnight",
    image: "/tibetan-monastery-floating-clouds-mystical.jpg",
    category: "Legend",
    readTime: "5 min read",
    location: "Samye, Tibet",
    author: "Lama Tenzin",
    excerpt:
      "Discover the mystical tale of how Tibet's first monastery appeared through divine intervention and the power of meditation.",
    content: `In the 8th century, when Buddhism was first taking root in Tibet, King Trisong Detsen faced a monumental challenge. The local spirits and demons were fiercely opposing the construction of Samye Monastery, destroying each day's work during the night.

Desperate for a solution, the king sought the help of Guru Padmasambhava, the great tantric master from India. Padmasambhava meditated deeply and called upon the protective deities to aid in the monastery's construction.

Legend tells that in a single night, through the power of meditation and divine intervention, the entire monastery complex appeared as if by magic. The local spirits, impressed by this display of spiritual power, became protectors of the dharma rather than obstacles.

This miraculous event marked the beginning of Buddhism's firm establishment in Tibet and demonstrated the triumph of spiritual practice over worldly obstacles.`,
    tags: ["Miracle", "Padmasambhava", "First Monastery", "Spiritual Power"],
  },
  {
    id: 2,
    title: "The Butter Lamp Tradition",
    subtitle: "Illuminating the Path to Enlightenment",
    image: "/butter-lamps-monastery-golden-light-prayer.jpg",
    category: "Tradition",
    readTime: "4 min read",
    location: "Various Monasteries",
    author: "Ani Pema",
    excerpt: "Explore the sacred tradition of butter lamps and their profound symbolism in Buddhist practice.",
    content: `The flickering flames of butter lamps have illuminated Buddhist monasteries for over a thousand years, each flame representing the light of wisdom dispelling the darkness of ignorance.

Made from yak butter and cotton wicks, these lamps are more than mere illumination—they are offerings that accumulate merit and purify negative karma. The tradition began when early practitioners realized that the act of offering light symbolized the offering of wisdom itself.

In monasteries across the Himalayas, thousands of butter lamps burn continuously, tended by devoted monks and lay practitioners. The warm, golden glow creates an atmosphere of peace and contemplation, while the sweet aroma of burning butter mingles with incense to create a uniquely sacred ambiance.

Each lamp lit is a prayer, a wish for the enlightenment of all beings, making this simple act a profound expression of compassion and wisdom.`,
    tags: ["Ritual", "Merit", "Wisdom", "Compassion"],
  },
  {
    id: 3,
    title: "The Debate Courtyard Chronicles",
    subtitle: "Where Wisdom Meets in Spirited Discussion",
    image: "/monks-debating-courtyard-traditional-robes-animate.jpg",
    category: "Practice",
    readTime: "6 min read",
    location: "Sera Monastery",
    author: "Geshe Lobsang",
    excerpt:
      "Step into the animated world of monastic debates where philosophical truths are explored through passionate discourse.",
    content: `Every afternoon at Sera Monastery, the debate courtyard comes alive with the sound of clapping hands and animated voices as monks engage in the ancient practice of philosophical debate.

This tradition, dating back centuries, is far more than academic exercise—it's a dynamic method of deepening understanding of Buddhist philosophy. One monk poses questions while another defends their position, with dramatic gestures and rhythmic clapping punctuating each point.

The debates cover complex topics from the nature of emptiness to the stages of enlightenment. Through this rigorous intellectual sparring, monks develop not only knowledge but also quick thinking, confidence, and the ability to articulate profound truths.

Visitors often gather to watch these spirited exchanges, witnessing a living tradition that has preserved and transmitted Buddhist wisdom for generations. The courtyard echoes with centuries of learning, making it one of the most vibrant centers of Buddhist education in the world.`,
    tags: ["Education", "Philosophy", "Tradition", "Wisdom"],
  },
  {
    id: 4,
    title: "The Sacred Mask Makers",
    subtitle: "Crafting Divine Faces for Sacred Dances",
    image: "/tibetan-mask-making-artisan-colorful-traditional.jpg",
    category: "Craft",
    readTime: "7 min read",
    location: "Bhutan & Tibet",
    author: "Master Craftsman Norbu",
    excerpt:
      "Meet the skilled artisans who create the elaborate masks used in sacred Cham dances, preserving ancient techniques.",
    content: `In hidden workshops within monastery walls, master craftsmen spend months creating the elaborate masks used in sacred Cham dances. These aren't mere decorative objects—they are considered sacred vessels that embody protective deities and spiritual forces.

The process begins with careful selection of materials: lightweight wood, yak hide, and natural pigments. Each mask must be crafted according to precise iconographic rules passed down through generations. The wrathful deities require fierce expressions with bulging eyes and bared fangs, while peaceful deities display serene, compassionate faces.

Master Norbu, whose family has been making masks for five generations, explains that the work is as much meditation as craft. "Each brushstroke is a prayer," he says, "each color carries meaning. We don't just make masks—we give form to the divine."

The completed masks are blessed in special ceremonies before being used in the sacred dances that protect communities and transmit spiritual teachings through movement and symbolism.`,
    tags: ["Craftsmanship", "Sacred Art", "Cham Dance", "Tradition"],
  },
]

export default function StoriesPage() {
  const [currentStory, setCurrentStory] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(false)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % culturalStories.length)
    }, 10000) // 10 seconds per story

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const goToPrevious = () => {
    setCurrentStory((prev) => (prev - 1 + culturalStories.length) % culturalStories.length)
  }

  const goToNext = () => {
    setCurrentStory((prev) => (prev + 1) % culturalStories.length)
  }

  const story = culturalStories[currentStory]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-balance mb-4">Cultural Stories & Legends</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Journey through time with captivating stories, legends, and traditions from Buddhist monasteries
          </p>
        </div>

        {/* Story Slideshow */}
        <div className="max-w-6xl mx-auto">
          <Card className="overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
              {/* Image Section */}
              <div className="relative">
                <img
                  src={story.image || "/placeholder.svg"}
                  alt={story.title}
                  className="w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />

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
              </div>

              {/* Content Section */}
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant="secondary">{story.category}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {story.readTime}
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-balance mb-2">{story.title}</h2>
                  <h3 className="text-xl text-muted-foreground mb-6">{story.subtitle}</h3>

                  <div className="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {story.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {story.author}
                    </div>
                  </div>

                  <p className="text-lg leading-relaxed mb-6">{story.excerpt}</p>

                  <div className="prose prose-lg max-w-none">
                    {story.content.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {story.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    variant={isAutoPlay ? "default" : "outline"}
                    onClick={() => setIsAutoPlay(!isAutoPlay)}
                    className="w-full"
                  >
                    {isAutoPlay ? "Pause Auto-Play" : "Start Auto-Play"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Story Navigation */}
          <div className="flex justify-center mt-8 gap-2">
            {culturalStories.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === currentStory ? "bg-primary scale-125" : "bg-muted hover:bg-muted-foreground/50",
                )}
                onClick={() => setCurrentStory(index)}
              />
            ))}
          </div>

          {/* Story Thumbnails */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {culturalStories.map((storyItem, index) => (
              <Card
                key={storyItem.id}
                className={cn(
                  "cursor-pointer transition-all duration-300 overflow-hidden hover:shadow-lg",
                  index === currentStory && "ring-2 ring-primary",
                )}
                onClick={() => setCurrentStory(index)}
              >
                <div className="aspect-[4/3] relative">
                  <img
                    src={storyItem.image || "/placeholder.svg"}
                    alt={storyItem.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-2 left-2" variant="secondary">
                    {storyItem.category}
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2">{storyItem.title}</h3>
                  <p className="text-xs text-muted-foreground">{storyItem.readTime}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
