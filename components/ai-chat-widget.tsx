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
}

const suggestedQuestions = [
  "Tell me about Tibetan Buddhism",
  "How do I start meditation?",
  "What's the history of Potala Palace?",
  "Explain Buddhist philosophy basics",
]

export function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content:
        "Hello! I'm your spiritual guide AI. I can help you learn about Buddhism, meditation practices, monastery history, and answer questions about your virtual journey. How can I assist you today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

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

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        type: "bot",
        content: getBotResponse(content),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("meditation")) {
      return "Meditation is a core practice in Buddhism. Start with mindful breathing - sit comfortably, focus on your breath, and gently return attention when your mind wanders. Our meditation section has guided sessions to help you begin your practice."
    } else if (input.includes("buddhism") || input.includes("buddha")) {
      return "Buddhism is a spiritual tradition founded by Siddhartha Gautama (the Buddha) over 2,500 years ago. It focuses on understanding suffering, impermanence, and the path to enlightenment through ethical conduct, mental discipline, and wisdom."
    } else if (input.includes("potala")) {
      return "The Potala Palace in Lhasa, Tibet, was the winter residence of the Dalai Lama. Built in the 17th century, it's a magnificent example of Tibetan architecture with over 1,000 rooms, chapels, and halls. You can explore it virtually in our tours section!"
    } else if (input.includes("monastery")) {
      return "Monasteries are sacred spaces where monks and nuns live, study, and practice Buddhism. They serve as centers of learning, meditation, and community. Each monastery has unique architecture, traditions, and spiritual significance."
    } else {
      return "That's a wonderful question! Buddhism and monastery traditions are rich with wisdom. I'd recommend exploring our virtual tours to experience these sacred spaces firsthand, or checking out our learning section for structured courses on Buddhist philosophy and practices."
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow z-50"
        size="lg"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-xl z-50 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="flex items-center text-lg">
          <Bot className="w-5 h-5 mr-2 text-blue-500" />
          Spiritual Guide AI
          <Badge variant="secondary" className="ml-2">
            <Sparkles className="w-3 h-3 mr-1" />
            Beta
          </Badge>
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-4 space-y-4">
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === "user" ? "bg-blue-500" : "bg-slate-200"}`}
                >
                  {message.type === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-slate-600" />
                  )}
                </div>
                <div
                  className={`rounded-lg p-3 ${message.type === "user" ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-800"}`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-slate-600" />
                </div>
                <div className="bg-slate-100 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {messages.length === 1 && (
          <div className="space-y-2">
            <p className="text-xs text-slate-600">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs h-auto py-1 px-2 bg-transparent"
                  onClick={() => sendMessage(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="flex space-x-2">
          <Input
            placeholder="Ask about Buddhism, meditation, or monasteries..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage(inputValue)}
            className="flex-1"
          />
          <Button onClick={() => sendMessage(inputValue)} disabled={!inputValue.trim() || isTyping} size="sm">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
