import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { GamificationProvider } from "@/components/gamification-provider"
import { LanguageProvider } from "@/components/language-provider"
import { OfflineProvider } from "@/components/offline-provider"

export const metadata: Metadata = {
  title: "Sacred Journeys - Virtual Monastery Tours",
  description: "Explore Buddhist and Tibetan monasteries through immersive virtual tours and cultural preservation",
  generator: "v0.app",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#435B69" },
    { media: "(prefers-color-scheme: dark)", color: "#B8860B" },
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Sacred Journeys",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider>
          <LanguageProvider>
            <OfflineProvider>
              <AuthProvider>
                <GamificationProvider>
                  <Suspense fallback={null}>{children}</Suspense>
                </GamificationProvider>
              </AuthProvider>
            </OfflineProvider>
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
