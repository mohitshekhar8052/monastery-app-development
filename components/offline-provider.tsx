"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface CachedData {
  monasteries: any[]
  tours: any[]
  maps: any[]
  documents: any[]
  emergencyContacts: any[]
  lastUpdated: number
}

interface OfflineContextType {
  isOffline: boolean
  isDataCached: boolean
  cacheData: () => Promise<void>
  getCachedData: (type: keyof CachedData) => any[]
  downloadForOffline: (dataType: string) => Promise<void>
  cacheProgress: number
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined)

// Sample data that would be cached for offline use
const sampleData = {
  monasteries: [
    {
      id: "potala-palace",
      name: "Potala Palace",
      location: "Lhasa, Tibet",
      description: "Historic winter palace of the Dalai Lama",
      coordinates: { lat: 29.6558, lng: 91.1174 },
      visitingHours: "9:00 AM - 3:00 PM",
      entryFee: "200 CNY",
      rules: [
        "No photography inside main halls",
        "Dress modestly",
        "Remove hats and sunglasses",
        "Follow guided tour route"
      ]
    },
    {
      id: "jokhang-temple",
      name: "Jokhang Temple",
      location: "Barkhor Street, Lhasa",
      description: "Most sacred temple in Tibetan Buddhism",
      coordinates: { lat: 29.6506, lng: 91.1320 },
      visitingHours: "8:00 AM - 6:00 PM",
      entryFee: "85 CNY",
      rules: [
        "Clockwise pilgrimage route",
        "Respectful behavior required",
        "No touching religious artifacts",
        "Quiet observation"
      ]
    }
  ],
  
  tours: [
    {
      id: "basic-tibet-tour",
      name: "Essential Tibet Monasteries",
      duration: "3 days",
      stops: ["Potala Palace", "Jokhang Temple", "Sera Monastery"],
      difficulty: "Easy",
      description: "Perfect introduction to Tibetan Buddhist culture"
    }
  ],
  
  maps: [
    {
      id: "lhasa-monasteries",
      name: "Lhasa Monastery Map",
      coordinates: { lat: 29.6516, lng: 91.1172 },
      zoom: 12,
      markers: [
        { id: "potala", lat: 29.6558, lng: 91.1174, name: "Potala Palace" },
        { id: "jokhang", lat: 29.6506, lng: 91.1320, name: "Jokhang Temple" }
      ]
    }
  ],
  
  documents: [
    {
      id: "tibet-guide",
      title: "Complete Guide to Tibetan Monasteries",
      type: "PDF",
      size: "2.5 MB",
      pages: 45,
      content: "Comprehensive guide covering history, architecture, and visiting protocols"
    }
  ],
  
  emergencyContacts: [
    {
      id: "tibet-police",
      name: "Tibet Police",
      number: "+86-891-6324567",
      type: "Emergency",
      available24: true
    },
    {
      id: "tourist-helpline",
      name: "Tourist Helpline",
      number: "+86-891-6834193",
      type: "Assistance",
      available24: false
    }
  ]
}

export function OfflineProvider({ children }: { children: React.ReactNode }) {
  const [isOffline, setIsOffline] = useState(false)
  const [isDataCached, setIsDataCached] = useState(false)
  const [cacheProgress, setCacheProgress] = useState(0)

  useEffect(() => {
    // Check online/offline status
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)
    
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    
    // Initial status
    setIsOffline(!navigator.onLine)
    
    // Check if data is already cached
    const cachedData = localStorage.getItem("monastery-offline-data")
    setIsDataCached(!!cachedData)
    
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const cacheData = async (): Promise<void> => {
    setCacheProgress(0)
    
    try {
      // Simulate progressive caching
      const steps = [
        { name: "monasteries", data: sampleData.monasteries, progress: 20 },
        { name: "tours", data: sampleData.tours, progress: 40 },
        { name: "maps", data: sampleData.maps, progress: 60 },
        { name: "documents", data: sampleData.documents, progress: 80 },
        { name: "emergencyContacts", data: sampleData.emergencyContacts, progress: 100 }
      ]
      
      const cachedData: CachedData = {
        monasteries: [],
        tours: [],
        maps: [],
        documents: [],
        emergencyContacts: [],
        lastUpdated: Date.now()
      }
      
      for (const step of steps) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        cachedData[step.name as keyof CachedData] = step.data as any
        setCacheProgress(step.progress)
      }
      
      localStorage.setItem("monastery-offline-data", JSON.stringify(cachedData))
      setIsDataCached(true)
      
    } catch (error) {
      console.error("Failed to cache data:", error)
      setCacheProgress(0)
    }
  }

  const getCachedData = (type: keyof CachedData): any[] => {
    try {
      const cachedData = localStorage.getItem("monastery-offline-data")
      if (cachedData) {
        const data: CachedData = JSON.parse(cachedData)
        const result = data[type]
        return Array.isArray(result) ? result : []
      }
    } catch (error) {
      console.error("Failed to get cached data:", error)
    }
    return []
  }

  const downloadForOffline = async (dataType: string): Promise<void> => {
    // This would handle downloading specific data types
    console.log(`Downloading ${dataType} for offline use...`)
    
    // In a real implementation, this would:
    // 1. Download the specific data from the server
    // 2. Store it in IndexedDB or localStorage
    // 3. Update the cache manifest
    
    await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate download
  }

  return (
    <OfflineContext.Provider
      value={{
        isOffline,
        isDataCached,
        cacheData,
        getCachedData,
        downloadForOffline,
        cacheProgress
      }}
    >
      {children}
    </OfflineContext.Provider>
  )
}

export function useOffline() {
  const context = useContext(OfflineContext)
  if (context === undefined) {
    throw new Error("useOffline must be used within an OfflineProvider")
  }
  return context
}