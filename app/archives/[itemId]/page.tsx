import { ArchiveItemViewer } from "@/components/archive-item-viewer"
import { RelatedItems } from "@/components/related-items"
import { ArchiveMetadata } from "@/components/archive-metadata"
import { notFound } from "next/navigation"

// Mock archive data
const archiveItems = {
  "kangyur-collection": {
    id: "kangyur-collection",
    title: "Kangyur Collection - Volume 12",
    type: "manuscript",
    monastery: "Tashilhunpo Monastery",
    description:
      "Sacred Buddhist texts translated from Sanskrit, containing the direct teachings of Buddha. This volume focuses on the Perfection of Wisdom sutras.",
    dateCreated: "14th Century",
    language: "Classical Tibetan",
    material: "Paper and ink on traditional Tibetan paper",
    dimensions: "35cm x 8cm",
    condition: "Excellent - Digitally preserved",
    images: [
      "/ancient-buddhist-manuscript-kangyur-text.jpg",
      "/placeholder.svg?key=manuscript-2",
      "/placeholder.svg?key=manuscript-3",
    ],
    transcription: "Available in Tibetan and English",
    significance:
      "One of the most important collections of Buddhist canonical literature, representing centuries of scholarly translation work.",
    tags: ["Buddhist Canon", "Tibetan Literature", "Religious Text", "Historical Document"],
    downloadFormats: ["PDF", "EPUB", "High-res Images"],
    relatedItems: ["prajnaparamita-sutra", "vinaya-texts", "abhidhamma-collection"],
  },
}

interface ArchiveItemPageProps {
  params: {
    itemId: string
  }
}

export default function ArchiveItemPage({ params }: ArchiveItemPageProps) {
  const item = archiveItems[params.itemId as keyof typeof archiveItems]

  if (!item) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ArchiveItemViewer item={item} />
          </div>
          <div className="space-y-6">
            <ArchiveMetadata item={item} />
            <RelatedItems itemIds={item.relatedItems} />
          </div>
        </div>
      </div>
    </div>
  )
}

export function generateStaticParams() {
  return [{ itemId: "kangyur-collection" }]
}
