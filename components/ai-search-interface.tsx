"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Mic, MicOff, Sparkles, Clock, Lightbulb } from "lucide-react"

const suggestedQueries = [
  "Show me festivals happening in July at Hemis Monastery",
  "Find manuscripts about meditation practices",
  "What are the most important Buddhist ceremonies?",
  "Tell me about Tibetan architecture in monasteries",
  "When is the next Losar celebration?",
  "Find virtual tours of high-altitude monasteries",
]

const recentSearches = [
  "Hemis Festival 2024",
  "Potala Palace virtual tour",
  "Buddhist manuscripts",
  "Meditation retreats",
]

export function AISearchInterface() {
  const [query, setQuery] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsSearching(true)

    // Simulate AI search processing
    setTimeout(() => {
      // Mock AI search results
      const mockResults = [
        {
          type: "monastery",
          title: "Hemis Monastery",
          description: "Famous for its annual festival and stunning mountain backdrop",
          relevance: 0.95,
        },
        {
          type: "event",
          title: "Hemis Festival 2024",
          description: "Annual masked dance festival celebrating Guru Padmasambhava",
          relevance: 0.92,
        },
        {
          type: "archive",
          title: "Masked Dance Traditions",
          description: "Historical documents about Cham dance performances",
          relevance: 0.88,
        },
      ]

      setSearchResults(mockResults)
      setIsSearching(false)
    }, 2000)
  }

  const handleVoiceSearch = () => {
    setIsListening(!isListening)
    // Voice recognition would be implemented here
  }

  const handleSuggestedQuery = (suggestedQuery: string) => {
    setQuery(suggestedQuery)
  }

  return (
    <div className="space-y-6">
      {/* Main Search Interface */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <div className="flex items-center gap-2 p-4 border border-border rounded-lg bg-background focus-within:ring-2 focus-within:ring-ring">
                <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Ask me anything about monasteries, events, or cultural heritage..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1 bg-transparent border-none outline-none text-base placeholder:text-muted-foreground"
                />
                <Button
                  size="sm"
                  variant={isListening ? "default" : "ghost"}
                  onClick={handleVoiceSearch}
                  className="flex-shrink-0"
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button onClick={handleSearch} disabled={!query.trim() || isSearching} className="flex-shrink-0">
                  {isSearching ? (
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-1" />
                      Search
                    </>
                  )}
                </Button>
              </div>
            </div>

            {isListening && (
              <div className="flex items-center justify-center p-4 bg-primary/10 rounded-lg">
                <div className="flex items-center gap-2 text-primary">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200"></div>
                  <span className="ml-2 text-sm font-medium">Listening...</span>
                </div>
              </div>
            )}

            {/* AI Processing Indicator */}
            {isSearching && (
              <div className="flex items-center justify-center p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <div className="text-sm">
                    <div className="font-medium">AI is analyzing your query...</div>
                    <div className="text-muted-foreground">Searching across monasteries, events, and archives</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">AI Search Results</h3>
              <Badge variant="secondary">{searchResults.length} results</Badge>
            </div>
            <div className="space-y-4">
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className="group p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="capitalize">
                        {result.type}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">Relevance:</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < Math.floor(result.relevance * 5)
                                  ? "bg-primary"
                                  : "bg-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground ml-1">
                          {Math.round(result.relevance * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <h4 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors">
                    {result.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {result.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                      Learn More
                    </Button>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="hover:bg-muted">
                        <Sparkles className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Suggested Queries */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">Try asking about:</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {suggestedQueries.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuery(suggestion)}
                className="text-left p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors text-sm"
              >
                "{suggestion}"
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Searches */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold">Recent Searches</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-muted"
                onClick={() => setQuery(search)}
              >
                {search}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search Tips */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-3">Search Tips</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
              <span>Ask natural questions like "What festivals happen in summer?"</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
              <span>Search by location: "monasteries in Ladakh" or "events in Tibet"</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
              <span>Find specific content: "manuscripts about meditation" or "thangka paintings"</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
              <span>Use voice search for hands-free exploration</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
