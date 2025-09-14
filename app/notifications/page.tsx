"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Calendar, MessageCircle, Heart, Settings, Check } from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "event",
    title: "Virtual Meditation Circle starting soon",
    message: "Your registered event starts in 30 minutes",
    time: "30 minutes ago",
    read: false,
    actionable: true,
  },
  {
    id: 2,
    type: "community",
    title: "New comment on your post",
    message: "Sarah Chen commented: 'Beautiful insights, thank you for sharing!'",
    time: "2 hours ago",
    read: false,
    actionable: true,
  },
  {
    id: 3,
    type: "system",
    title: "New monastery added",
    message: "Tashilhunpo Monastery virtual tour is now available",
    time: "1 day ago",
    read: true,
    actionable: false,
  },
  {
    id: 4,
    type: "achievement",
    title: "Achievement unlocked!",
    message: "You've completed your first meditation course",
    time: "2 days ago",
    read: true,
    actionable: false,
  },
]

const notificationSettings = [
  {
    id: "events",
    title: "Event Reminders",
    description: "Get notified about upcoming events you've registered for",
    enabled: true,
  },
  {
    id: "community",
    title: "Community Activity",
    description: "Notifications for comments, likes, and mentions",
    enabled: true,
  },
  {
    id: "content",
    title: "New Content",
    description: "Updates about new monasteries, tours, and archives",
    enabled: false,
  },
  {
    id: "achievements",
    title: "Achievements",
    description: "Celebrate your learning milestones and progress",
    enabled: true,
  },
  {
    id: "email",
    title: "Email Notifications",
    description: "Receive important updates via email",
    enabled: false,
  },
]

export default function NotificationsPage() {
  const [settings, setSettings] = useState(notificationSettings)
  const [notificationList, setNotificationList] = useState(notifications)

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "event":
        return <Calendar className="w-5 h-5 text-blue-500" />
      case "community":
        return <MessageCircle className="w-5 h-5 text-green-500" />
      case "system":
        return <Bell className="w-5 h-5 text-slate-500" />
      case "achievement":
        return <Heart className="w-5 h-5 text-yellow-500" />
      default:
        return <Bell className="w-5 h-5" />
    }
  }

  const markAsRead = (id: number) => {
    setNotificationList((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const unreadCount = notificationList.filter((n) => !n.read).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Notifications</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Stay updated with your spiritual journey and community activity
          </p>
        </div>

        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="notifications" className="relative">
              Notifications
              {unreadCount > 0 && <Badge className="ml-2 px-2 py-1 text-xs">{unreadCount}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
                <Check className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
            </div>

            <div className="space-y-4">
              {notificationList.map((notification) => (
                <Card
                  key={notification.id}
                  className={`${!notification.read ? "border-l-4 border-l-blue-500 bg-blue-50/30" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className={`font-medium ${!notification.read ? "text-slate-900" : "text-slate-700"}`}>
                              {notification.title}
                            </h3>
                            <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-slate-500 mt-2">{notification.time}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {!notification.read && (
                              <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                                <Check className="w-4 h-4" />
                              </Button>
                            )}
                            {notification.actionable && (
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose what notifications you'd like to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {settings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">{setting.title}</h4>
                      <p className="text-sm text-slate-600">{setting.description}</p>
                    </div>
                    <Switch
                      checked={setting.enabled}
                      onCheckedChange={(checked) => {
                        setSettings((prev) => prev.map((s) => (s.id === setting.id ? { ...s, enabled: checked } : s)))
                      }}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
