import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Building, Users } from "lucide-react"

export function FeatureSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Services</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Comprehensive support for Deaf professionals and entrepreneurs through our three core cycles
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Briefcase className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Job Magician</CardTitle>
              <CardDescription>Career development for Deaf professionals</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Personalized job matching</li>
                <li>Accessibility-focused interview prep</li>
                <li>Workplace accommodation coordination</li>
                <li>Professional development tracking</li>
                <li>Vocational rehabilitation partnerships</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Building className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Business Magician</CardTitle>
              <CardDescription>Support for Deaf entrepreneurs</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Startup incubation resources</li>
                <li>Document translation & simplification</li>
                <li>Business model validation tools</li>
                <li>Funding source identification</li>
                <li>Strategic growth planning</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Users className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>360 Magicians</CardTitle>
              <CardDescription>Integrated AI-powered platform</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>AI-powered service connection</li>
                <li>Workforce solution partnerships</li>
                <li>Vocational rehabilitation case management</li>
                <li>Financial planning through MBTQ Group</li>
                <li>Progress tracking & reporting</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
