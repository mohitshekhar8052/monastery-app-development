import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, BookOpen, Music, Palette, ArrowRight, Bookmark, Share2 } from "lucide-react"

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {culturalItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <Card 
                key={item.id} 
                className="group relative overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-700 bg-gradient-to-br from-background via-background to-muted/20 hover:bg-gradient-to-br hover:from-background hover:via-muted/10 hover:to-primary/5 transform hover:-translate-y-2 hover:rotate-1 cursor-pointer animate-fade-in-up"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: 'both'
                }}
              >
                {/* Animated border glow effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse-glow" />
                
                <div className="relative overflow-hidden rounded-t-lg">
                  {/* Animated shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-30" />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10 group-hover:from-black/50 group-hover:via-black/20 transition-all duration-500" />
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-125 transition-transform duration-1000 ease-out group-hover:brightness-110"
                  />
                  
                  {/* Floating badge with bounce animation */}
                  <div className="absolute top-4 right-4 z-20 transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                    <Badge variant="secondary" className="bg-white/95 text-foreground shadow-lg backdrop-blur-sm border-0 animate-bounce-subtle">
                      {item.category}
                    </Badge>
                  </div>

                  {/* Icon with enhanced styling */}
                  <div className="absolute top-4 left-4 z-20 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <div className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <IconComponent className="h-5 w-5 text-primary group-hover:animate-pulse" />
                    </div>
                  </div>

                  {/* Overlay content with slide-up animation */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 transform group-hover:translate-y-[-4px] transition-all duration-500">
                    <div className="text-xs text-white/80 uppercase tracking-wide mb-1 group-hover:text-white transition-colors duration-300">{item.type}</div>
                    <CardTitle className="text-lg text-white font-bold mb-1 drop-shadow-lg group-hover:text-white/95 transition-colors duration-300 leading-tight">{item.title}</CardTitle>
                    <div className="text-xs text-white/90 group-hover:text-white transition-colors duration-300">{item.date}</div>
                  </div>

                  {/* Floating particles effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/60 rounded-full animate-float-1" />
                    <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-float-2" />
                    <div className="absolute bottom-1/3 left-2/3 w-1 h-1 bg-white/50 rounded-full animate-float-3" />
                  </div>
                </div>

                <CardContent className="p-6 space-y-3 bg-gradient-to-b from-background to-muted/5 group-hover:bg-gradient-to-b group-hover:from-muted/5 group-hover:to-primary/5 transition-all duration-500">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    <Calendar className="h-4 w-4 text-primary group-hover:animate-pulse" />
                    <span>{item.date}</span>
                  </div>
                  <CardDescription className="text-sm leading-relaxed group-hover:text-foreground transition-colors duration-300 line-clamp-3">
                    {item.description}
                  </CardDescription>
                  
                  {/* Action buttons with enhanced styling */}
                  <div className="flex justify-between items-center pt-3 border-t border-border/40 group-hover:border-border/60 transition-colors duration-300">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary hover:text-primary hover:bg-primary/10 transform hover:scale-105 transition-all duration-300 group-hover:animate-pulse-subtle"
                    >
                      Explore
                      <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="hover:bg-muted/50 transform hover:scale-110 transition-all duration-300"
                      >
                        <Bookmark className="h-4 w-4 hover:text-primary transition-colors duration-300" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="hover:bg-muted/50 transform hover:scale-110 transition-all duration-300"
                      >
                        <Share2 className="h-4 w-4 hover:text-primary transition-colors duration-300" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8 py-3"
          >
            Browse Full Archive
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </section>
  )
}
