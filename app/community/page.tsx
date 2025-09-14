"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Share2, Users, Calendar } from "lucide-react"

const communityPosts = [
  {
    id: 1,
    author: "Sarah Chen",
    avatar: "/avatars/sarah.jpg",
    time: "2 hours ago",
    content:
      "Just completed my virtual tour of Potala Palace. The detail is incredible! The prayer wheels section brought tears to my eyes. 🙏",
    likes: 24,
    comments: 8,
    image: "/community/potala-tour.jpg",
  },
  {
    id: 2,
    author: "Michael Rodriguez",
    avatar: "/avatars/michael.jpg",
    time: "5 hours ago",
    content:
      "Planning a meditation retreat inspired by what I learned here. Anyone interested in joining a group session next weekend?",
    likes: 15,
    comments: 12,
    type: "event",
  },
  {
    id: 3,
    author: "Tenzin Norbu",
    avatar: "/avatars/tenzin.jpg",
    time: "1 day ago",
    content:
      "Thank you for preserving our cultural heritage digitally. As a Tibetan monk, seeing our monasteries accessible to the world fills my heart with joy.",
    likes: 89,
    comments: 23,
    verified: true,
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Virtual Meditation Circle",
    date: "Dec 15, 2024",
    time: "7:00 PM EST",
    participants: 45,
    location: "Online",
  },
  {
    id: 2,
    title: "Buddhist Philosophy Discussion",
    date: "Dec 18, 2024",
    time: "6:30 PM EST",
    participants: 28,
    location: "Online",
  },
]

export default function CommunityPage() {
  const [newPost, setNewPost] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Sacred Community</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Connect with fellow spiritual seekers and share your journey
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* New Post Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Share Your Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="What insights have you gained from your virtual monastery visits?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      📷 Photo
                    </Button>
                    <Button variant="outline" size="sm">
                      🎥 Video
                    </Button>
                  </div>
                  <Button>Share</Button>
                </div>
              </CardContent>
            </Card>

            {/* Community Posts */}
            {communityPosts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={post.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {post.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{post.author}</h3>
                        {post.verified && <Badge variant="secondary">Verified</Badge>}
                      </div>
                      <p className="text-sm text-slate-600">{post.time}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-700">{post.content}</p>
                  {post.image && (
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt="Post image"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex space-x-4">
                      <Button variant="ghost" size="sm" className="text-slate-600">
                        <Heart className="w-4 h-4 mr-1" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-slate-600">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.comments}
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="text-slate-600">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-sm">{event.title}</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      {event.date} at {event.time}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center text-xs text-slate-600">
                        <Users className="w-3 h-3 mr-1" />
                        {event.participants} joining
                      </div>
                      <Button size="sm" variant="outline">
                        Join
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Active Members</span>
                  <span className="font-semibold">2,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Posts This Week</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Virtual Tours Shared</span>
                  <span className="font-semibold">89</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
