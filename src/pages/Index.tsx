
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Headphones, Calendar, MessageSquare, Settings, User, Zap, BookOpen, Activity } from 'lucide-react';

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

  const ritualActions = [
    { 
      icon: Heart, 
      title: 'Ritual do Dia', 
      description: 'Sua prática matinal personalizada',
      color: 'bg-florescer-copper', 
      path: '/ritual',
      illustration: '🌅'
    },
    { 
      icon: Headphones, 
      title: 'Meditação', 
      description: 'Encontre sua paz interior',
      color: 'bg-florescer-olive', 
      path: '/meditation',
      illustration: '🧘‍♀️'
    }
  ];

  const wellnessActions = [
    { 
      icon: MessageSquare, 
      title: 'Diário da Emoção', 
      description: 'Registre seus sentimentos',
      color: 'bg-purple-500', 
      path: '/diary',
      illustration: '📝'
    },
    { 
      icon: Calendar, 
      title: 'Meu Planner', 
      description: 'Organize seu bem-estar',
      color: 'bg-pink-500', 
      path: '/planner',
      illustration: '📅'
    }
  ];

  const supportActions = [
    { 
      icon: User, 
      title: 'Conversar com Célia', 
      description: 'Sua mentora sempre disponível',
      color: 'bg-indigo-500', 
      path: '/celia',
      illustration: '💬'
    },
    { 
      icon: Activity, 
      title: 'Minha Floresta', 
      description: 'Veja seu progresso florescer',
      color: 'bg-green-500', 
      path: '/forest',
      illustration: '🌸'
    }
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

  const ActionCard = ({ action, size = 'normal' }: { action: any, size?: 'normal' | 'large' }) => (
    <Card 
      className={`card-florescer hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105 ${
        size === 'large' ? 'col-span-2' : ''
      }`}
      onClick={() => navigate(action.path)}
    >
      <div className="flex items-center gap-4">
        <div className={`${action.color} w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          <action.icon className="h-7 w-7 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-lora font-semibold text-lg text-florescer-dark">{action.title}</h3>
            <span className="text-xl">{action.illustration}</span>
          </div>
          <p className="text-florescer-dark/70 text-sm leading-relaxed">{action.description}</p>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen gradient-florescer pb-20">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-lora font-bold text-florescer-dark text-shadow mb-1">
              {getTimeGreeting()}, {userName}!
            </h1>
            <p className="text-florescer-dark/70 text-lg">Como você está se sentindo hoje?</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-florescer-copper hover:bg-florescer-copper/10"
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
              onClick={() => setCurrentMood(mood.value)}
              className={`mood-emoji transition-all duration-300 ${
                currentMood === mood.value ? 'ring-3 ring-florescer-copper bg-florescer-copper/10 scale-110' : 'hover:scale-105'
              }`}
              title={mood.label}
            >
              {mood.emoji}
            </button>
          ))}
        </div>

        {/* Progress Section */}
        <Card className="card-florescer mb-8 bg-gradient-to-r from-florescer-cream to-white">
          <div className="text-center">
            <h3 className="font-lora font-bold text-xl mb-3 text-florescer-dark">Sua Jornada de Transformação</h3>
            <p className="text-florescer-dark/80 mb-4 text-lg">
              Dia {dayProgress} de {totalDays} – Florescendo a cada passo...
            </p>
            
            <div className="flex justify-center gap-1 mb-6 flex-wrap">
              {renderProgressFlowers()}
            </div>
            
            <Progress 
              value={(dayProgress / totalDays) * 100} 
              className="h-4 bg-gray-200 mb-3"
            />
            <p className="text-sm text-florescer-dark/60 font-medium">
              {Math.round((dayProgress / totalDays) * 100)}% da sua transformação concluída
            </p>
          </div>
        </Card>
      </div>

      {/* Main Actions */}
      <div className="px-6 space-y-8">
        {/* Ritual Section */}
        <div>
          <h2 className="font-lora font-bold text-2xl mb-4 text-florescer-dark flex items-center gap-2">
            <span>🌅</span> Rituais & Práticas
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {ritualActions.map((action, index) => (
              <ActionCard key={index} action={action} size="large" />
            ))}
          </div>
        </div>

        {/* Wellness Section */}
        <div>
          <h2 className="font-lora font-bold text-2xl mb-4 text-florescer-dark flex items-center gap-2">
            <span>💝</span> Cuidado & Reflexão
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {wellnessActions.map((action, index) => (
              <ActionCard key={index} action={action} size="large" />
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div>
          <h2 className="font-lora font-bold text-2xl mb-4 text-florescer-dark flex items-center gap-2">
            <span>🤝</span> Suporte & Progresso
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {supportActions.map((action, index) => (
              <ActionCard key={index} action={action} size="large" />
            ))}
          </div>
        </div>

        {/* Emergency Button */}
        <Card 
          className="card-florescer bg-gradient-to-r from-red-50 to-pink-50 border-red-200 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
          onClick={() => navigate('/emergency')}
        >
          <div className="flex items-center gap-4">
            <div className="bg-red-500 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-lora font-bold text-lg text-red-700">Preciso disso agora</h3>
                <span className="text-xl">🚨</span>
              </div>
              <p className="text-red-600/80 text-sm leading-relaxed">
                Meditações de emergência para momentos difíceis
              </p>
            </div>
          </div>
        </Card>

        {/* Premium CTA */}
        <Card className="card-florescer bg-gradient-to-r from-florescer-copper/10 to-florescer-olive/10 border-florescer-copper/30">
          <div className="text-center">
            <div className="text-5xl mb-4">🌟</div>
            <h3 className="font-lora font-bold text-xl mb-3 text-florescer-dark">
              Desbloqueie sua jornada completa
            </h3>
            <p className="text-florescer-dark/70 mb-6 leading-relaxed">
              Acesse todos os rituais, meditações e conteúdos exclusivos para uma transformação completa
            </p>
            <Button className="btn-primary w-full text-lg py-4 animate-gentle-pulse font-bold">
              Florescer 21 Premium - R$ 197
            </Button>
          </div>
        </Card>
      </div>

      {/* Floating Action - Célia Message */}
      <div className="fixed bottom-24 right-6">
        <Button 
          size="lg" 
          className="btn-secondary rounded-full shadow-xl animate-gentle-pulse hover:scale-110 transition-all duration-300"
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
