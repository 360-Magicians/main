import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { JobMatchingSection } from "@/components/job-matching-section"
import { InterviewPrepSection } from "@/components/interview-prep-section"
import { AccommodationsSection } from "@/components/accommodations-section"
import { ProfessionalDevelopmentSection } from "@/components/professional-development-section"
import { VocationalRehabSection } from "@/components/vocational-rehab-section"

export const metadata: Metadata = {
  title: "Job Magician | 360 Magicians Platform",
  description: "Career development for Deaf professionals",
}

export default function JobMagicianPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Job Magician" text="Your career development toolkit" />
      <div className="grid gap-6">
        <JobMatchingSection />
        <div className="grid gap-6 md:grid-cols-2">
          <InterviewPrepSection />
          <AccommodationsSection />
        </div>
        <ProfessionalDevelopmentSection />
        <VocationalRehabSection />
      </div>
    </DashboardShell>
  )
}
