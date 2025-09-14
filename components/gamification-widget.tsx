"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Coins, Zap, Trophy, Star } from "lucide-react"
import { useGamification } from "./gamification-provider"
import { useAuth } from "./auth-provider"
import Link from "next/link"

export function GamificationWidget() {
  const { user } = useAuth()
  const { data } = useGamification()

  if (!user) return null

  return (
    <Card className="fixed bottom-6 left-6 z-40 bg-white/90 backdrop-blur-sm border-slate-200/50 shadow-xl max-w-xs">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
              <Trophy className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-sm">Level {data.level}</span>
          </div>
          <Link href="/rewards">
            <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">
              View All
            </Badge>
          </Link>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Coins className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium">{data.coins}</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="h-4 w-4 text-cyan-500" />
              <span className="text-sm">
                {data.xp}/{data.xpToNextLevel}
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-slate-600">Next Level</span>
              <span className="text-xs text-slate-600">{Math.round((data.xp / data.xpToNextLevel) * 100)}%</span>
            </div>
            <Progress value={(data.xp / data.xpToNextLevel) * 100} className="h-2" />
          </div>

          {data.badges.length > 0 && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-purple-500" />
              <span className="text-xs text-slate-600">Latest: {data.badges[data.badges.length - 1]?.name}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
