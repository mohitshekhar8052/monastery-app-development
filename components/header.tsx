"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Search, Menu, ChevronDown } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"

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
        className={`sticky top-0 z-50 w-full border-b transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-background/98 backdrop-blur-xl shadow-lg border-border/50"
            : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        }`}
      >
        <div
          className={`container mx-auto flex items-center justify-between px-4 transition-all duration-300 ${
            isScrolled ? "h-12" : "h-14"
          }`}
        >
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className={`flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ${
                isScrolled ? "h-6 w-6" : "h-7 w-7"
              }`}
            >
              <MapPin className={`transition-all duration-300 ${isScrolled ? "h-3 w-3" : "h-3.5 w-3.5"}`} />
            </div>
            <span
              className={`font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent transition-all duration-300 ${
                isScrolled ? "text-base" : "text-lg"
              }`}
            >
              Sacred Journeys
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/map"
              className="relative text-sm font-medium transition-all duration-300 hover:text-primary group overflow-hidden"
            >
              <span className="relative z-10">Explore</span>
              <div className="absolute inset-0 bg-primary/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-all duration-300 group">
                <span>Content</span>
                <ChevronDown className="h-3 w-3 transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200">
                <DropdownMenuItem asChild className="hover:bg-primary/5 transition-colors duration-200">
                  <Link href="/archives">📚 Archives</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-primary/5 transition-colors duration-200">
                  <Link href="/gallery">🖼️ Gallery</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-primary/5 transition-colors duration-200">
                  <Link href="/stories">📖 Stories</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-all duration-300 group">
                <span>Experience</span>
                <ChevronDown className="h-3 w-3 transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200">
                <DropdownMenuItem asChild className="hover:bg-primary/5 transition-colors duration-200">
                  <Link href="/meditation">🧘 Meditation</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-primary/5 transition-colors duration-200">
                  <Link href="/learning">📚 Learning</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-primary/5 transition-colors duration-200">
                  <Link href="/events">📅 Events</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/community"
              className="relative text-sm font-medium transition-all duration-300 hover:text-primary group overflow-hidden"
            >
              <span className="relative z-10">Community</span>
              <div className="absolute inset-0 bg-primary/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/search">
              <Button
                variant="ghost"
                size="sm"
                className={`hidden sm:flex transition-all duration-300 hover:scale-110 hover:bg-primary/10 ${
                  isScrolled ? "h-7" : "h-8"
                }`}
              >
                <Search className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className={`lg:hidden transition-all duration-300 hover:scale-110 hover:bg-primary/10 ${
                isScrolled ? "h-7" : "h-8"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className={`h-4 w-4 transition-transform duration-300 ${isMobileMenuOpen ? "rotate-90" : ""}`} />
            </Button>
          </div>
        </div>

        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t bg-background/98 backdrop-blur-xl">
            <nav className="container mx-auto px-4 py-4 space-y-3">
              <Link
                href="/map"
                className="block text-sm font-medium hover:text-primary transition-all duration-200 hover:translate-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🗺️ Explore
              </Link>
              <Link
                href="/archives"
                className="block text-sm font-medium hover:text-primary transition-all duration-200 hover:translate-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                📚 Archives
              </Link>
              <Link
                href="/gallery"
                className="block text-sm font-medium hover:text-primary transition-all duration-200 hover:translate-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🖼️ Gallery
              </Link>
              <Link
                href="/meditation"
                className="block text-sm font-medium hover:text-primary transition-all duration-200 hover:translate-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🧘 Meditation
              </Link>
              <Link
                href="/community"
                className="block text-sm font-medium hover:text-primary transition-all duration-200 hover:translate-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                👥 Community
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="fixed bottom-6 right-6 z-40">
        <Link href="/meditation">
          <Button
            size="lg"
            className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-blue-600 hover:bg-blue-700 text-white animate-pulse hover:animate-none"
          >
            🧘 Meditate
          </Button>
        </Link>
      </div>
    </>
  )
}
