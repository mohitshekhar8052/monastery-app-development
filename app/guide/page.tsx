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
  greeting: "🙏 Namaste and welcome! I am your AI Monk Guide, here to share the wisdom of centuries-old monastic traditions. Whether you seek to understand Buddhist teachings, monastery etiquette, meditation practices, or the rich cultural heritage of sacred spaces, I'm here to guide you with compassion and knowledge. What aspects of monastic life would you like to explore today?",
  
  ritual: [
    "When entering a monastery, always remove your shoes and dress modestly with covered shoulders and legs. Speak in whispers, silence your devices, and maintain a respectful posture. Never point your feet toward Buddha statues or sacred objects, as this is considered deeply disrespectful in Buddhist culture.",
    "Prayer wheels contain sacred mantras and should be turned clockwise while reciting 'Om Mani Padme Hum' or other appropriate mantras. Each turn is believed to have the same spiritual benefit as reciting all the prayers written inside. The practice cultivates merit and spreads compassion.",
    "During prayer ceremonies, maintain complete silence and observe with reverence. Sit cross-legged if comfortable, or in a chair if needed. Follow the lead of monks and practitioners. If invited to participate, join in meditation or chanting mindfully. Photography is usually prohibited during ceremonies.",
    "Offering ceremonies involve presenting items like flowers, incense, butter lamps, or food to Buddhist deities or teachers. Approach with both hands, bow slightly, and make your offering with sincere intention. The merit from giving is considered more important than the value of the gift.",
    "Prostrations are full-body bows expressing humility and respect. Place hands together at your heart, then forehead, throat, and heart again before lying flat and sliding hands forward. This practice purifies negative karma and develops humility."
  ],
  
  meditation: [
    "Begin with shamatha (calm abiding) meditation: Sit with straight spine, close eyes, and focus on natural breathing. When mind wanders, gently return to breath without judgment. Start with 5-10 minutes daily, gradually increasing duration as concentration develops.",
    "The lotus position represents the Buddha's awakening, but comfort is essential. Sit on a cushion with legs crossed, or use a chair with feet flat. The key is maintaining an alert, upright posture while remaining relaxed and stable throughout the session.",
    "Vipassana (insight) meditation involves observing thoughts, emotions, and sensations without attachment. Like watching clouds pass in the sky, notice mental phenomena arising and dissolving while maintaining present-moment awareness. This develops wisdom and understanding of impermanence.",
    "Loving-kindness meditation begins with sending love to yourself: 'May I be happy, may I be peaceful.' Then extend to loved ones, neutral people, difficult people, and all beings. This practice develops compassion and dissolves anger and hatred in the heart.",
    "Walking meditation combines mindfulness with gentle movement. Walk slowly, focusing on each step, the lifting and placing of feet, and the sensations of walking. This practice brings meditation into daily activities and is excellent for restless minds."
  ],
  
  culture: [
    "Prayer flags carry sacred mantras and prayers that spread compassion through the wind. The five colors represent elements: blue (space/sky), white (air/wind), red (fire), green (water), and yellow (earth). They're hung in high places to benefit all beings touched by the wind.",
    "Monastery architecture follows sacred geometry representing the universe. The main hall (dukhang) symbolizes cosmic order, while stupas represent the enlightened mind. Mandala patterns in floor plans reflect Buddhist cosmology, with the center representing ultimate reality.",
    "Buddhist festivals like Vesak celebrate Buddha's birth, enlightenment, and parinirvana. Devotees make offerings, participate in processions, and engage in generous giving. These occasions strengthen community bonds and provide opportunities for collective merit-making and spiritual reflection.",
    "Thangka paintings are sacred Buddhist art depicting deities, teachers, and mandalas. Created by skilled artists following precise iconographic rules, they serve as meditation aids and teaching tools. The creation process itself is considered a spiritual practice requiring purification and blessing.",
    "Monastic robes represent simplicity and renunciation. The three pieces (outer robe, upper robe, and undergarment) are sewn from discarded cloth, symbolizing non-attachment to material possessions. Different traditions wear varying colors, each with specific meaning and regulations."
  ],
  
  philosophy: [
    "The Four Noble Truths form Buddhism's foundation: life contains suffering (dukkha), suffering arises from craving and attachment (samudaya), suffering can cease (nirodha), and the Eightfold Path leads to liberation (magga). Understanding these truths is essential for spiritual progress.",
    "Karma means intentional action and its consequences. Positive intentions and actions create beneficial results, while harmful intentions lead to suffering. Karma operates across lifetimes, emphasizing personal responsibility for spiritual development and ethical conduct.",
    "The Three Jewels - Buddha (teacher), Dharma (teachings), and Sangha (community) - provide refuge and guidance. Taking refuge means committing to following Buddha's example, studying his teachings, and supporting the spiritual community in our journey toward enlightenment.",
    "Emptiness (sunyata) doesn't mean nothingness, but rather the absence of inherent, independent existence. All phenomena arise through interdependence and conditions. Understanding emptiness liberates us from grasping and attachment, leading to wisdom and compassion.",
    "Bodhicitta is the compassionate intention to attain enlightenment for the benefit of all beings. This motivation transforms ordinary actions into spiritual practice and is considered the heart of the Mahayana path. Cultivating bodhicitta develops unlimited love and compassion."
  ],
  
  general: [
    "Buddhist monasticism emphasizes the Three Trainings: ethical conduct (sila), mental concentration (samadhi), and wisdom (prajna). These form the complete path to liberation, with each supporting and strengthening the others in spiritual development.",
    "The Middle Way avoids extremes of indulgence and harsh asceticism. Buddha discovered this balanced approach after years of severe practices failed to bring enlightenment. It applies to all aspects of life, encouraging moderation and wisdom in our choices.",
    "Interdependence means all phenomena arise through causes and conditions rather than existing independently. Understanding this connection between all life develops compassion and reduces ego-grasping, leading to greater harmony with the world around us."
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
    
    // Enhanced keyword matching for rituals
    if (lowerMessage.includes("respect") || lowerMessage.includes("etiquette") || lowerMessage.includes("behavior") || lowerMessage.includes("enter") || lowerMessage.includes("visit")) {
      return aiResponses.ritual[0]
    }
    if (lowerMessage.includes("prayer wheel") || lowerMessage.includes("wheel") || lowerMessage.includes("turn") || lowerMessage.includes("mani")) {
      return aiResponses.ritual[1]
    }
    if (lowerMessage.includes("ceremony") || lowerMessage.includes("service") || lowerMessage.includes("ritual") || lowerMessage.includes("puja")) {
      return aiResponses.ritual[2]
    }
    if (lowerMessage.includes("offering") || lowerMessage.includes("gift") || lowerMessage.includes("donate") || lowerMessage.includes("merit")) {
      return aiResponses.ritual[3]
    }
    if (lowerMessage.includes("prostration") || lowerMessage.includes("bow") || lowerMessage.includes("humble")) {
      return aiResponses.ritual[4]
    }
    
    // Enhanced meditation keywords
    if (lowerMessage.includes("meditation") || lowerMessage.includes("breathe") || lowerMessage.includes("mindfulness") || lowerMessage.includes("shamatha")) {
      return aiResponses.meditation[0]
    }
    if (lowerMessage.includes("lotus") || lowerMessage.includes("position") || lowerMessage.includes("posture") || lowerMessage.includes("sit")) {
      return aiResponses.meditation[1]
    }
    if (lowerMessage.includes("vipassana") || lowerMessage.includes("insight") || lowerMessage.includes("thoughts") || lowerMessage.includes("awareness")) {
      return aiResponses.meditation[2]
    }
    if (lowerMessage.includes("loving") || lowerMessage.includes("kindness") || lowerMessage.includes("metta") || lowerMessage.includes("compassion")) {
      return aiResponses.meditation[3]
    }
    if (lowerMessage.includes("walking") || lowerMessage.includes("movement") || lowerMessage.includes("daily")) {
      return aiResponses.meditation[4]
    }
    
    // Enhanced culture keywords
    if (lowerMessage.includes("prayer flag") || lowerMessage.includes("flag") || lowerMessage.includes("colors") || lowerMessage.includes("wind")) {
      return aiResponses.culture[0]
    }
    if (lowerMessage.includes("architecture") || lowerMessage.includes("building") || lowerMessage.includes("design") || lowerMessage.includes("stupa") || lowerMessage.includes("mandala")) {
      return aiResponses.culture[1]
    }
    if (lowerMessage.includes("festival") || lowerMessage.includes("celebration") || lowerMessage.includes("vesak") || lowerMessage.includes("holiday")) {
      return aiResponses.culture[2]
    }
    if (lowerMessage.includes("thangka") || lowerMessage.includes("art") || lowerMessage.includes("painting") || lowerMessage.includes("deity")) {
      return aiResponses.culture[3]
    }
    if (lowerMessage.includes("robe") || lowerMessage.includes("cloth") || lowerMessage.includes("monk") || lowerMessage.includes("dress")) {
      return aiResponses.culture[4]
    }
    
    // Enhanced philosophy keywords
    if (lowerMessage.includes("philosophy") || lowerMessage.includes("teaching") || lowerMessage.includes("truth") || lowerMessage.includes("noble") || lowerMessage.includes("dukkha")) {
      return aiResponses.philosophy[0]
    }
    if (lowerMessage.includes("karma") || lowerMessage.includes("action") || lowerMessage.includes("consequence") || lowerMessage.includes("rebirth")) {
      return aiResponses.philosophy[1]
    }
    if (lowerMessage.includes("refuge") || lowerMessage.includes("jewel") || lowerMessage.includes("buddha") || lowerMessage.includes("dharma") || lowerMessage.includes("sangha")) {
      return aiResponses.philosophy[2]
    }
    if (lowerMessage.includes("emptiness") || lowerMessage.includes("sunyata") || lowerMessage.includes("interdepen") || lowerMessage.includes("exist")) {
      return aiResponses.philosophy[3]
    }
    if (lowerMessage.includes("bodhicitta") || lowerMessage.includes("enlightenment") || lowerMessage.includes("awakening") || lowerMessage.includes("mahayana")) {
      return aiResponses.philosophy[4]
    }
    
    // General responses for common topics
    if (lowerMessage.includes("training") || lowerMessage.includes("path") || lowerMessage.includes("practice") || lowerMessage.includes("monastic")) {
      return aiResponses.general[0]
    }
    if (lowerMessage.includes("middle") || lowerMessage.includes("balance") || lowerMessage.includes("extreme") || lowerMessage.includes("moderation")) {
      return aiResponses.general[1]
    }
    if (lowerMessage.includes("connect") || lowerMessage.includes("dependent") || lowerMessage.includes("relation") || lowerMessage.includes("together")) {
      return aiResponses.general[2]
    }
    
    // Category-based fallback responses
    if (category) {
      const responses = aiResponses[category as keyof typeof aiResponses]
      if (Array.isArray(responses)) {
        return responses[Math.floor(Math.random() * responses.length)]
      }
    }
    
    // Default response with encouragement for deeper questions
    const encouragingResponses = [
      "🙏 What a thoughtful question about the spiritual path! Buddhist wisdom teaches us that every sincere question opens the door to deeper understanding. The monastery traditions offer profound insights into living with mindfulness, compassion, and wisdom. Which specific aspect would you like to explore more deeply?",
      "✨ Your curiosity about spiritual practice is wonderful! In monastery life, we learn that questioning itself is part of the journey toward wisdom. Whether you're interested in meditation techniques, cultural traditions, or philosophical teachings, I'm here to guide you with patience and understanding.",
      "🧘 Every question about dharma is precious, as it shows your sincere interest in spiritual growth. Monastery wisdom has been preserved for over 2,500 years, offering countless insights for modern life. Would you like to explore meditation practices, cultural ceremonies, or perhaps the philosophical foundations of Buddhist teaching?"
    ]
    
    return encouragingResponses[Math.floor(Math.random() * encouragingResponses.length)]
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
                      className="w-full justify-start text-left p-3 h-auto whitespace-normal break-words"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      <span className="mr-2 flex-shrink-0">{question.icon}</span>
                      <span className="text-xs leading-relaxed">{question.text}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[700px] flex flex-col shadow-lg">
              <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-indigo-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-md">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">AI Monk Guide</h3>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-slate-600">Online & Ready to Help</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    🧘 Spiritual Guide
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="flex-1 p-0 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="p-4 space-y-4 min-h-full">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 items-start ${message.type === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}
                      >
                        {message.type === "ai" && (
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                        )}
                        
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                            message.type === "user"
                              ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground ml-auto"
                              : "bg-gradient-to-r from-slate-50 to-slate-100 text-slate-900 border border-slate-200"
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {message.category && (
                              <Badge variant="secondary" className="text-xs ml-2 capitalize">
                                {message.category}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {message.type === "user" && (
                          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                            <User className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex gap-3 justify-start items-start animate-fade-in-up">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-md">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl px-4 py-3 border border-slate-200 shadow-sm">
                          <div className="flex gap-1 items-center">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                            <span className="ml-2 text-xs text-slate-600">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              <div className="border-t bg-gradient-to-r from-slate-50/50 to-purple-50/30 p-4">
                <div className="flex gap-3">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about monastery culture, rituals, meditation practices..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage(inputValue)
                      }
                    }}
                    className="flex-1 border-slate-200 focus:border-purple-300 focus:ring-purple-200"
                    disabled={isTyping}
                  />
                  <Button 
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={!inputValue.trim() || isTyping}
                    size="icon"
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-md"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-center gap-6 mt-3 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3 text-red-400" />
                    <span>Ask with respect</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3 text-blue-400" />
                    <span>Learn traditions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-green-400" />
                    <span>Discover wisdom</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
      
      <style jsx>{`
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
        
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
        
        @keyframes pulse-gentle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        .animate-pulse {
          animation: pulse-gentle 2s infinite;
        }
      `}</style>
    </div>
  )
}