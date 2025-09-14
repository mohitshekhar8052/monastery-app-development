"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Coins, Zap, Target, Award, Gift, Crown } from "lucide-react"
import { useGamification } from "@/components/gamification-provider"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"

export default function RewardsPage() {
  const { user } = useAuth()
  const { data } = useGamification()

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-amber-50/20 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <Trophy className="h-12 w-12 mx-auto mb-4 text-amber-500" />
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>Please sign in to view your rewards and achievements</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/auth/login">
              <Button className="bg-gradient-to-r from-cyan-500 to-amber-500 hover:from-cyan-600 hover:to-amber-600 text-white">
                Sign In
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800 border-gray-300"
      case "rare":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "epic":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "legendary":
        return "bg-amber-100 text-amber-800 border-amber-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "exploration":
        return "🗺️"
      case "learning":
        return "📚"
      case "community":
        return "👥"
      case "meditation":
        return "🧘"
      default:
        return "⭐"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-amber-50/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl mb-4 shadow-lg">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-amber-800 to-orange-800 bg-clip-text text-transparent mb-2">
            Rewards & Achievements
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Track your spiritual journey progress and unlock sacred rewards
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <CardContent className="p-6 text-center">
              <Coins className="h-8 w-8 text-amber-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-amber-800">{data.coins}</div>
              <div className="text-sm text-amber-600">Sacred Coins</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-cyan-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-cyan-800">Level {data.level}</div>
              <div className="text-sm text-cyan-600">
                {data.xp}/{data.xpToNextLevel} XP
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-800">{data.badges.length}</div>
              <div className="text-sm text-purple-600">Badges Earned</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-800">{data.streak}</div>
              <div className="text-sm text-green-600">Day Streak</div>
            </CardContent>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-slate-200/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500" />
              Level Progress
            </CardTitle>
            <CardDescription>Continue your journey to reach the next level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Level {data.level}</span>
              <span className="text-sm text-slate-600">
                {data.xp}/{data.xpToNextLevel} XP
              </span>
            </div>
            <Progress value={(data.xp / data.xpToNextLevel) * 100} className="h-3" />
          </CardContent>
        </Card>

        <Tabs defaultValue="badges" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="badges">🏆 Badges</TabsTrigger>
            <TabsTrigger value="achievements">🎯 Achievements</TabsTrigger>
            <TabsTrigger value="rewards">🎁 Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="badges" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.badges.map((badge) => (
                <Card
                  key={badge.id}
                  className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{badge.icon}</div>
                    <h3 className="font-bold text-lg mb-2">{badge.name}</h3>
                    <p className="text-sm text-slate-600 mb-3">{badge.description}</p>
                    <Badge className={getRarityColor(badge.rarity)}>{badge.rarity}</Badge>
                    {badge.unlockedAt && (
                      <div className="text-xs text-slate-500 mt-2">
                        Unlocked {badge.unlockedAt.toLocaleDateString()}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <div className="space-y-4">
              {data.achievements.map((achievement) => (
                <Card key={achievement.id} className="bg-white/80 backdrop-blur-sm border-slate-200/50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="text-2xl">{getCategoryIcon(achievement.category)}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">{achievement.title}</h3>
                          <p className="text-sm text-slate-600 mb-3">{achievement.description}</p>
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">Progress</span>
                                <span className="text-sm text-slate-600">
                                  {achievement.progress}/{achievement.maxProgress}
                                </span>
                              </div>
                              <Progress
                                value={(achievement.progress / achievement.maxProgress) * 100}
                                className="h-2"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-amber-600 font-bold">
                          <Coins className="h-4 w-4" />
                          {achievement.points}
                        </div>
                        {achievement.completed && <Badge className="mt-2 bg-green-100 text-green-800">Completed</Badge>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
                <CardContent className="p-6 text-center">
                  <Gift className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Premium Meditation</h3>
                  <p className="text-sm text-slate-600 mb-4">Unlock exclusive guided meditations</p>
                  <div className="flex items-center justify-center gap-1 text-amber-600 font-bold mb-4">
                    <Coins className="h-4 w-4" />
                    500 coins
                  </div>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">Unlock</Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <CardContent className="p-6 text-center">
                  <Crown className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">VIP Access</h3>
                  <p className="text-sm text-slate-600 mb-4">Access to exclusive monastery tours</p>
                  <div className="flex items-center justify-center gap-1 text-purple-600 font-bold mb-4">
                    <Coins className="h-4 w-4" />
                    1000 coins
                  </div>
                  <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">Unlock</Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
                <CardContent className="p-6 text-center">
                  <Star className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Custom Avatar</h3>
                  <p className="text-sm text-slate-600 mb-4">Personalize your spiritual avatar</p>
                  <div className="flex items-center justify-center gap-1 text-cyan-600 font-bold mb-4">
                    <Coins className="h-4 w-4" />
                    250 coins
                  </div>
                  <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">Unlock</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
