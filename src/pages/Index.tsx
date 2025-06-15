
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Headphones, Calendar, MessageSquare, Settings, Activity, Zap, Star } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useUserData } from '@/hooks/useUserData';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { profile, progress, saveDailyMood, loading } = useUserData();
  const { toast } = useToast();
  const [currentMood, setCurrentMood] = useState<string>('');

  const moodOptions = [
    { emoji: '😴', label: 'Cansada', value: 'tired' },
    { emoji: '😰', label: 'Aflita', value: 'anxious' },
    { emoji: '🥺', label: 'Sensível', value: 'sensitive' },
    { emoji: '😤', label: 'Irritada', value: 'irritated' },
    { emoji: '🌟', label: 'Esperançosa', value: 'hopeful' }
  ];

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

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const renderProgressFlowers = () => {
    const totalDays = progress?.total_days || 21;
    const currentDay = progress?.current_day || 1;
    
    return Array.from({ length: Math.min(7, totalDays) }, (_, index) => (
      <div
        key={index}
        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
          index < currentDay 
            ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white' 
            : 'bg-gray-100 text-gray-400'
        }`}
      >
        {index + 1}
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-2xl">🌸</span>
          </div>
          <p className="text-gray-700 font-medium text-lg">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pb-20">
      {/* Header */}
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

      {/* Today's Ritual Card */}
      <div className="px-6 mb-8">
        <Card 
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 rounded-3xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
          onClick={() => navigate('/ritual')}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ritual de Hoje</h2>
              <p className="text-purple-100 text-lg mb-4">Comece seu dia com intenção e cuidado</p>
              <Button className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm">
                Começar Ritual
              </Button>
            </div>
            <div className="text-6xl opacity-80">
              🌅
            </div>
          </div>
        </Card>
      </div>

      {/* Progress Section */}
      <div className="px-6 mb-8">
        <Card className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Sua Jornada</h3>
            <p className="text-gray-600">
              Dia {progress?.current_day || 1} de {progress?.total_days || 21}
            </p>
          </div>
          
          <div className="flex justify-center gap-2 mb-6">
            {renderProgressFlowers()}
          </div>
          
          <Progress 
            value={((progress?.current_day || 1) / (progress?.total_days || 21)) * 100} 
            className="h-3 bg-gray-100 mb-3"
          />
          <p className="text-center text-sm text-gray-500">
            {Math.round(((progress?.current_day || 1) / (progress?.total_days || 21)) * 100)}% concluído
          </p>
        </Card>
      </div>

      {/* Main Actions */}
      <div className="px-6 space-y-4">
        {/* Meditation */}
        <Card 
          className="bg-white rounded-3xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-all duration-300"
          onClick={() => navigate('/meditation')}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center">
              <Headphones className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-1">Meditação</h3>
              <p className="text-gray-600">Encontre sua paz interior</p>
            </div>
            <div className="text-3xl">🧘‍♀️</div>
          </div>
        </Card>

        {/* Diary */}
        <Card 
          className="bg-white rounded-3xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-all duration-300"
          onClick={() => navigate('/diary')}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-1">Diário da Emoção</h3>
              <p className="text-gray-600">Registre seus sentimentos</p>
            </div>
            <div className="text-3xl">📝</div>
          </div>
        </Card>

        {/* Planner */}
        <Card 
          className="bg-white rounded-3xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-all duration-300"
          onClick={() => navigate('/planner')}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl flex items-center justify-center">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-1">Meu Planner</h3>
              <p className="text-gray-600">Organize seu bem-estar</p>
            </div>
            <div className="text-3xl">📅</div>
          </div>
        </Card>

        {/* Forest */}
        <Card 
          className="bg-white rounded-3xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-all duration-300"
          onClick={() => navigate('/forest')}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-green-400 rounded-2xl flex items-center justify-center">
              <Activity className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-1">Minha Floresta</h3>
              <p className="text-gray-600">Veja seu progresso florescer</p>
            </div>
            <div className="text-3xl">🌸</div>
          </div>
        </Card>

        {/* Emergency Button */}
        <Card 
          className="bg-gradient-to-r from-red-400 to-pink-400 text-white rounded-3xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-all duration-300"
          onClick={() => navigate('/emergency')}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">Preciso disso agora</h3>
              <p className="text-red-100">Meditações de emergência</p>
            </div>
            <div className="text-3xl opacity-80">🚨</div>
          </div>
        </Card>

        {/* Premium CTA */}
        <Card className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-3xl p-8 shadow-sm">
          <div className="text-center">
            <div className="text-5xl mb-4">✨</div>
            <h3 className="text-2xl font-bold mb-3">Desbloqueie sua jornada completa</h3>
            <p className="text-yellow-100 mb-6 text-lg leading-relaxed">
              Acesse todos os rituais, meditações e conteúdos exclusivos
            </p>
            <Button className="bg-white text-orange-500 hover:bg-gray-50 font-bold text-lg py-4 px-8 rounded-2xl">
              Florescer 21 Premium - R$ 197
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
