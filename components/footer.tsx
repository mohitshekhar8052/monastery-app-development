"use client"

import { MapPin, Mail, Phone, Globe } from "lucide-react"
import { useScrollAnimation, useStaggeredScrollAnimation } from "@/hooks/use-scroll-animation"

export function Footer() {
  const { ref: brandRef, isVisible: brandVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 })
  const { ref: linksRef, visibleItems } = useStaggeredScrollAnimation<HTMLDivElement>(2, { 
    threshold: 0.1, 
    staggerDelay: 200 
  })
  const { ref: bottomRef, isVisible: bottomVisible } = useScrollAnimation<HTMLDivElement>({ delay: 400 })

  return (
    <footer className="bg-secondary text-secondary-foreground py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className={`col-span-1 md:col-span-2 scroll-animate ${brandVisible ? 'scroll-slide-right' : ''}`} ref={brandRef}>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <MapPin className="h-4 w-4" />
              </div>
              <span className="text-xl font-semibold">Sacred Journeys</span>
            </div>
            <p className="text-sm text-muted-foreground text-pretty mb-4 max-w-md">
              Preserving and sharing the spiritual heritage of Buddhist and Tibetan monasteries through immersive
              virtual experiences and digital archives.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>info@sacredjourneys.org</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className={`scroll-animate ${visibleItems[0] ? 'scroll-slide-up' : ''}`} ref={linksRef}>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#monasteries" className="hover:text-primary transition-colors">
                  Featured Monasteries
                </a>
              </li>
              <li>
                <a href="#virtual-tours" className="hover:text-primary transition-colors">
                  Virtual Tours
                </a>
              </li>
              <li>
                <a href="#cultural-heritage" className="hover:text-primary transition-colors">
                  Cultural Archives
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-primary transition-colors">
                  Events Calendar
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className={`scroll-animate ${visibleItems[1] ? 'scroll-slide-up' : ''}`}>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  About Buddhism
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Meditation Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Cultural Education
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Research Papers
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={`border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground scroll-animate ${bottomVisible ? 'scroll-fade-in' : ''}`} ref={bottomRef}>
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <span>© 2024 Sacred Journeys. All rights reserved.</span>
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <span>Available in 12 languages</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
