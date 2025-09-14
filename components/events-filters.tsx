"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, MapPin, Users, X } from "lucide-react"

const filterCategories = {
  type: [
    { id: "festival", label: "Festivals", count: 8 },
    { id: "ceremony", label: "Ceremonies", count: 12 },
    { id: "celebration", label: "Celebrations", count: 6 },
    { id: "prayer", label: "Prayer Events", count: 15 },
    { id: "teaching", label: "Teachings", count: 9 },
  ],
  monastery: [
    { id: "hemis", label: "Hemis Monastery", count: 7 },
    { id: "potala", label: "Potala Palace", count: 5 },
    { id: "tashilhunpo", label: "Tashilhunpo", count: 8 },
    { id: "ganden", label: "Ganden Monastery", count: 6 },
    { id: "samye", label: "Samye Monastery", count: 4 },
    { id: "rongbuk", label: "Rongbuk Monastery", count: 3 },
  ],
  month: [
    { id: "january", label: "January", count: 2 },
    { id: "february", label: "February", count: 4 },
    { id: "march", label: "March", count: 6 },
    { id: "april", label: "April", count: 3 },
    { id: "may", label: "May", count: 5 },
    { id: "june", label: "June", count: 4 },
    { id: "july", label: "July", count: 7 },
    { id: "august", label: "August", count: 5 },
    { id: "september", label: "September", count: 3 },
    { id: "october", label: "October", count: 4 },
    { id: "november", label: "November", count: 2 },
    { id: "december", label: "December", count: 3 },
  ],
}

export function EventsFilters() {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    type: [],
    monastery: [],
    month: [],
  })

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
      month: [],
    })
  }

  const getActiveFilterCount = () => {
    return Object.values(selectedFilters).flat().length
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

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button size="sm" variant="outline" className="w-full justify-start bg-transparent">
            <Calendar className="h-3 w-3 mr-2" />
            This Week's Events
          </Button>
          <Button size="sm" variant="outline" className="w-full justify-start bg-transparent">
            <MapPin className="h-3 w-3 mr-2" />
            Events Near Me
          </Button>
          <Button size="sm" variant="outline" className="w-full justify-start bg-transparent">
            <Users className="h-3 w-3 mr-2" />
            Popular Events
          </Button>
        </CardContent>
      </Card>

      {/* Event Type Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Event Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {filterCategories.type.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox
                id={type.id}
                checked={selectedFilters.type.includes(type.id)}
                onCheckedChange={(checked) => handleFilterChange("type", type.id, checked as boolean)}
              />
              <label
                htmlFor={type.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
              >
                {type.label}
                <span className="text-xs text-muted-foreground ml-2">({type.count})</span>
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

      {/* Month Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Month</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 max-h-48 overflow-y-auto">
          {filterCategories.month.map((month) => (
            <div key={month.id} className="flex items-center space-x-2">
              <Checkbox
                id={month.id}
                checked={selectedFilters.month.includes(month.id)}
                onCheckedChange={(checked) => handleFilterChange("month", month.id, checked as boolean)}
              />
              <label
                htmlFor={month.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
              >
                {month.label}
                <span className="text-xs text-muted-foreground ml-2">({month.count})</span>
              </label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
