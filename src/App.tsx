
import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OnboardingFlow from "@/components/OnboardingFlow";
import Index from "./pages/Index";
import MyForest from "@/components/MyForest";
import EmergencyMeditation from "@/components/EmergencyMeditation";

const queryClient = new QueryClient();

const App = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setCurrentView('dashboard');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Index />;
      case 'forest':
        return <MyForest />;
      case 'emergency':
        return <EmergencyMeditation />;
      default:
        return <Index />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showOnboarding ? (
          <OnboardingFlow onComplete={handleOnboardingComplete} />
        ) : (
          <>
            {renderCurrentView()}
            
            {/* Navigation for demo purposes */}
            <div className="fixed bottom-4 left-4 flex gap-2 z-50">
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="bg-florescer-copper text-white px-3 py-1 rounded text-sm"
              >
                Dashboard
              </button>
              <button 
                onClick={() => setCurrentView('forest')}
                className="bg-florescer-olive text-white px-3 py-1 rounded text-sm"
              >
                Floresta
              </button>
              <button 
                onClick={() => setCurrentView('emergency')}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                SOS
              </button>
            </div>
          </>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
