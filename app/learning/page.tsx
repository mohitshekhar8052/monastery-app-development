"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Award, Clock, Users, Star } from "lucide-react"

const courses = [
  {
    id: 1,
    title: "Introduction to Buddhist Philosophy",
    instructor: "Lama Tenzin",
    duration: "6 weeks",
    level: "Beginner",
    students: 1247,
    rating: 4.9,
    progress: 0,
    description:
      "Explore the fundamental teachings of Buddhism through interactive lessons and virtual monastery visits.",
    lessons: 24,
    image: "/courses/buddhist-philosophy.jpg",
  },
  {
    id: 2,
    title: "Tibetan Art and Architecture",
    instructor: "Dr. Sarah Williams",
    duration: "4 weeks",
    level: "Intermediate",
    students: 856,
    rating: 4.8,
    progress: 65,
    description: "Discover the rich artistic traditions of Tibetan monasteries through detailed virtual explorations.",
    lessons: 18,
    image: "/courses/tibetan-art.jpg",
  },
  {
    id: 3,
    title: "Meditation Practices Across Traditions",
    instructor: "Geshe Lobsang",
    duration: "8 weeks",
    level: "All Levels",
    students: 2103,
    rating: 4.9,
    progress: 30,
    description: "Learn various meditation techniques practiced in different Buddhist traditions.",
    lessons: 32,
    image: "/courses/meditation-practices.jpg",
  },
]

const achievements = [
  { id: 1, title: "First Virtual Tour", description: "Completed your first monastery tour", earned: true },
  { id: 2, title: "Philosophy Student", description: "Completed Introduction to Buddhist Philosophy", earned: true },
  { id: 3, title: "Art Enthusiast", description: "Explored 10 different monastery art collections", earned: false },
  { id: 4, title: "Community Member", description: "Made your first community post", earned: true },
  { id: 5, title: "Meditation Master", description: "Completed 30 meditation sessions", earned: false },
]

export default function LearningPage() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Sacred Learning Path</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Deepen your understanding through structured courses and interactive experiences
          </p>
        </div>

        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="progress">My Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-cyan-100 to-slate-100 rounded-t-lg"></div>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <Badge variant="secondary">{course.level}</Badge>
                    </div>
                    <CardDescription>By {course.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-slate-600">{course.description}</p>

                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {course.lessons} lessons
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-slate-600">
                        <Users className="w-4 h-4 mr-1" />
                        {course.students.toLocaleString()} students
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        {course.rating}
                      </div>
                    </div>

                    {course.progress > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} />
                      </div>
                    )}

                    <Button className="w-full">{course.progress > 0 ? "Continue Learning" : "Start Course"}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Courses Enrolled</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Courses Completed</span>
                    <span className="font-semibold">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Study Time</span>
                    <span className="font-semibold">24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Certificates Earned</span>
                    <span className="font-semibold">1</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Courses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {courses
                    .filter((c) => c.progress > 0)
                    .map((course) => (
                      <div key={course.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{course.title}</span>
                          <span className="text-sm text-slate-600">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} />
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`${achievement.earned ? "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200" : "opacity-60"}`}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${achievement.earned ? "bg-yellow-100" : "bg-slate-100"}`}
                    >
                      <Award className={`w-8 h-8 ${achievement.earned ? "text-yellow-600" : "text-slate-400"}`} />
                    </div>
                    <h3 className="font-semibold mb-2">{achievement.title}</h3>
                    <p className="text-sm text-slate-600">{achievement.description}</p>
                    {achievement.earned && (
                      <Badge className="mt-3" variant="secondary">
                        Earned
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
