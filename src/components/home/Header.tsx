
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, Star, Zap, Award } from 'lucide-react';
import { useUserData } from '@/hooks/useUserData';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  profile: any;
}

const Header = ({ profile }: HeaderProps) => {
  const navigate = useNavigate();
  const { saveDailyMood, todayMood } = useUserData();
  const { toast } = useToast();
  const [currentMood, setCurrentMood] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Update current mood when todayMood changes
  useEffect(() => {
    if (todayMood) {
      setCurrentMood(todayMood);
    }
  }, [todayMood]);

  const moodOptions = [
    { emoji: '😴', label: 'Cansada', value: 'tired', color: 'from-blue-400 to-blue-500' },
    { emoji: '😰', label: 'Aflita', value: 'anxious', color: 'from-yellow-400 to-orange-400' },
    { emoji: '🥺', label: 'Sensível', value: 'sensitive', color: 'from-pink-400 to-rose-400' },
    { emoji: '😤', label: 'Irritada', value: 'irritated', color: 'from-red-400 to-red-500' },
    { emoji: '🌟', label: 'Esperançosa', value: 'hopeful', color: 'from-purple-400 to-pink-400' }
  ];

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const handleMoodSelect = async (mood: string) => {
    if (isLoading || currentMood === mood) return;
    
    setIsLoading(true);
    console.log('Selecting mood:', mood);
    
    const { error } = await saveDailyMood(mood);
    
    if (error) {
      console.error('Error saving mood:', error);
      toast({
        title: "Erro ao salvar humor",
        description: error || "Tente novamente em alguns instantes",
        variant: "destructive"
      });
    } else {
      setCurrentMood(mood);
      toast({
        title: "Humor registrado! ✨",
        description: "Obrigada por compartilhar como se sente hoje"
      });
    }
    
    setIsLoading(false);
  };

  // Mock data for demonstration - these would come from user data
  const userLevel = 7;
  const userXP = 350;
  const nextLevelXP = 500;
  const userStreak = 5;

  return (
    <div className="px-6 pt-8 pb-4">
      {/* Main Header with Avatar and Stats */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          {/* Avatar with Level Badge */}
          <div className="relative">
            <Avatar className="w-16 h-16 border-3 border-white shadow-lg">
              <AvatarImage src="/placeholder.svg" alt={profile?.name || 'Usuária'} />
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold">
                {profile?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center border-2 border-white">
              <span className="text-white text-xs font-bold">{userLevel}</span>
            </div>
          </div>

          {/* User Info and Stats */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              {getTimeGreeting()}, {profile?.name || 'Querida'}!
            </h1>
            
            {/* XP Progress Bar */}
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(userXP / nextLevelXP) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium text-gray-600">{userXP}/{nextLevelXP}</span>
            </div>

            {/* Achievements */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-gray-700">Nível {userLevel}</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700">{userStreak} dias</span>
              </div>
            </div>
          </div>
        </div>

        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-600 hover:bg-white/50 rounded-full p-3 shadow-sm"
          onClick={() => navigate('/settings')}
        >
          <Settings className="h-6 w-6" />
        </Button>
      </div>

      {/* Mood Section */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-soft border border-white/50">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Como você está se sentindo hoje?
        </h2>
        
        <div className="flex justify-between gap-2">
          {moodOptions.map((mood) => (
            <button
              key={mood.value}
              onClick={() => handleMoodSelect(mood.value)}
              disabled={isLoading}
              className={`flex-1 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center py-4 px-2 ${
                currentMood === mood.value 
                  ? `bg-gradient-to-r ${mood.color} shadow-lg scale-105 border-2 border-white` 
                  : 'bg-white/80 hover:bg-white border border-gray-100 hover:scale-105 shadow-sm hover:shadow-md'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              title={mood.label}
            >
              <span className={`text-2xl mb-2 transition-all duration-300 ${
                currentMood === mood.value ? 'scale-110' : ''
              }`}>
                {mood.emoji}
              </span>
              <span className={`text-xs font-medium text-center leading-tight transition-colors duration-300 ${
                currentMood === mood.value ? 'text-white' : 'text-gray-600'
              }`}>
                {mood.label}
              </span>
            </button>
          ))}
        </div>

        {currentMood && (
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Humor salvo: {moodOptions.find(m => m.value === currentMood)?.label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
