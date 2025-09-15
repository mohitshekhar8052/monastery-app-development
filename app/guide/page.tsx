"use client"

import { useState, useRef, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Lightbulb, BookOpen, Heart, MapPin } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useGamification } from "@/components/gamification-provider"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  category?: "ritual" | "culture" | "meditation" | "general"
}

const quickQuestions = [
  {
    icon: "🙏",
    text: "How do I show respect in a monastery?",
    category: "ritual" as const,
  },
  {
    icon: "🧘",
    text: "Teach me basic meditation techniques",
    category: "meditation" as const,
  },
  {
    icon: "📿",
    text: "What do prayer beads symbolize?",
    category: "culture" as const,
  },
  {
    icon: "🏛️",
    text: "Tell me about monastery architecture",
    category: "culture" as const,
  },
  {
    icon: "🕉️",
    text: "Explain Buddhist philosophy basics",
    category: "general" as const,
  },
  {
    icon: "🎭",
    text: "What are monastery festivals like?",
    category: "culture" as const,
  },
]

const aiResponses = {
  greeting: "🙏 Namaste! I am your AI Monk Guide. I'm here to help you understand monastery culture, rituals, meditation practices, and spiritual wisdom. How may I assist you on your spiritual journey today?",
  
  ritual: [
    "When entering a monastery, always remove your shoes and dress modestly. Speak softly, turn off electronic devices, and follow the guidance of monks. Never point your feet toward Buddha statues or sacred objects.",
    "Prayer wheels should be turned clockwise while reciting mantras. Each turn is believed to have the same spiritual benefit as reciting the prayers written inside the wheel.",
    "During prayer ceremonies, maintain silence and observe respectfully. If you wish to participate, follow the lead of others and join in meditation or chanting if invited."
  ],
  
  meditation: [
    "Begin with simple breathing meditation: Sit comfortably, close your eyes, and focus on your natural breath. When your mind wanders, gently return attention to breathing. Start with 5-10 minutes daily.",
    "The lotus position represents spiritual awakening. If uncomfortable, sitting on a chair is perfectly acceptable. The key is maintaining an alert, upright posture while remaining relaxed.",
    "Mindfulness meditation involves observing thoughts without judgment. Like clouds passing in the sky, let thoughts come and go while maintaining awareness of the present moment."
  ],
  
  culture: [
    "Prayer flags carry mantras and prayers that spread compassion and wisdom through the wind. The five colors represent the five elements: blue (space), white (air), red (fire), green (water), and yellow (earth).",
    "Monastery architecture follows sacred geometry. The main hall (dukhang) represents the universe, while stupas symbolize the enlightened mind. Every element has spiritual significance.",
    "Buddhist festivals like Vesak celebrate Buddha's birth, enlightenment, and death. These occasions feature special prayers, offerings, and community gatherings that strengthen spiritual bonds."
  ],
  
  general: [
    "Buddhism teaches the Four Noble Truths: life contains suffering, suffering arises from attachment, suffering can end, and the Eightfold Path leads to liberation from suffering.",
    "The concept of karma means that actions have consequences. Good intentions and actions create positive karma, while harmful actions create negative karma that affects future experiences.",
    "Compassion (karuna) and wisdom (prajna) are the two wings of enlightenment. Like a bird needs both wings to fly, spiritual development requires both understanding and loving-kindness."
  ]
}

export default function AIGuidePage() {
  const { user } = useAuth()
  const { addXP, addCoins } = useGamification()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize with greeting message
    const greeting: Message = {
      id: "greeting",
      type: "ai",
      content: aiResponses.greeting,
      timestamp: new Date(),
      category: "general"
    }
    setMessages([greeting])
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const generateAIResponse = (userMessage: string, category?: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes("respect") || lowerMessage.includes("etiquette") || lowerMessage.includes("behavior")) {
      return aiResponses.ritual[0]
    }
    if (lowerMessage.includes("prayer wheel") || lowerMessage.includes("wheel")) {
      return aiResponses.ritual[1]
    }
    if (lowerMessage.includes("ceremony") || lowerMessage.includes("service")) {
      return aiResponses.ritual[2]
    }
    if (lowerMessage.includes("meditation") || lowerMessage.includes("breathe") || lowerMessage.includes("mindfulness")) {
      const responses = aiResponses.meditation
      return responses[Math.floor(Math.random() * responses.length)]
    }
    if (lowerMessage.includes("prayer flag") || lowerMessage.includes("flag")) {
      return aiResponses.culture[0]
    }
    if (lowerMessage.includes("architecture") || lowerMessage.includes("building") || lowerMessage.includes("design")) {
      return aiResponses.culture[1]
    }
    if (lowerMessage.includes("festival") || lowerMessage.includes("celebration") || lowerMessage.includes("vesak")) {
      return aiResponses.culture[2]
    }
    if (lowerMessage.includes("philosophy") || lowerMessage.includes("teaching") || lowerMessage.includes("truth")) {
      return aiResponses.general[0]
    }
    if (lowerMessage.includes("karma") || lowerMessage.includes("action") || lowerMessage.includes("consequence")) {
      return aiResponses.general[1]
    }
    if (lowerMessage.includes("compassion") || lowerMessage.includes("wisdom") || lowerMessage.includes("enlightenment")) {
      return aiResponses.general[2]
    }
    
    // Default responses based on category
    if (category) {
      const responses = aiResponses[category as keyof typeof aiResponses]
      if (Array.isArray(responses)) {
        return responses[Math.floor(Math.random() * responses.length)]
      }
    }
    
    return "🙏 That's a wonderful question about spiritual practice. Buddhist teachings emphasize mindfulness, compassion, and wisdom in all aspects of life. Each monastery has its own traditions, but the core principles remain universal. Would you like me to elaborate on any specific aspect of monastery life or Buddhist practice?"
  }

  const handleSendMessage = async (text: string, category?: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: text,
      timestamp: new Date(),
      category: category as any
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: generateAIResponse(text, category),
        timestamp: new Date(),
        category: category as any
      }

      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)

      // Award XP and coins for interaction
      if (user) {
        addXP(10)
        addCoins(5)
      }
    }, 1500)
  }

  const handleQuickQuestion = (question: any) => {
    handleSendMessage(question.text, question.category)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-amber-50/20">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl mb-4 shadow-lg">
            <Bot className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-2">
            AI Monk Guide
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Your personal spiritual guide for monastery wisdom, rituals, and Buddhist teachings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Quick Questions Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  Quick Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left p-3 h-auto"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      <span className="mr-2">{question.icon}</span>
                      <span className="text-xs">{question.text}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">AI Monk Guide</h3>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-slate-600">Online</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700">
                    Spiritual Guide
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-full p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.type === "ai" && (
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                        )}
                        
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                            message.type === "user"
                              ? "bg-primary text-primary-foreground ml-auto"
                              : "bg-slate-100 text-slate-900"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {message.category && (
                              <Badge variant="secondary" className="text-xs ml-2">
                                {message.category}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {message.type === "user" && (
                          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex gap-3 justify-start">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-slate-100 rounded-2xl px-4 py-3">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>
              </CardContent>

              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about monastery culture, rituals, meditation..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage(inputValue)
                      }
                    }}
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={!inputValue.trim() || isTyping}
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-600">
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    <span>Ask respectfully</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    <span>Learn about traditions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>Discover monastery wisdom</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}