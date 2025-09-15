import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { GamificationProvider } from "@/components/gamification-provider"
import { LanguageProvider } from "@/components/language-provider"
import { OfflineProvider } from "@/components/offline-provider"

export const metadata: Metadata = {
  title: "Sacred Journeys - Virtual Monastery Tours",
  description: "Explore Buddhist and Tibetan monasteries through immersive virtual tours and cultural preservation",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <LanguageProvider>
          <OfflineProvider>
            <AuthProvider>
              <GamificationProvider>
                <Suspense fallback={null}>{children}</Suspense>
              </GamificationProvider>
            </AuthProvider>
          </OfflineProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
