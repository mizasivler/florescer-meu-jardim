
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { useUserData } from "@/hooks/useUserData";
import OnboardingFlow from "@/components/OnboardingFlow";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import MyGarden from "@/components/MyGarden";
import EmergencyMeditation from "@/components/EmergencyMeditation";
import RitualOfTheDay from "@/pages/RitualOfTheDay";
import Meditation from "@/pages/Meditation";
import Planner from "@/pages/Planner";
import EmotionDiary from "@/pages/EmotionDiary";
import Settings from "@/pages/Settings";
import Navigation from "@/components/Navigation";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useUserData();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    console.log('Auth state:', { user: !!user, authLoading, profile, profileLoading });
    
    if (!authLoading && !profileLoading && user && profile) {
      // Check if onboarding is completed based on database
      const onboardingCompleted = profile.onboarding_completed;
      console.log('Onboarding completed from DB:', onboardingCompleted);
      setShowOnboarding(!onboardingCompleted);
    }
  }, [user, authLoading, profile, profileLoading]);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  if (authLoading || (user && profileLoading)) {
    return (
      <div className="min-h-screen gradient-florescer flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-florescer-copper rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-2xl">🌸</span>
          </div>
          <p className="text-florescer-dark font-lora text-lg">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/ritual" element={<RitualOfTheDay />} />
        <Route path="/meditation" element={<Meditation />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/diary" element={<EmotionDiary />} />
        <Route path="/forest" element={<MyGarden />} />
        <Route path="/emergency" element={<EmergencyMeditation />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Navigation />
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <Router>
            <AppContent />
          </Router>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
