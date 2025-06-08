"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUp, FileText, Languages, Check, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function DocumentTranslationSection() {
  const [activeTab, setActiveTab] = useState("upload")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Translation & Simplification</CardTitle>
        <CardDescription>Convert complex business documents into accessible formats</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upload" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="inProgress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className="space-y-4">
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12">
              <FileUp className="mb-4 h-8 w-8 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-medium">Upload Document</h3>
              <p className="mb-4 text-center text-sm text-muted-foreground">
                Drag and drop your file here, or click to browse
              </p>
              <Button>Select File</Button>
            </div>
            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-medium">Translation Options</h4>
              <div className="grid gap-2">
                <div className="flex items-center justify-between rounded-md border p-3">
                  <div className="flex items-center gap-2">
                    <Languages className="h-4 w-4" />
                    <span>ASL Video Translation</span>
                  </div>
                  <Button size="sm">Select</Button>
                </div>
                <div className="flex items-center justify-between rounded-md border p-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Simplified Text Version</span>
                  </div>
                  <Button size="sm">Select</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="inProgress" className="space-y-4">
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="font-medium">Business_Plan_Draft.pdf</div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>In Progress</span>
                  </Badge>
                </div>
                <div className="mb-2 text-sm text-muted-foreground">ASL Video Translation</div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>65%</span>
                </div>
                <Progress value={65} className="h-2" />
                <div className="mt-4 text-xs text-muted-foreground">Estimated completion: 2 hours</div>
              </div>
              <div className="rounded-md border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="font-medium">Financial_Projections.xlsx</div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>In Progress</span>
                  </Badge>
                </div>
                <div className="mb-2 text-sm text-muted-foreground">Simplified Text Version</div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>30%</span>
                </div>
                <Progress value={30} className="h-2" />
                <div className="mt-4 text-xs text-muted-foreground">Estimated completion: 1 day</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="completed" className="space-y-4">
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="font-medium">Marketing_Strategy.docx</div>
                  <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700">
                    <Check className="h-3 w-3" />
                    <span>Completed</span>
                  </Badge>
                </div>
                <div className="mb-2 text-sm text-muted-foreground">ASL Video Translation + Simplified Text</div>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    View Text
                  </Button>
                  <Button size="sm">
                    <Languages className="mr-2 h-4 w-4" />
                    View ASL Video
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button disabled={activeTab !== "upload"} className="ml-auto">
          Submit for Translation
        </Button>
      </CardFooter>
    </Card>
  )
}
