"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useLanguage, languageNames, type Language } from "./language-provider"

export function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{languageNames[currentLanguage]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {Object.entries(languageNames).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLanguage(code as Language)}
            className={`cursor-pointer ${
              currentLanguage === code ? "bg-primary/10 font-medium" : ""
            }`}
          >
            <span className="mr-2 text-lg">
              {code === "en" && "🇺🇸"}
              {code === "zh" && "🇨🇳"}
              {code === "hi" && "🇮🇳"}
              {code === "ne" && "🇳🇵"}
              {code === "bo" && "🏳️"}
              {code === "es" && "🇪🇸"}
              {code === "fr" && "🇫🇷"}
              {code === "de" && "🇩🇪"}
              {code === "ja" && "🇯🇵"}
              {code === "ko" && "🇰🇷"}
            </span>
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
