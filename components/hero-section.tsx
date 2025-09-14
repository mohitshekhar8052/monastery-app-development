"use client"

import { Button } from "@/components/ui/button"
import { Play, MapPin, Sparkles } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative py-20 px-4 text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover scale-105 animate-pulse">
          <source src="/videos/monastery-morning-prayers.mp4" type="video/mp4" />
          <source src="/videos/tibetan-monastery-aerial.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/80 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-pulse"></div>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="relative mb-8 flex justify-center">
          <div className="relative">
            <img
              src="/tibetan-monastery-prayer-flags-mountain-view.jpg"
              alt="Sacred monastery with prayer flags against mountain backdrop"
              className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-2xl border-4 border-primary/20 animate-fade-in-up"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary/20 to-transparent"></div>
            <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-primary animate-bounce" />
          </div>
        </div>

        <div className="relative mb-6">
          <Sparkles className="absolute -top-4 -left-4 h-6 w-6 text-primary animate-bounce" />
          <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight animate-fade-in-up">
            Discover Sacred Monasteries Through Virtual Journeys
          </h1>
          <Sparkles className="absolute -bottom-4 -right-4 h-6 w-6 text-primary animate-bounce delay-300" />
        </div>

        <p className="text-lg md:text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto animate-fade-in-up delay-200">
          Immerse yourself in the spiritual heritage of Buddhist and Tibetan monasteries. Explore ancient wisdom,
          stunning architecture, and cultural treasures from anywhere in the world.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up delay-300">
          <Link href="/tour/potala-palace">
            <Button
              size="lg"
              className="text-base group hover:scale-105 transition-all duration-300 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl"
            >
              <Play className="h-5 w-5 mr-2 group-hover:animate-pulse" />
              Start Virtual Tour
            </Button>
          </Link>
          <Link href="/map">
            <Button
              variant="outline"
              size="lg"
              className="text-base bg-background/80 backdrop-blur-sm hover:bg-background/90 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <MapPin className="h-5 w-5 mr-2" />
              Explore Map
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center group hover:scale-105 transition-all duration-300 animate-fade-in-up delay-400">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 shadow-lg overflow-hidden">
              <img
                src="/butter-lamps-monastery-golden-light-prayer.jpg"
                alt="Virtual Tours"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
              360° Virtual Tours
            </h3>
            <p className="text-muted-foreground text-sm">
              Experience monasteries in stunning detail with immersive 360-degree photography
            </p>
          </div>

          <div className="text-center group hover:scale-105 transition-all duration-300 animate-fade-in-up delay-500">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 shadow-lg overflow-hidden">
              <img
                src="/tibetan-mask-making-artisan-colorful-traditional.jpg"
                alt="Digital Archives"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
              Digital Archives
            </h3>
            <p className="text-muted-foreground text-sm">
              Access rare manuscripts, historical documents, and cultural artifacts
            </p>
          </div>

          <div className="text-center group hover:scale-105 transition-all duration-300 animate-fade-in-up delay-600">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 shadow-lg overflow-hidden">
              <img
                src="/monks-debating-courtyard-traditional-robes-animate.jpg"
                alt="Cultural Events"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
              Cultural Events
            </h3>
            <p className="text-muted-foreground text-sm">
              Stay updated with festivals, ceremonies, and spiritual gatherings
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </section>
  )
}
