"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, MapPin, ArrowRight, Sparkles, Mountain, User, Mail, Lock, Star } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    setTimeout(() => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: 1,
          name: "Sacred Traveler",
          email: formData.email,
          role: "user",
          avatar: "/peaceful-monk-avatar.jpg",
        }),
      )
      setIsLoading(false)
      router.push("/")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side Design */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/monks-chanting-prayer-ritual-monastery.jpg')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-purple-600/70 to-indigo-700/80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        </div>

        {/* Floating Elements */}
        {mounted && (
          <>
            <div className="absolute top-20 left-20 opacity-40 animate-float">
              <Sparkles className="h-8 w-8 text-white/80" />
            </div>
            <div className="absolute top-40 right-20 opacity-40 animate-float-delayed">
              <Mountain className="h-10 w-10 text-amber-300/80" />
            </div>
            <div className="absolute bottom-32 left-16 opacity-40 animate-float-slow">
              <Star className="h-6 w-6 text-white/80" />
            </div>
            <div className="absolute top-1/3 left-1/4 opacity-30 animate-float">
              <div className="w-3 h-3 bg-white/60 rounded-full"></div>
            </div>
            <div className="absolute top-2/3 right-1/3 opacity-30 animate-float-delayed">
              <div className="w-2 h-2 bg-amber-300/60 rounded-full"></div>
            </div>
          </>
        )}

        {/* Main Content */}
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          <div className="max-w-md text-center">
            {/* Logo */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
                <MapPin className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Sacred Journeys
              </h1>
              <p className="text-white/90 text-lg">Spiritual Discovery Platform</p>
            </div>

            {/* Features */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-2xl">🏛️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">2,500+ Sacred Sites</h3>
                  <p className="text-white/80 text-sm">Explore monasteries worldwide</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">AI Spiritual Guide</h3>
                  <p className="text-white/80 text-sm">Personalized wisdom & guidance</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-2xl">🌏</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Virtual Reality Tours</h3>
                  <p className="text-white/80 text-sm">Immersive 360° experiences</p>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="relative">
              <div className="absolute -top-2 -left-2 text-4xl text-white/30">"</div>
              <blockquote className="text-white/90 italic text-lg leading-relaxed">
                The path to enlightenment begins with a single step into the sacred.
              </blockquote>
              <div className="absolute -bottom-6 -right-2 text-4xl text-white/30 rotate-180">"</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
        {/* Background for mobile */}
        <div className="lg:hidden absolute inset-0">
          <div className="absolute inset-0 bg-[url('/monks-chanting-prayer-ritual-monastery.jpg')] bg-cover bg-center opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/98 to-background/95"></div>
        </div>

        {/* Mobile Floating Elements */}
        {mounted && (
          <>
            <div className="lg:hidden absolute top-10 left-10 opacity-20 animate-float">
              <Sparkles className="h-6 w-6 text-primary/60" />
            </div>
            <div className="lg:hidden absolute top-20 right-20 opacity-20 animate-float-delayed">
              <Mountain className="h-8 w-8 text-accent/60" />
            </div>
            <div className="lg:hidden absolute bottom-20 left-20 opacity-20 animate-float-slow">
              <Star className="h-5 w-5 text-primary/60" />
            </div>
          </>
        )}

        <div className="w-full max-w-md relative z-10">
          {/* Mobile Logo Section (only visible on mobile) */}
          <div className="lg:hidden text-center mb-6 animate-fade-in-up">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground transition-all duration-300 group-hover:scale-110 shadow-lg">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full animate-pulse"></div>
              </div>
              <div className="text-left">
                <span className="block text-xl font-bold text-foreground">
                  Sacred Journeys
                </span>
                <span className="block text-xs text-muted-foreground font-medium">Spiritual Discovery</span>
              </div>
            </Link>
          </div>

          <Card className="bg-card/95 backdrop-blur-lg border-border/50 shadow-xl animate-fade-in-up delay-200">
            <CardHeader className="text-center space-y-3 relative pb-6">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-3 py-1 text-xs shadow-sm">
                  Welcome Back 🙏
                </Badge>
              </div>
              <CardTitle className="text-xl font-bold text-foreground pt-4">
                Continue Your Journey
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm">
                Sign in to explore sacred places and find inner peace
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6 p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-foreground font-medium text-sm">Email Address</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`pl-10 bg-background border transition-all duration-300 ${
                        focusedField === 'email' 
                          ? 'border-primary shadow-sm ring-1 ring-primary/20' 
                          : 'border-border hover:border-border/80'
                      }`}
                    />
                    <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-300 ${
                      focusedField === 'email' ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="password" className="text-foreground font-medium text-sm">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`pl-10 pr-10 bg-background border transition-all duration-300 ${
                        focusedField === 'password' 
                          ? 'border-primary shadow-sm ring-1 ring-primary/20' 
                          : 'border-border hover:border-border/80'
                      }`}
                    />
                    <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-300 ${
                      focusedField === 'password' ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm pt-2">
                  <Link href="/auth/forgot-password" className="text-primary hover:text-primary/80 hover:underline transition-colors duration-200 font-medium">
                    Forgot password?
                  </Link>
                  <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                    Secure Login 🔒
                  </Badge>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 transition-all duration-300 hover:shadow-md disabled:opacity-50 mt-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Sign In</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/60" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-3 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="bg-background hover:bg-muted/50 border-border hover:border-border/80 transition-all duration-300 text-sm py-2.5">
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="bg-background hover:bg-muted/50 border-border hover:border-border/80 transition-all duration-300 text-sm py-2.5">
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </Button>
              </div>

              <div className="text-center text-sm pt-4">
                <span className="text-muted-foreground">New to Sacred Journeys? </span>
                <Link href="/auth/signup" className="text-primary hover:text-primary/80 font-medium hover:underline transition-colors duration-200">
                  Create account
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground animate-fade-in-up delay-300">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span>Secure & Encrypted</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              <span>Trusted by 15K+ Users</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(-2deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  )
}
