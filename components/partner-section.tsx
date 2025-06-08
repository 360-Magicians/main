import { Card } from "@/components/ui/card"
import { Building, Briefcase, GraduationCap, Landmark } from "lucide-react"

export function PartnerSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Partners</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Working together to support the Deaf community
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          <Card className="flex flex-col items-center justify-center p-6 text-center">
            <Building className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-bold">MBTQ Group</h3>
            <p className="text-sm text-muted-foreground">Financial Planning Services</p>
          </Card>
          <Card className="flex flex-col items-center justify-center p-6 text-center">
            <Briefcase className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-bold">Workforce Solutions</h3>
            <p className="text-sm text-muted-foreground">Employment Services</p>
          </Card>
          <Card className="flex flex-col items-center justify-center p-6 text-center">
            <GraduationCap className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-bold">Vocational Rehabilitation</h3>
            <p className="text-sm text-muted-foreground">Career Development</p>
          </Card>
          <Card className="flex flex-col items-center justify-center p-6 text-center">
            <Landmark className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-bold">Deaf Business Association</h3>
            <p className="text-sm text-muted-foreground">Entrepreneurship Support</p>
          </Card>
        </div>
      </div>
    </section>
  )
}
