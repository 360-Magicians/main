"use client"
import { Accessibility } from "lucide-react"
import { useAccessibility } from "@/components/accessibility-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export function AccessibilityMenu() {
  const { preferences, updatePreferences } = useAccessibility()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Accessibility options">
          <Accessibility className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Accessibility Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Sign Language Preference</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={preferences.signLanguagePreference || ""}
                  onValueChange={(value) =>
                    updatePreferences({
                      signLanguagePreference: value as any,
                    })
                  }
                >
                  <DropdownMenuRadioItem value="ASL">American Sign Language (ASL)</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="BSL">British Sign Language (BSL)</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Other">Other Sign Language</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <div className="flex w-full items-center justify-between">
              <span>Captions</span>
              <Switch
                checked={preferences.captionsEnabled}
                onCheckedChange={(checked) => updatePreferences({ captionsEnabled: checked })}
              />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex w-full items-center justify-between">
              <span>High Contrast</span>
              <Switch
                checked={preferences.highContrastMode}
                onCheckedChange={(checked) => updatePreferences({ highContrastMode: checked })}
              />
            </div>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Text Size</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={preferences.textSize}
                  onValueChange={(value) =>
                    updatePreferences({
                      textSize: value as "default" | "large" | "x-large",
                    })
                  }
                >
                  <DropdownMenuRadioItem value="default">Default</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="large">Large</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="x-large">Extra Large</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <div className="flex w-full items-center justify-between">
              <span>Reduce Motion</span>
              <Switch
                checked={preferences.animationReduced}
                onCheckedChange={(checked) => updatePreferences({ animationReduced: checked })}
              />
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
