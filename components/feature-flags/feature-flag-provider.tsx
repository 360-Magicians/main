"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { track } from "@vercel/analytics"

type FeatureFlags = {
  [key: string]: boolean
}

type FeatureFlagContextType = {
  flags: FeatureFlags
  isLoading: boolean
  isEnabled: (flagName: string) => boolean
}

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(undefined)

export function FeatureFlagProvider({ children }: { children: ReactNode }) {
  const [flags, setFlags] = useState<FeatureFlags>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadFeatureFlags() {
      try {
        // This would be an API call to fetch feature flags
        const response = await fetch("/api/feature-flags")
        const data = await response.json()
        setFlags(data.flags)

        // Send feature flags to Vercel Analytics
        Object.entries(data.flags).forEach(([key, value]) => {
          track("feature_flag", {
            flag_name: key,
            flag_value: value,
          })
        })
      } catch (error) {
        console.error("Failed to load feature flags:", error)
        // Fallback to default flags
        setFlags({
          newJobMatchingAlgorithm: false,
          enhancedAccessibilityTools: true,
          businessModelAIAssistant: false,
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadFeatureFlags()
  }, [])

  const isEnabled = (flagName: string): boolean => {
    return flags[flagName] === true
  }

  return <FeatureFlagContext.Provider value={{ flags, isLoading, isEnabled }}>{children}</FeatureFlagContext.Provider>
}

export function useFeatureFlag() {
  const context = useContext(FeatureFlagContext)
  if (context === undefined) {
    throw new Error("useFeatureFlag must be used within a FeatureFlagProvider")
  }
  return context
}
