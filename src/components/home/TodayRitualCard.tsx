
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, CheckCircle, Star, Droplets } from 'lucide-react';

const TodayRitualCard = () => {
  const navigate = useNavigate();

  // Mock data for ritual progress
  const ritualSteps = [
    { name: 'Respiração', completed: true, icon: '🌬️' },
    { name: 'Afirmação', completed: false, icon: '💖' },
    { name: 'Gratidão', completed: false, icon: '🙏' }
  ];

  const completedSteps = ritualSteps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / ritualSteps.length) * 100;

  return (
    <div className="px-6 mb-8">
      <Card 
        className="bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 text-white rounded-4xl p-8 shadow-glow cursor-pointer transform hover:scale-105 transition-all duration-300 group border-0 relative overflow-hidden"
        onClick={() => navigate('/ritual')}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-4 -translate-x-4" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">Ritual de Hoje</h2>
              <p className="text-purple-100 text-lg mb-4">
                Comece seu dia com intenção e cuidado
              </p>
              
              {/* Progress Info */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-200" />
                  <span className="text-purple-100 font-medium">10-15 min</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-200" />
                  <span className="text-purple-100 font-medium">
                    {completedSteps}/{ritualSteps.length} concluídos
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-300" />
                  <span className="text-purple-100 font-medium">+50 XP</span>
                </div>
              </div>
            </div>
            
            <div className="text-7xl opacity-90 group-hover:scale-110 transition-transform duration-300">
              🌅
            </div>
          </div>

          {/* Ritual Steps Preview */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-4 mb-6">
            <h3 className="text-lg font-semibold mb-3 text-center">Passos do Ritual</h3>
            <div className="flex justify-center gap-4">
              {ritualSteps.map((step, index) => (
                <div 
                  key={index}
                  className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
                    step.completed 
                      ? 'bg-white/20 scale-105' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="text-2xl mb-2">{step.icon}</div>
                  <span className="text-sm font-medium text-center leading-tight">
                    {step.name}
                  </span>
                  {step.completed && (
                    <CheckCircle className="w-4 h-4 text-green-300 mt-1" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-purple-200">Progresso de Hoje</span>
              <span className="text-sm font-bold text-white">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-yellow-300 to-orange-300 h-3 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Action Button */}
          <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm rounded-2xl font-semibold py-4 text-lg transition-all duration-300 hover:scale-105 shadow-lg">
            {completedSteps === 0 ? '🌱 Começar Ritual' : 
             completedSteps === ritualSteps.length ? '✨ Ritual Completo!' : 
             '🌸 Continuar Ritual'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TodayRitualCard;
