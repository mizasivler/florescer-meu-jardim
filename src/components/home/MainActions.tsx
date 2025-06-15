
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones, MessageSquare, Calendar, Activity, Zap, Clock, Users, Star } from 'lucide-react';

const MainActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      path: '/meditation',
      icon: Headphones,
      title: 'Meditação',
      description: 'Encontre sua paz interior',
      emoji: '🧘‍♀️',
      gradient: 'from-blue-400 to-cyan-400',
      bgGradient: 'from-blue-50 to-cyan-50',
      stats: {
        duration: '5-20 min',
        completed: '12 sessões',
        rating: '4.9'
      },
      highlight: 'Nova sessão disponível'
    },
    {
      path: '/diary',
      icon: MessageSquare,
      title: 'Diário da Emoção',
      description: 'Registre seus sentimentos',
      emoji: '📝',
      gradient: 'from-green-400 to-emerald-400',
      bgGradient: 'from-green-50 to-emerald-50',
      stats: {
        duration: '3-10 min',
        completed: '8 entradas',
        rating: '4.7'
      },
      highlight: 'Reflita sobre hoje'
    },
    {
      path: '/planner',
      icon: Calendar,
      title: 'Meu Planner',
      description: 'Organize seu bem-estar',
      emoji: '📅',
      gradient: 'from-orange-400 to-pink-400',
      bgGradient: 'from-orange-50 to-pink-50',
      stats: {
        duration: '2-5 min',
        completed: '15 dias',
        rating: '4.8'
      },
      highlight: '3 metas pendentes'
    },
    {
      path: '/forest',
      icon: Activity,
      title: 'Meu Jardim',
      description: 'Veja seu progresso florescer',
      emoji: '🌸',
      gradient: 'from-pink-400 to-rose-400',
      bgGradient: 'from-pink-50 to-rose-50',
      stats: {
        duration: '1-3 min',
        completed: '5 flores',
        rating: '5.0'
      },
      highlight: 'Nova conquista!'
    }
  ];

  const emergencyAction = {
    path: '/emergency',
    icon: Zap,
    title: 'Preciso disso agora',
    description: 'Meditações de emergência',
    emoji: '🚨',
    gradient: 'from-red-400 to-pink-400',
    stats: {
      available: '8 técnicas',
      avgTime: '2-5 min',
      usage: '24/7'
    }
  };

  return (
    <div className="px-4 md:px-6 lg:px-8 xl:px-12 max-w-7xl mx-auto space-y-4">
      {/* Main Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <Card 
            key={index}
            className={`bg-gradient-to-br ${action.bgGradient} rounded-4xl p-4 md:p-6 shadow-card border-0 cursor-pointer hover:shadow-glow transition-all duration-300 hover:scale-105 group`}
            onClick={() => navigate(action.path)}
          >
            <div className="space-y-3 md:space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${action.gradient} rounded-2xl md:rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-lora font-bold text-florescer-dark mb-1">{action.title}</h3>
                    <p className="text-sm md:text-base text-florescer-dark/70">{action.description}</p>
                  </div>
                </div>
                <div className="text-2xl md:text-4xl group-hover:scale-110 transition-transform duration-300">
                  {action.emoji}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between bg-white/60 rounded-xl md:rounded-2xl p-3 md:p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 md:w-4 md:h-4 text-florescer-dark/60" />
                    <span className="text-xs md:text-sm font-medium text-florescer-dark">{action.stats.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 md:w-4 md:h-4 text-florescer-dark/60" />
                    <span className="text-xs md:text-sm font-medium text-florescer-dark">{action.stats.completed}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500" />
                    <span className="text-xs md:text-sm font-medium text-florescer-dark">{action.stats.rating}</span>
                  </div>
                </div>
                
                {action.highlight && (
                  <div className="bg-gradient-to-r from-florescer-copper to-florescer-light-copper text-white px-2 md:px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                    {action.highlight}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Emergency Button */}
      <Card 
        className="bg-gradient-to-r from-florescer-copper to-florescer-light-copper text-white rounded-4xl p-4 md:p-6 shadow-glow cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 group border-0"
        onClick={() => navigate(emergencyAction.path)}
      >
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-2xl md:rounded-3xl flex items-center justify-center backdrop-blur-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
                <emergencyAction.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-lora font-bold mb-1">{emergencyAction.title}</h3>
                <p className="text-sm md:text-base text-white/90">{emergencyAction.description}</p>
              </div>
            </div>
            <div className="text-2xl md:text-4xl opacity-80 group-hover:scale-110 transition-transform duration-300">
              {emergencyAction.emoji}
            </div>
          </div>

          {/* Emergency Stats */}
          <div className="flex items-center justify-between bg-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3 md:gap-6">
              <div className="text-center">
                <div className="text-base md:text-lg font-bold">{emergencyAction.stats.available}</div>
                <div className="text-white/80 text-xs">Disponíveis</div>
              </div>
              <div className="text-center">
                <div className="text-base md:text-lg font-bold">{emergencyAction.stats.avgTime}</div>
                <div className="text-white/80 text-xs">Duração</div>
              </div>
              <div className="text-center">
                <div className="text-base md:text-lg font-bold">{emergencyAction.stats.usage}</div>
                <div className="text-white/80 text-xs">Acesso</div>
              </div>
            </div>
            
            <Button className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm rounded-xl md:rounded-2xl font-semibold px-4 md:px-6 text-sm md:text-base">
              Acessar Agora
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MainActions;
