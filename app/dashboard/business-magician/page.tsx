import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { StartupIncubationSection } from "@/components/startup-incubation-section"
import { DocumentTranslationSection } from "@/components/document-translation-section"
import { BusinessModelSection } from "@/components/business-model-section"
import { FundingSourcesSection } from "@/components/funding-sources-section"
import { GrowthPlanningSection } from "@/components/growth-planning-section"

export const metadata: Metadata = {
  title: "Business Magician | 360 Magicians Platform",
  description: "Support for Deaf entrepreneurs",
}

export default function BusinessMagicianPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Business Magician" text="Your entrepreneurship toolkit" />
      <div className="grid gap-6">
        <StartupIncubationSection />
        <div className="grid gap-6 md:grid-cols-2">
          <DocumentTranslationSection />
          <BusinessModelSection />
        </div>
        <FundingSourcesSection />
        <GrowthPlanningSection />
      </div>
    </DashboardShell>
  )
}
