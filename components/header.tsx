"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Search, Menu, ChevronDown } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"
import { UserMenu } from "./user-menu"
import { GamificationWidget } from "./gamification-widget"
import { LanguageSelector } from "./language-selector"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-background/98 backdrop-blur-xl shadow-lg"
            : "bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
        }`}
      >
        <div
          className={`container mx-auto flex items-center justify-between px-4 transition-all duration-300 ${
            isScrolled ? "h-14" : "h-16"
          }`}
        >
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div
              className={`flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-md hover:shadow-lg ${
                isScrolled ? "h-8 w-8 sm:h-9 sm:w-9" : "h-9 w-9 sm:h-10 sm:w-10"
              }`}
            >
              <MapPin className={`transition-all duration-300 ${isScrolled ? "h-3 w-3 sm:h-4 sm:w-4" : "h-4 w-4 sm:h-5 sm:w-5"}`} />
            </div>
            <span
              className={`font-bold text-foreground transition-all duration-300 ${
                isScrolled ? "text-base sm:text-lg" : "text-lg sm:text-xl"
              }`}
            >
              Sacred Journeys
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/map"
              className="relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-primary group overflow-hidden rounded-lg"
            >
              <span className="relative z-10">Explore</span>
              <div className="absolute inset-0 bg-primary/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg"></div>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 text-sm font-medium hover:text-primary transition-all duration-300 group rounded-lg hover:bg-primary/10 data-[state=open]:bg-primary/10 data-[state=open]:text-primary">
                <span>Content</span>
                <ChevronDown className="h-3 w-3 transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="start" 
                className="animate-in fade-in-0 zoom-in-95 slide-in-from-top-4 duration-500 ease-out min-w-[160px] backdrop-blur-xl bg-background/95 border-0 shadow-xl transform-gpu will-change-transform"
                sideOffset={8}
              >
                <DropdownMenuItem asChild className="hover:bg-primary/10 transition-all duration-300 cursor-pointer rounded-md mx-1 my-0.5 transform hover:scale-105 hover:translate-x-1">
                  <Link href="/archives" className="flex items-center gap-2 px-2 py-2">
                    <span className="transition-transform duration-300 hover:scale-110">📚</span>
                    <span>Archives</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-primary/10 transition-all duration-300 cursor-pointer rounded-md mx-1 my-0.5 transform hover:scale-105 hover:translate-x-1">
                  <Link href="/gallery" className="flex items-center gap-2 px-2 py-2">
                    <span className="transition-transform duration-300 hover:scale-110">🖼️</span>
                    <span>Gallery</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-primary/10 transition-all duration-300 cursor-pointer rounded-md mx-1 my-0.5 transform hover:scale-105 hover:translate-x-1">
                  <Link href="/stories" className="flex items-center gap-2 px-2 py-2">
                    <span className="transition-transform duration-300 hover:scale-110">📖</span>
                    <span>Stories</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 text-sm font-medium hover:text-primary transition-all duration-300 group rounded-lg hover:bg-primary/10 data-[state=open]:bg-primary/10 data-[state=open]:text-primary">
                <span>Experience</span>
                <ChevronDown className="h-3 w-3 transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="start" 
                className="animate-in fade-in-0 zoom-in-95 slide-in-from-top-4 duration-500 ease-out min-w-[160px] backdrop-blur-xl bg-background/95 border-0 shadow-xl transform-gpu will-change-transform"
                sideOffset={8}
              >
                <DropdownMenuItem asChild className="hover:bg-primary/10 transition-all duration-300 cursor-pointer rounded-md mx-1 my-0.5 transform hover:scale-105 hover:translate-x-1">
                  <Link href="/meditation" className="flex items-center gap-2 px-2 py-2">
                    <span className="transition-transform duration-300 hover:scale-110">🧘</span>
                    <span>Meditation</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-primary/10 transition-all duration-300 cursor-pointer rounded-md mx-1 my-0.5 transform hover:scale-105 hover:translate-x-1">
                  <Link href="/learning" className="flex items-center gap-2 px-2 py-2">
                    <span className="transition-transform duration-300 hover:scale-110">📚</span>
                    <span>Learning</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-primary/10 transition-all duration-300 cursor-pointer rounded-md mx-1 my-0.5 transform hover:scale-105 hover:translate-x-1">
                  <Link href="/events" className="flex items-center gap-2 px-2 py-2">
                    <span className="transition-transform duration-300 hover:scale-110">📅</span>
                    <span>Events</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-primary/10 transition-all duration-300 cursor-pointer rounded-md mx-1 my-0.5 transform hover:scale-105 hover:translate-x-1">
                  <Link href="/virtual-tours" className="flex items-center gap-2 px-2 py-2">
                    <span className="transition-transform duration-300 hover:scale-110">🎯</span>
                    <span>Virtual Tours</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 text-sm font-medium hover:text-primary transition-all duration-300 group rounded-lg hover:bg-primary/10 data-[state=open]:bg-primary/10 data-[state=open]:text-primary">
                <span>Services</span>
                <ChevronDown className="h-3 w-3 transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="start" 
                className="animate-in fade-in-0 zoom-in-95 slide-in-from-top-4 duration-500 ease-out min-w-[180px] backdrop-blur-xl bg-background/95 border-0 shadow-xl transform-gpu will-change-transform"
                sideOffset={8}
              >
                <DropdownMenuItem asChild className="hover:bg-primary/10 transition-all duration-300 cursor-pointer rounded-md mx-1 my-0.5 transform hover:scale-105 hover:translate-x-1">
                  <Link href="/guide" className="flex items-center gap-2 px-2 py-2">
                    <span className="transition-transform duration-300 hover:scale-110">🤖</span>
                    <span>AI Monk Guide</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-primary/10 transition-all duration-300 cursor-pointer rounded-md mx-1 my-0.5 transform hover:scale-105 hover:translate-x-1">
                  <Link href="/hotels" className="flex items-center gap-2 px-2 py-2">
                    <span className="transition-transform duration-300 hover:scale-110">🏨</span>
                    <span>Hotels Nearby</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-primary/10 transition-all duration-300 cursor-pointer rounded-md mx-1 my-0.5 transform hover:scale-105 hover:translate-x-1">
                  <Link href="/emergency" className="flex items-center gap-2 px-2 py-2">
                    <span className="transition-transform duration-300 hover:scale-110">🆘</span>
                    <span>Emergency Help</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-primary/10 transition-all duration-300 cursor-pointer rounded-md mx-1 my-0.5 transform hover:scale-105 hover:translate-x-1">
                  <Link href="/donations" className="flex items-center gap-2 px-2 py-2">
                    <span className="transition-transform duration-300 hover:scale-110">💖</span>
                    <span>Donate & Support</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-primary/10 transition-all duration-300 cursor-pointer rounded-md mx-1 my-0.5 transform hover:scale-105 hover:translate-x-1">
                  <Link href="/offline" className="flex items-center gap-2 px-2 py-2">
                    <span className="transition-transform duration-300 hover:scale-110">📱</span>
                    <span>Offline Mode</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/community"
              className="relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-primary group overflow-hidden rounded-lg"
            >
              <span className="relative z-10">Community</span>
              <div className="absolute inset-0 bg-primary/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg"></div>
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex">
              <LanguageSelector />
            </div>

            <ThemeToggle />

            <Link href="/search">
              <Button
                variant="ghost"
                size="sm"
                className={`hidden sm:flex transition-all duration-300 hover:scale-110 hover:bg-primary/10 ${
                  isScrolled ? "h-8" : "h-9"
                }`}
              >
                <Search className="h-4 w-4" />
              </Button>
            </Link>

            <div className="hidden sm:flex">
              <UserMenu />
            </div>

            <Button
              variant="ghost"
              size="sm"
              className={`lg:hidden transition-all duration-300 hover:scale-110 hover:bg-primary/10 ${
                isScrolled ? "h-8 w-8" : "h-9 w-9"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className={`h-4 w-4 transition-transform duration-300 ${isMobileMenuOpen ? "rotate-90" : ""}`} />
            </Button>
          </div>
        </div>

        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-out bg-background/98 backdrop-blur-xl border-t border-border ${
            isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="container mx-auto px-4 py-4">
            {/* Mobile User Menu */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <UserMenu />
                <LanguageSelector />
              </div>
              <Link href="/search">
                <Button
                  variant="ghost"
                  size="sm"
                  className="transition-all duration-300 hover:scale-110 hover:bg-primary/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <nav className="grid grid-cols-2 gap-3">
              <Link
                href="/map"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-all duration-200 hover:translate-x-1 p-3 rounded-lg hover:bg-primary/10 min-h-[48px]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>🗺️</span>
                <span>Explore</span>
              </Link>
              <Link
                href="/archives"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-all duration-200 hover:translate-x-1 p-3 rounded-lg hover:bg-primary/10 min-h-[48px]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>📚</span>
                <span>Archives</span>
              </Link>
              <Link
                href="/gallery"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-all duration-200 hover:translate-x-1 p-3 rounded-lg hover:bg-primary/10 min-h-[48px]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>🖼️</span>
                <span>Gallery</span>
              </Link>
              <Link
                href="/meditation"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-all duration-200 hover:translate-x-1 p-3 rounded-lg hover:bg-primary/10 min-h-[48px]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>🧘</span>
                <span>Meditation</span>
              </Link>
              <Link
                href="/virtual-tours"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-all duration-200 hover:translate-x-1 p-3 rounded-lg hover:bg-primary/10 min-h-[48px]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>🎯</span>
                <span>Virtual Tours</span>
              </Link>
              <Link
                href="/guide"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-all duration-200 hover:translate-x-1 p-3 rounded-lg hover:bg-primary/10 min-h-[48px]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>🤖</span>
                <span>AI Guide</span>
              </Link>
              <Link
                href="/community"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-all duration-200 hover:translate-x-1 p-3 rounded-lg hover:bg-primary/10 min-h-[48px]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>👥</span>
                <span>Community</span>
              </Link>
              <Link
                href="/events"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-all duration-200 hover:translate-x-1 p-3 rounded-lg hover:bg-primary/10 min-h-[48px]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>📅</span>
                <span>Events</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <GamificationWidget />

      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <Link href="/meditation">
          <Button
            size="lg"
            className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-primary hover:bg-primary/90 text-primary-foreground animate-pulse hover:animate-none dark:shadow-primary/30 px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base min-h-[48px]"
          >
            <span className="text-lg sm:text-xl mr-1 sm:mr-2">🧘</span>
            <span className="font-semibold">Meditate</span>
          </Button>
        </Link>
      </div>
    </>
  )
}
