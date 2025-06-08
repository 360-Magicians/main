import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

export function TestimonialSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Success Stories</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from members of our community who have benefited from the 360 Magicians Platform
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Quote className="h-6 w-6 text-muted-foreground" />
                <div>
                  <p className="mb-4 italic">
                    "The Job Magician cycle helped me find a position that truly values my skills and provides the
                    accommodations I need. The interview preparation was invaluable."
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/50 px-6 py-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Jamie Davis</p>
                  <p className="text-xs text-muted-foreground">Software Developer</p>
                </div>
              </div>
            </CardFooter>
          </Card>
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Quote className="h-6 w-6 text-muted-foreground" />
                <div>
                  <p className="mb-4 italic">
                    "As a Deaf entrepreneur, the Business Magician cycle provided me with resources I couldn't find
                    anywhere else. The document translation service has been a game-changer for my business."
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/50 px-6 py-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>MR</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Morgan Rodriguez</p>
                  <p className="text-xs text-muted-foreground">Founder, AccessTech</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
