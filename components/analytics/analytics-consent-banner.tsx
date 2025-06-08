"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAccessibility } from "@/components/accessibility-provider"

interface AnalyticsConsentBannerProps {
  onAccept: () => void
  onDecline: () => void
}

export function AnalyticsConsentBanner({ onAccept, onDecline }: AnalyticsConsentBannerProps) {
  const { preferences } = useAccessibility()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <Card className="mx-auto max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle>Privacy Preferences</CardTitle>
          <CardDescription>We value your privacy and accessibility needs</CardDescription>
        </CardHeader>
        <CardContent>
          <p
            className={
              preferences.textSize === "large" ? "text-lg" : preferences.textSize === "x-large" ? "text-xl" : ""
            }
          >
            We use Vercel Web Analytics to improve our platform and better serve the Deaf community. This helps us
            understand how people use our services and make them more accessible. Vercel Analytics is privacy-friendly
            and doesn't use cookies or collect personal information.
          </p>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button variant="outline" onClick={onDecline}>
            Decline
          </Button>
          <Button onClick={onAccept}>Accept</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
