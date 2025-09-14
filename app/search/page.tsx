import { AISearchInterface } from "@/components/ai-search-interface"
import { SearchResults } from "@/components/search-results"
import { SearchFilters } from "@/components/search-filters"
import { LanguageSelector } from "@/components/language-selector"

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-balance mb-2">AI-Powered Search</h1>
            <p className="text-muted-foreground">
              Ask questions in natural language about monasteries, events, and cultural heritage
            </p>
          </div>
          <LanguageSelector />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 flex-shrink-0">
            <SearchFilters />
          </aside>
          <main className="flex-1 space-y-8">
            <AISearchInterface />
            <SearchResults />
          </main>
        </div>
      </div>
    </div>
  )
}
