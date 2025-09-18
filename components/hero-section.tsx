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

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up delay-300 animate-float">
          <Link href="/tour/potala-palace">
            <Button
              size="lg"
              className="text-base group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white border-0 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-110 transform-gpu animate-glow"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <Play className="h-5 w-5 mr-2 group-hover:animate-spin transition-transform duration-300 relative z-10" />
              <span className="relative z-10 font-semibold">Start Virtual Tour</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </Link>
          <Link href="/guide">
            <Button
              variant="outline"
              size="lg"
              className="text-base group relative overflow-hidden bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border-2 border-amber-300 hover:border-amber-400 text-amber-800 hover:text-amber-900 shadow-xl hover:shadow-amber-500/20 transition-all duration-500 hover:scale-110 transform-gpu"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-200/0 via-amber-200/30 to-amber-200/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="text-2xl mr-2 group-hover:animate-bounce relative z-10">🤖</span>
              <span className="relative z-10 font-semibold">Meet AI Monk Guide</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-300/10 to-orange-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </Link>
          <Link href="/map">
            <Button
              variant="outline"
              size="lg"
              className="text-base group relative overflow-hidden bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border-2 border-emerald-300 hover:border-emerald-400 text-emerald-800 hover:text-emerald-900 shadow-xl hover:shadow-emerald-500/20 transition-all duration-500 hover:scale-110 transform-gpu"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/0 via-emerald-200/30 to-emerald-200/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <MapPin className="h-5 w-5 mr-2 group-hover:animate-ping relative z-10" />
              <span className="relative z-10 font-semibold">Explore Map</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-300/10 to-teal-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center group hover:scale-105 transition-all duration-300 animate-fade-in-up delay-400">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 shadow-lg overflow-hidden">
              <img
                src="/butter-lamps-monastery-golden-light-prayer.jpg"
                alt="Virtual Tours"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300 cursor-pointer">
              360° Virtual Tours
            </h3>
            <p className="text-muted-foreground text-sm">
              Experience monasteries in stunning detail with immersive 360-degree photography
            </p>
          </div>

          <div className="text-center group hover:scale-105 transition-all duration-300 animate-fade-in-up delay-500">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 shadow-lg">
              <span className="text-3xl">🤖</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300 cursor-pointer">
              AI Monk Guide
            </h3>
            <p className="text-muted-foreground text-sm">
              Get personalized guidance and wisdom from our AI spiritual assistant
            </p>
          </div>

          <div className="text-center group hover:scale-105 transition-all duration-300 animate-fade-in-up delay-600">
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

          <div className="text-center group hover:scale-105 transition-all duration-300 animate-fade-in-up delay-700">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 shadow-lg">
              <span className="text-3xl">📱</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
              Offline Access
            </h3>
            <p className="text-muted-foreground text-sm">
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
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
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
