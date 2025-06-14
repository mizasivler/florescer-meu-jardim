
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OnboardingFlow from "@/components/OnboardingFlow";
import Index from "./pages/Index";
import MyForest from "@/components/MyForest";
import EmergencyMeditation from "@/components/EmergencyMeditation";
import RitualOfTheDay from "@/pages/RitualOfTheDay";
import Meditation from "@/pages/Meditation";
import Planner from "@/pages/Planner";
import EmotionDiary from "@/pages/EmotionDiary";
import CeliaMessage from "@/pages/CeliaMessage";
import Settings from "@/pages/Settings";
import Navigation from "@/components/Navigation";

const queryClient = new QueryClient();

const App = () => {
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem('onboarding-completed');
  });

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboarding-completed', 'true');
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <OnboardingFlow onComplete={handleOnboardingComplete} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <div className="min-h-screen">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/ritual" element={<RitualOfTheDay />} />
              <Route path="/meditation" element={<Meditation />} />
              <Route path="/planner" element={<Planner />} />
              <Route path="/diary" element={<EmotionDiary />} />
              <Route path="/celia" element={<CeliaMessage />} />
              <Route path="/forest" element={<MyForest />} />
              <Route path="/emergency" element={<EmergencyMeditation />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Navigation />
          </div>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
