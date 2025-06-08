"use client"

import { useCallback, useEffect, useState } from "react"
import { track } from "@vercel/analytics"

type EventProps = Record<string, string | number | boolean | null | undefined>

export function useAnalytics() {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null)

  // Check for consent on mount
  useEffect(() => {
    try {
      const storedConsent = localStorage.getItem("analyticsConsent")
      setHasConsent(storedConsent === "true")
    } catch (e) {
      console.error("Error accessing localStorage:", e)
    }
  }, [])

  // Function to track custom events
  const trackEvent = useCallback(
    (eventName: string, eventProps?: EventProps) => {
      if (hasConsent) {
        track(eventName, eventProps)
      }
    },
    [hasConsent],
  )

  return { trackEvent, hasConsent }
}
