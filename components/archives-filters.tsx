"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { BookOpen, ImageIcon, Music, Palette, Camera, X } from "lucide-react"

const filterCategories = {
  type: [
    { id: "manuscript", label: "Manuscripts", icon: BookOpen, count: 1247 },
    { id: "artwork", label: "Artwork", icon: Palette, count: 856 },
    { id: "artifact", label: "Artifacts", icon: ImageIcon, count: 423 },
    { id: "audio", label: "Audio", icon: Music, count: 234 },
    { id: "photograph", label: "Photographs", icon: Camera, count: 87 },
  ],
  monastery: [
    { id: "potala", label: "Potala Palace", count: 567 },
    { id: "tashilhunpo", label: "Tashilhunpo", count: 432 },
    { id: "hemis", label: "Hemis Monastery", count: 298 },
    { id: "ganden", label: "Ganden Monastery", count: 234 },
    { id: "samye", label: "Samye Monastery", count: 187 },
    { id: "rongbuk", label: "Rongbuk Monastery", count: 129 },
  ],
  condition: [
    { id: "excellent", label: "Excellent", count: 1234 },
    { id: "good", label: "Good", count: 987 },
    { id: "fair", label: "Fair", count: 456 },
    { id: "poor", label: "Poor", count: 170 },
  ],
  language: [
    { id: "tibetan", label: "Classical Tibetan", count: 1456 },
    { id: "sanskrit", label: "Sanskrit", count: 678 },
    { id: "chinese", label: "Chinese", count: 234 },
    { id: "mongolian", label: "Mongolian", count: 123 },
  ],
}

export function ArchivesFilters() {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    type: [],
    monastery: [],
    condition: [],
    language: [],
  })
  const [dateRange, setDateRange] = useState([800, 2024])

  const handleFilterChange = (category: string, filterId: string, checked: boolean) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: checked ? [...prev[category], filterId] : prev[category].filter((id) => id !== filterId),
    }))
  }

  const clearAllFilters = () => {
    setSelectedFilters({
      type: [],
      monastery: [],
      condition: [],
      language: [],
    })
    setDateRange([800, 2024])
  }

  const getActiveFilterCount = () => {
    return Object.values(selectedFilters).flat().length + (dateRange[0] !== 800 || dateRange[1] !== 2024 ? 1 : 0)
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

      {/* Date Range Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Date Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider value={dateRange} onValueChange={setDateRange} min={800} max={2024} step={10} className="w-full" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{dateRange[0]} CE</span>
              <span>{dateRange[1]} CE</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Type Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Item Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {filterCategories.type.map((type) => {
            const IconComponent = type.icon
            return (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox
                  id={type.id}
                  checked={selectedFilters.type.includes(type.id)}
                  onCheckedChange={(checked) => handleFilterChange("type", type.id, checked as boolean)}
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

      {/* Condition Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Condition</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {filterCategories.condition.map((condition) => (
            <div key={condition.id} className="flex items-center space-x-2">
              <Checkbox
                id={condition.id}
                checked={selectedFilters.condition.includes(condition.id)}
                onCheckedChange={(checked) => handleFilterChange("condition", condition.id, checked as boolean)}
              />
              <label
                htmlFor={condition.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
              >
                {condition.label}
                <span className="text-xs text-muted-foreground ml-2">({condition.count})</span>
              </label>
            </div>
          ))}
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
    </div>
  )
}
