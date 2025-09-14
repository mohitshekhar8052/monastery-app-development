import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, BookOpen, Music, Palette } from "lucide-react"

const culturalItems = [
  {
    id: 1,
    type: "Festival",
    title: "Hemis Festival 2024",
    date: "July 15-16, 2024",
    description: "Annual masked dance festival celebrating Guru Padmasambhava at Hemis Monastery.",
    image: "/images/monks-debate-courtyard.jpg",
    icon: Calendar,
    category: "Upcoming Event",
  },
  {
    id: 2,
    type: "Manuscript",
    title: "Golden Kangyur Collection",
    date: "14th Century",
    description: "Sacred Buddhist texts written in gold ink, preserved in digital format with detailed annotations.",
    image: "/images/ancient-tibetan-manuscript-gold.jpg",
    icon: BookOpen,
    category: "Digital Archive",
  },
  {
    id: 3,
    type: "Ritual",
    title: "Morning Prayer Chants",
    date: "Daily Practice",
    description: "Traditional Tibetan Buddhist chanting recorded at Tashilhunpo Monastery with video documentation.",
    image: "/images/prayer-wheels-spinning-monastery.jpg",
    icon: Music,
    category: "Audio-Visual Collection",
  },
  {
    id: 4,
    type: "Art",
    title: "Green Tara Thangka",
    date: "16th-18th Century",
    description: "Exquisite thangka painting of Green Tara, the female Buddha of compassion and action.",
    image: "/images/thangka-green-tara-painting.jpg",
    icon: Palette,
    category: "Art Collection",
  },
]

export function CulturalHighlights() {
  return (
    <section id="cultural-heritage" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">Cultural Heritage & Archives</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Discover the rich cultural heritage preserved through centuries. Access rare manuscripts, witness sacred
            rituals, and explore artistic treasures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {culturalItems.map((item) => {
            const IconComponent = item.icon
            return (
              <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-background/90 text-foreground">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="w-8 h-8 rounded-full bg-background/90 flex items-center justify-center">
                      <IconComponent className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{item.type}</div>
                  <CardTitle className="text-lg text-balance leading-tight">{item.title}</CardTitle>
                  <div className="text-sm text-muted-foreground">{item.date}</div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground text-pretty mb-4">{item.description}</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Explore
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button size="lg">Browse Full Archive</Button>
        </div>
      </div>
    </section>
  )
}
