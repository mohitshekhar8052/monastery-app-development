import { ArchivesHeader } from "@/components/archives-header"
import { ArchivesGrid } from "@/components/archives-grid"
import { ArchivesFilters } from "@/components/archives-filters"

export default function ArchivesPage() {
  return (
    <div className="min-h-screen bg-background">
      <ArchivesHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 flex-shrink-0">
            <ArchivesFilters />
          </aside>
          <main className="flex-1">
            <ArchivesGrid />
          </main>
        </div>
      </div>
    </div>
  )
}
