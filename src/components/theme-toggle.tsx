import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { getCookie, setCookie } from "@/lib/userOptionsStore"

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
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-3">
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
  )
}
