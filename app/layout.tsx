import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { AccessibilityProvider } from "@/components/accessibility-provider"
import { UserProvider } from "@/components/user-provider"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@/components/analytics/vercel-analytics"
import { Mona_Sans as FontSans } from "next/font/google"
import "@/app/globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "360 Magicians Platform",
  description: "Comprehensive support for Deaf professionals and entrepreneurs",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`font-sans ${fontSans.variable}`}>
        <AccessibilityProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <UserProvider>
              {children}
              <Toaster />
              <Analytics />
            </UserProvider>
          </ThemeProvider>
        </AccessibilityProvider>
      </body>
    </html>
  )
}
