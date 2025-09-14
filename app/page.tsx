import { Header } from "@/components/header"
import { FeaturedMonasteries } from "@/components/featured-monasteries"
import { VirtualTourPreview } from "@/components/virtual-tour-preview"
import { CulturalHighlights } from "@/components/cultural-highlights"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedMonasteries />
        <VirtualTourPreview />
        <CulturalHighlights />
      </main>
      <Footer />
    </div>
  )
}
