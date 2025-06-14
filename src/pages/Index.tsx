
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Headphones, Calendar, MessageSquare, Settings, User } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [currentMood, setCurrentMood] = useState<string>('');
  const [userName] = useState('Luciana');
  const [dayProgress] = useState(5);
  const [totalDays] = useState(21);

  const moodOptions = [
    { emoji: '😴', label: 'Cansada', value: 'tired' },
    { emoji: '😰', label: 'Aflita', value: 'anxious' },
    { emoji: '🥺', label: 'Sensível', value: 'sensitive' },
    { emoji: '😤', label: 'Irritada', value: 'irritated' },
    { emoji: '🌟', label: 'Esperançosa', value: 'hopeful' }
  ];

  const quickActions = [
    { icon: Heart, label: 'Ritual do Dia', color: 'bg-florescer-copper', path: '/ritual' },
    { icon: Headphones, label: 'Meditação', color: 'bg-florescer-olive', path: '/meditation' },
    { icon: Calendar, label: 'Meu Planner', color: 'bg-purple-500', path: '/planner' },
    { icon: MessageSquare, label: 'Diário da Emoção', color: 'bg-pink-500', path: '/diary' },
    { icon: User, label: 'Mensagem da Célia', color: 'bg-indigo-500', path: '/celia' }
  ];

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const renderProgressFlowers = () => {
    return Array.from({ length: totalDays }, (_, index) => (
      <div
        key={index}
        className={`progress-flower ${
          index < dayProgress 
            ? 'bg-florescer-copper text-white animate-bloom' 
            : 'bg-gray-200 text-gray-400'
        }`}
      >
        🌸
      </div>
    ));
  };

  return (
    <div className="min-h-screen gradient-florescer pb-20">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-lora font-bold text-florescer-dark text-shadow">
              {getTimeGreeting()}, {userName}!
            </h1>
            <p className="text-florescer-dark/70 mt-1">Como você está se sentindo hoje?</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-florescer-copper"
            onClick={() => navigate('/settings')}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {/* Mood Selector */}
        <div className="flex justify-between gap-2 mb-6">
          {moodOptions.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setCurrentMood(mood.value)}
              className={`mood-emoji ${
                currentMood === mood.value ? 'ring-2 ring-florescer-copper bg-florescer-copper/10' : ''
              }`}
              title={mood.label}
            >
              {mood.emoji}
            </button>
          ))}
        </div>

        {/* Progress Section */}
        <Card className="card-florescer mb-6">
          <div className="text-center">
            <h3 className="font-lora font-semibold text-lg mb-2">Sua Jornada</h3>
            <p className="text-florescer-dark/70 mb-3">
              Dia {dayProgress} de {totalDays} – Florescendo...
            </p>
            
            <div className="flex justify-center gap-1 mb-4 flex-wrap">
              {renderProgressFlowers()}
            </div>
            
            <Progress 
              value={(dayProgress / totalDays) * 100} 
              className="h-3 bg-gray-200"
            />
            <p className="text-sm text-florescer-dark/60 mt-2">
              {Math.round((dayProgress / totalDays) * 100)}% concluído
            </p>
          </div>
        </Card>
      </div>

      {/* Quick Actions Grid */}
      <div className="px-6 pb-6">
        <h2 className="font-lora font-semibold text-xl mb-4">Sua jornada hoje</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className="card-florescer hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => navigate(action.path)}
            >
              <div className="text-center">
                <div className={`${action.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <p className="font-medium text-sm text-florescer-dark">{action.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Emergency Button */}
        <Card 
          className="card-florescer bg-gradient-to-r from-red-50 to-pink-50 border-red-100 cursor-pointer"
          onClick={() => navigate('/emergency')}
        >
          <div className="text-center">
            <h3 className="font-lora font-semibold text-lg mb-2 text-red-700">
              Preciso disso agora
            </h3>
            <p className="text-red-600/80 text-sm mb-4">
              Meditações de emergência para momentos difíceis
            </p>
            <Button className="bg-red-500 hover:bg-red-600 text-white w-full">
              <Headphones className="h-4 w-4 mr-2" />
              Acessar Meditações SOS
            </Button>
          </div>
        </Card>

        {/* Premium CTA */}
        <Card className="card-florescer bg-gradient-to-r from-florescer-copper/10 to-florescer-olive/10 border-florescer-copper/20 mt-6">
          <div className="text-center">
            <h3 className="font-lora font-semibold text-lg mb-2">
              Desbloqueie sua jornada completa
            </h3>
            <p className="text-florescer-dark/70 text-sm mb-4">
              Acesse todos os rituais, meditações e conteúdos exclusivos
            </p>
            <Button className="btn-primary w-full animate-gentle-pulse">
              Florescer 21 Premium - R$ 197
            </Button>
          </div>
        </Card>
      </div>

      {/* Floating Action - Célia Message */}
      <div className="fixed bottom-20 right-6">
        <Button 
          size="lg" 
          className="btn-secondary rounded-full shadow-lg animate-gentle-pulse"
          onClick={() => navigate('/celia')}
        >
          <MessageSquare className="h-5 w-5 mr-2" />
          Célia
        </Button>
      </div>
    </div>
  );
};

export default Index;
