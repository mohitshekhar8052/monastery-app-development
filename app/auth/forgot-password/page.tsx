"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, ArrowLeft, Mail, Send, CheckCircle, Sparkles, Shield, Clock } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate email sending
    setTimeout(() => {
      setIsLoading(false)
      setIsEmailSent(true)
    }, 2000)
  }

  const handleResendEmail = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/peaceful-monk-avatar.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background/95"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
      </div>

      {/* Floating Elements */}
      {mounted && (
        <>
          <div className="absolute top-10 left-10 opacity-30 animate-float">
            <Shield className="h-6 w-6 text-primary/60" />
          </div>
          <div className="absolute top-20 right-20 opacity-30 animate-float-delayed">
            <Mail className="h-8 w-8 text-accent/60" />
          </div>
          <div className="absolute bottom-20 left-20 opacity-30 animate-float-slow">
            <Sparkles className="h-5 w-5 text-primary/60" />
          </div>
          <div className="absolute bottom-10 right-10 opacity-30 animate-float">
            <Clock className="h-5 w-5 text-accent/60" />
          </div>
        </>
      )}

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Logo Section */}
          <div className="text-center mb-6 animate-fade-in-up">
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
                <span className="block text-xs text-muted-foreground font-medium">Password Recovery</span>
              </div>
            </Link>
          </div>

          <Card className="bg-card/95 backdrop-blur-lg border-border/50 shadow-xl animate-fade-in-up delay-200">
            <CardHeader className="text-center space-y-2 relative pb-4">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-3 py-1 text-xs shadow-sm">
                  {isEmailSent ? "Check Your Email 📧" : "Reset Password 🔐"}
                </Badge>
              </div>
              <CardTitle className="text-xl font-bold text-foreground pt-2">
                {isEmailSent ? "Reset Link Sent!" : "Forgot Password?"}
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm">
                {isEmailSent 
                  ? "We've sent a password reset link to your email address"
                  : "No worries! Enter your email and we'll send you reset instructions"
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {!isEmailSent ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-medium text-sm">Email Address</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your registered email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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

                  <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3 border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">What happens next?</span>
                    </div>
                    <ul className="text-xs space-y-1 ml-6">
                      <li>• You'll receive a secure reset link via email</li>
                      <li>• The link expires in 15 minutes for security</li>
                      <li>• Click the link to set a new password</li>
                    </ul>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 transition-all duration-300 hover:shadow-md disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        <span>Sending reset link...</span>
                        <Send className="h-4 w-4 animate-pulse" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        <span>Send Reset Link</span>
                      </div>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground">
                      If an account with <strong className="text-foreground">{email}</strong> exists, you'll receive an email shortly.
                    </div>
                    
                    <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-3 border border-border/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Didn't receive the email?</span>
                      </div>
                      <ul className="space-y-1 ml-6">
                        <li>• Check your spam/junk folder</li>
                        <li>• Make sure the email address is correct</li>
                        <li>• Wait a few minutes for delivery</li>
                      </ul>
                    </div>
                  </div>

                  <Button
                    onClick={handleResendEmail}
                    variant="outline"
                    className="w-full bg-background hover:bg-muted/50 border-border hover:border-border/80 transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
                        Resending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Resend Email
                      </div>
                    )}
                  </Button>
                </div>
              )}

              <div className="text-center pt-4 border-t border-border/60">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium hover:underline transition-colors duration-200"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Sign In
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Support Contact */}
          <div className="mt-4 text-center text-xs text-muted-foreground animate-fade-in-up delay-300">
            <div className="space-y-1">
              <div>Need help? Contact our support team</div>
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>Available 24/7</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  <span>Fast Response</span>
                </div>
              </div>
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