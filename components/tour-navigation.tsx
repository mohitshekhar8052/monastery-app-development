"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronRight, MapPin, Clock, Users } from "lucide-react"

interface Scene {
  id: string
  name: string
  panorama: string
  hotspots: any[]
}

interface Tour {
  id: string
  name: string
  location: string
  description: string
  scenes: Scene[]
  audioGuide: {
    languages: string[]
    narrator: string
  }
}

interface TourNavigationProps {
  tour: Tour
}

export function TourNavigation({ tour }: TourNavigationProps) {
  const [activeScene, setActiveScene] = useState(0)

  return (
    <div className="flex-1 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tour Navigation</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-64">
            <div className="p-4 space-y-2">
              {tour.scenes.map((scene, index) => (
                <Button
                  key={scene.id}
                  variant={index === activeScene ? "default" : "ghost"}
                  className="w-full justify-start h-auto p-3"
                  onClick={() => setActiveScene(index)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-sm">{scene.name}</div>
                      <div className="text-xs text-muted-foreground">{scene.hotspots.length} interactive points</div>
                    </div>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-lg">Tour Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>Scenes</span>
            </div>
            <Badge variant="secondary">{tour.scenes.length}</Badge>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Duration</span>
            </div>
            <Badge variant="secondary">15-20 min</Badge>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>Visitors Today</span>
            </div>
            <Badge variant="secondary">1,247</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Audio Guide */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-lg">Audio Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-muted-foreground">Narrated by {tour.audioGuide.narrator}</div>

          <div className="flex flex-wrap gap-1">
            {tour.audioGuide.languages.map((language) => (
              <Badge key={language} variant="outline" className="text-xs">
                {language}
              </Badge>
            ))}
          </div>

          <Button size="sm" className="w-full">
            Download Audio Guide
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
