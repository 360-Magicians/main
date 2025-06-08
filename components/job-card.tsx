"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Bookmark, Building, MapPin } from "lucide-react"
import { useAnalytics } from "@/hooks/use-analytics"

interface JobCardProps {
  job: {
    id: number
    title: string
    company: string
    location: string
    salary: string
    matchScore: number
    postedDate: string
  }
  status?: string
}

export function JobCard({ job, status }: JobCardProps) {
  const { trackEvent } = useAnalytics()

  const handleViewDetails = () => {
    trackEvent("job_view_details", {
      job_id: job.id,
      job_title: job.title,
      company: job.company,
    })
  }

  const handleSaveJob = () => {
    trackEvent("job_save", {
      job_id: job.id,
      job_title: job.title,
      company: job.company,
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <h3 className="font-semibold">{job.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <Building className="mr-1 h-3 w-3" />
            {job.company}
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={handleSaveJob}>
          <Bookmark className="h-4 w-4" />
          <span className="sr-only">Save job</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center text-sm">
            <MapPin className="mr-1 h-3 w-3" />
            {job.location}
          </div>
          <div className="text-sm">{job.salary}</div>
          {status && (
            <Badge variant="outline" className="w-fit">
              {status}
            </Badge>
          )}
          <div className="mt-2">
            <div className="mb-1 flex items-center justify-between text-sm">
              <span>Match Score</span>
              <span className="font-medium">{job.matchScore}%</span>
            </div>
            <Progress value={job.matchScore} className="h-2" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-xs text-muted-foreground">Posted {job.postedDate}</div>
        <Button size="sm" onClick={handleViewDetails}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
