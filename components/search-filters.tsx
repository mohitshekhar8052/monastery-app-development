"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { MapPin, Calendar, BookOpen, ImageIcon, X, Sparkles } from "lucide-react"

const filterCategories = {
  contentType: [
    { id: "monastery", label: "Monasteries", icon: MapPin, count: 24 },
    { id: "event", label: "Events", icon: Calendar, count: 18 },
    { id: "archive", label: "Archives", icon: BookOpen, count: 156 },
    { id: "tour", label: "Virtual Tours", icon: ImageIcon, count: 12 },
  ],
  language: [
    { id: "en", label: "English", count: 210 },
    { id: "zh", label: "Chinese", count: 189 },
    { id: "hi", label: "Hindi", count: 167 },
    { id: "bo", label: "Tibetan", count: 145 },
    { id: "ne", label: "Nepali", count: 123 },
  ],
  monastery: [
    { id: "hemis", label: "Hemis Monastery", count: 34 },
    { id: "potala", label: "Potala Palace", count: 28 },
    { id: "tashilhunpo", label: "Tashilhunpo", count: 31 },
    { id: "ganden", label: "Ganden Monastery", count: 26 },
    { id: "samye", label: "Samye Monastery", count: 22 },
  ],
}

export function SearchFilters() {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    contentType: [],
    language: [],
    monastery: [],
  })
  const [relevanceThreshold, setRelevanceThreshold] = useState([70])
  const [useAIRanking, setUseAIRanking] = useState(true)

  const handleFilterChange = (category: string, filterId: string, checked: boolean) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: checked ? [...prev[category], filterId] : prev[category].filter((id) => id !== filterId),
    }))
  }

  const clearAllFilters = () => {
    setSelectedFilters({
      contentType: [],
      language: [],
      monastery: [],
    })
    setRelevanceThreshold([70])
  }

  const getActiveFilterCount = () => {
    return Object.values(selectedFilters).flat().length + (relevanceThreshold[0] !== 70 ? 1 : 0)
  }

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {getActiveFilterCount() > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Active Filters</CardTitle>
              <Button size="sm" variant="ghost" onClick={clearAllFilters}>
                <X className="h-3 w-3 mr-1" />
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-1">
              {Object.entries(selectedFilters).map(([category, filters]) =>
                filters.map((filterId) => {
                  const categoryData = filterCategories[category as keyof typeof filterCategories]
                  const filter = categoryData.find((f) => f.id === filterId)
                  return (
                    <Badge key={`${category}-${filterId}`} variant="secondary" className="text-xs">
                      {filter?.label}
                      <button
                        onClick={() => handleFilterChange(category, filterId, false)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-2 w-2" />
                      </button>
                    </Badge>
                  )
                }),
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Search Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            AI Search Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="ai-ranking"
              checked={useAIRanking}
              onCheckedChange={(checked) => setUseAIRanking(checked as boolean)}
            />
            <label htmlFor="ai-ranking" className="text-sm font-medium leading-none cursor-pointer">
              Use AI-powered ranking
            </label>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Minimum Relevance Score</label>
            <Slider
              value={relevanceThreshold}
              onValueChange={setRelevanceThreshold}
              min={0}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0%</span>
              <span className="font-medium">{relevanceThreshold[0]}%</span>
              <span>100%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Type Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Content Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {filterCategories.contentType.map((type) => {
            const IconComponent = type.icon
            return (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox
                  id={type.id}
                  checked={selectedFilters.contentType.includes(type.id)}
                  onCheckedChange={(checked) => handleFilterChange("contentType", type.id, checked as boolean)}
                />
                <label
                  htmlFor={type.id}
                  className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                >
                  <IconComponent className="h-3 w-3" />
                  {type.label}
                  <span className="text-xs text-muted-foreground ml-auto">({type.count})</span>
                </label>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Language Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Language</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {filterCategories.language.map((language) => (
            <div key={language.id} className="flex items-center space-x-2">
              <Checkbox
                id={language.id}
                checked={selectedFilters.language.includes(language.id)}
                onCheckedChange={(checked) => handleFilterChange("language", language.id, checked as boolean)}
              />
              <label
                htmlFor={language.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
              >
                {language.label}
                <span className="text-xs text-muted-foreground ml-2">({language.count})</span>
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Monastery Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Monastery</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {filterCategories.monastery.map((monastery) => (
            <div key={monastery.id} className="flex items-center space-x-2">
              <Checkbox
                id={monastery.id}
                checked={selectedFilters.monastery.includes(monastery.id)}
                onCheckedChange={(checked) => handleFilterChange("monastery", monastery.id, checked as boolean)}
              />
              <label
                htmlFor={monastery.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
              >
                {monastery.label}
                <span className="text-xs text-muted-foreground ml-2">({monastery.count})</span>
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Quick Search</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button size="sm" variant="outline" className="w-full justify-start bg-transparent">
            Recent Festivals
          </Button>
          <Button size="sm" variant="outline" className="w-full justify-start bg-transparent">
            Popular Monasteries
          </Button>
          <Button size="sm" variant="outline" className="w-full justify-start bg-transparent">
            New Archives
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
