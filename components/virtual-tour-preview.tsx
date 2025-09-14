import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Volume2, RotateCcw, Maximize } from "lucide-react"

export function VirtualTourPreview() {
  return (
    <section id="virtual-tours" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">Immersive Virtual Experience</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Step inside sacred spaces with our cutting-edge 360° virtual tours. Experience the serenity and
            architectural beauty as if you were there.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-video bg-gradient-to-br from-primary/5 to-accent/5">
                <img
                  src="/images/360-potala-palace-interior.jpg"
                  alt="Virtual Tour Preview - Potala Palace Interior"
                  className="w-full h-full object-cover"
                />

                {/* Virtual Tour Controls Overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Button size="lg" className="bg-background/90 text-foreground hover:bg-background">
                    <Play className="h-6 w-6 mr-2" />
                    Start 360° Tour
                  </Button>
                </div>

                {/* Tour Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="secondary" className="bg-background/90">
                      <Volume2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-background/90">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="text-sm text-background bg-foreground/80 px-3 py-1 rounded-full">
                    Potala Palace - Main Hall
                  </div>

                  <Button size="sm" variant="secondary" className="bg-background/90">
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tour Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                <img
                  src="/images/360-hemis-monastery-courtyard.jpg"
                  alt="360° Views"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <h3 className="font-semibold mb-2">360° Photography</h3>
              <p className="text-sm text-muted-foreground">High-resolution panoramic views of every sacred space</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                <Volume2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Audio Narration</h3>
              <p className="text-sm text-muted-foreground">Expert commentary in multiple languages</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                <img
                  src="/images/360-tashilhunpo-assembly-hall.jpg"
                  alt="Interactive Points"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <h3 className="font-semibold mb-2">Interactive Hotspots</h3>
              <p className="text-sm text-muted-foreground">Click to learn about artifacts and architecture</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
