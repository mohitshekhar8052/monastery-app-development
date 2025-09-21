"use client"

import { Button } from "@/components/ui/button"
import { Play, MapPin, Sparkles } from "lucide-react"
import Link from "next/link"
import Lightning from "./Lightning"

export function HeroSection() {
  return (
    <section className="relative min-h-screen py-12 sm:py-16 md:py-20 px-4 text-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/20 dark:from-background dark:via-background dark:to-background/80">
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover scale-105 animate-pulse opacity-80 dark:opacity-60">
          <source src="/videos/monastery-morning-prayers.mp4" type="video/mp4" />
          <source src="/videos/tibetan-monastery-aerial.webm" type="video/webm" />
        </video>
        
        {/* Lightning Effect - Reduced opacity on mobile */}
        <div className="absolute inset-0 opacity-20 sm:opacity-30 dark:opacity-15 dark:sm:opacity-20">
          <Lightning />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background/85 backdrop-blur-sm dark:from-background/65 dark:via-background/75 dark:to-background/90 sm:from-background/40 sm:via-background/60 sm:to-background/80 dark:sm:from-background/60 dark:sm:via-background/70 dark:sm:to-background/90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/8 to-transparent animate-pulse dark:via-primary/12 sm:via-primary/5 dark:sm:via-primary/10"></div>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="relative mb-6 sm:mb-8 flex justify-center">
          <div className="relative">
            <img
              src="/tibetan-monastery-prayer-flags-mountain-view.jpg"
              alt="Sacred monastery with prayer flags against mountain backdrop"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full object-cover shadow-2xl border-4 border-primary/20 animate-fade-in-up"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary/20 to-transparent"></div>
            <Sparkles className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-6 w-6 sm:h-8 sm:w-8 text-primary animate-bounce" />
          </div>
        </div>

        <div className="relative mb-4 sm:mb-6">
          <Sparkles className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 h-4 w-4 sm:h-6 sm:w-6 text-primary animate-bounce" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-balance leading-tight animate-fade-in-up text-foreground px-2">
            Discover Sacred Monasteries Through Virtual Journeys
          </h1>
          <Sparkles className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 h-4 w-4 sm:h-6 sm:w-6 text-primary animate-bounce delay-300" />
        </div>

        <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-pretty mb-6 sm:mb-8 max-w-2xl mx-auto animate-fade-in-up delay-200 px-4">
          Immerse yourself in the spiritual heritage of Buddhist and Tibetan monasteries. Explore ancient wisdom,
          stunning architecture, and cultural treasures from anywhere in the world.
        </p>

        <div className="flex flex-col gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 animate-fade-in-up delay-300 animate-float px-4">
          <Link href="/tour/potala-palace" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="text-base w-full sm:w-auto group relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground border-0 shadow-2xl hover:shadow-primary/25 transition-all duration-500 hover:scale-105 transform-gpu animate-glow cursor-virtual-tour dark:shadow-primary/40 py-4 px-6 text-lg font-semibold min-h-[48px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <Play className="h-5 w-5 mr-2 group-hover:animate-spin transition-transform duration-300 relative z-10" />
              <span className="relative z-10 font-semibold">Start Virtual Tour</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
            <Link href="/guide" className="flex-1">
              <Button
                variant="outline"
                size="lg"
                className="text-base w-full group relative overflow-hidden bg-card hover:bg-card/80 border-2 border-border hover:border-primary/50 text-card-foreground hover:text-primary shadow-xl hover:shadow-primary/20 transition-all duration-500 hover:scale-105 transform-gpu cursor-ai-guide py-4 px-6 min-h-[48px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <span className="text-2xl mr-2 group-hover:animate-bounce relative z-10">🤖</span>
                <span className="relative z-10 font-semibold">AI Monk Guide</span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
            <Link href="/map" className="flex-1">
              <Button
                variant="outline"
                size="lg"
                className="text-base w-full group relative overflow-hidden bg-card hover:bg-card/80 border-2 border-border hover:border-accent/50 text-card-foreground hover:text-accent shadow-xl hover:shadow-accent/20 transition-all duration-500 hover:scale-105 transform-gpu cursor-explore-map py-4 px-6 min-h-[48px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <MapPin className="h-5 w-5 mr-2 group-hover:animate-ping relative z-10" />
                <span className="relative z-10 font-semibold">Explore Map</span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-16 px-4">
          <div className="text-center group hover:scale-105 transition-all duration-300 animate-fade-in-up delay-400">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-card transition-colors duration-300 shadow-lg overflow-hidden border border-border">
              <img
                src="/butter-lamps-monastery-golden-light-prayer.jpg"
                alt="Virtual Tours"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300 cursor-pointer text-card-foreground">
              360° Virtual Tours
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Experience monasteries in stunning detail with immersive 360-degree photography
            </p>
          </div>

          <div className="text-center group hover:scale-105 transition-all duration-300 animate-fade-in-up delay-500">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-card transition-colors duration-300 shadow-lg border border-border">
              <span className="text-2xl sm:text-3xl">🤖</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300 cursor-pointer text-card-foreground">
              AI Monk Guide
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Get personalized guidance and wisdom from our AI spiritual assistant
            </p>
          </div>

          <div className="text-center group hover:scale-105 transition-all duration-300 animate-fade-in-up delay-600">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-card transition-colors duration-300 shadow-lg overflow-hidden border border-border">
              <img
                src="/tibetan-mask-making-artisan-colorful-traditional.jpg"
                alt="Digital Archives"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300 text-card-foreground">
              Digital Archives
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Access rare manuscripts, historical documents, and cultural artifacts
            </p>
          </div>

          <div className="text-center group hover:scale-105 transition-all duration-300 animate-fade-in-up delay-700">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-card transition-colors duration-300 shadow-lg border border-border">
              <span className="text-2xl sm:text-3xl">📱</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300 text-card-foreground">
              Offline Access
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Download content for offline viewing during your spiritual journeys
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
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.6), 0 0 40px rgba(147, 51, 234, 0.3);
          }
        }
        @keyframes cursor-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .cursor-virtual-tour {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M8 16c0-1 1-2 2-2h2v-2c0-1 1-2 2-2s2 1 2 2v2h2c0-1 1-2 2-2s2 1 2 2v2h2c1 0 2 1 2 2v8c0 2-2 4-4 4H12c-2 0-4-2-4-4v-8z" fill="%23059669" stroke="%23ffffff" stroke-width="1"/><circle cx="20" cy="10" r="2" fill="%23ffffff"/></svg>') 16 16, pointer;
        }
        .cursor-ai-guide {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M8 16c0-1 1-2 2-2h2v-2c0-1 1-2 2-2s2 1 2 2v2h2c0-1 1-2 2-2s2 1 2 2v2h2c1 0 2 1 2 2v8c0 2-2 4-4 4H12c-2 0-4-2-4-4v-8z" fill="%23f59e0b" stroke="%23ffffff" stroke-width="1"/><circle cx="20" cy="10" r="2" fill="%23ffffff"/></svg>') 16 16, pointer;
        }
        .cursor-explore-map {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M8 16c0-1 1-2 2-2h2v-2c0-1 1-2 2-2s2 1 2 2v2h2c0-1 1-2 2-2s2 1 2 2v2h2c1 0 2 1 2 2v8c0 2-2 4-4 4H12c-2 0-4-2-4-4v-8z" fill="%2310b981" stroke="%23ffffff" stroke-width="1"/><circle cx="20" cy="10" r="2" fill="%23ffffff"/></svg>') 16 16, pointer;
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
        .delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </section>
  )
}
