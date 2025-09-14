"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw, Volume2 } from "lucide-react"

const meditationSessions = [
  {
    id: 1,
    title: "Morning Prayer Meditation",
    duration: 15,
    type: "Guided",
    difficulty: "Beginner",
    description: "Start your day with traditional Tibetan morning prayers",
    audio: "/meditation/morning-prayer.mp3",
  },
  {
    id: 2,
    title: "Breathing Awareness",
    duration: 20,
    type: "Mindfulness",
    difficulty: "Intermediate",
    description: "Focus on breath awareness with monastery bell sounds",
    audio: "/meditation/breathing-awareness.mp3",
  },
  {
    id: 3,
    title: "Loving Kindness",
    duration: 25,
    type: "Metta",
    difficulty: "All Levels",
    description: "Cultivate compassion with traditional Buddhist teachings",
    audio: "/meditation/loving-kindness.mp3",
  },
]

export default function MeditationPage() {
  const [currentSession, setCurrentSession] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState([0.7])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Guided Meditation Sessions</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Find inner peace with authentic monastery meditation practices
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {meditationSessions.map((session) => (
            <Card key={session.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{session.title}</CardTitle>
                  <Badge variant="secondary">{session.type}</Badge>
                </div>
                <CardDescription>{session.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-slate-600">{session.duration} min</span>
                  <Badge variant="outline">{session.difficulty}</Badge>
                </div>
                <Button
                  onClick={() => setCurrentSession(session.id)}
                  className="w-full"
                  variant={currentSession === session.id ? "default" : "outline"}
                >
                  {currentSession === session.id ? "Selected" : "Select Session"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {currentSession && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">
                {meditationSessions.find((s) => s.id === currentSession)?.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center space-x-4">
                <Button size="lg" onClick={() => setIsPlaying(!isPlaying)} className="rounded-full w-16 h-16">
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setCurrentTime(0)}
                  className="rounded-full w-16 h-16"
                >
                  <RotateCcw className="w-6 h-6" />
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>
                    {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, "0")}
                  </span>
                  <span>
                    {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, "0")}
                  </span>
                </div>
                <Slider value={[currentTime]} max={duration} step={1} className="w-full" />
              </div>

              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4" />
                <Slider value={volume} onValueChange={setVolume} max={1} step={0.1} className="flex-1" />
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  )
}
