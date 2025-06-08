"use client"

import { useEffect, useState } from "react"
import { GoogleAnalytics } from "@next/third-parties/google"
import { AnalyticsConsentBanner } from "./analytics-consent-banner"

export function Analytics() {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null)

  useEffect(() => {
    // Check for stored consent on client-side
    try {
      const storedConsent = localStorage.getItem("analyticsConsent")
      setHasConsent(storedConsent === "true")
    } catch (e) {
      // Handle localStorage errors
      console.error("Error accessing localStorage:", e)
      setHasConsent(false)
    }
  }, [])

  const handleAccept = () => {
    try {
      localStorage.setItem("analyticsConsent", "true")
      setHasConsent(true)
    } catch (e) {
      console.error("Error saving to localStorage:", e)
    }
  }

  const handleDecline = () => {
    try {
      localStorage.setItem("analyticsConsent", "false")
      setHasConsent(false)
    } catch (e) {
      console.error("Error saving to localStorage:", e)
    }
  }

  // Only render Google Analytics if consent is given
  return (
    <>
      {hasConsent === true && process.env.NEXT_PUBLIC_ANALYTICS_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_ANALYTICS_ID} />
      )}
      {hasConsent === null && <AnalyticsConsentBanner onAccept={handleAccept} onDecline={handleDecline} />}
    </>
  )
}
