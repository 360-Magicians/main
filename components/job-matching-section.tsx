"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JobCard } from "@/components/job-card"
import { JobFilterSidebar } from "@/components/job-filter-sidebar"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useAnalytics } from "@/hooks/use-analytics"

export function JobMatchingSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("recommended")
  const { trackEvent } = useAnalytics()

  // Mock data for demonstration
  const recommendedJobs = [
    {
      id: 1,
      title: "UX Designer",
      company: "TechCorp",
      location: "Remote",
      salary: "$80,000 - $100,000",
      matchScore: 95,
      postedDate: "2 days ago",
    },
    {
      id: 2,
      title: "Software Engineer",
      company: "InnovateTech",
      location: "San Francisco, CA",
      salary: "$120,000 - $150,000",
      matchScore: 88,
      postedDate: "1 week ago",
    },
    {
      id: 3,
      title: "Product Manager",
      company: "DigitalSolutions",
      location: "New York, NY",
      salary: "$110,000 - $130,000",
      matchScore: 82,
      postedDate: "3 days ago",
    },
  ]

  const savedJobs = [
    {
      id: 4,
      title: "Marketing Specialist",
      company: "BrandWorks",
      location: "Chicago, IL",
      salary: "$70,000 - $85,000",
      matchScore: 79,
      postedDate: "2 weeks ago",
    },
    {
      id: 5,
      title: "Data Analyst",
      company: "DataInsights",
      location: "Remote",
      salary: "$90,000 - $110,000",
      matchScore: 91,
      postedDate: "5 days ago",
    },
  ]

  const appliedJobs = [
    {
      id: 6,
      title: "Frontend Developer",
      company: "WebSolutions",
      location: "Austin, TX",
      salary: "$95,000 - $115,000",
      matchScore: 93,
      postedDate: "1 month ago",
      status: "Interview Scheduled",
    },
    {
      id: 7,
      title: "Content Strategist",
      company: "MediaGroup",
      location: "Remote",
      salary: "$75,000 - $90,000",
      matchScore: 85,
      postedDate: "3 weeks ago",
      status: "Application Under Review",
    },
  ]

  const handleSearch = () => {
    trackEvent("job_search", { query: searchQuery })
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    trackEvent("job_tab_change", { tab: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Matching</CardTitle>
        <CardDescription>Personalized job recommendations based on your skills and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="md:w-1/4">
            <JobFilterSidebar />
          </div>
          <div className="md:w-3/4">
            <div className="mb-4 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search jobs..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button onClick={handleSearch}>Search</Button>
            </div>
            <Tabs defaultValue="recommended" onValueChange={handleTabChange}>
              <TabsList className="mb-4">
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
                <TabsTrigger value="applied">Applied</TabsTrigger>
              </TabsList>
              <TabsContent value="recommended" className="space-y-4">
                {recommendedJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </TabsContent>
              <TabsContent value="saved" className="space-y-4">
                {savedJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </TabsContent>
              <TabsContent value="applied" className="space-y-4">
                {appliedJobs.map((job) => (
                  <JobCard key={job.id} job={job} status={job.status} />
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Previous</Button>
        <Button>Next</Button>
      </CardFooter>
    </Card>
  )
}
