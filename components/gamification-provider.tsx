"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./auth-provider"

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary"
  unlockedAt?: Date
}

interface Achievement {
  id: string
  title: string
  description: string
  points: number
  progress: number
  maxProgress: number
  completed: boolean
  category: "exploration" | "learning" | "community" | "meditation"
}

interface GamificationData {
  coins: number
  level: number
  xp: number
  xpToNextLevel: number
  badges: Badge[]
  achievements: Achievement[]
  streak: number
  totalVisits: number
}

interface GamificationContextType {
  data: GamificationData
  addCoins: (amount: number) => void
  addXP: (amount: number) => void
  unlockBadge: (badgeId: string) => void
  updateAchievement: (achievementId: string, progress: number) => void
  incrementStreak: () => void
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined)

const initialBadges: Badge[] = [
  {
    id: "first-visit",
    name: "Sacred Seeker",
    description: "Welcome to your spiritual journey",
    icon: "🙏",
    rarity: "common",
  },
  {
    id: "monastery-explorer",
    name: "Monastery Explorer",
    description: "Visited 5 different monasteries",
    icon: "🏛️",
    rarity: "common",
  },
  {
    id: "meditation-master",
    name: "Meditation Master",
    description: "Completed 10 meditation sessions",
    icon: "🧘",
    rarity: "rare",
  },
  {
    id: "wisdom-keeper",
    name: "Wisdom Keeper",
    description: "Read 20 archive documents",
    icon: "📜",
    rarity: "epic",
  },
  {
    id: "community-builder",
    name: "Community Builder",
    description: "Made 50 community posts",
    icon: "👥",
    rarity: "rare",
  },
  {
    id: "enlightened-one",
    name: "Enlightened One",
    description: "Reached level 50",
    icon: "✨",
    rarity: "legendary",
  },
]

const initialAchievements: Achievement[] = [
  {
    id: "first-tour",
    title: "First Virtual Tour",
    description: "Complete your first monastery tour",
    points: 100,
    progress: 0,
    maxProgress: 1,
    completed: false,
    category: "exploration",
  },
  {
    id: "daily-meditation",
    title: "Daily Practice",
    description: "Meditate for 7 consecutive days",
    points: 500,
    progress: 0,
    maxProgress: 7,
    completed: false,
    category: "meditation",
  },
  {
    id: "knowledge-seeker",
    title: "Knowledge Seeker",
    description: "Complete 5 learning modules",
    points: 300,
    progress: 0,
    maxProgress: 5,
    completed: false,
    category: "learning",
  },
  {
    id: "social-butterfly",
    title: "Social Butterfly",
    description: "Make 10 community connections",
    points: 250,
    progress: 0,
    maxProgress: 10,
    completed: false,
    category: "community",
  },
]

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [data, setData] = useState<GamificationData>({
    coins: 0,
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    badges: [],
    achievements: initialAchievements,
    streak: 0,
    totalVisits: 0,
  })

  useEffect(() => {
    if (user) {
      // Load user's gamification data from localStorage
      const savedData = localStorage.getItem(`gamification_${user.id}`)
      if (savedData) {
        setData(JSON.parse(savedData))
      } else {
        // Initialize new user with welcome badge
        const newData = {
          ...data,
          badges: [{ ...initialBadges[0], unlockedAt: new Date() }],
          coins: 100,
          totalVisits: 1,
        }
        setData(newData)
        localStorage.setItem(`gamification_${user.id}`, JSON.stringify(newData))
      }
    }
  }, [user])

  const saveData = (newData: GamificationData) => {
    if (user) {
      localStorage.setItem(`gamification_${user.id}`, JSON.stringify(newData))
    }
  }

  const addCoins = (amount: number) => {
    setData((prev) => {
      const newData = { ...prev, coins: prev.coins + amount }
      saveData(newData)
      return newData
    })
  }

  const addXP = (amount: number) => {
    setData((prev) => {
      let newXP = prev.xp + amount
      let newLevel = prev.level
      let newXPToNext = prev.xpToNextLevel

      // Level up logic
      while (newXP >= newXPToNext) {
        newXP -= newXPToNext
        newLevel++
        newXPToNext = newLevel * 100 // Each level requires more XP
      }

      const newData = {
        ...prev,
        xp: newXP,
        level: newLevel,
        xpToNextLevel: newXPToNext,
        coins: prev.coins + (newLevel > prev.level ? 50 : 0), // Bonus coins for leveling up
      }
      saveData(newData)
      return newData
    })
  }

  const unlockBadge = (badgeId: string) => {
    const badge = initialBadges.find((b) => b.id === badgeId)
    if (!badge) return

    setData((prev) => {
      const alreadyUnlocked = prev.badges.some((b) => b.id === badgeId)
      if (alreadyUnlocked) return prev

      const newData = {
        ...prev,
        badges: [...prev.badges, { ...badge, unlockedAt: new Date() }],
        coins: prev.coins + 25, // Bonus coins for unlocking badge
      }
      saveData(newData)
      return newData
    })
  }

  const updateAchievement = (achievementId: string, progress: number) => {
    setData((prev) => {
      const newAchievements = prev.achievements.map((achievement) => {
        if (achievement.id === achievementId) {
          const newProgress = Math.min(progress, achievement.maxProgress)
          const completed = newProgress >= achievement.maxProgress
          return {
            ...achievement,
            progress: newProgress,
            completed,
          }
        }
        return achievement
      })

      const completedAchievement = newAchievements.find(
        (a) =>
          a.id === achievementId && a.completed && !prev.achievements.find((pa) => pa.id === achievementId)?.completed,
      )

      const newData = {
        ...prev,
        achievements: newAchievements,
        coins: prev.coins + (completedAchievement ? completedAchievement.points : 0),
      }
      saveData(newData)
      return newData
    })
  }

  const incrementStreak = () => {
    setData((prev) => {
      const newData = { ...prev, streak: prev.streak + 1, totalVisits: prev.totalVisits + 1 }
      saveData(newData)
      return newData
    })
  }

  return (
    <GamificationContext.Provider
      value={{
        data,
        addCoins,
        addXP,
        unlockBadge,
        updateAchievement,
        incrementStreak,
      }}
    >
      {children}
    </GamificationContext.Provider>
  )
}

export function useGamification() {
  const context = useContext(GamificationContext)
  if (context === undefined) {
    throw new Error("useGamification must be used within a GamificationProvider")
  }
  return context
}
