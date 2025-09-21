"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Volume2, RotateCcw, Maximize } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export function VirtualTourPreview() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height
        setMousePosition({ x, y })
      }
    }

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isHovered])

  const transformStyle = {
    transform: isHovered 
      ? `perspective(1000px) rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg) translateZ(20px)`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
    transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
  }
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

        <div className="max-w-4xl mx-auto" style={{ perspective: '1000px' }}>
          <Card 
            ref={cardRef}
            className="overflow-hidden transform-gpu transition-all duration-500 hover:shadow-2xl"
            style={transformStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CardContent className="p-0">
              <div className="relative aspect-video bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
                {/* Floating 3D elements */}
                <div className="absolute inset-0 pointer-events-none">
                  <div 
                    className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-float-1"
                    style={{
                      transform: `translateZ(${isHovered ? 50 : 0}px) translateX(${mousePosition.x * 20}px)`,
                      transition: 'transform 0.3s ease-out'
                    }}
                  />
                  <div 
                    className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/20 rounded-full animate-float-2"
                    style={{
                      transform: `translateZ(${isHovered ? 30 : 0}px) translateY(${mousePosition.y * 15}px)`,
                      transition: 'transform 0.4s ease-out'
                    }}
                  />
                  <div 
                    className="absolute bottom-1/3 left-2/3 w-1.5 h-1.5 bg-white/25 rounded-full animate-float-3"
                    style={{
                      transform: `translateZ(${isHovered ? 40 : 0}px) translateX(${mousePosition.x * -10}px)`,
                      transition: 'transform 0.2s ease-out'
                    }}
                  />
                </div>

                <img
                  src="/360-degree-monastery-interior-virtual-tour-preview.jpg"
                  alt="Virtual Tour Preview - Monastery Interior"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  style={{
                    transform: `scale(${isHovered ? 1.05 : 1}) translateZ(${isHovered ? 10 : 0}px)`,
                    filter: `brightness(${isHovered ? 1.1 : 1})`
                  }}
                />

                {/* Virtual Tour Controls Overlay with 3D effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 flex items-center justify-center">
                  <Button 
                    size="lg" 
                    className="bg-white/95 text-gray-900 hover:bg-white hover:text-black shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl"
                    style={{
                      transform: `translateZ(${isHovered ? 30 : 0}px) scale(${isHovered ? 1.05 : 1})`,
                      boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.3)' : '0 10px 20px rgba(0,0,0,0.1)'
                    }}
                  >
                    <Play className="h-6 w-6 mr-2 transition-transform duration-300 hover:scale-125" />
                    Start 360° Tour
                  </Button>
                </div>

                {/* Enhanced Tour Controls with 3D positioning */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="bg-white/95 text-gray-900 hover:bg-white shadow-md transform transition-all duration-300 hover:scale-110"
                      style={{
                        transform: `translateZ(${isHovered ? 20 : 0}px)`,
                        transition: 'transform 0.3s ease-out'
                      }}
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="bg-white/95 text-gray-900 hover:bg-white shadow-md transform transition-all duration-300 hover:scale-110"
                      style={{
                        transform: `translateZ(${isHovered ? 20 : 0}px)`,
                        transition: 'transform 0.3s ease-out'
                      }}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>

                  <div 
                    className="text-sm text-white bg-black/80 px-3 py-1 rounded-full shadow-md backdrop-blur-sm transform transition-all duration-300"
                    style={{
                      transform: `translateZ(${isHovered ? 25 : 0}px)`,
                      transition: 'transform 0.3s ease-out'
                    }}
                  >
                    Sacred Monastery - Main Hall
                  </div>

                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="bg-white/95 text-gray-900 hover:bg-white shadow-md transform transition-all duration-300 hover:scale-110"
                    style={{
                      transform: `translateZ(${isHovered ? 20 : 0}px)`,
                      transition: 'transform 0.3s ease-out'
                    }}
                  >
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Tour Features with 3D animations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center group">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src="/placeholder.jpg"
                  alt="360° Views"
                  className="w-10 h-10 rounded-full object-cover transform transition-all duration-500 group-hover:scale-125 relative z-10"
                />
              </div>
              <h3 className="font-semibold mb-2 transform transition-all duration-300 group-hover:text-primary">360° Photography</h3>
              <p className="text-sm text-muted-foreground transform transition-all duration-300 group-hover:translate-y-[-2px]">High-resolution panoramic views of every sacred space</p>
            </div>

            <div className="text-center group">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Volume2 className="h-6 w-6 text-primary transform transition-all duration-500 group-hover:scale-125 relative z-10" />
              </div>
              <h3 className="font-semibold mb-2 transform transition-all duration-300 group-hover:text-primary">Audio Narration</h3>
              <p className="text-sm text-muted-foreground transform transition-all duration-300 group-hover:translate-y-[-2px]">Expert commentary in multiple languages</p>
            </div>

            <div className="text-center group">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src="/placeholder.jpg"
                  alt="Interactive Points"
                  className="w-10 h-10 rounded-full object-cover transform transition-all duration-500 group-hover:scale-125 relative z-10"
                />
              </div>
              <h3 className="font-semibold mb-2 transform transition-all duration-300 group-hover:text-primary">Interactive Hotspots</h3>
              <p className="text-sm text-muted-foreground transform transition-all duration-300 group-hover:translate-y-[-2px]">Click to learn about artifacts and architecture</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
