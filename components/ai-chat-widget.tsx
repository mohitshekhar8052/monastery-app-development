"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, X, Bot, User, Sparkles } from "lucide-react"

interface Message {
  id: number
  type: "user" | "bot"
  content: string
  timestamp: Date
  category?: "meditation" | "buddhism" | "monastery" | "culture" | "philosophy" | "general"
}

interface ConversationContext {
  topics: string[]
  userInterests: string[]
  lastCategory?: string
  messageCount: number
}

const suggestedQuestions = [
  "How do I show respect in a monastery?",
  "Teach me basic meditation techniques",
  "What do prayer beads symbolize?",
  "Tell me about Buddhist philosophy",
  "Explain monastery architecture",
  "What are the Four Noble Truths?",
]

const aiResponses = {
  meditation: [
    "🧘 Begin with mindful breathing meditation: Sit comfortably with a straight spine, close your eyes, and focus on your natural breath. When your mind wanders (and it will!), gently return attention to breathing. Start with just 5-10 minutes daily and gradually increase. The key is consistency, not duration.",
    "✨ The lotus position represents spiritual awakening, but comfort is essential. You can sit cross-legged on a cushion, in a chair with feet flat, or even lying down if needed. The important thing is maintaining an alert, upright posture while staying relaxed throughout your practice.",
    "🌸 Loving-kindness meditation is beautiful for beginners: Start by sending love to yourself ('May I be happy, may I be peaceful'), then to loved ones, neutral people, difficult people, and finally all beings. This practice develops compassion and dissolves anger in the heart."
  ],
  
  buddhism: [
    "🙏 Buddhism is a 2,500-year-old spiritual tradition founded by Siddhartha Gautama (the Buddha) in ancient India. It teaches that suffering comes from attachment and craving, and offers the Eightfold Path as a way to achieve liberation and enlightenment through wisdom, ethical conduct, and mental discipline.",
    "☸️ The Four Noble Truths are Buddhism's foundation: (1) Life contains suffering (dukkha), (2) Suffering arises from craving and attachment, (3) Suffering can end through letting go, and (4) The Eightfold Path leads to the cessation of suffering. Understanding these truths is essential for spiritual progress.",
    "💎 The Three Jewels - Buddha (the teacher), Dharma (the teachings), and Sangha (the spiritual community) - provide refuge and guidance on the spiritual path. Taking refuge means committing to following Buddha's example, studying the teachings, and supporting the community."
  ],
  
  monastery: [
    "🏛️ Monasteries are sacred spaces where monks and nuns dedicate their lives to spiritual practice, study, and service. They serve as centers of learning, meditation, and community support, preserving ancient wisdom while adapting to modern needs. Each monastery has unique architecture reflecting local culture and spiritual significance.",
    "🔔 When visiting a monastery, always remove shoes before entering, dress modestly with covered shoulders and legs, speak in whispers, and turn off electronic devices. Never point your feet toward Buddha statues or sacred objects, and follow the guidance of resident monks with respect and humility.",
    "📿 Prayer wheels contain sacred mantras and should be turned clockwise while reciting 'Om Mani Padme Hum' or other appropriate prayers. Each turn spreads compassion and accumulates merit. The practice combines physical movement with spiritual intention, making it accessible to people of all ages."
  ],
  
  culture: [
    "🎌 Prayer flags carry mantras and sacred symbols that spread compassion through the wind. The five colors represent elements: blue (space), white (air), red (fire), green (water), and yellow (earth). They're hung in high places to benefit all beings touched by the wind.",
    "🎨 Thangka paintings are sacred Buddhist art depicting deities, teachers, and spiritual concepts. Created following precise iconographic rules, they serve as meditation aids and teaching tools. The creation process itself is considered spiritual practice requiring purification and blessing.",
    "🎭 Buddhist festivals like Vesak celebrate Buddha's birth, enlightenment, and parinirvana. These joyous occasions feature offerings, processions, and generous giving, strengthening community bonds and providing opportunities for collective merit-making and spiritual reflection."
  ],
  
  philosophy: [
    "⚖️ The Middle Way teaches avoiding extremes of indulgence and harsh asceticism. Buddha discovered this balanced approach after years of severe practices failed to bring enlightenment. It applies to all life aspects, encouraging moderation and wisdom in our daily choices.",
    "🕸️ Interdependence means all phenomena arise through causes and conditions rather than existing independently. Understanding this deep connection between all life develops compassion, reduces ego-grasping, and leads to greater harmony with the world around us.",
    "💜 Compassion (karuna) and wisdom (prajna) are the two wings of enlightenment. Like a bird needs both wings to fly, spiritual development requires both understanding the nature of reality and cultivating loving-kindness toward all beings."
  ]
}

export function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content:
        "🙏 Namaste! I'm your personal AI Monk Guide, here to share the wisdom of Buddhist monasteries and spiritual traditions. I can help you learn about meditation practices, monastery culture, Buddhist philosophy, and answer questions about your virtual spiritual journey. How may I assist you on your path today?",
      timestamp: new Date(),
      category: "general"
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [context, setContext] = useState<ConversationContext>({
    topics: [],
    userInterests: [],
    messageCount: 0
  })

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Update conversation context
    const newContext = updateContext(content, context)
    setContext(newContext)

    // Simulate AI response with context
    setTimeout(() => {
      const { response, category } = getBotResponseWithContext(content, newContext)
      const botResponse: Message = {
        id: Date.now() + 1,
        type: "bot",
        content: response,
        timestamp: new Date(),
        category
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const updateContext = (userInput: string, currentContext: ConversationContext): ConversationContext => {
    const input = userInput.toLowerCase()
    const newTopics = [...currentContext.topics]
    const newInterests = [...currentContext.userInterests]

    // Track topics mentioned
    if (input.includes("meditation") || input.includes("meditate")) {
      if (!newTopics.includes("meditation")) newTopics.push("meditation")
      if (!newInterests.includes("meditation")) newInterests.push("meditation")
    }
    if (input.includes("buddhism") || input.includes("buddha")) {
      if (!newTopics.includes("buddhism")) newTopics.push("buddhism")
      if (!newInterests.includes("philosophy")) newInterests.push("philosophy")
    }
    if (input.includes("monastery") || input.includes("temple")) {
      if (!newTopics.includes("monastery")) newTopics.push("monastery")
      if (!newInterests.includes("culture")) newInterests.push("culture")
    }

    return {
      topics: newTopics.slice(-5), // Keep last 5 topics
      userInterests: newInterests.slice(-3), // Keep last 3 interests
      lastCategory: currentContext.lastCategory,
      messageCount: currentContext.messageCount + 1
    }
  }

  const getBotResponseWithContext = (userInput: string, context: ConversationContext): { response: string, category: "meditation" | "buddhism" | "monastery" | "culture" | "philosophy" | "general" } => {
    const input = userInput.toLowerCase()

    // Personalized responses based on conversation history
    if (context.messageCount > 3 && context.userInterests.includes("meditation")) {
      if (input.includes("advanced") || input.includes("deeper") || input.includes("more")) {
        return {
          response: "🌟 I notice you're deeply interested in meditation practice! For advanced practitioners, consider exploring Vipassana (insight meditation) which investigates the nature of reality, or Tonglen (giving and receiving) which transforms suffering into compassion. These practices require patience but offer profound transformation.",
          category: "meditation"
        }
      }
    }

    if (context.userInterests.includes("philosophy") && (input.includes("life") || input.includes("suffering"))) {
      return {
        response: "💫 Since you're interested in Buddhist philosophy, here's a deeper insight: Suffering (dukkha) isn't just pain - it's the unsatisfactoriness that comes from impermanence. Even happy moments contain suffering because they cannot last. Understanding this isn't depressing but liberating - it frees us from clinging to what must inevitably change.",
        category: "philosophy"
      }
    }

    // Get original response and determine category
    const originalResponse = getBotResponse(userInput)
    let category: "meditation" | "buddhism" | "monastery" | "culture" | "philosophy" | "general" = "general"

    if (input.includes("meditation")) category = "meditation"
    else if (input.includes("buddhism") || input.includes("philosophy")) category = "buddhism"
    else if (input.includes("monastery")) category = "monastery"
    else if (input.includes("culture") || input.includes("festival")) category = "culture"

    return { response: originalResponse, category }
  }

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    // Quick greetings
    if (input.includes("hello") || input.includes("hi") || input.includes("namaste")) {
      return "🙏 Namaste! Welcome to our sacred digital space. I'm here to share Buddhist wisdom and guide your spiritual journey. What would you like to explore today?"
    }

    // Meditation responses
    if (input.includes("meditation") || input.includes("breathe") || input.includes("mindfulness")) {
      return aiResponses.meditation[Math.floor(Math.random() * aiResponses.meditation.length)]
    }
    
    // Buddhism responses
    if (input.includes("buddhism") || input.includes("buddha") || input.includes("philosophy") || input.includes("four noble")) {
      return aiResponses.buddhism[Math.floor(Math.random() * aiResponses.buddhism.length)]
    }
    
    // Monastery responses
    if (input.includes("monastery") || input.includes("respect") || input.includes("etiquette") || input.includes("visit")) {
      return aiResponses.monastery[Math.floor(Math.random() * aiResponses.monastery.length)]
    }
    
    // Cultural responses
    if (input.includes("prayer flag") || input.includes("thangka") || input.includes("festival") || input.includes("culture")) {
      return aiResponses.culture[Math.floor(Math.random() * aiResponses.culture.length)]
    }
    
    // Philosophy responses
    if (input.includes("middle way") || input.includes("compassion") || input.includes("wisdom") || input.includes("interdependen")) {
      return aiResponses.philosophy[Math.floor(Math.random() * aiResponses.philosophy.length)]
    }

    // Specific items
    if (input.includes("prayer bead") || input.includes("mala")) {
      return "📿 Malas (prayer beads) have 108 beads representing the 108 human delusions. They help count mantras during meditation, with each bead touched accumulating merit and maintaining focus."
    }

    if (input.includes("potala")) {
      return "🏔️ The Potala Palace in Lhasa was the Dalai Lama's winter residence. This 17th-century architectural marvel has over 1,000 rooms and contains countless sacred artifacts. Explore it virtually in our tours!"
    }

    // Default encouraging responses
    const defaults = [
      "🌟 That's a beautiful question! Buddhism offers profound wisdom for modern life. Would you like to explore meditation, monastery culture, or philosophical teachings?",
      "✨ Your spiritual curiosity is wonderful! I can help you learn about Buddhist practices, monastery traditions, or answer questions about your virtual journey.",
      "🙏 Every sincere question opens doors to deeper understanding. What aspect of Buddhist wisdom calls to your heart most strongly?"
    ]
    
    return defaults[Math.floor(Math.random() * defaults.length)]
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 z-50 group"
        size="lg"
      >
        <MessageCircle className="w-6 h-6 text-white group-hover:animate-pulse" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[550px] shadow-2xl z-50 flex flex-col border-0 bg-gradient-to-b from-white to-purple-50/30 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-b border-purple-200">
        <CardTitle className="flex items-center text-lg">
          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-3">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-semibold">AI Monk Guide</div>
            <div className="text-xs text-purple-100 font-normal">Your Spiritual Companion</div>
          </div>
          <Badge variant="secondary" className="ml-2 bg-white/20 text-white border-white/30">
            <Sparkles className="w-3 h-3 mr-1" />
            Live
          </Badge>
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20">
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-4 space-y-4 bg-gradient-to-b from-purple-50/20 to-white">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {messages.map((message) => (
            <div key={message.id} className={`flex animate-fade-in ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex items-start space-x-3 max-w-[85%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                    message.type === "user" 
                      ? "bg-gradient-to-br from-cyan-500 to-blue-500" 
                      : "bg-gradient-to-br from-purple-500 to-indigo-500"
                  }`}
                >
                  {message.type === "user" ? (
                    <User className="w-4 w-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div
                  className={`rounded-2xl p-3 shadow-sm ${
                    message.type === "user" 
                      ? "bg-gradient-to-r from-primary to-primary/90 text-white" 
                      : "bg-gradient-to-r from-slate-50 to-purple-50 text-slate-800 border border-purple-100"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    {message.category && (
                      <Badge variant="secondary" className="text-xs ml-2 capitalize">
                        {message.category}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-md">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gradient-to-r from-slate-50 to-purple-50 rounded-2xl p-3 border border-purple-100 shadow-sm">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <span className="ml-2 text-xs text-slate-600">AI is reflecting...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {messages.length === 1 && (
          <div className="space-y-3 p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
            <p className="text-xs text-slate-700 font-medium flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-purple-500" />
              Try asking about:
            </p>
            <div className="grid grid-cols-1 gap-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs h-auto py-2 px-3 bg-white/80 hover:bg-white border-purple-200 hover:border-purple-300 text-slate-700 hover:text-purple-700 transition-all duration-200 justify-start"
                  onClick={() => sendMessage(question)}
                >
                  <span className="truncate">{question}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="flex space-x-3 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 p-3 rounded-xl border border-purple-100">
          <Input
            placeholder="Ask about meditation, monasteries, or Buddhist wisdom..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage(inputValue)}
            className="flex-1 border-purple-200 focus:border-purple-400 focus:ring-purple-200 bg-white/80"
            disabled={isTyping}
          />
          <Button 
            onClick={() => sendMessage(inputValue)} 
            disabled={!inputValue.trim() || isTyping} 
            size="sm"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-md"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #a855f7;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9333ea;
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </Card>
  )
}