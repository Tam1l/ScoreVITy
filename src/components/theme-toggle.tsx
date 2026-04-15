import { useState, useEffect } from "react"
import { Moon, Sun, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { getCookie, setCookie } from "@/lib/userOptionsStore"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [useLast, setUseLast] = useState(getCookie('useLastOptions') === 'true')

  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent;
      setUseLast(customEvent.detail);
    }
    window.addEventListener('optionsToggled', handleSync)
    return () => window.removeEventListener('optionsToggled', handleSync)
  }, [])

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else if (theme === 'light') {
      setTheme('dark')
    } else {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(isDark ? 'light' : 'dark')
    }
  }

  const handleToggleOptions = (checked: boolean) => {
    setUseLast(checked)
    setCookie('useLastOptions', checked ? 'true' : 'false', 30)
    window.dispatchEvent(new CustomEvent('optionsToggled', { detail: checked }))
  }

  return (
    <div className="absolute top-4 right-4 z-50">
      {/* Mobile view: Settings Popover */}
      <div className="md:hidden">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full shadow-md bg-card/80 backdrop-blur-xl">
              <Settings className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Settings</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-auto p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-6">
              <Label className="text-sm font-medium">Theme</Label>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full"
                onClick={toggleTheme}
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
            
            <div className="flex items-center justify-between gap-6">
              <Label htmlFor="mobile-save-options" className="text-sm font-medium cursor-pointer">
                Save options
              </Label>
              <Switch id="mobile-save-options" checked={useLast} onCheckedChange={handleToggleOptions} />
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Desktop view */}
      <div className="hidden md:flex flex-col items-end gap-3">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full shadow-md bg-card/80 backdrop-blur-xl"
          onClick={toggleTheme}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        
        <div className="flex items-center gap-2 bg-card/80 backdrop-blur-xl p-2 rounded-lg border border-border shadow-md">
          <Switch id="global-save-options" checked={useLast} onCheckedChange={handleToggleOptions} />
          <Label htmlFor="global-save-options" className="text-xs text-muted-foreground whitespace-nowrap cursor-pointer">
            Save options
          </Label>
        </div>
      </div>
    </div>
  )
}
