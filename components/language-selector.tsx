"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Check, ChevronDown } from "lucide-react"

interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
  availability: number // percentage of content translated
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸", availability: 100 },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳", availability: 95 },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", availability: 90 },
  { code: "bo", name: "Tibetan", nativeName: "བོད་ཡིག", flag: "🏔️", availability: 85 },
  { code: "ne", name: "Nepali", nativeName: "नेपाली", flag: "🇳🇵", availability: 80 },
  { code: "mn", name: "Mongolian", nativeName: "Монгол", flag: "🇲🇳", availability: 75 },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵", availability: 70 },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷", availability: 65 },
  { code: "th", name: "Thai", nativeName: "ไทย", flag: "🇹🇭", availability: 60 },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", flag: "🇻🇳", availability: 55 },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", availability: 50 },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", availability: 45 },
]

export function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language)
    setIsOpen(false)
    // Here you would implement the actual language change logic
    console.log(`Switching to ${language.name}`)
  }

  return (
    <div className="relative">
      <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 min-w-[140px]">
        <Globe className="h-4 w-4" />
        <span className="flex items-center gap-2">
          <span>{selectedLanguage.flag}</span>
          <span>{selectedLanguage.name}</span>
        </span>
        <ChevronDown className="h-3 w-3" />
      </Button>

      {isOpen && (
        <Card className="absolute top-full right-0 mt-2 w-80 z-50 shadow-lg">
          <CardContent className="p-4">
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language)}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{language.flag}</span>
                    <div>
                      <div className="font-medium">{language.name}</div>
                      <div className="text-sm text-muted-foreground">{language.nativeName}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <Badge
                        variant={
                          language.availability >= 80
                            ? "default"
                            : language.availability >= 60
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {language.availability}%
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        {language.availability >= 80 ? "Complete" : language.availability >= 60 ? "Good" : "Partial"}
                      </div>
                    </div>

                    {selectedLanguage.code === language.code && <Check className="h-4 w-4 text-primary" />}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                <div className="font-medium mb-1">Translation Coverage</div>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>80%+ Complete translation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>60-79% Good coverage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                    <span>&lt;60% Partial translation</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  )
}
