import { useState } from "react"
import { MessageSquare, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "sonner"

export function FeedbackBox() {
  const [feedback, setFeedback] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      toast.error("Please enter some feedback!")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "78d0b8d5-d711-4198-ade3-69895726130a",
          subject: "New Feedback for GPA Guru",
          message: feedback,
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Thank you! Your feedback has been sent to the developer.")
        setFeedback("")
        setIsOpen(false)
      } else {
        toast.error(result.message || "Something went wrong. Please try again.")
      }
    } catch (error) {
      toast.error("Failed to submit feedback. Please check your connection.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button size="icon" className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all">
            <MessageSquare className="h-5 w-5" />
            <span className="sr-only">Open feedback</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80 p-4 shadow-xl border-border mb-2 mr-2">
          <div className="flex flex-col gap-4">
            <div className="space-y-1">
              <h4 className="font-semibold text-sm leading-none flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                Send Feedback
              </h4>
              <p className="text-xs text-muted-foreground pt-1">
                Found a bug or have a suggestion? Let us know!
              </p>
            </div>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="e.g. Type your feedback here..."
              className="resize-none h-24 bg-muted/40 focus:bg-background"
              disabled={isSubmitting}
            />
            <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full gap-2 font-medium">
              <Send size={16} className={isSubmitting ? "animate-pulse" : ""} />
              {isSubmitting ? "Sending..." : "Submit Feedback"}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
