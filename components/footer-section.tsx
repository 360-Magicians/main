import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export function FooterSection() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">360 Magicians Platform</h3>
            <p className="text-sm text-muted-foreground">
              Comprehensive support for Deaf professionals and entrepreneurs, empowering success through accessible
              services and resources.
            </p>
            <div className="flex gap-4">
              <Link href="#" aria-label="Facebook">
                <Button variant="ghost" size="icon">
                  <Facebook className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#" aria-label="Twitter">
                <Button variant="ghost" size="icon">
                  <Twitter className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#" aria-label="Instagram">
                <Button variant="ghost" size="icon">
                  <Instagram className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Button variant="ghost" size="icon">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/job-magician" className="text-muted-foreground hover:text-foreground">
                    Job Magician
                  </Link>
                </li>
                <li>
                  <Link href="/business-magician" className="text-muted-foreground hover:text-foreground">
                    Business Magician
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-muted-foreground hover:text-foreground">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">Subscribe to our newsletter for updates and resources.</p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} 360 Magicians Platform. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
