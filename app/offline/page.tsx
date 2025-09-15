"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Download, 
  Wifi, 
  WifiOff, 
  Check, 
  AlertCircle,
  Map,
  FileText,
  Phone,
  Camera,
  Navigation,
  Clock,
  HardDrive
} from "lucide-react"
import { useOffline } from "@/components/offline-provider"
import { useAuth } from "@/components/auth-provider"

interface OfflineContent {
  id: string
  name: string
  type: "map" | "tour" | "guide" | "emergency" | "documents"
  size: string
  essential: boolean
  downloaded: boolean
  description: string
  lastUpdated?: string
}

const offlineContent: OfflineContent[] = [
  {
    id: "lhasa-maps",
    name: "Lhasa Area Maps",
    type: "map",
    size: "15 MB",
    essential: true,
    downloaded: false,
    description: "Detailed offline maps of Lhasa and surrounding monastery areas",
    lastUpdated: "2024-01-15"
  },
  {
    id: "potala-tour",
    name: "Potala Palace Virtual Tour",
    type: "tour",
    size: "120 MB",
    essential: true,
    downloaded: false,
    description: "Complete 360° tour with audio guide and detailed information",
    lastUpdated: "2024-01-10"
  },
  {
    id: "monastery-guide",
    name: "Monastery Etiquette Guide",
    type: "guide",
    size: "2 MB",
    essential: true,
    downloaded: false,
    description: "Essential guide for proper monastery behavior and protocols",
    lastUpdated: "2024-01-12"
  },
  {
    id: "emergency-contacts",
    name: "Emergency Contacts",
    type: "emergency",
    size: "500 KB",
    essential: true,
    downloaded: false,
    description: "Local emergency numbers, hospitals, and assistance contacts",
    lastUpdated: "2024-01-14"
  },
  {
    id: "tibet-history",
    name: "Tibet Buddhism Documents",
    type: "documents",
    size: "8 MB",
    essential: false,
    downloaded: false,
    description: "Historical documents and texts about Tibetan Buddhism",
    lastUpdated: "2024-01-08"
  },
  {
    id: "sera-tour",
    name: "Sera Monastery Tour",
    type: "tour",
    size: "95 MB",
    essential: false,
    downloaded: false,
    description: "Interactive tour of Sera Monastery with monk debate areas",
    lastUpdated: "2024-01-13"
  },
  {
    id: "regional-maps",
    name: "Regional Tibet Maps",
    type: "map",
    size: "45 MB",
    essential: false,
    downloaded: false,
    description: "Extended maps covering major monastery regions across Tibet",
    lastUpdated: "2024-01-11"
  },
  {
    id: "taxi-contacts",
    name: "Local Transport Contacts",
    type: "emergency",
    size: "300 KB",
    essential: false,
    downloaded: false,
    description: "Taxi services and local transport options with contact numbers",
    lastUpdated: "2024-01-16"
  }
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case "map": return <Map className="h-5 w-5" />
    case "tour": return <Camera className="h-5 w-5" />
    case "guide": return <FileText className="h-5 w-5" />
    case "emergency": return <Phone className="h-5 w-5" />
    case "documents": return <FileText className="h-5 w-5" />
    default: return <Download className="h-5 w-5" />
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "map": return "bg-blue-100 text-blue-800"
    case "tour": return "bg-purple-100 text-purple-800"
    case "guide": return "bg-green-100 text-green-800"
    case "emergency": return "bg-red-100 text-red-800"
    case "documents": return "bg-amber-100 text-amber-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

export default function OfflinePage() {
  const { user } = useAuth()
  const { isOffline, isDataCached, cacheData, downloadForOffline, cacheProgress } = useOffline()
  const [content, setContent] = useState<OfflineContent[]>(offlineContent)
  const [downloading, setDownloading] = useState<string | null>(null)
  const [storageUsed, setStorageUsed] = useState(45) // MB
  const [storageLimit] = useState(500) // MB

  useEffect(() => {
    // In a real app, this would check actual downloaded content
    const savedContent = localStorage.getItem("offline-content-status")
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent)
        setContent(parsedContent)
      } catch (error) {
        console.error("Failed to parse saved content:", error)
      }
    }
  }, [])

  const handleDownload = async (contentId: string) => {
    setDownloading(contentId)
    
    try {
      await downloadForOffline(contentId)
      
      const updatedContent = content.map(item =>
        item.id === contentId ? { ...item, downloaded: true } : item
      )
      setContent(updatedContent)
      localStorage.setItem("offline-content-status", JSON.stringify(updatedContent))
      
      // Update storage usage
      const item = content.find(c => c.id === contentId)
      if (item) {
        const sizeInMB = parseFloat(item.size.replace(" MB", "").replace(" KB", ""))
        const actualSize = item.size.includes("KB") ? sizeInMB / 1000 : sizeInMB
        setStorageUsed(prev => prev + actualSize)
      }
      
    } catch (error) {
      console.error("Download failed:", error)
    } finally {
      setDownloading(null)
    }
  }

  const handleRemove = (contentId: string) => {
    const updatedContent = content.map(item =>
      item.id === contentId ? { ...item, downloaded: false } : item
    )
    setContent(updatedContent)
    localStorage.setItem("offline-content-status", JSON.stringify(updatedContent))
    
    // Update storage usage
    const item = content.find(c => c.id === contentId)
    if (item) {
      const sizeInMB = parseFloat(item.size.replace(" MB", "").replace(" KB", ""))
      const actualSize = item.size.includes("KB") ? sizeInMB / 1000 : sizeInMB
      setStorageUsed(prev => Math.max(0, prev - actualSize))
    }
  }

  const downloadEssentials = async () => {
    const essentialItems = content.filter(item => item.essential && !item.downloaded)
    
    for (const item of essentialItems) {
      await handleDownload(item.id)
    }
  }

  const essentialContent = content.filter(item => item.essential)
  const optionalContent = content.filter(item => !item.essential)
  const downloadedCount = content.filter(item => item.downloaded).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-amber-50/20">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
            {isOffline ? <WifiOff className="h-8 w-8 text-white" /> : <Wifi className="h-8 w-8 text-white" />}
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-cyan-800 to-blue-800 bg-clip-text text-transparent mb-2">
            Offline Mode
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Download monastery content for offline access during your spiritual journey
          </p>
        </div>

        {/* Connection Status */}
        <Card className={`mb-8 ${isOffline ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}`}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${isOffline ? "bg-red-500" : "bg-green-500"} rounded-full flex items-center justify-center`}>
                {isOffline ? <WifiOff className="h-6 w-6 text-white" /> : <Wifi className="h-6 w-6 text-white" />}
              </div>
              <div className="flex-1">
                <h3 className={`font-bold ${isOffline ? "text-red-800" : "text-green-800"} mb-1`}>
                  {isOffline ? "Offline Mode Active" : "Online - Ready to Download"}
                </h3>
                <p className={`text-sm ${isOffline ? "text-red-700" : "text-green-700"}`}>
                  {isOffline 
                    ? "Using cached content. Some features may be limited."
                    : "Download content now for offline access during your monastery visits."
                  }
                </p>
              </div>
              {!isOffline && (
                <Button onClick={downloadEssentials} className="bg-green-500 hover:bg-green-600">
                  <Download className="h-4 w-4 mr-2" />
                  Download Essentials
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Storage Usage */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5" />
              Storage Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Used Storage</span>
                  <span>{storageUsed.toFixed(1)} MB / {storageLimit} MB</span>
                </div>
                <Progress value={(storageUsed / storageLimit) * 100} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{downloadedCount}</div>
                  <div className="text-sm text-slate-600">Downloaded</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{essentialContent.filter(c => c.downloaded).length}</div>
                  <div className="text-sm text-slate-600">Essential Ready</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{storageUsed.toFixed(0)} MB</div>
                  <div className="text-sm text-slate-600">Space Used</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-600">{(storageLimit - storageUsed).toFixed(0)} MB</div>
                  <div className="text-sm text-slate-600">Available</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cache Progress */}
        {cacheProgress > 0 && cacheProgress < 100 && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Download className="h-6 w-6 text-blue-500 animate-bounce" />
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Caching Content...</span>
                    <span className="text-sm text-slate-600">{cacheProgress}%</span>
                  </div>
                  <Progress value={cacheProgress} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Content Tabs */}
        <Tabs defaultValue="essential" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm mb-6">
            <TabsTrigger value="essential">
              🔥 Essential Content ({essentialContent.length})
            </TabsTrigger>
            <TabsTrigger value="optional">
              ⭐ Optional Content ({optionalContent.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="essential">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {essentialContent.map((item) => (
                <Card key={item.id} className="border-l-4 border-l-red-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                          {getTypeIcon(item.type)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getTypeColor(item.type)}>
                              {item.type}
                            </Badge>
                            <Badge variant="destructive" className="text-xs">
                              Essential
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-slate-700">{item.description}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <HardDrive className="h-4 w-4 text-slate-500" />
                          <span>{item.size}</span>
                        </div>
                        {item.lastUpdated && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-slate-500" />
                            <span className="text-xs text-slate-500">{item.lastUpdated}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 pt-2">
                        {item.downloaded ? (
                          <>
                            <Button size="sm" variant="outline" className="flex-1" disabled>
                              <Check className="h-4 w-4 mr-2 text-green-500" />
                              Downloaded
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleRemove(item.id)}
                            >
                              Remove
                            </Button>
                          </>
                        ) : (
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleDownload(item.id)}
                            disabled={downloading === item.id}
                          >
                            {downloading === item.id ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                                Downloading...
                              </>
                            ) : (
                              <>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="optional">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {optionalContent.map((item) => (
                <Card key={item.id} className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                          {getTypeIcon(item.type)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getTypeColor(item.type)}>
                              {item.type}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              Optional
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-slate-700">{item.description}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <HardDrive className="h-4 w-4 text-slate-500" />
                          <span>{item.size}</span>
                        </div>
                        {item.lastUpdated && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-slate-500" />
                            <span className="text-xs text-slate-500">{item.lastUpdated}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 pt-2">
                        {item.downloaded ? (
                          <>
                            <Button size="sm" variant="outline" className="flex-1" disabled>
                              <Check className="h-4 w-4 mr-2 text-green-500" />
                              Downloaded
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleRemove(item.id)}
                            >
                              Remove
                            </Button>
                          </>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleDownload(item.id)}
                            disabled={downloading === item.id}
                          >
                            {downloading === item.id ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-600 border-t-transparent mr-2" />
                                Downloading...
                              </>
                            ) : (
                              <>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Offline Tips */}
        <Card className="mt-8 bg-gradient-to-r from-cyan-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5 text-cyan-500" />
              Offline Mode Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">📱 Before Going Offline</h4>
                <ul className="space-y-1 text-slate-600">
                  <li>• Download essential content first</li>
                  <li>• Ensure device is fully charged</li>
                  <li>• Save emergency contacts</li>
                  <li>• Cache important monastery locations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🔋 Power Management</h4>
                <ul className="space-y-1 text-slate-600">
                  <li>• Use airplane mode to save battery</li>
                  <li>• Bring portable chargers</li>
                  <li>• Close unused apps</li>
                  <li>• Use offline maps instead of GPS</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📍 Navigation</h4>
                <ul className="space-y-1 text-slate-600">
                  <li>• Download offline maps before arrival</li>
                  <li>• Note landmark references</li>
                  <li>• Save monastery addresses</li>
                  <li>• Use compass for basic direction</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🆘 Emergency Preparedness</h4>
                <ul className="space-y-1 text-slate-600">
                  <li>• Save emergency numbers locally</li>
                  <li>• Download translator apps</li>
                  <li>• Keep physical backup contacts</li>
                  <li>• Know nearest hospital locations</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}