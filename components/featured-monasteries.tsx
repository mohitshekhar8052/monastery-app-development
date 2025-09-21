import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users } from "lucide-react"
import Link from "next/link"

const monasteries = [
  {
    id: 1,
    name: "Potala Palace",
    location: "Lhasa, Tibet",
    description: "Former residence of the Dalai Lama, this iconic palace is a masterpiece of Tibetan architecture.",
    image: "/images/potala-palace-lhasa-tibet-sunset.jpg",
    established: "7th Century",
    visitors: "2.1M annually",
    tags: ["UNESCO World Heritage", "Tibetan Buddhism", "Historical"],
  },
  {
    id: 2,
    name: "Tashilhunpo Monastery",
    location: "Shigatse, Tibet",
    description: "One of the largest functioning monasteries in Tibet, home to the Panchen Lama.",
    image: "/images/tashilhunpo-monastery-shigatse-tibet.jpg",
    established: "1447 CE",
    visitors: "500K annually",
    tags: ["Active Monastery", "Gelug School", "Spiritual Center"],
  },
  {
    id: 3,
    name: "Hemis Monastery",
    location: "Ladakh, India",
    description: "Famous for its annual Hemis Festival and stunning mountain backdrop in the Himalayas.",
    image: "/images/hemis-monastery-ladakh-mountains.jpg",
    established: "1630 CE",
    visitors: "300K annually",
    tags: ["Festival Venue", "Drukpa Lineage", "Mountain Setting"],
  },
  {
    id: 4,
    name: "Rongbuk Monastery",
    location: "Mount Everest, Tibet",
    description: "The highest monastery in the world, offering breathtaking views of Mount Everest.",
    image: "/images/rongbuk-monastery-everest-base.jpg",
    established: "1902 CE",
    visitors: "150K annually",
    tags: ["Highest Monastery", "Everest Base Camp", "Nyingma School"],
  },
  {
    id: 5,
    name: "Samye Monastery",
    location: "Shannan, Tibet",
    description: "The first Buddhist monastery built in Tibet, representing the Buddhist cosmos.",
    image: "/images/samye-monastery-tibet-aerial.jpg",
    established: "779 CE",
    visitors: "400K annually",
    tags: ["First Monastery", "Historical Significance", "Mandala Design"],
  },
  {
    id: 6,
    name: "Drepung Monastery",
    location: "Lhasa, Tibet",
    description:
      "Once the largest monastery in the world, known for its impressive white buildings cascading down the hillside.",
    image: "/images/drepung-monastery-lhasa-tibet.jpg",
    established: "1409 CE",
    visitors: "350K annually",
    tags: ["Gelug School", "Largest Monastery", "Pilgrimage Site"],
  },
]

export function FeaturedMonasteries() {
  return (
    <section id="monasteries" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">Featured Sacred Monasteries</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Explore our curated collection of the world's most significant Buddhist and Tibetan monasteries, each with
            its unique history and spiritual significance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {monasteries.map((monastery, index) => (
            <Card 
              key={monastery.id} 
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
                  src={monastery.image || "/placeholder.svg"}
                  alt={monastery.name}
                  className="w-full h-64 object-cover group-hover:scale-125 transition-transform duration-1000 ease-out group-hover:brightness-110"
                />
                
                {/* Floating badge with bounce animation */}
                <div className="absolute top-4 right-4 z-20 transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                  <Badge variant="secondary" className="bg-white/95 text-foreground shadow-lg backdrop-blur-sm border-0 animate-bounce-subtle">
                    {monastery.tags[0]}
                  </Badge>
                </div>

                {/* Overlay content with slide-up animation */}
                <div className="absolute bottom-4 left-4 right-4 z-20 transform group-hover:translate-y-[-4px] transition-all duration-500">
                  <CardTitle className="text-xl text-white font-bold mb-2 drop-shadow-lg group-hover:text-white/95 transition-colors duration-300">{monastery.name}</CardTitle>
                  <div className="flex items-center text-white/90 text-sm group-hover:text-white transition-colors duration-300">
                    <MapPin className="h-4 w-4 mr-1 group-hover:animate-pulse" />
                    {monastery.location}
                  </div>
                </div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/60 rounded-full animate-float-1" />
                  <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-float-2" />
                  <div className="absolute bottom-1/3 left-2/3 w-1 h-1 bg-white/50 rounded-full animate-float-3" />
                </div>
              </div>

              <CardContent className="p-6 relative">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative z-10">
                  <p className="text-sm text-muted-foreground text-pretty mb-6 leading-relaxed group-hover:text-foreground/80 transition-colors duration-500">{monastery.description}</p>

                  {/* Stats row with enhanced styling and animations */}
                  <div className="flex items-center justify-between bg-muted/30 rounded-lg p-3 mb-4 group-hover:bg-muted/40 group-hover:shadow-inner transition-all duration-500">
                    <div className="flex items-center text-xs text-muted-foreground group-hover:scale-105 transition-transform duration-300">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 group-hover:bg-primary/20 group-hover:rotate-12 transition-all duration-500">
                        <Clock className="h-3 w-3 text-primary group-hover:animate-spin-slow" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">Est. {monastery.established}</div>
                        <div className="text-xs">Founded</div>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground group-hover:scale-105 transition-transform duration-300">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 group-hover:bg-primary/20 group-hover:-rotate-12 transition-all duration-500">
                        <Users className="h-3 w-3 text-primary group-hover:animate-pulse" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">{monastery.visitors}</div>
                        <div className="text-xs">Visitors</div>
                      </div>
                    </div>
                  </div>

                  {/* Tags with improved design and stagger animation */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {monastery.tags.slice(1).map((tag, tagIndex) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="text-xs bg-primary/5 border-primary/20 hover:bg-primary/10 transition-all duration-300 group-hover:scale-105 group-hover:border-primary/40"
                        style={{
                          transitionDelay: `${tagIndex * 100}ms`
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Enhanced button with advanced animations */}
                  <Link href={`/tour/${monastery.id === 1 ? "potala-palace" : "potala-palace"}`}>
                    <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden group/btn">
                      {/* Button shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                      
                      <span className="flex items-center justify-center relative z-10">
                        Explore Virtual Tour
                        <svg className="w-4 h-4 ml-2 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg">View All Monasteries</Button>
        </div>
      </div>
    </section>
  )
}
