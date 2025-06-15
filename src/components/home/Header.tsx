
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Settings } from 'lucide-react';
import { useUserData } from '@/hooks/useUserData';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  profile: any;
}

const Header = ({ profile }: HeaderProps) => {
  const navigate = useNavigate();
  const { saveDailyMood } = useUserData();
  const { toast } = useToast();
  const [currentMood, setCurrentMood] = useState<string>('');

  const moodOptions = [
    { emoji: '😴', label: 'Cansada', value: 'tired' },
    { emoji: '😰', label: 'Aflita', value: 'anxious' },
    { emoji: '🥺', label: 'Sensível', value: 'sensitive' },
    { emoji: '😤', label: 'Irritada', value: 'irritated' },
    { emoji: '🌟', label: 'Esperançosa', value: 'hopeful' }
  ];

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const handleMoodSelect = async (mood: string) => {
    setCurrentMood(mood);
    const { error } = await saveDailyMood(mood);
    
    if (error) {
      toast({
        title: "Erro ao salvar humor",
        description: "Tente novamente em alguns instantes",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Humor registrado!",
        description: "Obrigada por compartilhar como se sente hoje"
      });
    }
  };

  return (
    <div className="px-6 pt-8 pb-6">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {getTimeGreeting()}, {profile?.name || 'Querida'}!
          </h1>
          <p className="text-gray-600 text-lg">Como você está se sentindo hoje?</p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-600 hover:bg-white/50 rounded-full p-3"
          onClick={() => navigate('/settings')}
        >
          <Settings className="h-6 w-6" />
        </Button>
      </div>

      {/* Mood Selector */}
      <div className="flex justify-between gap-3 mb-8">
        {moodOptions.map((mood) => (
          <button
            key={mood.value}
            onClick={() => handleMoodSelect(mood.value)}
            className={`flex-1 aspect-square rounded-2xl bg-white shadow-sm border-2 transition-all duration-300 flex items-center justify-center text-3xl ${
              currentMood === mood.value 
                ? 'border-purple-400 bg-purple-50 scale-105' 
                : 'border-gray-100 hover:border-gray-200 hover:scale-105'
            }`}
            title={mood.label}
          >
            {mood.emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;
