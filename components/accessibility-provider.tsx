"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type AccessibilityPreferences = {
  signLanguagePreference: "ASL" | "BSL" | "Other" | null
  captionsEnabled: boolean
  highContrastMode: boolean
  textSize: "default" | "large" | "x-large"
  animationReduced: boolean
}

type AccessibilityContextType = {
  preferences: AccessibilityPreferences
  updatePreferences: (prefs: Partial<AccessibilityPreferences>) => void
}

const defaultPreferences: AccessibilityPreferences = {
  signLanguagePreference: null,
  captionsEnabled: true,
  highContrastMode: false,
  textSize: "default",
  animationReduced: false,
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(defaultPreferences)

  useEffect(() => {
    // Load preferences from localStorage on client side
    const savedPrefs = localStorage.getItem("accessibilityPreferences")
    if (savedPrefs) {
      try {
        setPreferences(JSON.parse(savedPrefs))
      } catch (e) {
        console.error("Failed to parse saved accessibility preferences")
      }
    }
  }, [])

  useEffect(() => {
    // Apply preferences to document
    if (preferences.highContrastMode) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }

    if (preferences.textSize !== "default") {
      document.documentElement.classList.add(`text-${preferences.textSize}`)
    } else {
      document.documentElement.classList.remove("text-large", "text-x-large")
    }

    if (preferences.animationReduced) {
      document.documentElement.classList.add("reduce-motion")
    } else {
      document.documentElement.classList.remove("reduce-motion")
    }
  }, [preferences])

  const updatePreferences = (prefs: Partial<AccessibilityPreferences>) => {
    const newPrefs = { ...preferences, ...prefs }
    setPreferences(newPrefs)
    localStorage.setItem("accessibilityPreferences", JSON.stringify(newPrefs))
  }

  return (
    <AccessibilityContext.Provider value={{ preferences, updatePreferences }}>{children}</AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider")
  }
  return context
}
