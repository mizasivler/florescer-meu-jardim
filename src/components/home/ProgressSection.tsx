import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame, Target, Calendar, Trophy } from 'lucide-react';

interface ProgressSectionProps {
  progress: any;
}

const ProgressSection = ({ progress }: ProgressSectionProps) => {
  const currentDay = progress?.current_day || 5;
  const totalDays = progress?.total_days || 21;
  const progressPercentage = Math.round((currentDay / totalDays) * 100);
  
  // Mock data for enhanced metrics
  const weeklyGoals = 7;
  const completedWeekly = 5;
  const currentStreak = 5;
  const bestStreak = 8;

  const renderProgressFlowers = () => {
    return Array.from({ length: Math.min(7, totalDays) }, (_, index) => (
      <div
        key={index}
        className={`relative w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
          index < currentDay 
            ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg' 
            : 'bg-gray-100 text-gray-400 border-2 border-dashed border-gray-300'
        }`}
      >
        {index < currentDay ? '🌸' : index + 1}
        {index < currentDay && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-xs">✨</span>
          </div>
        )}
      </div>
    ));
  };

  const stats = [
    {
      icon: Calendar,
      label: 'Dias Concluídos',
      value: currentDay,
      total: totalDays,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      icon: Flame,
      label: 'Sequência Atual',
      value: currentStreak,
      total: bestStreak,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50'
    },
    {
      icon: Target,
      label: 'Meta Semanal',
      value: completedWeekly,
      total: weeklyGoals,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    }
  ];

  return (
    <div className="px-6 mb-8 space-y-6">
      {/* Main Progress Card */}
      <Card className="bg-gradient-to-br from-white to-purple-50/30 rounded-4xl p-8 shadow-glow border border-purple-100/50 backdrop-blur-sm">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 shadow-lg">
            <span className="text-4xl">🌸</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Sua Jornada de Florescimento
          </h3>
          <p className="text-gray-600 text-lg">
            Dia {currentDay} de {totalDays} • {progressPercentage}% concluído
          </p>
        </div>
        
        {/* Progress Flowers */}
        <div className="flex justify-center gap-3 mb-8">
          {renderProgressFlowers()}
        </div>
        
        {/* Main Progress Bar */}
        <div className="space-y-3">
          <Progress 
            value={progressPercentage} 
            className="h-4 bg-gray-100 shadow-inner"
          />
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">Início</span>
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-bold text-lg">
              {progressPercentage}%
            </span>
            <span className="text-gray-500 font-medium">Jardim Completo</span>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card 
            key={index}
            className={`bg-gradient-to-br ${stat.bgColor} rounded-3xl p-4 border-0 shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105`}
          >
            <div className="text-center space-y-3">
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${stat.color} rounded-2xl shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              
              <div className="space-y-1">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
                  {stat.total && (
                    <span className="text-sm text-gray-500">/{stat.total}</span>
                  )}
                </div>
                <p className="text-xs font-medium text-gray-600 leading-tight">
                  {stat.label}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Achievement Message */}
      <Card className="bg-gradient-to-r from-green-400 to-emerald-400 rounded-3xl p-6 shadow-lg border-0">
        <div className="flex items-center gap-4 text-white">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Trophy className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-lg mb-1">Parabéns! 🎉</h4>
            <p className="text-green-100 text-sm">
              Você está no {currentStreak}º dia consecutivo! Continue assim para fazer seu jardim florescer.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProgressSection;
