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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {monasteries.map((monastery) => (
            <Card key={monastery.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={monastery.image || "/placeholder.svg"}
                  alt={monastery.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/90 text-foreground">
                    {monastery.tags[0]}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-balance">{monastery.name}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {monastery.location}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground text-pretty mb-4">{monastery.description}</p>

                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Est. {monastery.established}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {monastery.visitors}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {monastery.tags.slice(1).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Link href={`/tour/${monastery.id === 1 ? "potala-palace" : "potala-palace"}`}>
                  <Button className="w-full bg-transparent" variant="outline">
                    Explore Virtual Tour
                  </Button>
                </Link>
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
