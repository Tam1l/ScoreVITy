import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index.tsx";
import GPACalculator from "./pages/GPACalculator.tsx";
import CGPACalculator from "./pages/CGPACalculator.tsx";
import TargetCGPA from "./pages/TargetCGPA.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

import { ThemeProvider } from "@/components/theme-provider";
import { FeedbackBox } from "@/components/FeedbackBox";

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="gpa-guru-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <FeedbackBox />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/gpa" element={<GPACalculator />} />
            <Route path="/cgpa" element={<CGPACalculator />} />
            <Route path="/target-cgpa" element={<TargetCGPA />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Analytics />
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
