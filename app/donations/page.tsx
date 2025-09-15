"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Heart, 
  DollarSign, 
  CreditCard, 
  Smartphone,
  Globe,
  Users,
  BookOpen,
  Building,
  Star,
  Check,
  Gift,
  Handshake,
  Target,
  TrendingUp,
  Shield
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useGamification } from "@/components/gamification-provider"

interface DonationOption {
  id: string
  amount: number
  title: string
  description: string
  impact: string
  popular?: boolean
}

interface MonasteryProject {
  id: string
  name: string
  monastery: string
  location: string
  goal: number
  raised: number
  contributors: number
  daysLeft: number
  image: string
  description: string
  urgency: "low" | "medium" | "high"
}

interface PaymentMethod {
  id: string
  name: string
  type: "card" | "paypal" | "upi" | "crypto"
  icon: string
  fees: string
  processing: string
}

const donationOptions: DonationOption[] = [
  {
    id: "butter-lamps",
    amount: 10,
    title: "Butter Lamps",
    description: "Light butter lamps for spiritual merit",
    impact: "Lights 10 butter lamps for prayer ceremonies"
  },
  {
    id: "monk-meal",
    amount: 25,
    title: "Monk's Meal",
    description: "Sponsor a meal for monastery residents",
    impact: "Provides one day of meals for 2 monks",
    popular: true
  },
  {
    id: "manuscript-preservation",
    amount: 50,
    title: "Manuscript Care",
    description: "Support ancient text preservation",
    impact: "Preserves 5 pages of ancient Buddhist manuscripts"
  },
  {
    id: "meditation-cushions",
    amount: 75,
    title: "Meditation Support",
    description: "Provide meditation cushions and supplies",
    impact: "Supplies meditation materials for 10 practitioners"
  },
  {
    id: "roof-repair",
    amount: 100,
    title: "Building Maintenance",
    description: "Help maintain monastery structures",
    impact: "Repairs 1 square meter of monastery roofing",
    popular: true
  },
  {
    id: "education-support",
    amount: 200,
    title: "Education Fund",
    description: "Support young monks' education",
    impact: "Sponsors one month of education for a young monk"
  }
]

const monasteryProjects: MonasteryProject[] = [
  {
    id: "potala-restoration",
    name: "Potala Palace Roof Restoration",
    monastery: "Potala Palace",
    location: "Lhasa, Tibet",
    goal: 50000,
    raised: 32500,
    contributors: 234,
    daysLeft: 45,
    image: "/monastery-golden-hour-mountain-backdrop.jpg",
    description: "Critical restoration work needed for the iconic golden roof of Potala Palace to preserve this UNESCO World Heritage site.",
    urgency: "high"
  },
  {
    id: "sera-library",
    name: "Digital Library Project",
    monastery: "Sera Monastery",
    location: "Lhasa, Tibet",
    goal: 25000,
    raised: 18750,
    contributors: 156,
    daysLeft: 60,
    image: "/ancient-buddhist-manuscript-kangyur-text.jpg",
    description: "Digitizing ancient manuscripts and texts to preserve Buddhist knowledge for future generations.",
    urgency: "medium"
  },
  {
    id: "hemis-festival",
    name: "Annual Festival Support",
    monastery: "Hemis Monastery",
    location: "Ladakh, India",
    goal: 15000,
    raised: 8200,
    contributors: 89,
    daysLeft: 30,
    image: "/hemis-festival-masked-dancers-colorful.jpg",
    description: "Support the annual Hemis Festival celebrating Buddhist culture and traditions.",
    urgency: "high"
  },
  {
    id: "young-monks-education",
    name: "Young Monks Education Program",
    monastery: "Drepung Monastery",
    location: "Lhasa, Tibet",
    goal: 35000,
    raised: 12250,
    contributors: 78,
    daysLeft: 90,
    image: "/monks-debating-courtyard-traditional-robes-animate.jpg",
    description: "Comprehensive education program including traditional Buddhist studies and modern subjects.",
    urgency: "low"
  }
]

const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    name: "Credit/Debit Card",
    type: "card",
    icon: "💳",
    fees: "2.9% + $0.30",
    processing: "Instant"
  },
  {
    id: "paypal",
    name: "PayPal",
    type: "paypal",
    icon: "🟦",
    fees: "2.9% + $0.30",
    processing: "Instant"
  },
  {
    id: "upi",
    name: "UPI (India)",
    type: "upi",
    icon: "📱",
    fees: "Free",
    processing: "Instant"
  },
  {
    id: "crypto",
    name: "Cryptocurrency",
    type: "crypto",
    icon: "₿",
    fees: "Network fees only",
    processing: "5-30 minutes"
  }
]

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case "high": return "bg-red-100 text-red-800 border-red-300"
    case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-300"
    case "low": return "bg-green-100 text-green-800 border-green-300"
    default: return "bg-gray-100 text-gray-800 border-gray-300"
  }
}

export default function DonationPage() {
  const { user } = useAuth()
  const { addXP, addCoins } = useGamification()
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [selectedPayment, setSelectedPayment] = useState<string>("card")
  const [donationMessage, setDonationMessage] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)

  const handleDonation = async (amount: number, projectId?: string) => {
    if (!user) {
      alert("Please sign in to make a donation")
      return
    }

    // In a real app, this would integrate with payment processors
    const donationData = {
      amount,
      projectId,
      paymentMethod: selectedPayment,
      message: donationMessage,
      anonymous: isAnonymous,
      userId: user.id
    }

    console.log("Processing donation:", donationData)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Award gamification points for donation
    addXP(amount * 2) // 2 XP per dollar
    addCoins(amount) // 1 coin per dollar
    
    alert(`Thank you for your ${amount > 0 ? '$' + amount : ''} donation! Your contribution makes a real difference.`)
    
    // Reset form
    setSelectedAmount(null)
    setCustomAmount("")
    setDonationMessage("")
  }

  const totalDonated = monasteryProjects.reduce((sum, project) => sum + project.raised, 0)
  const totalContributors = monasteryProjects.reduce((sum, project) => sum + project.contributors, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50/30 to-orange-50/20">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl mb-4 shadow-lg">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-pink-800 to-orange-800 bg-clip-text text-transparent mb-2">
            Support Sacred Monasteries
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Your contributions help preserve Buddhist heritage, support monks, and maintain sacred spaces
          </p>
        </div>

        {/* Impact Statistics */}
        <Card className="mb-8 bg-gradient-to-r from-pink-50 to-orange-50">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="flex items-center justify-center w-12 h-12 bg-pink-100 rounded-full mx-auto mb-2">
                  <DollarSign className="h-6 w-6 text-pink-600" />
                </div>
                <div className="text-2xl font-bold text-pink-800">${totalDonated.toLocaleString()}</div>
                <div className="text-sm text-pink-600">Total Raised</div>
              </div>
              <div>
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-2">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-orange-800">{totalContributors}</div>
                <div className="text-sm text-orange-600">Contributors</div>
              </div>
              <div>
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
                  <Building className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-800">{monasteryProjects.length}</div>
                <div className="text-sm text-purple-600">Active Projects</div>
              </div>
              <div>
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-800">87%</div>
                <div className="text-sm text-green-600">Avg. Goal Reached</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="quick" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm mb-6">
            <TabsTrigger value="quick">⚡ Quick Donation</TabsTrigger>
            <TabsTrigger value="projects">🏛️ Monastery Projects</TabsTrigger>
            <TabsTrigger value="monthly">💝 Monthly Support</TabsTrigger>
          </TabsList>

          <TabsContent value="quick">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Donation Options */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Choose Your Contribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      {donationOptions.map((option) => (
                        <Card 
                          key={option.id} 
                          className={`cursor-pointer transition-all ${
                            selectedAmount === option.amount 
                              ? "ring-2 ring-pink-500 bg-pink-50" 
                              : "hover:bg-slate-50"
                          } ${option.popular ? "border-pink-200" : ""}`}
                          onClick={() => setSelectedAmount(option.amount)}
                        >
                          {option.popular && (
                            <Badge className="absolute -top-2 -right-2 bg-pink-500">Popular</Badge>
                          )}
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-pink-600 mb-1">
                              ${option.amount}
                            </div>
                            <div className="font-medium text-sm mb-2">{option.title}</div>
                            <div className="text-xs text-slate-600 mb-2">{option.description}</div>
                            <div className="text-xs text-green-600 font-medium">{option.impact}</div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Custom Amount */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">Custom Amount</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value)
                            setSelectedAmount(null)
                          }}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">Message (Optional)</label>
                      <Textarea
                        placeholder="Share your thoughts or dedication..."
                        value={donationMessage}
                        onChange={(e) => setDonationMessage(e.target.value)}
                        rows={3}
                      />
                    </div>

                    {/* Anonymous Option */}
                    <div className="flex items-center gap-2 mb-6">
                      <input
                        type="checkbox"
                        id="anonymous"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded"
                      />
                      <label htmlFor="anonymous" className="text-sm">
                        Make this donation anonymous
                      </label>
                    </div>

                    <Button 
                      className="w-full bg-pink-500 hover:bg-pink-600"
                      onClick={() => {
                        const amount = selectedAmount || parseFloat(customAmount) || 0
                        if (amount > 0) {
                          handleDonation(amount)
                        }
                      }}
                      disabled={!selectedAmount && !customAmount}
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Donate ${selectedAmount || customAmount || 0}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Payment Methods */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {paymentMethods.map((method) => (
                        <Card
                          key={method.id}
                          className={`cursor-pointer transition-all ${
                            selectedPayment === method.id
                              ? "ring-2 ring-pink-500 bg-pink-50"
                              : "hover:bg-slate-50"
                          }`}
                          onClick={() => setSelectedPayment(method.id)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{method.icon}</span>
                              <div className="flex-1">
                                <div className="font-medium text-sm">{method.name}</div>
                                <div className="text-xs text-slate-600">
                                  Fees: {method.fees}
                                </div>
                                <div className="text-xs text-green-600">
                                  {method.processing}
                                </div>
                              </div>
                              {selectedPayment === method.id && (
                                <Check className="h-4 w-4 text-pink-500" />
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">Secure Donation</span>
                      </div>
                      <p className="text-xs text-blue-700">
                        All donations are processed securely. Your payment information is encrypted and never stored.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {monasteryProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <div className="relative aspect-[16/9]">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 right-3 flex justify-between">
                      <Badge className={getUrgencyColor(project.urgency)}>
                        {project.urgency} urgency
                      </Badge>
                      <Badge className="bg-black/70 text-white">
                        {project.daysLeft} days left
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="font-bold text-lg mb-2">{project.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                        <Building className="h-4 w-4" />
                        <span>{project.monastery}, {project.location}</span>
                      </div>
                      <p className="text-sm text-slate-700">{project.description}</p>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{Math.round((project.raised / project.goal) * 100)}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                        <div
                          className="bg-pink-500 h-2 rounded-full transition-all"
                          style={{ width: `${Math.min((project.raised / project.goal) * 100, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-slate-600">
                        <span>${project.raised.toLocaleString()} raised</span>
                        <span>Goal: ${project.goal.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Users className="h-4 w-4 text-slate-500" />
                        <span>{project.contributors} contributors</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span>${(project.goal - project.raised).toLocaleString()} to go</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full"
                      onClick={() => handleDonation(0, project.id)}
                    >
                      <Gift className="h-4 w-4 mr-2" />
                      Support This Project
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="monthly">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Handshake className="h-5 w-5" />
                    Monthly Monastery Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-6">
                    Join our community of regular supporters and make a lasting impact on monastery preservation and Buddhist education.
                  </p>

                  <div className="space-y-4">
                    {[
                      { amount: 15, title: "Daily Butter Lamps", desc: "Keep sacred flames burning daily" },
                      { amount: 25, title: "Monk Support", desc: "Help provide meals and basic needs" },
                      { amount: 50, title: "Education Fund", desc: "Support young monks' education" },
                      { amount: 100, title: "Preservation Partner", desc: "Major support for conservation projects" }
                    ].map((plan) => (
                      <Card key={plan.amount} className="cursor-pointer hover:bg-slate-50">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold">${plan.amount}/month</div>
                              <div className="text-sm text-slate-600">{plan.title}</div>
                              <div className="text-xs text-slate-500">{plan.desc}</div>
                            </div>
                            <Button size="sm">Choose</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Monthly Supporter Benefits:</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Exclusive updates from monasteries</li>
                      <li>• Priority booking for special events</li>
                      <li>• Monthly meditation guidance</li>
                      <li>• Tax-deductible receipts</li>
                      <li>• Special supporter badge</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Our Promise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">100% Transparent</h4>
                        <p className="text-sm text-slate-600">
                          Every donation is tracked and reported. You'll receive updates on exactly how your contribution is used.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Shield className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Secure & Trusted</h4>
                        <p className="text-sm text-slate-600">
                          Bank-level security with encrypted transactions. Cancel anytime with one click.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Heart className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Direct Impact</h4>
                        <p className="text-sm text-slate-600">
                          Your donations go directly to monasteries and approved projects, with minimal administrative costs.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Star className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Tax Deductible</h4>
                        <p className="text-sm text-slate-600">
                          All donations are tax-deductible. You'll receive proper documentation for your records.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-amber-50 rounded-lg text-center">
                    <BookOpen className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-sm text-amber-800">
                      <strong>95%</strong> of donations go directly to monastery projects
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}